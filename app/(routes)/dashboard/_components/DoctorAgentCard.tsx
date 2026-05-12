
import Image from "next/image"
import React from "react"

export type doctorAgent = {
  id: number
  specialist: string
  description: string
  image: string
  agentPrompt: string
  voiceId?: string
}

type props = {
  doctorAgent: doctorAgent
}

function DoctorAgentCard({ doctorAgent }: props) {
  const imageSrc = doctorAgent.image && doctorAgent.image.trim() !== "" 
    ? doctorAgent.image 
    : null;

  return (
    <div className="flex flex-col items-center p-4 border rounded-3xl shadow-md hover:shadow-xl transition-all bg-white dark:bg-neutral-900 w-full max-w-[280px] group">
      <div className="w-full">
        {/* Image Container: Relative + Overflow Hidden is key for clarity */}
        <div className="relative w-full aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={doctorAgent.specialist}
              fill
              // 'object-top' ensures the doctor's face is prioritized in the crop
              className="object-cover object-top group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 280px"
              priority
            />
          ) : (
            <div className="flex items-center justify-center h-full text-neutral-400">
              No Image
            </div>
          )}
        </div>

        <div className="text-center mt-5">
          <h3 className="font-extrabold text-xl text-slate-900 dark:text-white mb-1">
            {doctorAgent.specialist}
          </h3>
          <p className="text-sm text-slate-500 line-clamp-2 px-2">
            {doctorAgent.description}
          </p>
        </div>

        {/* <button className="mt-6 w-full py-3 bg-blue-600 text-white rounded-2xl text-sm font-bold hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-200">
          Chat with Agent
        </button> */}
      </div>
    </div>
  )
}

export default DoctorAgentCard