"use client";

import { CONNECTIONS } from "@/lib/constant";
import ConnectionCard from "./connection-card";
import { onDiscordConnect } from "../_actions/discord-connection";
import { onNotionConnect } from "../_actions/notion-connection";
import { onSlackConnect } from "../_actions/slack-connection";
import { getUserData } from "../_actions/get-user";
import { useEffect, useState } from "react";

type Props = {
  searchParams: { [key: string]: string };
  userId: string;
};

const ClientConnections = ({ searchParams, userId }: Props) => {
  const [connections, setConnections] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const setupConnections = async () => {
  //     setLoading(true);

  //     const {
  //       webhook_id = "",
  //       webhook_name = "",
  //       webhook_url = "",
  //       guild_id = "",
  //       guild_name = "",
  //       channel_id = "",
  //       access_token = "",
  //       workspace_name = "",
  //       workspace_icon = "",
  //       workspace_id = "",
  //       database_id = "",
  //       app_id = "",
  //       authed_user_id = "",
  //       authed_user_token = "",
  //       slack_access_token = "",
  //       bot_user_id = "",
  //       team_id = "",
  //       team_name = "",
  //     } = searchParams;

  //     await onDiscordConnect(
  //       channel_id,
  //       webhook_id,
  //       webhook_name,
  //       webhook_url,
  //       userId,
  //       guild_name,
  //       guild_id
  //     );

  //     await onNotionConnect(
  //       access_token,
  //       workspace_id,
  //       workspace_icon,
  //       workspace_name,
  //       database_id,
  //       userId
  //     );

  //     await onSlackConnect(
  //       app_id,
  //       authed_user_id,
  //       authed_user_token,
  //       slack_access_token,
  //       bot_user_id,
  //       team_id,
  //       team_name,
  //       userId
  //     );

  //     const user_info = await getUserData(userId);

  //     const connectionMap: any = {};
  //     user_info?.connections.forEach((c) => {
  //       connectionMap[c.type] = true;
  //     });

  //     setConnections(connectionMap);
  //     setLoading(false);
  //   };

  //   setupConnections();
  // }, [searchParams, userId]);

  useEffect(() => {
  const setupConnections = async () => {
    setLoading(true);

    const {
      access_token,
      workspace_id,
      workspace_name,
      workspace_icon,
      database_id,
    } = searchParams;

    // ADD THIS GUARD
    if (access_token && workspace_id) {
      console.log(" Saving Notion connection");

      await onNotionConnect(
        access_token,
        workspace_id,
        workspace_icon,
        workspace_name,
        database_id,
        userId
      );
    }

    const user_info = await getUserData(userId);
    console.log("USER INFO:", user_info);

    const connectionMap: any = {};
    user_info?.connections.forEach((c) => {
      connectionMap[c.type] = true;
    });

    setConnections(connectionMap);
    setLoading(false);
  };

  setupConnections();
}, [searchParams, userId]);


  return (
    <div className="p-6 space-y-6">

      <div className="flex items-center justify-between bg-gradient-to-r from-black/30 to-black/30  border border-zinc-700 rounded-xl p-5 shadow-lg">
        <div>
          <h1 className="text-3xl font-semibold text-white">Connections</h1>
          <p className="text-sm text-zinc-400">
            Connect all your apps to power workflows
          </p>
        </div>
      </div>

      { loading && (
      <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1,2,3,4].map(i => (
          <div key={i} className="h-24 bg-zinc-800 animate-pulse rounded-xl" />
        ))}
      </div>
    </div>
      )
    }
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {connections &&
          CONNECTIONS.map((connection) => (
            <ConnectionCard
              key={connection.title}
              type={connection.title}
              icon={connection.image}
              title={connection.title}
              description={connection.description}
              connected={connections}
              userId={userId}
            />
          ))}
      </div>

    </div>
  );
};

export default ClientConnections;