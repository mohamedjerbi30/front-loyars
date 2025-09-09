// components/dashboard/top-bar.tsx
"use client"
import { Bell, Search, User, Command } from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { Badge } from "../components/ui/badge"
import { useAuth } from "../components/auth/auth-provider"
import { useRouter } from "next/navigation"
import { SidebarTrigger } from "../components/ui/sidebar"
import NotificationDropdown from "../components/header/NotificationDropdown"
import { ThemeToggleButton } from "@/components/common/ThemeToggleButton"
import Image from "next/image"
import Link from "next/link"
import React, { useState, useEffect, useRef } from "react"

export function AppHeader() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  const handleProfile = () => {
    router.push("/profile")
  }

  const toggleApplicationMenu = () => {
    setApplicationMenuOpen(!isApplicationMenuOpen)
  }

  // Keyboard shortcut for search (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault()
        inputRef.current?.focus()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  return (
    <header className="sticky top-0 flex h-16 w-full items-center bg-white border-b border-gray-200 px-4 shadow-sm z-50 dark:bg-gray-900 dark:border-gray-800 lg:px-6">
      {/* Left Section - Sidebar Toggle & Logo */}
      <div className="flex items-center gap-4">
        <SidebarTrigger className="flex items-center justify-center w-10 h-10 text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-gray-700 transition-colors duration-200 dark:border-gray-800 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300 lg:w-11 lg:h-11" />

        {/* Logo - Mobile only */}
        <Link href="/" className="flex items-center gap-2 lg:hidden">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">L</span>
          </div>
          <span className="font-semibold text-gray-900 text-lg dark:text-white">Logo</span>
        </Link>
      </div>

      {/* Center Section - Search Bar (Desktop only) */}
      <div className="flex-1 max-w-md mx-8 hidden lg:block">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search or type command..."
            className="w-full h-11 pl-12 pr-14 text-sm bg-white border border-gray-200 rounded-lg text-gray-800 placeholder:text-gray-400 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all duration-200 dark:bg-gray-900 dark:border-gray-800 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-600 dark:focus:ring-blue-900/20 xl:w-[430px]"
          />
          <kbd className="absolute right-3 top-1/2 transform -translate-y-1/2 inline-flex items-center gap-1 px-2 py-1 text-xs font-mono text-gray-500 bg-gray-100 border border-gray-200 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
            <Command className="w-3 h-3" />
            K
          </kbd>
        </div>
      </div>

      {/* Right Section - Actions & Profile */}
      <div className="flex items-center gap-2">
        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleApplicationMenu}
          className="flex items-center justify-center w-10 h-10 text-gray-500 rounded-lg hover:bg-gray-100 lg:hidden dark:text-gray-400 dark:hover:bg-gray-800"
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" />
          </svg>
        </button>

        {/* Desktop Actions */}
        <div className={`${isApplicationMenuOpen ? 'flex' : 'hidden'} lg:flex items-center gap-2 absolute top-16 left-0 right-0 bg-white border-b border-gray-200 p-4 shadow-lg lg:static lg:top-auto lg:bg-transparent lg:border-0 lg:p-0 lg:shadow-none dark:bg-gray-900 dark:border-gray-800 lg:dark:bg-transparent`}>
          {/* Theme Toggle */}
          <ThemeToggleButton />

          {/* Notifications */}
          <NotificationDropdown />

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="relative w-10 h-10 rounded-full hover:bg-gray-100 focus:ring-2 focus:ring-blue-100 focus:outline-none dark:hover:bg-gray-800 dark:focus:ring-blue-900/20"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white text-sm font-medium shadow-sm">
                  {user?.name ? user.name.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
                </div>
                {/* Online indicator */}
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full dark:border-gray-900"></span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent 
              className="w-56 bg-white border border-gray-200 shadow-lg rounded-lg mt-2 dark:bg-gray-900 dark:border-gray-800" 
              align="end"
              sideOffset={8}
            >
              {/* User Info */}
              <DropdownMenuLabel className="p-0">
                <div className="flex items-center gap-3 px-3 py-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {user?.name ? user.name.charAt(0).toUpperCase() : <User className="w-5 h-5" />}
                  </div>
                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {user?.name || 'User'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {user?.email || 'user@example.com'}
                    </p>
                  </div>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator className="bg-gray-100 dark:bg-gray-800" />

              {/* Profile Link */}
              <DropdownMenuItem 
                onClick={handleProfile}
                className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer dark:text-gray-300 dark:hover:bg-gray-800"
              >
                <User className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <span>View Profile</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-gray-100 dark:bg-gray-800" />

              {/* Logout */}
              <DropdownMenuItem 
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer dark:text-red-400 dark:hover:bg-red-900/20"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}