import { Link, useLocation } from 'react-router-dom'
import { TrendingUp, Wallet, BarChart3, Settings, User } from 'lucide-react'
import { Button } from './ui/button'

export const Navbar = () => {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Markets', icon: TrendingUp },
    { path: '/trading', label: 'Trading', icon: BarChart3 },
    { path: '/portfolio', label: 'Portfolio', icon: Wallet },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-800 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-yellow-500" />
              <span className="text-xl font-bold text-white">CryptoTrade</span>
            </Link>
            
            <div className="hidden md:flex space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      location.pathname === item.path
                        ? 'bg-gray-700 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" className="hidden md:flex">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button size="sm">
              <User className="h-4 w-4 mr-2" />
              Login
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}