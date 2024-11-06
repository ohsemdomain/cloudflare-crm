import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { LayoutDashboard, Package, ListTodo } from 'lucide-react'
import { routes } from '@/lib/routes'

interface RootLayoutProps {
  children: ReactNode
}

const navigation = [
  { name: 'Dashboard', href: routes.dashboard, icon: LayoutDashboard },
  { name: 'Products', href: routes.products, icon: Package },
  { name: 'Tasks', href: routes.tasks, icon: ListTodo },
]

export const RootLayout = ({ children }: RootLayoutProps) => {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center px-6 border-b border-gray-200">
            <span className="text-xl font-semibold">Your App</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'flex items-center px-2 py-2 text-sm font-medium rounded-md group',
                    isActive
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  <item.icon
                    className={cn(
                      'mr-3 h-5 w-5',
                      isActive ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-900'
                    )}
                  />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="pl-64">
        <main className="py-6">
          <div className="mx-auto px-4 sm:px-6 md:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}