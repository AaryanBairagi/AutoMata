'use client'

import { EditorCanvasCardType, EditorNodeTypes } from '@/lib/types'
import { useEditor } from '@/providers/editor-provider'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  ReactFlow,
  Background,
  Connection,
  Controls,
  Edge,
  EdgeChange,
  MiniMap,
  NodeChange,
  ReactFlowInstance,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

import EditorCanvasCardSingle from './editor-canvas-card-single'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { toast } from 'sonner'
import { usePathname } from 'next/navigation'
import { v4 } from 'uuid'
import { EditorCanvasDefaultCardTypes } from '@/lib/constant'
import FlowInstance from './flow-instance'
import EditorCanvasSidebar from './editor-canvas-sidebar'
import { BackgroundVariant } from '@xyflow/react'
import { onGetNodesEdges } from '../../../_actions/workflow-connections'
import { onCreateNodesEdges } from '../_actions/workflow-connection'

const EditorCanvas = () => {
  const { dispatch, state } = useEditor()

  const [isWorkFlowLoading, setIsWorkFlowLoading] = useState(false)
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance>()
  const pathname = usePathname()

  // ---------------- DRAG OVER ----------------
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  // ---------------- NODE CHANGE ----------------
    const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      const updatedNodes = applyNodeChanges(
        changes,
        state.editor.elements
      )

      dispatch({
        type: 'LOAD_DATA',
        payload: {
          edges: state.editor.edges,
          elements: updatedNodes,
        },
      })
    },
    [state]
  )

  // ---------------- EDGE CHANGE ----------------
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      const updatedEdges = applyEdgeChanges(
        changes,
        state.editor.edges
      )

      dispatch({
        type: 'LOAD_DATA',
        payload: {
          edges: updatedEdges,
          elements: state.editor.elements,
        },
      })
    },
    [state]
  )

  // ---------------- CONNECT ----------------
  const onConnect = useCallback(
  (params: Edge | Connection) => {
    let label = ""

    const sourceNode = state.editor.elements.find(
      (n) => n.id === params.source
    )

    if (sourceNode?.type === "Condition") {
      const existingEdges = state.editor.edges.filter(
        (e) => e.source === params.source
      )

      label = existingEdges.length === 0 ? "true" : "false"
    }

    const newEdge = {
      ...params,
      label,
    }

    const newEdges = addEdge(newEdge, state.editor.edges)

    dispatch({
      type: 'LOAD_DATA',
      payload: {
        edges: newEdges,
        elements: state.editor.elements,
      },
    })
  },
  [state]
  )

  // ---------------- DROP NODE ----------------
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault()

      const type = event.dataTransfer.getData(
        'application/reactflow'
      ) as EditorCanvasCardType['type']

      if (!type) return

      const triggerExists = state.editor.elements.find(
        (n) => n.type === 'Trigger'
      )

      if (type === 'Trigger' && triggerExists) {
        toast('Only one trigger allowed')
        return
      }

      if (!reactFlowInstance) return

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      })

      const newNode: EditorNodeTypes = {
        id: v4(),
        type,
        position,
        data: {
          title: type,
          description:
            EditorCanvasDefaultCardTypes[type]?.description || '',
          completed: false,
          current: false,
          metadata: {},
          type,
        },
      }

      dispatch({
        type: 'LOAD_DATA',
        payload: {
          edges: state.editor.edges,
          elements: [...state.editor.elements, newNode],
        },
      })
    },
    [reactFlowInstance, state]
  )

  // ---------------- CLICK EMPTY ----------------
  const handleClickCanvas = () => {
    dispatch({
      type: 'SELECTED_ELEMENT',
      payload: {
        elements: {
          id: '',
          type: 'Trigger',
          position: { x: 0, y: 0 },
          data: {
            title: '',
            description: '',
            completed: false,
            current: false,
            metadata: {},
            type: 'Trigger',
          },
        },
      },
    })
  }

  // ---------------- AUTO SAVE ----------------
  useEffect(() => {
    const saveFlow = async () => {
      const flowId = pathname.split('/').pop()!

      if (!state.editor.elements?.length) return

      await onCreateNodesEdges(
        flowId,
        JSON.stringify(state.editor.elements),
        JSON.stringify(state.editor.edges),
        []
      )
    }

    const timeout = setTimeout(saveFlow, 800)
    return () => clearTimeout(timeout)
  }, [state.editor.elements, state.editor.edges])

  // ---------------- NODE TYPES ----------------
  const nodeTypes = useMemo(
    () => ({
      Action: EditorCanvasCardSingle,
      Trigger: EditorCanvasCardSingle,
      Email: EditorCanvasCardSingle,
      Condition: EditorCanvasCardSingle,
      AI: EditorCanvasCardSingle,
      Slack: EditorCanvasCardSingle,
      'Google Drive': EditorCanvasCardSingle,
      Notion: EditorCanvasCardSingle,
      Discord: EditorCanvasCardSingle,
      'Custom Webhook': EditorCanvasCardSingle,
      'Google Calendar': EditorCanvasCardSingle,
      Wait: EditorCanvasCardSingle,
    }),
    []
  )

  // ---------------- LOAD WORKFLOW ----------------
  const onGetWorkFlow = async () => {
    setIsWorkFlowLoading(true)

    const flowId = pathname.split('/').pop()!
    const response = await onGetNodesEdges(flowId)

    if (response?.edges && response?.nodes) {
      dispatch({
        type: 'LOAD_DATA',
        payload: {
          edges: JSON.parse(response.edges || "[]"),
          elements: JSON.parse(response.nodes || "[]"),
        },
      })
    }

    setIsWorkFlowLoading(false)
  }

  useEffect(() => {
    onGetWorkFlow()
  }, [])

  // ---------------- UI ----------------
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={70} className='bg-[#0B0B0D]'>
        <ReactFlow
          nodes={state.editor.elements || []}
          edges={state.editor.edges || []}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={(instance) => setReactFlowInstance(instance)}
          nodeTypes={nodeTypes}
          onClick={handleClickCanvas}
          fitView
        >
          <Controls position='top-right' />
          <MiniMap
          style={{
            backgroundColor: "#0E0E11",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
          nodeColor={() => "#666"}
          maskColor="rgba(0,0,0,0.6)"
          position='top-left'
          />
          
          <Background variant={BackgroundVariant.Dots} />
        </ReactFlow>
      </ResizablePanel>

      <ResizableHandle className="bg-white/10 hover:bg-white/20 transition-colors w-[2px]" />

      <ResizablePanel defaultSize={30} className='backdrop-blur-lg border-1 border-white/10 bg-[#0E0E11]'>
        <FlowInstance>
          <EditorCanvasSidebar nodes={state.editor.elements} />
        </FlowInstance>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default EditorCanvas