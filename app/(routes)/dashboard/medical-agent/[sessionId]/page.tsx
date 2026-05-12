

"use client"

import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { doctorAgent } from "../../_components/DoctorAgentCard"
import { CircleIcon, Loader, PhoneCall, PhoneOff, User } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Vapi from "@vapi-ai/web"
import { toast } from "sonner"

export type SessionDetail = {
  id: number
  notes: string
  sessionId: string
  report: any
  selectedDoctor: doctorAgent
  createOn: string
}

type messages = {
  role: string
  text: string
}

const MedicalVoiceAgent = () => {
  const { sessionId } = useParams()
  const [sessionDetail, setSessionDetail] = useState<SessionDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [callStarted, setCallStarted] = useState(false)
  const [vapiInstance, setVapiInstance] = useState<any>(null)
  const [currentRole, setCurrentRole] = useState<string | null>(null)
  const [liveTranscript, setLiveTranscript] = useState<string>("")
  const [messages, setMessages] = useState<messages[]>([])

  const router = useRouter()

  useEffect(() => {
    if (sessionId) {
      GetSessionDetails()
    }
  }, [sessionId])

  const GetSessionDetails = async () => {
    try {
      setLoading(true)
      const result = await axios.get("/api/session-chat?sessionId=" + sessionId)
      if (result.data) {
        setSessionDetail(result.data)
      }
    } catch (error) {
      console.error("Frontend Error fetching session details:", error)
    } finally {
      setLoading(false)
    }
  }

  const StartCall = () => {
    // 1. Initialize Vapi locally
    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!)
    setVapiInstance(vapi) // Save to state so endCall can access it

    const VapiAgentConfig = {
      name: "AI Medical Doctor Voice Agent",
      firstMessage:
        "Hi there! I'm your AI Medical Assistant. I'm here to help you with any health issue, can you please tell me your name and age.",
      transcriber: {
        provider: "assembly-ai",
        language: "en",
      },
      voice: {
        provider: "vapi",
        voiceId: sessionDetail?.selectedDoctor?.voiceId,
      },
      model: {
        provider: "google",
        model: "gemini-2.0-flash", // Note: Corrected to 2.0
        messages: [
          {
            role: "system",
            content: sessionDetail?.selectedDoctor?.agentPrompt,
          },
        ],
      },
    }

    // 2. Start Call
    //@ts-ignore
    vapi.start(VapiAgentConfig)

    // 3. IMPORTANT: Use 'vapi' variable for listeners, NOT 'vapiInstance' state
    vapi.on("call-start", () => {
      console.log("Call started")
      setCallStarted(true)
    })

    vapi.on("call-end", () => {
      setCallStarted(false)
      console.log("Call ended")
    })

    vapi.on("speech-start", () => {
      console.log("Assistant started speaking")
      setCurrentRole("assistant")
    })

    vapi.on("speech-end", () => {
      console.log("Assistant stopped speaking")
      setCurrentRole("user")
    })

    vapi.on("message", (message: any) => {
      if (message.type === "transcript") {
        const { role, transcriptType, transcript } = message
        if (transcriptType === "partial") {
          setLiveTranscript(transcript)
          setCurrentRole(role)
        } else if (transcriptType === "final") {
          setMessages((prev: messages[]) => [
            ...prev,
            { role: role, text: transcript },
          ])
          setLiveTranscript("")
          setCurrentRole(null)
        }
      }
    })
  }

  const endCall = async () => {
    setLoading(true) // Start loading UI

    if (vapiInstance) {
      vapiInstance.stop()
      vapiInstance.removeAllListeners()
      // Don't setVapiInstance(null) yet; wait for the report to finish
    }

    setCallStarted(false)

    // Pass the current messages directly to ensure the API gets the latest data
    try {
      if (messages && messages.length > 0) {
        await GenerateReport(messages)
        toast.success("Your report has been generated successfully")
      } else {
        toast.info("Call ended with no conversation recorded.")
      }
      router.replace("/dashboard")
    } catch (error) {
      console.error("Report generation failed:", error)
      toast.error("Failed to save report, but the call has ended.")
      router.replace("/dashboard")
    } finally {
      setVapiInstance(null) // Clear instance after work is done
      setLoading(false)
    }
  }

  const GenerateReport = async (finalMessages: messages[]) => {
    // Only generate if there's actually a conversation
    if (!finalMessages || finalMessages.length === 0) {
      console.log("No messages to generate a report from.")
      return
    }

    const result = await axios.post("/api/medical-report", {
      messages: finalMessages, // Use the passed-in messages
      sessionDetail: sessionDetail,
      sessionId: sessionId,
    })

    console.log("Report Result:", result.data)
    return result.data
  }

  return (
    <div className="p-5 border rounded-3xl bg-secondary min-h-[500px] flex flex-col">
      <div className="flex justify-between items-center mb-10">
        <h2 className="p-1 px-3 border rounded-full flex gap-2 items-center text-sm font-medium shadow-sm bg-white dark:bg-neutral-800">
          <CircleIcon
            className={`w-3 h-3 ${callStarted ? "fill-green-500 text-green-500 animate-pulse" : "fill-red-500 text-red-500 animate-pulse"} `}
          />
          {callStarted ? "Connected..." : "Not Connected"}
        </h2>
        <h2 className="font-bold text-2xl text-gray-400 tabular-nums">00:00</h2>
      </div>

      <div className="flex flex-col items-center justify-center space-y-5 flex-1">
        {sessionDetail?.selectedDoctor ? (
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-blue-100 shadow-lg bg-white">
              {sessionDetail.selectedDoctor.image ? (
                <Image
                  src={sessionDetail.selectedDoctor.image}
                  alt={sessionDetail.selectedDoctor.specialist}
                  fill
                  className="object-cover object-top"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <User className="w-12 h-12 text-gray-300" />
                </div>
              )}
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-bold text-blue-600">
                {sessionDetail.selectedDoctor.specialist}
              </h2>
              <p className="text-gray-500 max-w-sm italic line-clamp-2 px-4">
                "{sessionDetail.selectedDoctor.description}"
              </p>
            </div>
          </div>
        ) : (
          !loading && <p className="text-gray-400">Loading agent details...</p>
        )}

        {/* Conversation Box */}
        <div className="mt-10 w-full max-w-2xl bg-white/50 dark:bg-neutral-900/50 p-6 rounded-2xl min-h-[150px] overflow-y-auto shadow-inner">
          <div className="space-y-3">
            {messages?.slice(-4).map((msg: messages, index) => (
              <div
                key={index}
                className={`flex ${msg.role === "assistant" ? "justify-start" : "justify-end"}`}
              >
                <p
                  className={`max-w-[80%] p-2 px-4 rounded-2xl text-sm ${msg.role === "assistant" ? "bg-blue-100 text-blue-800 rounded-tl-none" : "bg-gray-200 text-gray-800 rounded-tr-none"}`}
                >
                  <span className="font-bold uppercase text-[10px] block opacity-50">
                    {msg.role}
                  </span>
                  {msg.text}
                </p>
              </div>
            ))}

            {liveTranscript && (
              <div
                className={`flex ${currentRole === "assistant" ? "justify-start" : "justify-end"} animate-pulse`}
              >
                <p className="bg-white p-2 px-4 rounded-2xl text-sm italic shadow-sm">
                  {liveTranscript}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="pb-10">
          {!callStarted ? (
            <Button
              className="rounded-full px-8 py-6 h-auto text-lg shadow-xl hover:scale-105 transition-transform"
              onClick={StartCall}
            >
              <PhoneCall className="mr-2" /> Start Consultation
            </Button>
          ) : (
            <Button
              variant="destructive"
              className="rounded-full px-8 py-6 h-auto text-lg shadow-xl animate-bounce-subtle"
              onClick={endCall}
              disabled={loading}
            >
              {loading ? (
                <Loader className="animate-spin" />
              ) : (
                <PhoneOff className="mr-2" />
              )}{" "}
              End Call
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default MedicalVoiceAgent
