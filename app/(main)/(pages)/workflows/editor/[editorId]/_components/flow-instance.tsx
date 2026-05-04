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

  if (flow?.success) {
    toast.success("Flow saved")
  } else {
    toast.error("Failed to save flow")
  }


  }, [state])

  const onPublishWorkflow = useCallback(async () => {
    try {
      const result = await executeWorkflow(
        state.editor.elements,
        state.editor.edges
      )

      toast.success(result)

      // await onFlowPublish(pathname.split('/').pop()!, true)
      const res = await onFlowPublish(pathname.split('/').pop()!, true)

      if (res?.success) {
        toast.success(res.published ? "Workflow published 🚀" : "Workflow unpublished")
      } else {
        toast.error("Workflow not found")
      }

    } catch (err) {
      toast.error("Execution failed")
      console.error(err)
    }
  }
  , [state])

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
    <div className="flex flex-col gap-2 borde border-white/10">
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