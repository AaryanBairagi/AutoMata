export async function GET() {
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1/models?key=${process.env.GEMINI_API_KEY}`
    )

    const data = await res.json()

    console.log("AVAILABLE MODELS:", data)

    return Response.json(data)

  } catch (err) {
    console.error(err)
    return Response.json({ error: "failed" })
  }
}

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json()

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    )

    const data = await res.json()
    console.log("AI RESPONSE:", data)

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response"

    return Response.json({ result: text })

  } catch (err) {
    console.error("AI ERROR:", err)
    return Response.json({ error: "AI failed" })
  }
}