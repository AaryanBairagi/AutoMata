'use client'
import { EditorCanvasTypes, EditorNodeTypes } from '@/lib/types'
import { useNodeConnections } from '@/providers/connections-provider'
import { useEditor } from '@/providers/editor-provider'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React, { useEffect } from 'react'
import { Separator } from '@/components/ui/separator'
import { CONNECTIONS, EditorCanvasDefaultCardTypes } from '@/lib/constant'
import { Card,CardDescription,CardHeader,CardTitle } from '@/components/ui/card'
import { fetchBotSlackChannels, onConnections, onDragStart } from '@/lib/editor-utils'
import EditorCanvasIconHelper from './editor-canvas-card-icon-helper'
import { Accordion,AccordionContent,AccordionItem,AccordionTrigger } from '@/components/ui/accordion'
import RenderConnectionAccordion from './render-connection-accordion'
import RenderOutputAccordion from './render-output-accordion'
import { useFuzzieStore } from '@/store'
import { executeWorkflow } from '@/lib/workflow-executor'
import { toast } from 'sonner'
import { Trash2 } from 'lucide-react'

type Props = {
    nodes: EditorNodeTypes[]
}

const EditorCanvasSidebar = ({ nodes }: Props) => {
    const { state , dispatch } = useEditor()
    const edges = state.editor.edges
    const triggerExists = nodes.some((n) => n.type === "Trigger")
    
    const { nodeConnection } = useNodeConnections()
    const { googleFile, setSlackChannels } = useFuzzieStore()

    const selectedNode = state.editor.selectedNode
    const nodeType = selectedNode?.type

    useEffect(() => {
        if (state) {
            onConnections(nodeConnection, state, googleFile)
        }
    }, [state])

    useEffect(() => {
        if (nodeConnection.slackNode.slackAccessToken) {
        fetchBotSlackChannels(
            nodeConnection.slackNode.slackAccessToken,
            setSlackChannels
        )
        }
    }, [nodeConnection])

return (
    <aside className='border-1 border-white'>
        <Tabs defaultValue="actions" className="h-full max-h-screen overflow-y-scroll pb-24">
            <TabsList className="bg-transparent">
                <TabsTrigger value="actions">Actions</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <Separator />
            <TabsContent value="actions" className="flex flex-col gap-4 p-4">
            <button
                onClick={async () => {
                try {
                let currentElements = [...state.editor.elements];
                await executeWorkflow(nodes, edges, (updatedNodeId, status) => {
                
                currentElements = currentElements.map((n) => {
                if (n.id === updatedNodeId) {
                return {
                    ...n,
                    data: {
                        ...n.data,
                        current: status === "running",
                        completed: status === "completed" || n.data.completed,
                    },
                }
                }

                return {
                    ...n,
                    data: {
                        ...n.data,
                        current: false,
                    },
                    }
                })
                
                dispatch({
                    type: "UPDATE_NODE",
                    payload: {
                        elements : currentElements
                    },
                    })
                })
                toast.success("Workflow executed !")
                } catch (err) {
                    console.error(err)
                    toast.error("Execution failed")
                }
                }}
                className="w-full mb-2 bg-white text-black p-2 rounded-lg font-semibold hover:opacity-90 transition"
            >
                ▶ Run Workflow
            </button>

            {state.editor.selectedNode.id && (
            <button
                onClick={() => {
                dispatch({
                    type: "DELETE_NODE",
                    payload: { id: state.editor.selectedNode.id },
                })
            }}
            className="flex flex-row w-full mb-2 bg-red-800 hover:bg-red-900 gap-2 items-center justify-center text-white/80 hover:text-white/60 p-2 rounded-lg font-light "
            >
                Delete Node <Trash2 className='font-light' />
            </button>
            )}

                {Object.entries(EditorCanvasDefaultCardTypes)
                    .filter(([_, cardType]) =>
                    (!triggerExists && cardType.type === "Trigger") || (cardType.type === "Action"))
                    .map(([cardKey, cardValue]) => (
                <Card
                    key={cardKey}
                    draggable
                    className="w-full cursor-grab border-black bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900"
                    onDragStart={(event) =>
                    onDragStart(event, cardKey as EditorCanvasTypes)
                }>
                <CardHeader className="flex flex-row items-center gap-4 p-4">
                    <EditorCanvasIconHelper type={cardKey as EditorCanvasTypes} />
                    <CardTitle className="text-md">
                        {cardKey}
                        <CardDescription>{cardValue.description}</CardDescription>
                    </CardTitle>
                </CardHeader>
                </Card>
            ))}

            </TabsContent>
            
            <TabsContent value="settings" className="-mt-6">
                <div className="px-2 py-4 text-center text-xl font-bold">
                    {state.editor.selectedNode.data.title}
                </div>

            <Accordion type="multiple">
                {["Slack", "Notion", "Discord", "Google Drive"].includes(nodeType) && (
                <AccordionItem value="Options" className="border-y-[1px] px-2" >
                    <AccordionTrigger className="!no-underline text-white/80">
                        Account
                    </AccordionTrigger>
                    <AccordionContent>
                        {CONNECTIONS.map((connection) => (
                            <RenderConnectionAccordion key={connection.title} state={state} connection={connection} />
                        ))}
                    </AccordionContent>
                </AccordionItem>
                )}

                {nodeType !== "Trigger" && (
                    <AccordionItem value="Expected Output" className="px-2">
                    <AccordionTrigger className="!no-underline text-white/80">
                        Action
                    </AccordionTrigger>
                    <RenderOutputAccordion state={state} nodeConnection={nodeConnection}/>
                </AccordionItem>
                )}
            </Accordion>
            </TabsContent>
        </Tabs>
    </aside>
    )
}

export default EditorCanvasSidebar