const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

class AuthService {
  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      credentials: "include", // Include cookies for refresh tokens
      ...options,
    }

    const response = await fetch(url, config)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong")
    }

    return data
  }

  async login(email: string, password: string) {
    const data = await this.request("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })

    // Store access token in localStorage (you might want to use a more secure method)
    if (data.accessToken) {
      localStorage.setItem("accessToken", data.accessToken)
    }

    return data.user
  }

  async register(name: string, email: string, password: string) {
    const data = await this.request("/api/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    })

    if (data.accessToken) {
      localStorage.setItem("accessToken", data.accessToken)
    }

    return data.user
  }

  async logout() {
    try {
      await this.request("/api/logout", {
        method: "POST",
      })
    } catch (error) {
      // Handle logout error
    } finally {
      localStorage.removeItem("accessToken")
    }
  }

  async getCurrentUser() {
    const token = localStorage.getItem("accessToken")

    if (!token) {
      throw new Error("No access token")
    }

    const data = await this.request("/api/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return data.user
  }

  async refreshToken() {
    const data = await this.request("/api/refresh", {
      method: "POST",
    })

    if (data.accessToken) {
      localStorage.setItem("accessToken", data.accessToken)
    }

    return data.accessToken
  }

  // Forgot Password Methods
  async forgotPassword(email: string) {
    const data = await this.request("/api/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    })

    return data
  }

  async verifyResetCode(email: string, code: string) {
    const data = await this.request("/api/verify-reset-code", {
      method: "POST",
      body: JSON.stringify({ email, code }),
    })

    return data
  }

  async resetPassword(email: string, code: string, newPassword: string) {
    const data = await this.request("/api/reset-password", {
      method: "POST",
      body: JSON.stringify({ email, code, newPassword }),
    })

    return data
  }

  getAccessToken() {
    return localStorage.getItem("accessToken")
  }
}

export const authService = new AuthService()
