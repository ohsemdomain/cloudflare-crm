import { Package, ListTodo, Users, DollarSign } from 'lucide-react'
import { StatCard } from '@/components/dashboard/StatCard'
import { useStore } from '@/store'

export const DashboardPage = () => {
  const metrics = useStore((state) => state.metrics)

  const stats = [
    {
      title: 'Total Products',
      value: metrics.totalProducts.toString(),
      icon: Package,
      trend: {
        value: 12,
        isUpward: true
      }
    },
    {
      title: 'Active Tasks',
      value: metrics.activeTasks.toString(),
      icon: ListTodo,
      trend: {
        value: 8,
        isUpward: false
      }
    },
    {
      title: 'Total Customers',
      value: metrics.totalCustomers.toLocaleString(),
      icon: Users,
      trend: {
        value: 2.5,
        isUpward: true
      }
    },
    {
      title: 'Revenue',
      value: `$${metrics.revenue.toLocaleString()}`,
      icon: DollarSign,
      trend: {
        value: 4.3,
        isUpward: true
      }
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-sm text-gray-600">
          Welcome back! Here's an overview of your business.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
          />
        ))}
      </div>

      {/* Additional content section */}
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900">
          Quick Actions
        </h2>
        <div className="mt-4 space-y-4">
          <p className="text-sm text-gray-600">
            Welcome to your new CRM system! This dashboard provides an overview of your key metrics.
            Use the navigation menu on the left to access Products and Tasks management.
          </p>
        </div>
      </div>
    </div>
  )
}