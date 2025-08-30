import { useState } from 'react'
import { Wallet, TrendingUp, TrendingDown, DollarSign, PieChart } from 'lucide-react'
import { Button } from './ui/button'
import { PortfolioChart } from './PortfolioChart'
import { AssetAllocation } from './AssetAllocation'

interface PortfolioAsset {
  symbol: string
  name: string
  amount: number
  value: number
  price: number
  change24h: number
}

export const Portfolio = () => {
  const [portfolioAssets] = useState<PortfolioAsset[]>([
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      amount: 0.5,
      value: 21500,
      price: 43000,
      change24h: 2.5
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      amount: 5.2,
      value: 10400,
      price: 2000,
      change24h: -1.2
    },
    {
      symbol: 'BNB',
      name: 'BNB',
      amount: 25,
      value: 7500,
      price: 300,
      change24h: 3.8
    },
    {
      symbol: 'SOL',
      name: 'Solana',
      amount: 100,
      value: 6000,
      price: 60,
      change24h: -2.1
    }
  ])

  const totalValue = portfolioAssets.reduce((sum, asset) => sum + asset.value, 0)
  const totalChange24h = portfolioAssets.reduce((sum, asset) => {
    const assetChange = (asset.change24h / 100) * asset.value
    return sum + assetChange
  }, 0)
  const totalChangePercent = (totalChange24h / totalValue) * 100

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price)
  }

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6
    }).format(amount)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Portfolio Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Portfolio</h1>
            <p className="text-gray-400">Track your cryptocurrency investments</p>
          </div>
          <div className="flex space-x-4">
            <Button variant="outline">
              <DollarSign className="h-4 w-4 mr-2" />
              Deposit
            </Button>
            <Button>
              <Wallet className="h-4 w-4 mr-2" />
              Withdraw
            </Button>
          </div>
        </div>
      </div>

      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Total Balance</p>
              <p className="text-3xl font-bold text-white">{formatPrice(totalValue)}</p>
            </div>
            <Wallet className="h-8 w-8 text-blue-400" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">24h Change</p>
              <p className={`text-3xl font-bold ${totalChangePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {totalChangePercent >= 0 ? '+' : ''}{totalChangePercent.toFixed(2)}%
              </p>
            </div>
            {totalChangePercent >= 0 ? (
              <TrendingUp className="h-8 w-8 text-green-400" />
            ) : (
              <TrendingDown className="h-8 w-8 text-red-400" />
            )}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">24h P&L</p>
              <p className={`text-3xl font-bold ${totalChange24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {totalChange24h >= 0 ? '+' : ''}{formatPrice(totalChange24h)}
              </p>
            </div>
            <PieChart className="h-8 w-8 text-purple-400" />
          </div>
        </div>
      </div>

      {/* Portfolio Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Portfolio Chart */}
        <div className="lg:col-span-2">
          <PortfolioChart />
        </div>

        {/* Asset Allocation */}
        <div className="lg:col-span-1">
          <AssetAllocation assets={portfolioAssets} />
        </div>
      </div>

      {/* Holdings Table */}
      <div className="mt-8">
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-white">Your Holdings</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Asset
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Value
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    24h Change
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {portfolioAssets.map((asset) => (
                  <tr key={asset.symbol} className="hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 bg-gray-600 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-white">
                            {asset.symbol.charAt(0)}
                          </span>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-white">{asset.name}</div>
                          <div className="text-sm text-gray-400">{asset.symbol}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {formatAmount(asset.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {formatPrice(asset.price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                      {formatPrice(asset.value)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className={`flex items-center ${
                        asset.change24h >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {asset.change24h >= 0 ? (
                          <TrendingUp className="h-4 w-4 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 mr-1" />
                        )}
                        {Math.abs(asset.change24h).toFixed(2)}%
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                      <Button size="sm" variant="outline">
                        Buy
                      </Button>
                      <Button size="sm" variant="outline">
                        Sell
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}