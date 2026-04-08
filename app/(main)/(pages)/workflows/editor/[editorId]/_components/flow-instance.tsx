'use client'

import { Button } from '@/components/ui/button'
import { useNodeConnections } from '@/providers/connections-provider'
import { usePathname } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import { onCreateNodesEdges, onFlowPublish } from '../_actions/workflow-connection'
import { toast } from 'sonner'
import { executeWorkflow } from "@/lib/workflow-executor"
import { useEditor } from '@/providers/editor-provider'

type Props = {
  children: React.ReactNode
}

const FlowInstance = ({ children }: Props) => {
  const pathname = usePathname()
  const { nodeConnection } = useNodeConnections()
  const { state } = useEditor()

  const [isFlow, setIsFlow] = useState<string[]>([])

  const onFlowAutomation = useCallback(async () => {
    const flow = await onCreateNodesEdges(
      pathname.split('/').pop()!,
      JSON.stringify(state.editor.elements),
      JSON.stringify(state.editor.edges),
      isFlow
    )

    if (flow) toast.message(flow.message)
  }, [state])

  const onPublishWorkflow = useCallback(async () => {
    try {
      const result = await executeWorkflow(
        state.editor.elements,
        state.editor.edges
      )

      toast.success(result)

      await onFlowPublish(pathname.split('/').pop()!, true)
    } catch (err) {
      toast.error("Execution failed")
      console.error(err)
    }
  }, [state])

  const onAutomateFlow = () => {
    const flows: any = []

    const edges = state.editor.edges || []
    const nodes = state.editor.elements || []

    edges.forEach((edge) => {
      const node = nodes.find((n) => n.id === edge.target)
      if (node) flows.push(node.type)
    })

    setIsFlow(flows)
  }

  useEffect(() => {
    onAutomateFlow()
  }, [state.editor.edges])

  return (
    <div className="flex flex-col gap-2 border-1 border-white">
      <div className="flex gap-3 p-4">
        <Button className='rounded-xl bg-white/90 hover:bg-white/70 text-black/70 hover:text-black/90'   onClick={onFlowAutomation} disabled={state.editor.elements.length === 0}>
          Save
        </Button>

        <Button className='rounded-xl bg-purple-800 hover:bg-purple-900 text-white/70 hover:text-white/90' onClick={onPublishWorkflow} disabled={state.editor.elements.length === 0}>
          Publish
        </Button>
      </div>

      {children}
    </div>
  )
}

export default FlowInstance






// 'use client'
// import { Button } from '@/components/ui/button'
// import { useNodeConnections } from '@/providers/connections-provider'
// import { usePathname } from 'next/navigation'
// import React, { useCallback, useEffect, useState } from 'react'
// import { onCreateNodesEdges , onFlowPublish } from '../_actions/workflow-connection'
// import { toast } from 'sonner'
// import { executeWorkflow } from "@/lib/workflow-executor"

// type Props = {
//     children: React.ReactNode
//     edges: any[]
//     nodes: any[]
// }

// const FlowInstance = ({ children, edges, nodes }: Props) => {
//     const pathname = usePathname()
//     const [isFlow, setIsFlow] = useState<string[]>([])
//     const { nodeConnection } = useNodeConnections()

//     const onFlowAutomation = useCallback(async () => {
//     const flow = await onCreateNodesEdges(
//         pathname.split('/').pop()!,
//         JSON.stringify(nodes),
//         JSON.stringify(edges),
//         isFlow
//     )

//     if (flow) toast.message(flow.message)
//     }, [nodeConnection])

//     // const onPublishWorkflow = useCallback(async () => {
//     // const response = await onFlowPublish(pathname.split('/').pop()!, true)
//     // if (response) toast.message(response)
//     // }, [])

//     const onPublishWorkflow = useCallback(async () => {
//     try {
//     const result = await executeWorkflow(nodes, edges)

//     toast.success(result)

//     await onFlowPublish(pathname.split('/').pop()!, true)
//   } catch (err) {
//     toast.error("Execution failed")
//     console.error(err)
//   }
//     }, [nodes, edges])

//     const onAutomateFlow = async () => {
//         const flows: any = []
//         const connectedEdges = edges.map((edge) => edge.target)
//         connectedEdges.map((target) => {
//             nodes.forEach((node) => {
//                 if (node.id === target) {
//                     flows.push(node.type)
//                     }
//             })
//         })

//         setIsFlow(flows)
//     }

//     useEffect(() => {
//         onAutomateFlow()
//     }, [edges])

// return (
//         <div className="flex flex-col gap-2 border-1 border-white">
//             <div className="flex gap-3 p-4">
//                 <Button className="bg-white border-black rounded-xl border-1 text-black hover:text-white hover:border-white" onClick={onFlowAutomation} disabled={isFlow.length < 1}>
//                     Save
//                 </Button>

//                 <Button className="bg-white border-black rounded-xl border-1 text-black hover:text-white hover:border-white" disabled={isFlow.length < 1} onClick={onPublishWorkflow}>
//                     Publish
//                 </Button>

//                 </div>
//                     {children}
//                 </div>
//     )
// }

// export default FlowInstance