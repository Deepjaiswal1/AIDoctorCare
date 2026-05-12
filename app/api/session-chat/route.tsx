// import { db } from "@/config/db"
// import { SessionChartTable } from "@/config/schema"
// import { currentUser } from "@clerk/nextjs/server"
// import { NextRequest, NextResponse } from "next/server"
// import { v4 as uuidv4 } from "uuid"
// import { eq } from "drizzle-orm"

// export async function POST(req: NextRequest) {
//   const { notes, selectedDoctor } = await req.json()
//   const user = await currentUser()
//   try {
//     const sessionId = uuidv4()
//     const result = await db
//       .insert(SessionChartTable)
//       .values({
//         sessionId: sessionId,
//         createdBy: user?.primaryEmailAddress?.emailAddress,
//         notes: notes,
//         selectedDoctor: selectedDoctor,
//         createdOn: new Date().toString(),
//         //@ts-ignore
//       }).returning({ SessionChartTable })

//     return NextResponse.json(result[0]?.SessionChartTable)
//   } catch (error) {
//     return NextResponse.json(error)
//   }
// }

// export async function GET(req: NextRequest) {

//   const { searchParams } = new URL(req.url)
//   const sessionId = searchParams.get("sessionId")
//   const user = await currentUser()

//   if (!sessionId) {
//       return NextResponse.json({ error: "Missing Session ID" }, { status: 400 });
//     }

//   const result = await db
//     .select()
//     .from(SessionChartTable)
//     //@ts-ignore
//     .where(eq(SessionChartTable.sessionId, sessionId))

//   return NextResponse.json(result[0])
// }

import { db } from "@/config/db"
import { SessionChartTable } from "@/config/schema"
import { currentUser } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"
import { desc, eq } from "drizzle-orm" // Import required for .where()

export async function POST(req: NextRequest) {
  const { notes, selectedDoctor } = await req.json()
  const user = await currentUser()
  try {
    const sessionId = uuidv4()
    const result = await db
      .insert(SessionChartTable)
      .values({
        sessionId: sessionId,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        notes: notes,
        selectedDoctor: selectedDoctor,
        createdOn: new Date().toString(),
        // createdOn: new Date().toISOString(),
        //@ts-ignore
      }).returning({ SessionChartTable })

    return NextResponse.json(result[0]?.SessionChartTable)
  } catch (error: any) {
    console.error("POST_ERROR:", error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const sessionId = searchParams.get("sessionId")
    
    // 1. FIX: Add 'await' here
    const user = await currentUser() 
    const email = user?.primaryEmailAddress?.emailAddress

    if (!sessionId || sessionId === "undefined") {
      return NextResponse.json({ error: "Invalid Session ID" }, { status: 400 })
    }

    if (sessionId === "all") {
      // 2. FIX: Ensure we filter by the logged-in user's email
      if (!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

      const result = await db
        .select()
        .from(SessionChartTable)
        .where(eq(SessionChartTable.createdBy, email))
        .orderBy(desc(SessionChartTable.id))

      // 3. FIX: Return the WHOLE array (result), not just result[0]
      return NextResponse.json(result) 
      
    } else {
      const result = await db
        .select()
        .from(SessionChartTable)
        .where(eq(SessionChartTable.sessionId, sessionId))

      if (!result || result.length === 0) {
        return NextResponse.json({ error: "No session found" }, { status: 404 })
      }

      return NextResponse.json(result[0])
    }
  } catch (error: any) {
    console.error("SERVER_SIDE_CRASH:", error.message)
    return NextResponse.json(
      { error: "Database or Server Error", details: error.message },
      { status: 500 },
    )
  }
}