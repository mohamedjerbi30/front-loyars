import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome</h1>
          <p className="text-gray-600 mb-8">Choose an option to continue</p>
        </div>

        <div className="space-y-4">
          <Link href="/login" className="block">
            <Button className="w-full" size="lg">
              Sign In
            </Button>
          </Link>

          <Link href="/register" className="block">
            <Button variant="outline" className="w-full bg-transparent" size="lg">
              Create Account
            </Button>
          </Link>

          <Link href="/dashboard" className="block">
            <Button variant="secondary" className="w-full" size="lg">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
