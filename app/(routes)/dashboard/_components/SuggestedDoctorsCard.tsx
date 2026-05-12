

import React from "react"
import { doctorAgent } from "./DoctorAgentCard"
import Image from "next/image"

type props = {
  doctorAgent: doctorAgent
  setSelectedDoctor: any
  selectedDoctor: doctorAgent
}

const SuggestedDoctorsCard = ({
  doctorAgent,
  setSelectedDoctor,
  selectedDoctor,
}: props) => {
  // Fallback check to prevent the "empty string" error
  const imageSrc =
    doctorAgent.image && doctorAgent.image.trim() !== ""
      ? doctorAgent.image
      : "/doctor8.jpg" // Default fallback

  return (
    <div
      className={`"flex flex-col items-center justify-between p-6 border-2 border-blue-100 rounded-[2rem] bg-white shadow-sm hover:border-blue-500 cursor-pointer transition-all w-full max-w-[240px] h-full" ${selectedDoctor?.id == doctorAgent?.id && "border-blue-500"}`}
      onClick={() => setSelectedDoctor(doctorAgent)}
    >
      {/* 1. The Circle Image Frame */}
      <div className="relative w-24 h-24 mb-4">
        <div className="absolute inset-0 rounded-full border-4 border-blue-50 bg-blue-50/50" />
        <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white shadow-inner">
          <Image
            src={imageSrc}
            alt={doctorAgent?.specialist}
            fill
            className="object-cover object-top" // Ensures face is visible
            sizes="96px"
          />
        </div>
      </div>

      {/* 2. Text Content */}
      <div className="text-center space-y-2">
        <h2 className="font-bold text-blue-600 text-lg">
          {doctorAgent?.specialist}
        </h2>
        <p className="text-xs text-gray-500 italic leading-relaxed px-2">
          "{doctorAgent?.description}"
        </p>
      </div>

      {/* 3. Action Label */}
      {/* <div className="mt-6">
        <span className="text-blue-500 font-extrabold text-[10px] uppercase tracking-[0.2em]">
          Select Agent
        </span>
      </div> */}
    </div>
  )
}

export default SuggestedDoctorsCard
