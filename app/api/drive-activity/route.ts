import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server"; // still use this for session info
import { createClerkClient } from "@clerk/clerk-sdk-node"; // ✅ correct SDK for backend
import { google } from "googleapis";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid"; // ✅ correct uuid import

// Initialize Clerk instance
const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY! });

export async function GET() {
    const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.OAUTH2_REDIRECT_URI
    );

    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ message: "User not found" }, { status: 401 });
    }

  // ✅ Use Clerk Node SDK properly
    const clerkResponse = await clerk.users.getUserOauthAccessToken(
        userId,
        "oauth_google"
    );

    const accessToken = clerkResponse[0]?.token;
    if (!accessToken) {
        return NextResponse.json(
        { message: "Access token not found for Google" },
        { status: 403 }
    )   ;
    }

    oauth2Client.setCredentials({
        access_token: accessToken,
    });

    const drive = google.drive({
        version: "v3",
        auth: oauth2Client,
    });

    const channelId = uuidv4();

    const startPageTokenRes = await drive.changes.getStartPageToken({});
    const startPageToken = startPageTokenRes.data.startPageToken;
    if (!startPageToken) {
        return NextResponse.json(
        { message: "StartPageToken was null" },
        { status: 500 }
        );
    }

    const listener = await drive.changes.watch({
        pageToken: startPageToken,
        supportsAllDrives: true,
        supportsTeamDrives: true,
        requestBody: {
            id: channelId,
            type: "web_hook",
            address: `${process.env.NGROK_URI}/api/drive-activity/notification`,
            kind: "api#channel",
        },
    });

    if (listener.status === 200) {
        const channelStored = await db.user.updateMany({
        where: {
            clerkId: userId,
        },
        data: {
            googleResourceId: listener.data.resourceId,
        },
    });

    if (channelStored) {
        return new NextResponse("Listening to changes...");
        }
    }

    return new NextResponse("Oops! something went wrong, try again");
}







// import { db } from "@/lib/db";
// import { auth } from "@clerk/nextjs/server";
// import { google } from "googleapis";
// import { NextResponse } from "next/server";
// import { uuidv4 } from "zod";
// import { Clerk } from "@clerk/clerk-sdk-node"; 

// const clerk = new Clerk({ secretKey: process.env.CLERK_SECRET_KEY! });

// export async function GET(){
//     const  oauth2Client = new google.auth.OAuth2(
//         process.env.GOOGLE_CLIENT_ID,
//         process.env.GOOGLE_CLIENT_SECRET,
//         process.env.OAUTH2_REDIRECT_URI
//     )

//     const { userId } = await auth(); 
//     if(!userId){
//         return NextResponse.json({message: 'User not found'});
//     }

//     const clerkResponse = await clerk.users.getUserOauthAccessToken(
//         userId,
//         'oauth_google'
//     )

//     const accessToken = clerkResponse[0].token
//     oauth2Client.setCredentials({
//         access_token: accessToken
//     })

//     const drive = google.drive({
//         version: 'v3',
//         auth: oauth2Client
//     })

//     const channelId = uuidv4()

//     const startPageTokenRes = await drive.changes.getStartPageToken({})
//     const startPageToken = startPageTokenRes.data.startPageToken
//     if(startPageToken==null){
//         throw new Error('startPageToken is unexpectedly null');
//     }

//     const listener = await drive.changes.watch({
//         pageToken: startPageToken,
//         supportsAllDrives:true,
//         supportsTeamDrives:true,
//         requestBody:{
//             id: channelId,
//             type: 'web_hook',
//             address:`${process.env.NGROK_URI}/api/drive-activity/notification`,
//             kind: 'api#channel'
//         }
//     })

//     if(listener.status == 200){
//         const channelStored = await db.user.updateMany({
//             where:{
//                 clerkId: userId
//             },
//             data:{
//                 googleResourceId: listener.data.resourceId
//             }
//         })

//         if (channelStored){
//             return new NextResponse('Listening to changes...')
//         }
//     }

//     return new NextResponse('Oops! something went wrong , try again')
// }