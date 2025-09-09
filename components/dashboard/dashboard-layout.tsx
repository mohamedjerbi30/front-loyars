// components/dashboard/dashboard-layout.tsx
"use client"
import Backdrop from "../../layout/Backdrop"
import type React from "react"
import { SidebarInset, SidebarProvider } from "../ui/sidebar"
import AppSidebar from "../../layout/AppSidebar"
import {AppHeader} from "@/layout/AppHeader"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <Backdrop />
      <SidebarInset>
        <AppHeader />
        <div className="flex flex-1 flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-white">
          {/* Enhanced Header Section */}
          <div className="px-4 py-6 md:px-6 md:py-8 border-b border-slate-200/60 bg-white/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col gap-3">
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-700 via-blue-600 to-slate-800 bg-clip-text text-transparent">
                  Welcome to Dashboard
                </h1>
                <p className="text-slate-600 text-base md:text-lg font-medium">
                  Manage your tasks, projects, and activities from one central location
                </p>
              </div>
            </div>
          </div>

          {/* Main Content Area with Template-inspired Grid */}
          <div className="flex-1 px-4 py-6 md:px-6 md:py-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-12 gap-4 md:gap-6 auto-rows-min">
                {children}
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}