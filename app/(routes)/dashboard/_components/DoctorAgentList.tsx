import { AIDoctorAgents } from "@/shared/list"
import React from "react"
import DoctorAgentCard from "./DoctorAgentCard"

const DoctorAgentList = () => {
  return (
    <div className="mt-10">
      <h2 className="font-bold text-xl">AI Specialist Doctors Agent</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-5 justify-center justify-items-center mt-5">
        {AIDoctorAgents.map((doctor, index) => (
          <div key={index} className="flex flex-wrap justify-center gap-8 mt-10">
            <DoctorAgentCard doctorAgent={doctor} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorAgentList
