// "use client"

// import { motion } from "motion/react"
// import { FeatureBentoGrid } from "./_components/FeatureBentoGrid"
// import { UserButton, useUser } from "@clerk/nextjs"
// import { Button } from "@/components/ui/button"
// import Link from "next/link"

// export default function Home() {
//   return (
//     <div className="relative my-10 flex flex-col items-center justify-center">
//       <Navbar />
//       <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
//         <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
//       </div>
//       <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
//         <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
//       </div>
//       <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
//         <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
//       </div>
//       <div className="px-4 py-10 md:py-20">
//         <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300">
//           {"🩺Revolutionize Patient Care with AI Voice Agents"
//             .split(" ")
//             .map((word, index) => (
//               <motion.span
//                 key={index}
//                 initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
//                 animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
//                 transition={{
//                   duration: 0.3,
//                   delay: index * 0.1,
//                   ease: "easeInOut",
//                 }}
//                 className="mr-2 inline-block"
//               >
//                 {word}
//               </motion.span>
//             ))}
//         </h1>
//         <motion.p
//           initial={{
//             opacity: 0,
//           }}
//           animate={{
//             opacity: 1,
//           }}
//           transition={{
//             duration: 0.3,
//             delay: 0.8,
//           }}
//           className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400"
//         >
//           Deliver instant, accurate medical assistance through neutral voice
//           conversations. Automate appoinments scheduling, symtoms triage, and
//           follow-up care - 24/7.
//         </motion.p>
//         <Link href={`/sign-in`}>
//         <motion.div
//           initial={{
//             opacity: 0,
//           }}
//           animate={{
//             opacity: 1,
//           }}
//           transition={{
//             duration: 0.3,
//             delay: 1,
//           }}
//           className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
//         >

//           <button className="w-60 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
//             Get Started
//           </button>

//         </motion.div>
//         </Link>
//       </div>
//     </div>
//   )
// }

// const Navbar = () => {
//   const { user } = useUser()
//   return (
//     <nav className="flex w-full items-center justify-between border-t border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">
//       <div className="flex items-center gap-2">
//         <div className="size-7 rounded-full bg-gradient-to-br from-violet-500 to-pink-500" />
//         <h1 className="text-base font-bold md:text-2xl">MediVoice AI Agent</h1>
//       </div>
//       {!user ? (
//         <Link href={`/sign-in`}>
//           <button className="w-24 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200">
//             Login
//           </button>
//         </Link>
//       ) : (
//         <div className="flex gap-5 items-center">
//           <UserButton />

//           <Link href={`/dashboard`}>

//           <Button>Dashboard</Button>
//           </Link>
//         </div>
//       )}
//     </nav>
//   )
// }

"use client"

import React from "react"
import { motion } from "framer-motion"
import { UserButton, useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Stethoscope,
  ShieldCheck,
  Mic,
  ClipboardCheck,
  Clock,
  ChevronRight,
  Activity,
  ArrowRight,
  Sparkles,
} from "lucide-react"

export default function Home() {
  const { user } = useUser()

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-50 blur-[120px]" />
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] rounded-full bg-cyan-50 blur-[100px]" />
      </div>

      <Navbar />

      <main className="relative z-10">
        {/* --- HERO SECTION --- */}
        <section className="pt-20 pb-16 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-semibold mb-8"
            >
              <Sparkles size={16} className="text-blue-500" />
              <span>The Future of Patient Interaction is Here</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-b from-slate-950 via-slate-800 to-slate-700 bg-clip-text text-transparent"
            >
              Precision AI Voice <br className="hidden md:block" /> for Clinical
              Care.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 mb-10 leading-relaxed"
            >
              Bridge the gap between technology and empathy. Our AI voice agents
              handle symptom triage, consultation summaries, and scheduling with
              human-like nuance and 100% data accuracy.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href={user ? "/dashboard" : "/sign-in"}>
                <Button
                  size="lg"
                  className="h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-base font-bold shadow-xl shadow-blue-100 transition-all hover:scale-105 active:scale-95"
                >
                  Launch Dashboard <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              {/* <Button size="lg" variant="outline" className="h-14 px-8 rounded-2xl border-slate-200 text-base font-bold hover:bg-slate-50">
                Watch Demo
              </Button> */}
            </motion.div>
          </div>
        </section>

        {/* --- TRUST STATS --- */}
        <section className="py-10 border-y border-slate-100 bg-slate-50/30">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <StatItem label="Response Time" value="< 1.2s" />
              <StatItem label="HIPAA Certified" value="100%" />
              <StatItem label="Triage Accuracy" value="99.4%" />
              <StatItem label="Patient Satisfaction" value="4.9/5" />
            </div>
          </div>
        </section>

        {/* --- FEATURE HIGHLIGHTS --- */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Clinically Intelligent Features
              </h2>
              <div className="h-1 w-20 bg-blue-600 mx-auto mt-4 rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Mic />}
                title="Neural Voice Agent"
                desc="Human-like conversations that adapt to patient tone and medical urgency in real-time."
              />
              <FeatureCard
                icon={<ClipboardCheck />}
                title="Automated SOAP Notes"
                desc="Instant, structured reports generated from voice consultations for seamless EHR integration."
              />
              <FeatureCard
                icon={<ShieldCheck />}
                title="Data Privacy"
                desc="Enterprise-grade encryption ensuring patient confidentiality at every touchpoint."
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

/* --- SUB-COMPONENTS --- */

function Navbar() {
  const { user } = useUser()
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-xl border-b border-slate-100 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-200">
            <Stethoscope size={22} className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            MediVoice<span className="text-blue-600">.ai</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          {!user ? (
            <Link href="/sign-in">
              <Button variant="ghost" className="font-bold text-slate-600">
                Login
              </Button>
            </Link>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  className="rounded-xl border-slate-200 font-bold"
                >
                  Dashboard
                </Button>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <p className="text-2xl md:text-3xl font-extrabold text-blue-600">
        {value}
      </p>
      <p className="text-xs md:text-sm font-semibold text-slate-500 uppercase tracking-widest mt-1">
        {label}
      </p>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode
  title: string
  desc: string
}) {
  return (
    <div className="p-8 rounded-[2rem] border border-slate-100 bg-white hover:border-blue-100 hover:shadow-2xl hover:shadow-blue-50 transition-all duration-300 group">
      <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-slate-900">{title}</h3>
      <p className="text-slate-600 leading-relaxed text-sm md:text-base">
        {desc}
      </p>
    </div>
  )
}

function Footer() {
  return (
    <footer className="py-12 border-t border-slate-100 bg-white">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-slate-400 text-sm font-medium">
          © 2026 MediVoice AI Agent. All Rights Reserved.
        </p>
        <div className="flex gap-8 text-sm font-bold text-slate-400">
          <a href="#" className="hover:text-blue-600 transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-blue-600 transition-colors">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  )
}
