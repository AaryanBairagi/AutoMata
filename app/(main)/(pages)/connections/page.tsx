// app/(main)/(pages)/connections/page.tsx

import { currentUser } from "@clerk/nextjs/server";
import ClientConnections from "./_components/client-connection";

export default async function Page({
    searchParams,
}: {
    searchParams?: { [key: string]: string | string[] | undefined };
}) {
    const user = await currentUser();
    if (!user) return null;

    return (
    <ClientConnections
        searchParams={searchParams as { [key: string]: string }}
        userId={user.id}
    />
    );
}










// // app/(main)/(pages)/connections/page.tsx

// import { CONNECTIONS } from "@/lib/constant";
// import ConnectionCard from "./_components/connection-card";
// import { currentUser } from "@clerk/nextjs/server";
// import { onDiscordConnect } from "./_actions/discord-connection";
// import { onNotionConnect } from "./_actions/notion-connection";
// import { onSlackConnect } from "./_actions/slack-connection";
// import { getUserData } from "./_actions/get-user";

// //WIP: searchParams to be done

// export default async function Page({
//     searchParams,
// }: {
//     searchParams?: { [key: string]: string | string[] | undefined };
// }) {
//     const webhook_id =  typeof searchParams?.webhook_id === "string" ? searchParams.webhook_id : "";
//     const webhook_name = typeof searchParams?.webhook_name === "string" ? searchParams.webhook_name : "";
//     const webhook_url = typeof searchParams?.webhook_url === "string" ? searchParams.webhook_url : "";
//     const guild_id = typeof searchParams?.guild_id === "string" ? searchParams.guild_id : "";
//     const guild_name = typeof searchParams?.guild_name === "string" ? searchParams.guild_name : "";
//     const channel_id = typeof searchParams?.channel_id === "string" ? searchParams.channel_id : "";
//     const access_token = typeof searchParams?.access_token === "string" ? searchParams.access_token : "";
//     const workspace_name = typeof searchParams?.workspace_name === "string" ? searchParams.workspace_name : "";
//     const workspace_icon = typeof searchParams?.workspace_icon === "string" ? searchParams.workspace_icon : "";
//     const workspace_id = typeof searchParams?.workspace_id === "string" ? searchParams.workspace_id : "";
//     const database_id = typeof searchParams?.database_id === "string" ? searchParams.database_id : "";
//     const app_id = typeof searchParams?.app_id === "string" ? searchParams.app_id : "";
//     const authed_user_id = typeof searchParams?.authed_user_id === "string" ? searchParams.authed_user_id : "";
//     const authed_user_token = typeof searchParams?.authed_user_token === "string" ? searchParams.authed_user_token : "";
//     const slack_access_token = typeof searchParams?.slack_access_token === "string" ? searchParams.slack_access_token : "";
//     const bot_user_id = typeof searchParams?.bot_user_id === "string" ? searchParams.bot_user_id : "";
//     const team_id = typeof searchParams?.team_id === "string" ? searchParams.team_id : "";
//     const team_name = typeof searchParams?.team_name === "string" ? searchParams.team_name : "";

//     const user = await currentUser();
//     if (!user) return null;

//     const onUserConnections = async () => {
//         await onDiscordConnect(
//         channel_id!,
//         webhook_id!,
//         webhook_name!,
//         webhook_url!,
//         user.id,
//         guild_name!,
//         guild_id!
//         );

//         await onNotionConnect(
//         access_token!,
//         workspace_id!,
//         workspace_icon!,
//         workspace_name!,
//         database_id!,
//         user.id
//         );

//         await onSlackConnect(
//         app_id!,
//         authed_user_id!,
//         authed_user_token!,
//         slack_access_token!,
//         bot_user_id!,
//         team_id!,
//         team_name!,
//         user.id
//         );

//     const user_info = await getUserData(user.id);
//     const connections: any = {};

//     user_info?.connections.forEach((connection) => {
//         connections[connection.type] = true;
//     });

//     return { ...connections, "Google Drive": true };
//     };

//     const connections = await onUserConnections();

//     return (
//         <div className="flex flex-col gap-4 relative">
//         <h1 className="text-4xl p-6 flex items-center border-2 border-white/60 rounded-lg bg-background/50 backdrop-blur-lg">
//             Connections
//         </h1>
//         <div className="pl-64 pr-6 pt-4 w-full max-w-5xl">
//             <section className="flex flex-col gap-4 text-muted-foreground">
//             Connect all your apps directly from here. You may need to connect these apps regularly to refresh verification.
//             {CONNECTIONS.map((connection) => (
//                 <ConnectionCard
//                     type={connection.title}
//                     icon={connection.image}
//                     title={connection.title}
//                     description={connection.description}
//                     key={connection.title}
//                     connected={connections}
//                 />
//                 ))}
//             </section>
//         </div>
//         </div>
//     );
// }











