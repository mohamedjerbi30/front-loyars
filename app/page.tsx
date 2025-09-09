// app/page.tsx
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-slate-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          {/* Logo placeholder */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">L</span>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-700 to-slate-800 bg-clip-text text-transparent mb-3">
            Welcome
          </h1>
          <p className="text-slate-600 mb-8 text-lg">Choose an option to continue</p>
        </div>

        <div className="space-y-4">
          <Link href="/login" className="block">
            <Button 
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg transition-all" 
              size="lg"
            >
              Sign In
            </Button>
          </Link>

          <Link href="/register" className="block">
            <Button 
              variant="outline" 
              className="w-full bg-white border-2 border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-slate-700 hover:text-blue-700 transition-all shadow-sm hover:shadow" 
              size="lg"
            >
              Create Account
            </Button>
          </Link>

          <Link href="/dashboard" className="block">
            <Button 
              variant="secondary" 
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 hover:border-slate-300 transition-all shadow-sm" 
              size="lg"
            >
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}