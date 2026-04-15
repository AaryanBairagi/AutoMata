'use client'

import React, { useCallback , useState } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { postMessageToSlack } from '@/app/(main)/(pages)/connections/_actions/slack-connection'
import { onCreateNewPageInDatabase } from '@/app/(main)/(pages)/connections/_actions/notion-connection'

type Props = {
  currentService: string
  nodeConnection: any
  channels?: any[]
  setMetadata?:(key:string,value:any) => void
}

  const ActionButton = ({ currentService, nodeConnection, channels  , setMetadata}: Props) => {
  
    const [loading, setLoading] = useState(false);

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

  //  AI 
  const handleAI = useCallback(async () => {
  const prompt = nodeConnection?.prompt

  if (!prompt) return toast.error("Enter prompt")

  setLoading(true)

  try {
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    })

    const data = await res.json()

    if (data?.result) {
      setMetadata?.("output", data.result)
      toast.success("Output Generated!")
    } else {
      toast.error("AI failed")
    }
  } catch (err) {
    console.error(err)
    toast.error("Something went wrong")
  } finally {
    setLoading(false) 
  }
  }, [nodeConnection, setMetadata])

  //  GOOGLE CALENDAR 
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
    toast.success("Webhook triggered")
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
      return <Button
        onClick={handleAI}
        disabled={loading}
        className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-xl shadow-lg hover:scale-[1.02] transition"
      >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
            Running...
          </span>
          ) : (
          "Run AI"
        )}      
      </Button>

    case "Google Calendar":
      return <Button onClick={handleCalendar} className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-xl shadow-lg hover:scale-[1.02] transition">Create Event</Button>

    case "Google Drive":
      return <Button onClick={handleDrive} className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-xl shadow-lg hover:scale-[1.02] transition">Start Listener</Button>

    case "Custom Webhook":
      return <Button onClick={handleWebhook} className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-xl shadow-lg hover:scale-[1.02] transition">Send Webhook</Button>
    
    case "Email":
    return (
    <Button
      onClick={async() => {
        const { to, subject, body } = nodeConnection;

        if (!to || !subject || !body) {
          return toast.error("Fill all email fields");
        }

        console.log("Send Email:", { to, subject, body });

        try {
          const res = await fetch("/api/email", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              to,
              subject,
              text: body,
            }),
          });

          const data = await res.json();

          if (data.success) {
            toast.success("Email sent!");
          } else {
            toast.error("Failed to send email");
          }
        }catch(error){
          console.log("Error occurred while sending Email : " , error);
          toast.error("Something went wrong!");
        }
      }}
      className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-xl"
    >
      Send Email
    </Button>
    );
    
    default:
      return null
  }
}

export default ActionButton