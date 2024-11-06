// src/components/dashboard/StatCard.tsx
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: {
    value: number
    isUpward: boolean
  }
  className?: string
}

export const StatCard = ({ title, value, icon: Icon, trend, className }: StatCardProps) => {
  return (
    <div className={cn("bg-white rounded-lg shadow p-6", className)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
          
          {trend && (
            <div className="mt-2 flex items-center text-sm">
              <span className={cn(
                "font-medium",
                trend.isUpward ? "text-green-600" : "text-red-600"
              )}>
                {trend.isUpward ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              <span className="text-gray-600 ml-2">from last month</span>
            </div>
          )}
        </div>
        
        <div className="p-3 bg-gray-50 rounded-lg">
          <Icon className="h-6 w-6 text-gray-600" />
        </div>
      </div>
    </div>
  )
}