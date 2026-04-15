import nodemailer from "nodemailer"

export async function POST(req: Request) {
  try {
    const { to, subject, text } = await req.json()

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    console.log("Sending email to:", to)
    
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    })

    return Response.json({ success: true })
  } catch (err) {
    return Response.json({ success: false, error: err })
  }
}