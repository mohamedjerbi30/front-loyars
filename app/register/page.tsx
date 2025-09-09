import { RegisterForm } from "../../components/auth/register-form"
import { RedirectIfAuthenticated } from "../../components/auth/redirect-if-authenticated"

export default function RegisterPage() {
  return (
    <RedirectIfAuthenticated>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Create your account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Or{" "}
              <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                sign in to your existing account
              </a>
            </p>
          </div>
          <RegisterForm />
        </div>
      </div>
    </RedirectIfAuthenticated>
  )
}