import { authService } from "./auth-service"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

class ApiClient {
  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`
    const token = authService.getAccessToken()

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      credentials: "include",
      ...options,
    }

    let response = await fetch(url, config)

    // If token expired, try to refresh
    if (response.status === 401 && token) {
      try {
        await authService.refreshToken()
        const newToken = authService.getAccessToken()

        // Retry the original request with new token
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${newToken}`,
        }

        response = await fetch(url, config)
      } catch (refreshError) {
        // Refresh failed, redirect to login
        window.location.href = "/login"
        throw new Error("Session expired")
      }
    }

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong")
    }

    return data
  }

  async get(endpoint: string) {
    return this.request(endpoint, { method: "GET" })
  }

  async post(endpoint: string, body: any) {
    return this.request(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
    })
  }

  async put(endpoint: string, body: any) {
    return this.request(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
    })
  }

  async delete(endpoint: string) {
    return this.request(endpoint, { method: "DELETE" })
  }
}

export const apiClient = new ApiClient()
