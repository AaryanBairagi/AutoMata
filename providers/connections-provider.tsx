'use client'
import { createContext, useContext, useState } from 'react'

export type ConnectionProviderProps = {
    discordNode: {
    webhookURL: string
    content: string
    webhookName: string
    guildName: string
    }
    setDiscordNode: React.Dispatch<React.SetStateAction<any>>
    googleNode: {}[]
    setGoogleNode: React.Dispatch<React.SetStateAction<any>>
    notionNode: {
    accessToken: string
    databaseId: string
    workspaceName: string
    content: ''
    }
    workflowTemplate: {
    discord?: string
    notion?: string
    slack?: string
    }
    setNotionNode: React.Dispatch<React.SetStateAction<any>>
    slackNode: {
    appId: string
    authedUserId: string
    authedUserToken: string
    slackAccessToken: string
    botUserId: string
    teamId: string
    teamName: string
    content: string
    }
    setSlackNode: React.Dispatch<React.SetStateAction<any>>
    emailNode: {
    to: string
    subject: string
    body: string
    }
    setEmailNode: React.Dispatch<React.SetStateAction<any>>

    aiNode: {
    prompt: string
    }
    setAiNode: React.Dispatch<React.SetStateAction<any>>

    calendarNode: {
    accessToken: string
    }
    setCalendarNode: React.Dispatch<React.SetStateAction<any>>
    setWorkFlowTemplate: React.Dispatch<
    React.SetStateAction<{
        discord?: string
        notion?: string
        slack?: string
    }>
>
    isLoading: boolean
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

type ConnectionWithChildProps = {
    children: React.ReactNode
}

const InitialValues: ConnectionProviderProps = {
    discordNode: {
    webhookURL: '',
    content: '',
    webhookName: '',
    guildName: '',
    },
    googleNode: [],
    notionNode: {
    accessToken: '',
    databaseId: '',
    workspaceName: '',
    content: '',
    },
    workflowTemplate: {
    discord: '',
    notion: '',
    slack: '',
    },
    slackNode: {
    appId: '',
    authedUserId: '',
    authedUserToken: '',
    slackAccessToken: '',
    botUserId: '',
    teamId: '',
    teamName: '',
    content: '',
    },
    emailNode: {
    to: '',
    subject: '',
    body: '',
    },
    aiNode: {
    prompt: '',
    },
    calendarNode: {
    accessToken: '',
    },
    isLoading: false,
    setGoogleNode: () => undefined,
    setDiscordNode: () => undefined,
    setNotionNode: () => undefined,
    setSlackNode: () => undefined,
    setEmailNode: () => undefined,
    setAiNode: () => undefined,
    setCalendarNode: () => undefined,
    setIsLoading: () => undefined,
    setWorkFlowTemplate: () => undefined,
    }

const ConnectionsContext = createContext(InitialValues)
const { Provider } = ConnectionsContext

export const ConnectionsProvider = ({ children }: ConnectionWithChildProps) => {
    const [discordNode, setDiscordNode] = useState(InitialValues.discordNode)
    const [googleNode, setGoogleNode] = useState(InitialValues.googleNode)
    const [notionNode, setNotionNode] = useState(InitialValues.notionNode)
    const [slackNode, setSlackNode] = useState(InitialValues.slackNode)
    const [emailNode, setEmailNode] = useState(InitialValues.emailNode)
    const [aiNode, setAiNode] = useState(InitialValues.aiNode)
    const [calendarNode, setCalendarNode] = useState(InitialValues.calendarNode)
    const [isLoading, setIsLoading] = useState(InitialValues.isLoading)
    const [workflowTemplate, setWorkFlowTemplate] = useState(
    InitialValues.workflowTemplate
    )

    const values = {
        discordNode,
        setDiscordNode,
        googleNode,
        setGoogleNode,
        notionNode,
        setNotionNode,
        slackNode,
        setSlackNode,
        emailNode,
        setEmailNode,
        aiNode,
        setAiNode,
        calendarNode,
        setCalendarNode,
        isLoading,
        setIsLoading,
        workflowTemplate,
        setWorkFlowTemplate,
    }

    return <Provider value={values}>{children}</Provider>
}

export const useNodeConnections = () => {
    const nodeConnection = useContext(ConnectionsContext)
    return { nodeConnection }
}