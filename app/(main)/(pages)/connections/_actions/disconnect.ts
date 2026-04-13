"use server"

import { db } from "@/lib/db"

export const disconnectService = async (type: string, userId: string) => {
  await db.connections.deleteMany({
    where: {
      userId,
      type,
    },
  })

  return { success: true }
}