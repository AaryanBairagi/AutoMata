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

type WorkflowContext = {
  lastOutput?: any
  nodeOutputs: Record<string, any>
}

const extractText = (output: any) => {
  if (!output) return ""
  if (typeof output === "string") return output
  if (output.type === "text") return output.value
  if (output.type === "file") return output.fileName
  return ""
}


export const executeWorkflow = async (
  nodes: NodeType[],
  edges: EdgeType[],
  onNodeUpdate?: (nodeId: string, status: "running" | "completed") => void
) => {
  const triggerNode = nodes.find((n) => n.type === "Trigger")
  if (!triggerNode) throw new Error("No trigger node")

  let currentNode: NodeType | undefined = triggerNode
  let context: WorkflowContext = {
    lastOutput:null,
    nodeOutputs:{}
  }

  while (currentNode) {

    onNodeUpdate?.(currentNode.id, "running")
    console.log("Executing:", currentNode.type)

    context = await runNode(currentNode, context)
    context.nodeOutputs[currentNode.id] = context.lastOutput;

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
  const content = node.data?.metadata?.content || node.data?.metadata?.prompt

  switch (node.type) {

    //  AI NODE
    case "AI":
      if (!content) return context
      const prev = extractText(context.lastOutput)

      const aiRes = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prev ? `${content}\n\nInput: ${prev}` : content,
        }),
      })

      const aiData = await aiRes.json()
      const output = aiData?.result || "No AI output"
      if (!aiRes.ok) {
        console.error("AI failed")
        return context
      }

    return {
      ...context,
      lastOutput: {
        type: "text",
        value: output,
      }
    }

    //  NOTION
    case "Notion": {
      const text = extractText(context.lastOutput)

      await fetch("/api/notion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      })

      return {
        ...context,
        lastOutput: context.lastOutput,
      }
    }


    //  SLACK
    case "Slack": {
      const message = extractText(context.lastOutput)

      await fetch("/api/slack", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      })

      return {
        ...context,
        lastOutput: context.lastOutput,
      }
    }

    //  DISCORD
    case "Discord": {
      const message = extractText(context.lastOutput)

      await fetch("/api/discord", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      })

      return {
        ...context,
        lastOutput: context.lastOutput,
      }
    }

    // GOOGLE DRIVE
    case "Google Drive":

    const driveRes = await fetch("/api/drive")
    const driveData = await driveRes.json()
    const file = driveData?.files?.[0]

    return {
      ...context,
      lastOutput: {
        type: "file",
        fileId: file?.id,
        fileName: file?.name,
        mimeType: file?.mimeType,
      }
    }

    // Google Calendar
    case "Google Calendar":

    const eventData = {
      title: extractText(context.lastOutput) || "New Event",
      time: new Date().toISOString(),
    }

    await fetch("/api/calendar", {
      method: "POST",
      body: JSON.stringify(eventData),
    })

    return {
      ...context,
      lastOutput: {
        type: "event",
        ...eventData,
      }
    }

    // Trigger
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

    //EMAIL
    case "Email": {
    const text = extractText(context.lastOutput)

    await fetch("/api/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: node.data?.metadata?.to,
        subject: node.data?.metadata?.subject,
        text,
      }),
    })

    return {
      ...context,
      lastOutput: context.lastOutput,
    }
  }
    
    default:
      console.log("Unknown:", node.type)
      return context
  }
}


const evaluateCondition = (node: NodeType, context: any) => {
  const condition = node.data?.metadata?.condition
  const value = node.data?.metadata?.value

  const input = extractText(context.lastOutput)
  
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

