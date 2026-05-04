'use server'

import { db } from '@/lib/db'
import { currentUser } from '@clerk/nextjs/server'
import { Client } from '@notionhq/client'



export const onNotionConnect = async (
    access_token: string,
    workspace_id: string,
    workspace_icon: string,
    workspace_name: string,
    database_id: string,
    id: string
) => {

    'use server'
    if (access_token) {
    //check if notion is connected
    // const notion_connected = await db.notion.findFirst({
    //     where: {
    //       // accessToken : access_token,
    //         userId: id,
    //     },
    //     include: {
    //         connections: {
    //         select: {
    //             type: true,
    //         },
    //     },
    //     },
    // })

    // if (!notion_connected) {
    //   //create connection
    //     await db.notion.create({
    //         data: {
    //         userId: id,
    //         workspaceIcon: workspace_icon!,
    //         accessToken: access_token,
    //         workspaceId: workspace_id!,
    //         workspaceName: workspace_name!,
    //         databaseId: database_id,
    //         connections: {
    //             create: {
    //             userId: id,
    //             type: 'Notion',
    //             },
    //         },
    //         },
    //     })
    // }

    // console.log("SAVING NOTION:", {
    //   access_token,
    //   workspace_id,
    //   database_id,
    //   })
  
    const notion_connected = await db.notion.findFirst({
  where: {
    userId: id,
    workspaceId: workspace_id, 
  },
  include: {
    connections: true,
  },
});

if (!notion_connected) {
  // CREATE NEW
  await db.notion.create({
    data: {
      userId: id,
      workspaceIcon: workspace_icon!,
      accessToken: access_token,
      workspaceId: workspace_id!,
      workspaceName: workspace_name!,
      databaseId: database_id,
      connections: {
        create: {
          userId: id,
          type: "Notion",
        },
      },
    },
  });
} else {
  // FIX: ensure connection exists
  const hasConnection = notion_connected.connections.some(
    (c) => c.type === "Notion"
  );

  if (!hasConnection) {
    await db.connections.create({
      data: {
        userId: id,
        type: "Notion",
        },
      });
      }
    }
    }
}


export const getNotionConnection = async () => {
    const user = await currentUser()
    if (user) {
    const connection = await db.notion.findFirst({
        where: {
            userId: user.id,
        },
    })
    if (connection) {
        return connection
    }
    }
}



export const getNotionDatabase = async (
    databaseId: string,
    accessToken: string
) => {
    const notion = new Client({
        auth: accessToken,
    })
    const response = await notion.databases.retrieve({ database_id: databaseId })
    return response
}


export const onCreateNewPageInDatabase = async (
  databaseId: string,
  accessToken: string,
  title: string,
  body: string
) => {
  const notion = new Client({
    auth: accessToken,
  });

  const trimmedDbId = databaseId.trim();

  try {
    // Debug (optional)
    const dbData = await notion.databases.retrieve({
      database_id: trimmedDbId,
    });
    console.log("📄 Notion Database Schema:", JSON.stringify(dbData, null, 2));

    const response = await notion.pages.create({
      parent: {
        type: "database_id",
        database_id: trimmedDbId,
      },

      // ✅ TITLE (database property)
      properties: {
        Name: {
          title: [
            {
              text: {
                content:
                  typeof title === "string" && title.trim() !== ""
                    ? title
                    : "Untitled",
              },
            },
          ],
        },
      },

      // ✅ THIS IS THE IMPORTANT PART (PAGE BODY)
      children: [
        {
          object: "block",
          type: "paragraph",
          paragraph: {
            rich_text: [
              {
                type: "text",
                text: {
                  content:
                    typeof body === "string" && body.trim() !== ""
                      ? body
                      : "",
                },
              },
            ],
          },
        },
      ],
    });

    console.log("Page created successfully:", response);
    return response;
  } catch (error) {
    console.error("Error creating page in Notion DB:", error);
    throw error;
  }
};