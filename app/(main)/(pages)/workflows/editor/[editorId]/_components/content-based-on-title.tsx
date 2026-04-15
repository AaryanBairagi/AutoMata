'use client'

import React, { useEffect } from 'react'
import axios from 'axios'
import { toast } from 'sonner'
import { AccordionContent } from '@/components/ui/accordion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ConnectionProviderProps } from '@/providers/connections-provider'
import { EditorState, useEditor } from '@/providers/editor-provider'
import { nodeMapper } from '@/lib/types'
import GoogleFileDetails from './google-file-details'
import GoogleDriveFiles from './google-drive-files'
import ActionButton from './action-button'
import { NODE_CONFIG } from '@/lib/node-config'
import { Textarea } from "@/components/ui/textarea"


export interface Option {
  value: string
  label: string
  disable?: boolean
  fixed?: boolean
  [key: string]: string | boolean | undefined
}

interface Props {
  nodeConnection: ConnectionProviderProps
  newState: EditorState
  file: any
  setFile: (file: any) => void
  selectedSlackChannels: Option[]
  setSelectedSlackChannels: (value: Option[]) => void
}

const ContentBasedOnTitle = ({
  nodeConnection,
  newState,
  file,
  setFile,
  selectedSlackChannels,
  setSelectedSlackChannels,
}: Props) => {

  const { state, dispatch } = useEditor()
  const selectedNode = state.editor.selectedNode

  const title = selectedNode.data.title
  const config = NODE_CONFIG[title]

  // FETCH GOOGLE FILE
  useEffect(() => {
    const reqGoogle = async () => {
      try {
        const response = await axios.get('/api/drive')
        const files = response?.data?.message?.files

        if (Array.isArray(files) && files.length > 0) {
          setFile(files[0])
          toast.message('Fetched File')
        } else {
          toast.error('No files found')
        }
      } catch (error) {
        console.error(error)
        toast.error('Something went wrong')
      }
    }

    reqGoogle()
  }, [])

  const nodeConnectionType: any = nodeConnection?.[nodeMapper[title]] || {}

  let connectionKey: string | null = null

  if (title === 'Slack') connectionKey = 'slackAccessToken'
  else if (title === 'Discord') connectionKey = 'webhookURL'
  else if (title === 'Notion') connectionKey = 'accessToken'

  const isConnected =
    connectionKey
      ? !!nodeConnectionType?.[connectionKey]
      : true

  if (!isConnected) {
    return (
      <div className="p-4 text-sm text-red-400">
        Please connect {title} to continue
      </div>
    )
  }

  const handleChangeMeta = (key: string, value: any) => {
    dispatch({
      type: "UPDATE_NODE",
      payload: {
        elements: state.editor.elements.map((node) =>
          node.id === selectedNode.id
            ? {
                ...node,
                data: {
                  ...node.data,
                  metadata: {
                    ...node.data.metadata,
                    [key]: value,
                  },
                },
              }
            : node
        ),
      },
    })
  }

  if (!config) {
    return (
      <div className="p-4 text-sm text-yellow-400">
        No configuration available for {title}
      </div>
    )
  }

  return (
    <AccordionContent>
      <Card>

        {title === 'Discord' && (
          <CardHeader>
            <CardTitle>{nodeConnectionType.webhookName}</CardTitle>
            <CardDescription>{nodeConnectionType.guildName}</CardDescription>
          </CardHeader>
        )}

        <div className="flex flex-col gap-3 px-6 py-3 pb-20">

          {/* DYNAMIC FIELDS */}
          {config.fields.map((field) => (
            <div key={field.key} className="flex flex-col gap-2">
              <label className="text-sm text-zinc-300">{field.label}</label>

              {/* TEXT INPUT */}
              {field.type === "text" && (
                <Input
                  placeholder={`Enter ${field.label}`}
                  value={selectedNode.data.metadata?.[field.key] || ""}
                  onChange={(e) => handleChangeMeta(field.key, e.target.value)}
                />
              )}

              {/* SELECT INPUT */}
              {field.type === "select" && (
                <select
                  className="p-2 rounded-md bg-background border"
                  value={selectedNode.data.metadata?.[field.key] || field.options?.[0]}
                  onChange={(e) => handleChangeMeta(field.key, e.target.value)}
                >
                  {field.options?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              )}

          {field.type === "textarea" && (
          <Textarea
            className="p-3 rounded-md bg-background border min-h-[120px] text-sm"
            placeholder={`Enter ${field.label}`}
            value={selectedNode.data.metadata?.[field.key] || ""}
            onChange={(e) => handleChangeMeta(field.key, e.target.value)}
          />
          )}
            </div>
          ))}



          {/* GOOGLE FILE PREVIEW */}
          {JSON.stringify(file) !== '{}' && title !== 'Google Drive' && (
            <Card className="w-full">
              <CardContent className="px-2 py-3">
                <div className="flex flex-col gap-4">
                  <CardDescription>Drive File</CardDescription>

                  <div className="flex flex-wrap gap-2">
                    <GoogleFileDetails
                      nodeConnection={nodeConnection}
                      title={title}
                      gFile={file}
                    />
                  </div>

                </div>
              </CardContent>
            </Card>
          )}

          {/* GOOGLE DRIVE LISTENER */}
          {title === 'Google Drive' && <GoogleDriveFiles />}

          {/* AI */}
          {title === "AI" && selectedNode.data.metadata?.output && (
          <div className="mt-4 p-3 rounded-lg bg-muted border">
            <p className="text-xs text-zinc-400 mb-2">AI Output</p>

            <div className="text-sm whitespace-pre-wrap max-h-[200px] overflow-y-auto bg-black/30 p-2 rounded">
              {selectedNode.data.metadata.output}
            </div>

            <button
              className="mt-2 text-xs text-purple-400 hover:underline"
              onClick={() => {
              navigator.clipboard.writeText(selectedNode.data.metadata.output)
              toast.success("Copied to clipboard")
            }}
            >
              Copy
            </button>
          </div>
          )}

          
          {/* ACTION BUTTON */}
          <ActionButton
            currentService={title}
            nodeConnection={{
              ...(nodeConnection as any)[nodeMapper[title]],
              ...selectedNode.data.metadata,
            }}
            setMetadata={ (key:string,value:any) => handleChangeMeta(key,value)}
            channels={selectedSlackChannels}
          />

        </div>
      </Card>
    </AccordionContent>
  )
}

export default ContentBasedOnTitle