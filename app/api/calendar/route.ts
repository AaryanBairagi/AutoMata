import { google } from "googleapis";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const clerk = await import("@clerk/clerk-sdk-node");

  const tokenRes = await clerk.users.getUserOauthAccessToken(
    userId,
    "oauth_google"
  );

  const accessToken = tokenRes?.[0]?.token;

  if (!accessToken) {
  return new Response(
    JSON.stringify({
      redirect: "/sign-in?redirect_url=/connections",
    }),
    { status: 200 }
  );
  }

  console.log("Access Token : ",accessToken);

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({
    access_token: accessToken,
  });

  const calendar = google.calendar({
    version: "v3",
    auth: oauth2Client,
  });

  await calendar.calendarList.list();

  await db.connections.upsert({
    where: {
      userId_type: {
        userId,
        type: "Google Calendar",
      },
    },
    update: {},
    create: {
      userId,
      type: "Google Calendar",
    },
  });

  return new Response("Calendar connected");
}