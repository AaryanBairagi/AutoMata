import { toast } from "sonner"

type NodeType = {
  id: string
  type: string
  data: any
}

type EdgeType = {
  source: string
  target: string
  label?:string
}



export const executeWorkflow = async (
  nodes: NodeType[],
  edges: EdgeType[],
  onNodeUpdate?: (nodeId: string, status: "running" | "completed") => void
) => {
  const triggerNode = nodes.find((n) => n.type === "Trigger")
  if (!triggerNode) throw new Error("No trigger node")

  let currentNode: NodeType | undefined = triggerNode
  let context: any = {}

  while (currentNode) {

    onNodeUpdate?.(currentNode.id, "running")
    console.log("Executing:", currentNode.type)

    context = await runNode(currentNode, context)

    onNodeUpdate?.(currentNode.id, "completed")
    let nextEdge

    if (currentNode.type === "Condition") {
      const result = evaluateCondition(currentNode, context)

      nextEdge = edges.find(
        (e) =>
          e.source === currentNode?.id &&
          e.label === (result ? "true" : "false")
      )
    } else {
      nextEdge = edges.find(
        (e) => e.source === currentNode?.id
      )
    }

    if (!nextEdge) break

    const nextNode = nodes.find((n) => n.id === nextEdge.target)
    if (!nextNode) break

    currentNode = nextNode
  }

  return "Workflow executed"
}


const runNode = async (node: NodeType, context: any) => {
  const content = node.data?.metadata?.content

  switch (node.type) {

    //  AI NODE
    case "AI":
      if (!content) return context

      const aiRes = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: context.lastOutput ? `${content}\n\nInput: ${context.lastOutput}` : content,
        }),
      })

      const aiData = await aiRes.json()
      const output = aiData.result || aiData
      if (!aiRes.ok) {
        console.error("AI failed")
        return context
      }

      return {
        ...context,
        aiOutput: output,
        lastOutput: output
      }

    //  NOTION
    case "Notion":
    const notionText = context.lastOutput || content

    toast.loading("Creating Notion page...")

    try {
      const res = await fetch("/api/notion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: notionText,
        }),
      })

      const data = await res.json()

      toast.success("Notion page created!", {
        description: notionText,
      })
    } catch (err) {
      toast.error("Notion failed.")
   }

  return {
    ...context,
    lastOutput: notionText,
  }


    //  SLACK
    case "Slack":
      const message = context.lastOutput || content

      await fetch("/api/slack", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
        }),
      })

      return{
        ...context,
        lastOutput:message
      }

    //  DISCORD
    case "Discord":
      await fetch("/api/discord", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: context.lastOutput || content,
        }),
      })

      return {
        ...context,
        lastOutput: context.lastOutput || content,
      }

    // GOOGLE DRIVE
    case "Google Drive":
      const driveRes = await fetch("/api/drive")
      const driveData = await driveRes.json()
      const file = driveData?.files?.[0]
      console.log("Drive trigger")
      
      return {
        ...context,
        driveFile: file,
        lastOutput: file?.name || "", 
      }

    case "Google Calendar":
      const title = context.lastOutput || content

      await fetch("/api/calendar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
        }),
      })

      return {
        ...context,
        lastOutput: title,
      }
    
    case "Trigger":
    console.log("Trigger fired")

    return {
      ...context,
      lastOutput: "triggered",
    }

    case "Condition":
    return {
      ...context,
      lastOutput: context.lastOutput,
    }

    // 📧 EMAIL
    case "Email":
    const emailText = context.lastOutput || content

    toast.loading("Sending email...")

    try {
      await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: node.data?.metadata?.to || "your@email.com",
          subject: node.data?.metadata?.subject || "AutoMata Email",
          text: emailText,
        }),
      })

      toast.success("Email sent!")
    } catch (err) {
      toast.error("Email failed")
    }

    return {
      ...context,
      lastOutput: emailText,
    }
    
    default:
      console.log("Unknown:", node.type)
      return context
  }
}


const evaluateCondition = (node: NodeType, context: any) => {
  const condition = node.data?.metadata?.condition
  const value = node.data?.metadata?.value

  const input = context.lastOutput || ""

  switch (condition) {
    case "includes":
      return input.includes(value)

    case "equals":
      return input === value

    case "startsWith":
      return input.startsWith(value)

    default:
      return false
  }
}

