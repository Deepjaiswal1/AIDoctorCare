import { db } from "@/config/db"
import { openai } from "@/config/OpenAiModel"
import { SessionChartTable } from "@/config/schema"
import { AIDoctorAgents } from "@/shared/list"
import { NextRequest, NextResponse } from "next/server"
import { eq } from "drizzle-orm"

const REPORT_GEN_PROMPT = `You are an AI Medical Voice Agent that just finished a voice conversation with a user. Based on the  doctor AI Agent info and Conversation between AI medical agent and user, transcript, generate a structured report with the following fields:
1. sessionId: a unique session identifier
2. agent: the medical specialist name (e.g., "General Physician AI")
3. user: name of the patient or "Anonymous" if not provided
4. timestamp: current date and time in ISO format
5. chiefComplaint: one-sentence summary of the main health concern
6. summary: a 2-3 sentence summary of the conversation, symptoms, and recommendations
7. symptoms: list of symptoms mentioned by the user
8. duration: how long the user has experienced the symptoms
9. severity: mild, moderate, or severe
10. medicationsMentioned: list of any medicines mentioned
11. recommendations: list of AI suggestions (e.g., rest, see a doctor)

Return the result in this JSON format:
{
  "sessionId": "string",
  "agent": "string",
  "user": "string",
  "timestamp": "ISO Date string",
  "chiefComplaint": "string",
  "summary": "string",
  "symptoms": ["symptom1", "symptom2"],
  "duration": "string",
  "severity": "string",
  "medicationsMentioned": ["med1", "med2"],
  "recommendations": ["rec1", "rec2"]
}

Only include valid fields. Respond with nothing else.`

export async function POST(req: NextRequest) {
  try {
    // FIX: Only call req.json() ONCE
    const body = await req.json()
    const { sessionId, sessionDetail, messages, notes } = body

    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { error: "No conversation history found" },
        { status: 400 },
      )
    }

    // const UserInput =
    //   "AI Doctor Agent Info:" + JSON.stringify(sessionDetail) +
    //   ", Conversation:" + JSON.stringify(messages);

    // Inside app/api/medical-report/route.ts
    const UserInput = `
  Doctor Specialist: ${sessionDetail?.selectedDoctor?.specialist}
  Conversation Transcript: ${messages.map((m: any) => `${m.role}: ${m.text}`).join("\n")}
`

    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-001",
      messages: [
        { role: "system", content: REPORT_GEN_PROMPT },
        { role: "user", content: UserInput },
      ],
      response_format: { type: "json_object" },
    })

    const rawContent = completion.choices[0].message?.content || "{}"
    const cleanJson = rawContent.replace(/```json|```/g, "").trim()
    const JSONReq = JSON.parse(cleanJson)

    // Update the database
    const result = await db
      .update(SessionChartTable)
      .set({ report: JSONReq, conversation: messages })
      .where(eq(SessionChartTable.sessionId, sessionId))

    return NextResponse.json(JSONReq)
  } catch (error: any) {
    console.error("REPORT_GEN_ERROR:", error) // Check your terminal for this!
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
