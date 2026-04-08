import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { prompt } = await req.json()

  // TEMP FAKE AI (replace later with OpenAI)
  const result = `AI says: ${prompt}`

  return NextResponse.json({ result })
}