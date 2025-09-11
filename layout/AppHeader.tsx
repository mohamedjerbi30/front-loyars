"use client"
import { Search, Command, Menu } from "lucide-react"
import { useRouter } from "next/navigation"
import { useSidebar } from "@/context/SidebarContext"
import NotificationDropdown from "../components/header/NotificationDropdown"
import { ThemeToggleButton } from "@/components/common/ThemeToggleButton"
import UserDropdown from "../components/header/UserDropdown"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef } from "react"

export function AppHeader() {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  const { toggleMobileSidebar, toggleSidebar, isMobileOpen } = useSidebar()

  // Handle sidebar toggle - mobile vs desktop
  const handleSidebarToggle = () => {
    if (window.innerWidth < 1024) {
      toggleMobileSidebar()
    } else {
      toggleSidebar()
    }
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
    <header className="sticky top-0 flex w-full bg-white/95 backdrop-blur-sm border-b border-gray-200/60 z-[60] dark:border-gray-800/60 dark:bg-gray-900/95">
      <div className="flex items-center justify-between w-full px-4 py-3 lg:px-6">
        {/* Mobile Layout */}
        <div className="flex items-center justify-between w-full lg:hidden">
          {/* Left Section - Sidebar Toggle + Search */}
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {/* Sidebar Toggle Button - Mobile */}
            <button
              className="flex-shrink-0 flex items-center justify-center w-9 h-9 text-gray-500 border border-gray-200 rounded-lg dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors duration-200 dark:hover:bg-gray-800 dark:hover:text-gray-300"
              onClick={handleSidebarToggle}
              aria-label="Toggle Sidebar"
            >
              {isMobileOpen ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.21967 7.28131C5.92678 6.98841 5.92678 6.51354 6.21967 6.22065C6.51256 5.92775 6.98744 5.92775 7.28033 6.22065L11.999 10.9393L16.7176 6.22078C17.0105 5.92789 17.4854 5.92788 17.7782 6.22078C18.0711 6.51367 18.0711 6.98855 17.7782 7.28144L13.0597 12L17.7782 16.7186C18.0711 17.0115 18.0711 17.4863 17.7782 17.7792C17.4854 18.0721 17.0105 18.0721 16.7176 17.7792L11.999 13.0607L7.28033 17.7794C6.98744 18.0722 6.51256 18.0722 6.21967 17.7794C5.92678 17.4865 5.92678 17.0116 6.21967 16.7187L10.9384 12L6.21967 7.28131Z"
                    fill="currentColor"
                  />
                </svg>
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>

            {/* Search Bar - Mobile */}
            <div className="relative flex-1 max-w-[1800px] sm:max-w-[180px]">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search..."
                className="h-9 w-150px rounded-lg border border-gray-200/60 bg-gray-50/50 py-1.5 pl-8 pr-2 text-sm text-gray-700 placeholder:text-gray-400 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100/50 focus:bg-white transition-all duration-200 dark:bg-gray-800/50 dark:border-gray-700/60 dark:text-gray-200 dark:placeholder:text-gray-500 dark:focus:border-blue-500 dark:focus:ring-blue-500/20 dark:focus:bg-gray-800"
              />
            </div>
          </div>

          {/* Center Section - Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex justify-center flex-shrink-0">
            <Link href="/">
              <Image width={90} height={18} className="dark:hidden" src="./images/logo/logo.svg" alt="Logo" />
              <Image
                width={90}
                height={18}
                className="hidden dark:block"
                src="./images/logo/logo-dark.svg"
                alt="Logo"
              />
            </Link>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center gap-1 flex-1 justify-end min-w-0 relative z-[70]">
            {/* Theme Toggle */}
            <div className="flex-shrink-0">
              <ThemeToggleButton />
            </div>

            {/* Notifications */}
            <div className="flex-shrink-0 relative z-[70]">
              <NotificationDropdown />
            </div>

            {/* Profile Dropdown */}
            <div className="flex-shrink-0 relative z-[70]">
              <UserDropdown />
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex items-center justify-between w-full">
          {/* Left Section - Sidebar Toggle & Search */}
          <div className="flex items-center gap-4 flex-1">
            {/* Sidebar Toggle Button - Desktop */}
            <button
              className="flex items-center justify-center w-10 h-10 text-gray-500 border border-gray-200/60 rounded-lg dark:border-gray-700/60 dark:text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors duration-200 dark:hover:bg-gray-800 dark:hover:text-gray-300"
              onClick={handleSidebarToggle}
              aria-label="Toggle Sidebar"
            >
              <Menu className="h-4 w-4" />
            </button>

            {/* Search Bar - Desktop */}
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search or type command..."
                className="h-10 w-full rounded-lg border border-gray-200/60 bg-gray-50/50 py-2.5 pl-10 pr-12 text-sm text-gray-700 placeholder:text-gray-400 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100/50 focus:bg-white transition-all duration-200 dark:bg-gray-800/50 dark:border-gray-700/60 dark:text-gray-200 dark:placeholder:text-gray-500 dark:focus:border-blue-500 dark:focus:ring-blue-500/20 dark:focus:bg-gray-800"
              />
              <kbd className="absolute right-3 top-1/2 transform -translate-y-1/2 inline-flex items-center gap-0.5 rounded border border-gray-200/60 bg-gray-100/80 px-1.5 py-0.5 text-xs font-mono text-gray-500 dark:bg-gray-700/80 dark:border-gray-600/60 dark:text-gray-400">
                <Command className="w-3 h-3" />K
              </kbd>
            </div>
          </div>

          {/* Center Section - Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex-shrink-0 flex justify-center">
            <Link href="/">
              <Image width={130} height={26} className="dark:hidden" src="./images/logo/logo.svg" alt="Logo" />
              <Image
                width={130}
                height={26}
                className="hidden dark:block"
                src="./images/logo/logo-dark.svg"
                alt="Logo"
              />
            </Link>
          </div>

          {/* Right Section - Actions & Profile */}
          <div className="flex items-center gap-2 flex-shrink-0 justify-end relative z-[70]">
            {/* Theme Toggle */}
            <div className="flex-shrink-0">
              <ThemeToggleButton />
            </div>

            {/* Notifications */}
            <div className="flex-shrink-0 relative z-[70]">
              <NotificationDropdown />
            </div>

            {/* Profile Dropdown */}
            <div className="flex-shrink-0 relative z-[70]">
              <UserDropdown />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}