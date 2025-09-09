"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

export function AuthTest() {
  const [testResult, setTestResult] = useState<string>("")
  const [loading, setLoading] = useState(false)

  const testAuth = async () => {
    setLoading(true)
    setTestResult("Testing...")

    try {
      const token = localStorage.getItem('token')
      console.log('Token found:', token ? 'Yes' : 'No')
      
      if (!token) {
        setTestResult("❌ No token found in localStorage")
        return
      }

      // Test the auth endpoint
      const response = await fetch('http://localhost:5000/api/users/verify-token', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      console.log('Auth test response:', response.status, response.statusText)

      if (response.ok) {
        const data = await response.json()
        setTestResult(`✅ Auth working! User: ${data.user.email}`)
      } else {
        const errorData = await response.json()
        setTestResult(`❌ Auth failed: ${errorData.message}`)
      }
    } catch (error) {
      console.error('Auth test error:', error)
      setTestResult(`❌ Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const testProfileEndpoint = async () => {
    setLoading(true)
    setTestResult("Testing profile endpoint...")

    try {
      const token = localStorage.getItem('token')
      
      if (!token) {
        setTestResult("❌ No token found in localStorage")
        return
      }

      // Test the profile endpoint
      const response = await fetch('http://localhost:5000/api/users/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      console.log('Profile test response:', response.status, response.statusText)

      if (response.ok) {
        const data = await response.json()
        setTestResult(`✅ Profile endpoint working! User: ${data.data.email}`)
      } else {
        const errorData = await response.json()
        setTestResult(`❌ Profile endpoint failed: ${errorData.message}`)
      }
    } catch (error) {
      console.error('Profile test error:', error)
      setTestResult(`❌ Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const clearLocalStorage = () => {
    localStorage.removeItem('token')
    setTestResult("🗑️ Token cleared from localStorage")
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Authentication Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Button onClick={testAuth} disabled={loading} className="w-full">
            Test Token Auth
          </Button>
          <Button onClick={testProfileEndpoint} disabled={loading} className="w-full" variant="outline">
            Test Profile Endpoint
          </Button>
          <Button onClick={clearLocalStorage} variant="destructive" className="w-full">
            Clear Token
          </Button>
        </div>
        
        {testResult && (
          <div className="mt-4 p-3 bg-gray-100 rounded text-sm">
            <pre>{testResult}</pre>
          </div>
        )}
        
        <div className="text-xs text-gray-500">
          <p>Current token: {localStorage.getItem('token') ? `${localStorage.getItem('token')?.substring(0, 20)}...` : 'None'}</p>
        </div>
      </CardContent>
    </Card>
  )
}