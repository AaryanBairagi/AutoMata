'use server'

import { db } from '@/lib/db'
import { currentUser } from '@clerk/nextjs/server'

export async function getCurrentUserData() {
    const authUser = await currentUser()
    if (!authUser) return null

    const user = await db.user.findUnique({
        where: { clerkId: authUser.id },
    })
    return user
}

export async function removeProfileImage() {
    const authUser = await currentUser()
    if (!authUser) return null

    return await db.user.update({
        where: { clerkId: authUser.id },
        data: { profileImage: '' },
    })
}

export async function updateUserImage(imageUrl: string) {
  const user = await currentUser();

  if (!user) throw new Error("Unauthorized");

  await db.user.update({
  where: {
    clerkId: user.id,
  },
  data: {
    profileImage: imageUrl,
  },
});

  return { success: true };
}


export async function updateUserName(name: string) {
    const authUser = await currentUser()
    if (!authUser) return null

    return await db.user.update({
        where: { clerkId: authUser.id },
        data: { name },
    })
}
