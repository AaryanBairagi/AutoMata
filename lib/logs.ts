// lib/logs.ts
'use server'

import { db } from "@/lib/db"
import { currentUser } from "@clerk/nextjs/server"

export const createLog = async (action: string, message: string) => {
    const user = await currentUser()
    if (!user) return null

    await db.log.create({
        data: {
        userId: user.id,
        action,
        message,
        },
    })
}

export const getLogs = async () => {
    const user = await currentUser()
    if (!user) return []

    const logs = await db.log.findMany({
        where: { userId: user.id },
        orderBy: { timestamp: "desc" },
    })

    return logs
}
