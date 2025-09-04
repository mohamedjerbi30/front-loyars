"use client"

import type React from "react"

import { SidebarInset, SidebarProvider } from "../ui/sidebar"
import { AppSidebar } from "./app-sidebar"
import { TopBar } from "./top-bar"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <TopBar />
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4">
            <h1 className="text-3xl font-bold">Welcome to Dashboard</h1>
          </div>
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
