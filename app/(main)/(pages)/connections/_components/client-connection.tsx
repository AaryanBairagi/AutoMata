// app/(main)/(pages)/connections/_components/client-connections.tsx
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

    useEffect(() => {
        const setupConnections = async () => {
        const {
            webhook_id = "",
            webhook_name = "",
            webhook_url = "",
            guild_id = "",
            guild_name = "",
            channel_id = "",
            access_token = "",
            workspace_name = "",
            workspace_icon = "",
            workspace_id = "",
            database_id = "",
            app_id = "",
            authed_user_id = "",
            authed_user_token = "",
            slack_access_token = "",
            bot_user_id = "",
            team_id = "",
            team_name = "",
        } = searchParams;

        console.log( 
            {"webhook_id" : webhook_id,
            "webhook_name" : webhook_name,
            "webhook_url" : webhook_url,
            "guild_id" : guild_id,
            "guild_name" : guild_name ,
            "channel_id" : channel_id ,
            "access_token" : access_token,
            "workspace_name" : workspace_name,
            "workspace_icon" : workspace_icon,
            "workspace_id" : workspace_id,
            "database_id " : database_id,
            "app_id" : app_id ,
            "authed_user_id" : authed_user_id,
            "authed_user_token" : authed_user_token,
            "slack_access_token" : slack_access_token,
            "bot_user_id" : bot_user_id,
            "team_id" : team_id,
            "team_name" : team_name
        });

        await onDiscordConnect(channel_id, webhook_id, webhook_name, webhook_url, userId, guild_name, guild_id);
        await onNotionConnect(access_token, workspace_id, workspace_icon, workspace_name, database_id, userId);
        await onSlackConnect(app_id, authed_user_id, authed_user_token, slack_access_token, bot_user_id, team_id, team_name, userId);

        const user_info = await getUserData(userId);
        const connections: any = {};
        user_info?.connections.forEach((connection) => {
            connections[connection.type] = true;
        });

        setConnections({ ...connections, "Google Drive": true });
        };

        setupConnections();
    }, [searchParams, userId]);

    return (
        <div className="flex flex-col gap-4 relative">
            <h1 className="text-4xl p-6  flex items-center border-2 border-white/60 rounded-lg bg-background/50 backdrop-blur-lg">
            CONNECTIONS
            </h1>
            <div className="pl-64 pr-6 pt-4 w-full max-w-5xl">
            <section className="flex flex-col gap-4 text-muted-foreground">
            <p className="text-base font-semibold text-foreground whitespace-nowrap">
            Connect all your apps directly from here. You may need to reconnect them occasionally to refresh verification.
            </p>
            { connections && 
            CONNECTIONS.map((connection) => (
                <ConnectionCard
                    type={connection.title}
                    icon={connection.image}
                    title={connection.title}
                    description={connection.description}
                    key={connection.title}
                    connected={connections} />
            ))}
            </section>
            </div>
    </div>
    );
};

export default ClientConnections;
