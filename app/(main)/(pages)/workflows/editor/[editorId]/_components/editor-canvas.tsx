'use client'

import { EditorCanvasCardType, EditorNodeTypes } from '@/lib/types'
import { useEditor } from '@/providers/editor-provider'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import  { ReactFlow, Background, Connection, Controls, Edge, EdgeChange, MiniMap, NodeChange, ReactFlowInstance, applyNodeChanges, applyEdgeChanges, addEdge, } from '@xyflow/react' // ✅ Corrected import
import '@xyflow/react/dist/style.css'
import EditorCanvasCardSingle from './editor-canvas-card-single'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup,} from '@/components/ui/resizable'
import { toast } from 'sonner'
import { usePathname } from 'next/navigation'
import { v4 } from 'uuid'
import { EditorCanvasDefaultCardTypes } from '@/lib/constant'
import FlowInstance from './flow-instance'
import EditorCanvasSidebar from './editor-canvas-sidebar'
import { getWorkflowById } from '../_actions/workflow-connection'
import { BackgroundVariant } from '@xyflow/react'
import { onGetNodesEdges } from '../../../_actions/workflow-connections'

const initialNodes: EditorNodeTypes[] = []
const initialEdges: Edge[] = []

const EditorCanvas = () => {
    const { dispatch, state } = useEditor()
    const [nodes, setNodes] = useState<EditorNodeTypes[]>(initialNodes)
    const [edges, setEdges] = useState<Edge[]>(initialEdges)
    const [isWorkFlowLoading, setIsWorkFlowLoading] = useState(false)
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance>()
    const pathname = usePathname()

    const onDragOver = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault()
            event.dataTransfer.dropEffect = 'move'
        }, [])

    const onNodesChange = useCallback((changes: NodeChange[]) => {
            setNodes((nds) => applyNodeChanges(changes, nds) as EditorNodeTypes[])
        }, [])

    const onEdgesChange = useCallback((changes: EdgeChange[]) => {
            setEdges((eds) => applyEdgeChanges(changes, eds) as Edge[])
        }, [])

  const onConnect = useCallback((params: Edge | Connection) => {
    setEdges((eds) => addEdge(params, eds))
  }, [])

  const onDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault()

    const type = event.dataTransfer.getData('application/reactflow') as EditorCanvasCardType['type']
    if (!type) return

    const triggerAlreadyExists = state.editor.elements.find((node) => node.type === 'Trigger')
    if (type === 'Trigger' && triggerAlreadyExists) {
      toast('Only one trigger can be added to automations at the moment')
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
        description: EditorCanvasDefaultCardTypes[type]?.description || '',
        completed: false,
        current: false,
        metadata: {},
        type: type,
      },
    }

    setNodes((nds) => [...nds, newNode])
  }, [reactFlowInstance, state])

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

  useEffect(() => {
    dispatch({ type: 'LOAD_DATA', payload: { edges, elements: nodes } })
  }, [nodes, edges, dispatch])

  const nodeTypes = useMemo(() => ({
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
  }), [])

  const onGetWorkFlow = async () => {
    setIsWorkFlowLoading(true);
    const flowId = pathname.split('/').pop()! ;
    // const response = await onCreateNodesEdges(flowId , JSON.stringify(nodes), JSON.stringify(edges), pathname);
    
    const response = await onGetNodesEdges(flowId)
    if (response) {
      setEdges(JSON.parse(response.edges!))
      setNodes(JSON.parse(response.nodes!))
    }
    setIsWorkFlowLoading(false)
  }

  useEffect(() => {
    onGetWorkFlow()
  }, [])

return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={70}>
        <div className="flex h-full w-full items-center justify-center">
          <div className="relative w-full h-full pb-[70px]">
            {isWorkFlowLoading ? (
              <div className="absolute flex h-full w-full items-center justify-center">
                <svg className="h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600" viewBox="0 0 100 101" xmlns="http://www.w3.org/2000/svg">
                <p className='text-muted-foreground text-md mr-3'>Loading Canvas...</p>
                  <path 
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor" />
                  <path 
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill" />
                </svg>
              </div>
            ) : (
              <ReactFlow
                className="w-full h-full"
                onDrop={onDrop}
                onDragOver={onDragOver}
                nodes={state.editor.elements}
                onNodesChange={onNodesChange}
                edges={edges}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onInit={setReactFlowInstance}
                fitView
                onClick={handleClickCanvas}
                nodeTypes={nodeTypes} >

                <Controls position="top-left"   
                className="text-black [&>button]:bg-muted [&>button]:text-foreground [&>button]:border [&>button]:border-border [&>button:hover]:bg-muted/70" />
                
                <MiniMap nodeColor={() => '#4ade80'} nodeStrokeWidth={2} className="!bg-background !border !border-border" />

                <Background variant={BackgroundVariant.Dots} gap={12} size={1} />

              </ReactFlow>
            )}
              {/* Bottom visual gradient */}
            <div className="absolute bottom-0 left-0 w-full h-[90px] pointer-events-none bg-gradient-to-t from-background via-background/70 to-transparent" />

              {/* Tip / Status bar */}
            <div className="absolute bottom-4 left-4 z-50 flex flex-wrap items-center gap-3 bg-muted/80 backdrop-blur-md px-4 py-2 rounded-lg shadow-md text-sm text-muted-foreground border border-border">
              <span>💡 <strong className="font-medium">Tip:</strong> Drag cards from the right panel to start building.</span>
              <div className="flex items-center gap-1">
                <kbd className="rounded bg-muted px-1.5 py-0.5 text-xs border">⌘</kbd>
                <span className="text-xs">+ scroll to zoom</span>
              </div>
            </div>

          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={40} className="relative sm:block">
        {isWorkFlowLoading ? (
          <div className="absolute flex h-full w-full items-center justify-center">
            <svg className="h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600" viewBox="0 0 100 101" xmlns="http://www.w3.org/2000/svg">
              <p className='text-muted-foreground text-md mr-3'>Loading Canvas Sidebar...</p>
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor" />
              <path 
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill" />
            </svg>
          </div>
        ) : (
          <FlowInstance edges={edges} nodes={nodes}>
            <EditorCanvasSidebar nodes={nodes} />
          </FlowInstance>
        )}
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default EditorCanvas
