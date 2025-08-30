import { useCrypto } from '../contexts/CryptoContext'
import { TrendingUp, TrendingDown, DollarSign, BarChart3, RefreshCw } from 'lucide-react'
import { Button } from './ui/button'

export const MarketOverview = () => {
  const { cryptos, globalMetrics, refreshData, loading } = useCrypto()

  const formatLargeNumber = (num: number) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`
    return `$${num.toFixed(0)}`
  }

  const formatPercentage = (num: number) => {
    return `${num.toFixed(1)}%`
  }

  // Calculate local stats if global metrics aren't available
  const localTotalMarketCap = cryptos.reduce((sum, crypto) => sum + crypto.quote.USD.market_cap, 0)
  const localTotalVolume = cryptos.reduce((sum, crypto) => sum + crypto.quote.USD.volume_24h, 0)
  const gainers = cryptos.filter(crypto => crypto.quote.USD.percent_change_24h > 0).length
  const losers = cryptos.filter(crypto => crypto.quote.USD.percent_change_24h < 0).length

  const stats = [
    {
      title: 'Total Market Cap',
      value: formatLargeNumber(globalMetrics?.total_market_cap || localTotalMarketCap),
      subtitle: globalMetrics ? `${globalMetrics.active_cryptocurrencies} active coins` : `Top ${cryptos.length} coins`,
      icon: DollarSign,
      color: 'text-blue-400'
    },
    {
      title: '24h Volume',
      value: formatLargeNumber(globalMetrics?.total_volume_24h || localTotalVolume),
      subtitle: globalMetrics ? `${globalMetrics.active_market_pairs} trading pairs` : 'Trading volume',
      icon: BarChart3,
      color: 'text-purple-400'
    },
    {
      title: 'BTC Dominance',
      value: globalMetrics ? formatPercentage(globalMetrics.btc_dominance) : 'N/A',
      subtitle: globalMetrics ? `ETH: ${formatPercentage(globalMetrics.eth_dominance)}` : 'Market dominance',
      icon: TrendingUp,
      color: 'text-orange-400'
    },
    {
      title: 'Market Sentiment',
      value: `${gainers}/${losers}`,
      subtitle: 'Gainers/Losers',
      icon: gainers > losers ? TrendingUp : TrendingDown,
      color: gainers > losers ? 'text-green-400' : 'text-red-400'
    }
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Market Overview</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={refreshData}
          disabled={loading}
          className="flex items-center space-x-2"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </Button>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.title} className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>
                </div>
                <Icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </div>
          )
        })}
      </div>

      {globalMetrics && (
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <span className="text-gray-400">Active Exchanges:</span>
              <span className="text-white font-medium">{globalMetrics.active_exchanges}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-400">Total Cryptocurrencies:</span>
              <span className="text-white font-medium">{globalMetrics.total_cryptocurrencies.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}