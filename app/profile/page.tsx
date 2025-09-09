import { ProtectedRoute } from "../../components/auth/protected-route"
import { DashboardLayout } from "../../components/dashboard/dashboard-layout"
import { ProfileForm } from "../../components/profile/profile-form"
// Add to your profile page for testing


// Then use it in your profile page:

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Profile Settings</h1>
            <p className="text-muted-foreground">Manage your account information and preferences</p>
          </div>
          <ProfileForm />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}