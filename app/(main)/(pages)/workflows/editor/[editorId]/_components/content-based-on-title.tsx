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
  const content = selectedNode.data.metadata?.content || ""


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

  // @ts-ignore
  const nodeConnectionType: any = nodeConnection[nodeMapper[title]]
  const noConnectionRequired = ["Trigger", "Condition", "AI"]

  if (noConnectionRequired.includes(title)) {
  return (
    <AccordionContent>
      <Card>
        <div className="p-4 text-sm text-zinc-400">
          No connection required for {title}
        </div>
      </Card>
    </AccordionContent>
  )
  }

  const isConnected =
    title === 'Google Drive'
      ? !nodeConnection.isLoading
      : !!nodeConnectionType[
          title === 'Slack'
            ? 'slackAccessToken'
            : title === 'Discord'
            ? 'webhookURL'
            : title === 'Notion'
            ? 'accessToken'
            : ''
        ]
  
  if (!isConnected && !noConnectionRequired.includes(title)) {
  return (
    <div className="p-4 text-sm text-red-400">
      Please connect {title} to continue
    </div>
  )
  }

  //  IMPORTANT FIX — STORE IN NODE METADATA
  const handleChange = (value: string) => {
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
                content: value,
              },
            },
          }
        : node
    ),
  },
  })
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
        
    {/* CONDITION NODE UI */}
    {title === "Condition" && (
    <div className="flex flex-col gap-3 p-3 border rounded-lg bg-muted/30">

      <p className="text-sm font-medium">Condition</p>

      <Input
        placeholder="Value (e.g. error)"
        value={selectedNode.data.metadata?.value || ""}
        onChange={(e) => handleChangeMeta("value", e.target.value)}
      />

      <select
        className="p-2 rounded-md bg-background border"
        value={selectedNode.data.metadata?.condition || "includes"}
        onChange={(e) => handleChangeMeta("condition", e.target.value)}
      >
        <option value="includes">Includes</option>
        <option value="equals">Equals</option>
        <option value="startsWith">Starts With</option>
      </select>

      </div>
      )}

          <p>
            {title === 'Notion' ? 'Values to be stored' : 'Message'}
          </p>

          <Input
            type="text"
            value={selectedNode.data.metadata?.content || ""}
            onChange={(e) => handleChange(e.target.value)}    
          />

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

          {/* ACTION BUTTONS */}
          <ActionButton
            currentService={title}
            nodeConnection={{
              ...(nodeConnection as any)[nodeMapper[title]],
              content,
            }}
            channels={selectedSlackChannels}
          />

        </div>
      </Card>
    </AccordionContent>
  )
}

export default ContentBasedOnTitle