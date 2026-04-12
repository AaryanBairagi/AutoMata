'use client'

import React, { useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { postMessageToSlack } from '@/app/(main)/(pages)/connections/_actions/slack-connection'
import { onCreateNewPageInDatabase } from '@/app/(main)/(pages)/connections/_actions/notion-connection'

type Props = {
  currentService: string
  nodeConnection: any
  channels?: any[]
}

const ActionButton = ({ currentService, nodeConnection, channels }: Props) => {

  //  SLACK
  const handleSlack = useCallback(async () => {
    const content = nodeConnection?.content
    if (!content) return toast.error("Message empty")

    const res = await postMessageToSlack(
      nodeConnection.slackAccessToken,
      channels || [],
      content
    )

    res.message === "Success"
      ? toast.success("Slack sent")
      : toast.error(res.message)
  }, [nodeConnection, channels])

  //  NOTION
  const handleNotion = useCallback(async () => {
    const content = nodeConnection?.content
    if (!content) return toast.error("Content empty")

    await onCreateNewPageInDatabase(
      nodeConnection.databaseId,
      nodeConnection.accessToken,
      content
    )

    toast.success("Notion page created")
  }, [nodeConnection])

  //  AI (TEMP MOCK)
  const handleAI = useCallback(async () => {
    const content = nodeConnection?.content
    if (!content) return toast.error("Enter prompt")

    // TEMP (later connect OpenAI)
    const result = content.toUpperCase()

    toast.success("AI Output: " + result)
  }, [nodeConnection])

  //  GOOGLE CALENDAR (MOCK)
  const handleCalendar = useCallback(async () => {
    const content = nodeConnection?.content
    if (!content) return toast.error("Event title required")

    // TEMP MOCK
    toast.success("Event created: " + content)
  }, [nodeConnection])

  //  GOOGLE DRIVE (TRIGGER ONLY)
  const handleDrive = useCallback(() => {
    toast.message("Drive trigger active ⚡")
  }, [])

  //  WEBHOOK
  const handleWebhook = useCallback(async () => {
    const content = nodeConnection?.content
    if (!content) return toast.error("No payload")

    console.log("Webhook payload:", content)
    toast.success("Webhook triggered 🚀")
  }, [nodeConnection])

  switch (currentService) {
    case "Slack":
      return (<Button onClick={handleSlack} className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-xl shadow-lg hover:scale-[1.02] transition">
              Send Message
            </Button>
      )

    case "Notion":
      return <Button onClick={handleNotion} className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-xl shadow-lg hover:scale-[1.02] transition">Create Page</Button>

    case "AI":
      return <Button onClick={handleAI} className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-xl shadow-lg hover:scale-[1.02] transition">Run AI</Button>

    case "Google Calendar":
      return <Button onClick={handleCalendar} className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-xl shadow-lg hover:scale-[1.02] transition">Create Event</Button>

    case "Google Drive":
      return <Button onClick={handleDrive} className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-xl shadow-lg hover:scale-[1.02] transition">Start Listener</Button>

    case "Custom Webhook":
      return <Button onClick={handleWebhook} className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-xl shadow-lg hover:scale-[1.02] transition">Send Webhook</Button>

    default:
      return null
  }
}

export default ActionButton