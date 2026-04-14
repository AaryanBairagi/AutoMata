"use client"

import { Button } from "@/components/ui/button"
import { disconnectService } from "../_actions/disconnect"
import { ConnectionTypes } from "@/lib/types"
import Image from "next/image"
import Link from "next/link"

type Props = {
  type: ConnectionTypes
  icon: string
  title: string
  description: string
  connected: { [key: string]: boolean }
  userId: string
}

const ConnectionCard = ({
  type,
  icon,
  title,
  description,
  connected,
  userId,
}: Props) => {
  const isConnected = connected[type]

  const noConnectionRequired = ["AI", "Email"]

  // DISCONNECT
  const handleDisconnect = async () => {
    await disconnectService(type, userId)
    window.location.reload()
  }

  // CONNECT LINKS (FIXED)
  const getConnectionLink = (title: string) => {
    switch (title) {
      case "Discord":
        return process.env.NEXT_PUBLIC_DISCORD_REDIRECT!
      case "Notion":
        return process.env.NEXT_PUBLIC_NOTION_AUTH_URL!
      case "Slack":
        return process.env.NEXT_PUBLIC_SLACK_REDIRECT!

      case "Google Drive":
        return "/api/drive"
      case "Google Calendar":
        return "/api/drive"

      default:
        return "#"
    }
  }

  return (
    <div className="flex items-center justify-between p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg hover:bg-white/10 transition shadow-lg">

      {/* LEFT */}
      <div className="flex items-center gap-4">
        <Image src={icon} alt={title} height={40} width={40} />
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
      </div>

      {/* RIGHT */}
      <div>
        {noConnectionRequired.includes(title) ? (
          <div className="text-xs bg-zinc-500 text-zinc-200 border border-zinc-700 px-3 py-1 rounded-lg cursor-not-allowed">
            Ready to use
          </div>
        ) : isConnected ? (
          <Button
            onClick={handleDisconnect}
            className="bg-red-500 hover:bg-red-600 text-white rounded-xl"
          >
            Disconnect
          </Button>
        ) : (
          <Link href={getConnectionLink(title)}>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl">
              Connect
            </Button>
          </Link>
        )}
      </div>

    </div>
  )
}

export default ConnectionCard