

import { openai } from "@/config/OpenAiModel"
import { AIDoctorAgents } from "@/shared/list"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { notes } = await req.json()

    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-001",
      messages: [
        { 
          role: "system", 
          content: `You are a medical assistant. Based on the provided list of doctors: ${JSON.stringify(AIDoctorAgents)}, suggest the most relevant ones. Return ONLY a JSON array of doctor objects. Do not include any explanation.` 
        },
        {
          role: "user",
          content: `Symptoms: ${notes}. Suggest relevant doctors from the list.`
        },
      ],
      response_format: { type: "json_object" } // Force JSON mode if supported
    })

    const rawContent = completion.choices[0].message?.content || "[]"
    
    // Clean potential markdown formatting
    const cleanJson = rawContent.replace(/```json|```/g, "").trim()
    
    let result = JSON.parse(cleanJson)

    // Ensure the result is an array so .map() doesn't fail on the frontend
    if (!Array.isArray(result)) {
      // If AI wrapped it in an object like { "doctors": [] }, extract the array
      result = result.doctors || result.suggestedDoctors || []
    }

    return NextResponse.json(result)

  } catch (error) {
    console.error("API Error:", error)
    // Return an empty array on error so frontend .map() still works
    return NextResponse.json([], { status: 500 })
  }
}