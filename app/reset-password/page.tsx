import { ResetPasswordForm } from "../../components/auth/reset-password"
import { RedirectIfAuthenticated } from "../../components/auth/redirect-if-authenticated"

export default function ResetPasswordPage() {
  return (
    <RedirectIfAuthenticated>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-8">
          <ResetPasswordForm />
        </div>
      </div>
    </RedirectIfAuthenticated>
  )
}