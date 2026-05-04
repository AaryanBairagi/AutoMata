import { NextResponse } from "next/server"
import { Client } from "@notionhq/client"

export async function POST(req: Request) {
  console.log("🚀 NOTION ROUTE HIT");
  const body = await req.json();

  console.log("📥 Incoming Notion Payload:", body);

  const { title , body : content , databaseId, accessToken } = body

  if (!title || !databaseId || !accessToken) {
    return NextResponse.json({
      success: false,
      message: "Missing required fields",
    })
  }
  console.log("DATABASE ID:", databaseId)
  console.log("TITLE:", title)

  try {
  const notion = new Client({ auth: accessToken })

  const splitTextIntoChunks = (text: string, chunkSize = 2000) => {
    const chunks = []
    for (let i = 0; i < text.length; i += chunkSize) {
      chunks.push(text.slice(i, i + chunkSize))
    }
    return chunks
  }

  const textChunks = splitTextIntoChunks(content || "")

  const children = textChunks.map((chunk) => ({
    object: "block",
    type: "paragraph",
    paragraph: {
      rich_text: [
        {
          type: "text",
          text: {
            content: chunk,
          },
        },
      ],
    },
  })) as any

  const response = await notion.pages.create({
    parent: {
      database_id: databaseId,
    },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: title.slice(0, 50) || "AutoMata",
            },
          },
        ],
      },
    },
    children: children, 
  })

  return NextResponse.json({
    success: true,
    data: response,
  })
}
  catch (err) {
    console.error(err)
    return NextResponse.json({
      success: false,
      message: "Notion failed",
    })
  }
}








// import { NextResponse } from "next/server"

// export async function POST(req: Request) {
//   const body = await req.json()

//   console.log("Notion execution:", body)

//   return NextResponse.json({
//     success: true,
//     message: "Notion executed",
//   })
// }