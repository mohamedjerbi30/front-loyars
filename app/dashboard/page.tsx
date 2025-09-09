import { ProtectedRoute } from "../../components/auth/protected-route"
//import { DashboardLayout } from "../../components/dashboard/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { 
  CheckCircle2, 
  Clock, 
  MessageSquare, 
  TrendingUp, 
  Plus, 
  Calendar,
  Upload,
  Send,
  Activity,
  ArrowUp,
  ArrowDown
} from "lucide-react"

export default function DashboardPage() {
  const stats = [
    {
      title: "Total Tasks",
      value: "24",
      change: "+2 from last week",
      trend: "up",
      icon: Activity,
      color: "blue"
    },
    {
      title: "Completed",
      value: "18",
      change: "+5 from last week",
      trend: "up",
      icon: CheckCircle2,
      color: "green"
    },
    {
      title: "Pending",
      value: "6",
      change: "-3 from last week",
      trend: "down",
      icon: Clock,
      color: "orange"
    },
    {
      title: "Messages",
      value: "12",
      change: "+1 new message",
      trend: "up",
      icon: MessageSquare,
      color: "purple"
    }
  ]

  const recentActivities = [
    {
      title: "Task completed: Review project proposal",
      time: "2 hours ago",
      color: "blue",
      type: "completion"
    },
    {
      title: "New message from John Doe",
      time: "4 hours ago",
      color: "green",
      type: "message"
    },
    {
      title: "Meeting scheduled for tomorrow",
      time: "6 hours ago",
      color: "yellow",
      type: "schedule"
    },
    {
      title: "Document uploaded: Q4 Report",
      time: "1 day ago",
      color: "purple",
      type: "upload"
    },
    {
      title: "Task assigned: Update website",
      time: "2 days ago",
      color: "blue",
      type: "assignment"
    }
  ]

  const quickActions = [
    {
      title: "Create new task",
      description: "Add a new task to your workflow",
      icon: Plus,
      color: "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
    },
    {
      title: "Schedule meeting",
      description: "Set up a new meeting",
      icon: Calendar,
      color: "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
    },
    {
      title: "Send message",
      description: "Send a quick message",
      icon: Send,
      color: "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
    },
    {
      title: "Upload document",
      description: "Upload and share documents",
      icon: Upload,
      color: "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
    }
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: "bg-gradient-to-br from-blue-50 to-blue-100",
        text: "text-blue-600",
        accent: "text-blue-800"
      },
      green: {
        bg: "bg-gradient-to-br from-green-50 to-green-100",
        text: "text-green-600",
        accent: "text-green-800"
      },
      orange: {
        bg: "bg-gradient-to-br from-orange-50 to-orange-100",
        text: "text-orange-600",
        accent: "text-orange-800"
      },
      purple: {
        bg: "bg-gradient-to-br from-purple-50 to-purple-100",
        text: "text-purple-600",
        accent: "text-purple-800"
      },
      yellow: {
        bg: "bg-gradient-to-br from-yellow-50 to-yellow-100",
        text: "text-yellow-600",
        accent: "text-yellow-800"
      }
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <ProtectedRoute>
        {/* Enhanced Stats Cards */}
        <div className="col-span-12">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              const colorClasses = getColorClasses(stat.color)
              const TrendIcon = stat.trend === 'up' ? ArrowUp : ArrowDown
              
              return (
                <Card key={index} className="relative overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-600">
                      {stat.title}
                    </CardTitle>
                    <div className={`p-2 rounded-lg ${colorClasses.bg}`}>
                      <Icon className={`h-4 w-4 ${colorClasses.text}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-slate-800 mb-1">
                      {stat.value}
                    </div>
                    <div className="flex items-center space-x-1">
                      <TrendIcon className={`h-3 w-3 ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
                      <p className={`text-xs font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.change}
                      </p>
                    </div>
                  </CardContent>
                  {/* Subtle accent border */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 ${colorClasses.bg}`}></div>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="col-span-12">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            {/* Enhanced Recent Activity */}
            <Card className="col-span-4 border-0 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                    <Activity className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-slate-800">Recent Activity</CardTitle>
                    <CardDescription className="text-slate-600">Your recent tasks and activities</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="group flex items-start space-x-4 p-3 rounded-lg hover:bg-slate-50 transition-colors duration-150 cursor-pointer">
                    <div className={`w-2 h-2 rounded-full mt-2 bg-${activity.color}-500 flex-shrink-0`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800 group-hover:text-slate-900 transition-colors">
                        {activity.title}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        {activity.time}
                      </p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <TrendingUp className="h-4 w-4 text-slate-400" />
                    </div>
                  </div>
                ))}
                
                {/* View All Link */}
                <div className="pt-4 border-t border-slate-100">
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
                    View all activities →
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Quick Actions */}
            <Card className="col-span-3 border-0 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                    <Plus className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-slate-800">Quick Actions</CardTitle>
                    <CardDescription className="text-slate-600">Frequently used actions</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickActions.map((action, index) => {
                  const Icon = action.icon
                  return (
                    <button 
                      key={index}
                      className="group w-full text-left p-4 rounded-lg border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 transition-all duration-200 hover:shadow-sm"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${action.color} text-white group-hover:scale-110 transition-transform duration-200`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-800 group-hover:text-slate-900">
                            {action.title}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            {action.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </CardContent>
            </Card>
          </div>
        </div>
    </ProtectedRoute>
  )
}