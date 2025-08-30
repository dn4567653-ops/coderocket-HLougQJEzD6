import { useCrypto } from '../contexts/CryptoContext'
import { CryptoTable } from './CryptoTable'
import { MarketOverview } from './MarketOverview'
import { TrendingCoins } from './TrendingCoins'

export const Dashboard = () => {
  const { loading, error } = useCrypto()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-500"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Cryptocurrency Markets</h1>
        <p className="text-gray-400">Track the top 50 cryptocurrencies by market cap</p>
        {error && (
          <div className="mt-2 p-3 bg-yellow-900/50 border border-yellow-600 rounded-lg">
            <p className="text-yellow-400 text-sm">
              Note: Using simulated data for demonstration. In production, this would connect to live CoinMarketCap API through a backend service.
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <div className="lg:col-span-3">
          <MarketOverview />
        </div>
        <div className="lg:col-span-1">
          <TrendingCoins />
        </div>
      </div>

      <CryptoTable />
    </div>
  )
}