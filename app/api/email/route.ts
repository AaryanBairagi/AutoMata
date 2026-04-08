import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const { message } = await req.json()

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "aaryanbairagi11@gmail.com", // change later
      subject: "AutoMata Workflow Email",
      text: message,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}