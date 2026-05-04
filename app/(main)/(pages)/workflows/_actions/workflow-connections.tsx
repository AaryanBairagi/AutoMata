'use server'
import { Option } from '@/components/ui/multiple-selector'
import { db } from '@/lib/db'
import { currentUser } from '@clerk/nextjs/server'
import { auth } from '@clerk/nextjs/server'

export const getGoogleListener = async () => {
    const { userId } = await auth()

    if (userId) {
        const listener = await db.user.findUnique({
            where: {
                clerkId: userId,
            },
            select: {
                googleResourceId: true,
            },
        })

        if (listener) return listener
    }
}

export const onFlowPublish = async (workflowId: string, state: boolean) => {
    const published = await db.workflows.update({
        where: {
            id: workflowId,
        },
        data: {
            publish: state,
        },
    })

    return { success: true, published: published.publish }
}

export async function onFlowDelete(id: string) {
    try {
        await db.workflows.delete({
            where: { id },
        })
        return { success: true }
    } catch (error) {
        console.error("Delete failed", error)
        return { success: false }
    }
}

export const onCreateNodeTemplate = async (
    content: string,
    type: string,
    workflowId: string,
    channels?: Option[],
    accessToken?: string,
    notionDbId?: string
) => {

    if (type === 'Discord') {
        const response = await db.workflows.update({
            where: { id: workflowId },
            data: {
                discordTemplate: content,
            },
        })

        if (response) return { success: true }
    }

    if (type === 'Slack') {
        const response = await db.workflows.update({
            where: { id: workflowId },
            data: {
                slackTemplate: content,
                slackAccessToken: accessToken,
            },
        })

        if (response) {
            const channelList = await db.workflows.findUnique({
                where: { id: workflowId },
                select: { slackChannels: true },
            })

            if (channelList) {
                const NonDuplicated = channelList.slackChannels.filter(
                    (channel) => channel !== channels![0].value
                )

                NonDuplicated.forEach(async (channel) => {
                    await db.workflows.update({
                        where: { id: workflowId },
                        data: {
                            slackChannels: {
                                push: channel,
                            },
                        },
                    })
                })

                return { success: true }
            }

            channels!.forEach(async (channel) => {
                await db.workflows.update({
                    where: { id: workflowId },
                    data: {
                        slackChannels: {
                            push: channel.value,
                        },
                    },
                })
            })

            return { success: true }
        }
    }

    if (type === 'Notion') {
        const response = await db.workflows.update({
            where: { id: workflowId },
            data: {
                notionTemplate: content,
                notionAccessToken: accessToken,
                notionDbId: notionDbId,
            },
        })

        if (response) return { success: true }
    }
}

export const onGetWorkflows = async () => {
    const user = await currentUser()
    if (user) {
        const workflow = await db.workflows.findMany({
            where: {
                userId: user.id,
            },
        })

        if (workflow) return workflow
    }
}

export const onCreateWorkflow = async (name: string, description: string) => {
    const user = await currentUser()

    if (user) {
        const workflow = await db.workflows.create({
            data: {
                userId: user.id,
                name,
                description,
            },
        })

        if (workflow) return { success: true }
        return { success: false }
    }
}

export const onGetNodesEdges = async (flowId: string) => {
    const nodesEdges = await db.workflows.findUnique({
        where: {
            id: flowId,
        },
        select: {
            nodes: true,
            edges: true,
        },
    })
    if (nodesEdges?.nodes && nodesEdges?.edges) return nodesEdges
}