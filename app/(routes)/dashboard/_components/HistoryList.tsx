"use client"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import AddNewSessionDialog from "./AddNewSessionDialog"
import axios from "axios"
import HistoryTable from "./HistoryTable"
import { SessionDetail } from "../medical-agent/[sessionId]/page"

const HistoryList = () => {
  const [historyList, setHistoryList] = useState<SessionDetail[]>([])

  useEffect(()=>{
    GetHistoryList()
  },[])

  const GetHistoryList = async () => {
  try {
    const result = await axios.get('/api/session-chat?sessionId=all');
    if (result.data) {
      console.log(result.data)
      setHistoryList(result.data);
    }
  } catch (error) {
    console.error("Error fetching history:", error);
    // setHistoryList([]); // Reset to empty list on error
  }
};

  return (
    <div className="mt-10">
      {historyList.length == 0 ? (
        <div className="flex items-center flex-col justify-center p-7 border border-dashed rounded-2xl border-2">
          <Image src={`/image2.png`} alt="logo" width={150} height={150} />
          <h2 className="font-bold text-xl mt-2">No Recent Consultations</h2>
          <p>It looks like you haven't consulted with any doctors yet.</p>

          <AddNewSessionDialog />
        </div>
      ) : (
        <div>
          <HistoryTable historyList={historyList}/>
        </div>
      )}
    </div>
  )
}

export default HistoryList
