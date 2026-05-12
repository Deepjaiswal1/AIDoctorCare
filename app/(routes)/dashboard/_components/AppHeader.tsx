

"use client"

import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import { Stethoscope } from 'lucide-react'

const menuOptions = [
  {
    id: 1,
    name: 'Home',
    path: '/'
  },
  {
    id: 2,
    name: 'Dashboard',
    path: '/dashboard'
  },
  {
    id: 3,
    name: 'History',
    path: '/dashboard/history'
  },
]

const AppHeader = () => {
  const path = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-xl border-b border-slate-100 px-6 py-4 md:px-20 lg:px-40">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
          <div className="bg-blue-600 p-1.5 rounded-lg shadow-lg shadow-blue-200">
            <Stethoscope size={22} className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            MediVoice<span className="text-blue-600">.ai</span>
          </span>
        </Link>

        {/* Navigation Menu */}
        <div className="hidden md:flex items-center gap-8">
          {menuOptions.map((option) => {
            const isActive = path === option.path
            return (
              <Link href={option.path} key={option.id}>
                <h2 className={`text-sm font-semibold transition-all duration-200 hover:text-blue-600 cursor-pointer ${
                  isActive 
                    ? 'text-blue-600' 
                    : 'text-slate-600'
                }`}>
                  {option.name}
                  {/* Active Indicator Underline */}
                  {isActive && (
                    <div className="h-0.5 w-full bg-blue-600 rounded-full mt-0.5" />
                  )}
                </h2>
              </Link>
            )
          })}
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-4">
          <div className="h-6 w-px bg-slate-200 hidden md:block mr-2" />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  )
}

export default AppHeader