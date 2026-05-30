

"use client"

import React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { SessionDetail } from "../medical-agent/[sessionId]/page"
import moment from 'moment'

type ReportType = {
  agent: string;
  user: string;
  timestamp: string;
  chiefComplaint: string;
  summary: string;
  symptoms: string[];
  duration?: string;
  severity?: string;
  medicationsMentioned?: string[];
  recommendations?: string[];
};

type props = {
  record: SessionDetail
}

const ViewReportDialog = ({ record }: props) => {
  // Parsing the AI report
  const report = record.report as unknown as ReportType;

  if (!report) return null;

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={`link`} size={"sm"}>
            View Report
          </Button>
        </DialogTrigger>
        {/* Added max-height and overflow-y-auto to handle long reports */}
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle asChild>
              <h2 className="text-center text-2xl sm:text-3xl font-bold text-gray-800">
                Medical Consultation Report
              </h2>
            </DialogTitle>
            <DialogDescription asChild>
              <div className='space-y-4 mt-6 text-sm sm:text-base text-left'>

                {/* Session Info */}
                <section className="bg-blue-50 p-4 rounded-lg">
                  <h3 className='text-base font-semibold text-blue-700 mb-2 border-b border-blue-200'>Session Details</h3>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-gray-700'>
                    <div><span className='font-semibold'>Specialist:</span> {record.selectedDoctor?.specialist || report.agent}</div>
                    <div><span className='font-semibold'>User:</span> {report.user}</div>
                    {/* SYNC: Using record.createdOn from DB instead of report.timestamp */}
                    <div>
                      <span className='font-semibold'>Date:</span> {record.createOn ? moment(record.createOn).format('MMMM Do YYYY, h:mm a') : 'N/A'}
                    </div>
                  </div>
                </section>

                {/* Chief Complaint */}
                <section>
                  <h3 className='text-base font-semibold text-blue-600 mb-1'>Chief Complaint</h3>
                  <p className='text-gray-800 leading-relaxed'>{report.chiefComplaint}</p>
                </section>

                <hr className="border-t border-blue-100" />

                {/* Summary */}
                <section>
                  <h3 className='text-base font-semibold text-blue-600 mb-1'>Summary</h3>
                  <p className='text-gray-800 leading-relaxed'>{report.summary}</p>
                </section>

                <hr className="border-t border-blue-100" />

                {/* Symptoms */}
                <section>
                  <h3 className='text-base font-semibold text-blue-600 mb-1'>Symptoms</h3>
                  <ul className='list-disc list-inside text-gray-800 grid grid-cols-1 sm:grid-cols-2'>
                    {report.symptoms.map((symptom: string, index: number) => (
                      <li key={index} className="py-0.5">{symptom}</li>
                    ))}
                  </ul>
                </section>

                <hr className="border-t border-blue-100" />

                {/* Duration & Severity */}
                <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h3 className='text-base font-semibold text-blue-600 mb-1'>Duration</h3>
                    <p className="text-gray-800">{report.duration || 'Not specified'}</p>
                  </div>
                  <div>
                    <h3 className='text-base font-semibold text-blue-600 mb-1'>Severity</h3>
                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                      report.severity?.toLowerCase() === 'severe' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {report.severity || 'Normal'}
                    </span>
                  </div>
                </section>

                {/* Medications */}
                {(report.medicationsMentioned ?? []).length > 0 && (
                  <>
                    <hr className="border-t border-blue-100" />
                    <section>
                      <h3 className='text-base font-semibold text-blue-600 mb-1'>Medications Mentioned</h3>
                      <div className="flex flex-wrap gap-2">
                        {report.medicationsMentioned!.map((med: string, index: number) => (
                          <span key={index} className="bg-gray-100 px-2 py-1 rounded text-xs border">{med}</span>
                        ))}
                      </div>
                    </section>
                  </>
                )}

                {/* Recommendations */}
                {(report.recommendations ?? []).length > 0 && (
                  <>
                    <hr className="border-t border-blue-100" />
                    <section className="bg-blue-50/50 p-3 rounded-md">
                      <h3 className='text-base font-semibold text-blue-600 mb-1'>AI Recommendations</h3>
                      <ul className='list-disc list-inside text-gray-800 space-y-1'>
                        {report.recommendations!.map((rec: string, index: number) => (
                          <li key={index} className="text-sm">{rec}</li>
                        ))}
                      </ul>
                    </section>
                  </>
                )}

                {/* Footer Disclaimer */}
                <div className='mt-6 pt-4 text-center text-xs text-gray-400 border-t'>
                  <p>⚠ This report was generated by an AI Medical Assistant for informational purposes only.</p>
                  <p>Please consult a licensed healthcare provider for professional medical advice.</p>
                </div>

              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ViewReportDialog