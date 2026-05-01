import { currentUser } from "@clerk/nextjs/server";
import SettingsClient from "./settings-client";
import { db } from "@/lib/db";

export default async function SettingsPage() {
  const clerkUser = await currentUser();

  if (!clerkUser) return null;

    const user = await db.user.findUnique({
        where: {
            clerkId: clerkUser.id,
        },
    });

  return (
    <SettingsClient
      user={{
        name: user?.name || "",
        email: user?.email || "",
        image: user?.profileImage || null,
      }}
    />
  );
}