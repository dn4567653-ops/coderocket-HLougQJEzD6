import { useCrypto } from '../contexts/CryptoContext'
import { TrendingUp, TrendingDown } from 'lucide-react'

export const TrendingCoins = () => {
  const { cryptos } = useCrypto()

  const topGainers = cryptos
    .filter(crypto => crypto.quote.USD.percent_change_24h > 0)
    .sort((a, b) => b.quote.USD.percent_change_24h - a.quote.USD.percent_change_24h)
    .slice(0, 5)

  const topLosers = cryptos
    .filter(crypto => crypto.quote.USD.percent_change_24h < 0)
    .sort((a, b) => a.quote.USD.percent_change_24h - b.quote.USD.percent_change_24h)
    .slice(0, 5)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: price < 1 ? 6 : 2
    }).format(price)
  }

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <TrendingUp className="h-5 w-5 text-green-400 mr-2" />
          <h3 className="text-lg font-semibold text-white">Top Gainers</h3>
        </div>
        <div className="space-y-3">
          {topGainers.map((crypto) => (
            <div key={crypto.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-6 w-6 bg-gray-600 rounded-full flex items-center justify-center mr-3">
                  <span className="text-xs font-bold text-white">
                    {crypto.symbol.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-medium text-white">{crypto.symbol}</div>
                  <div className="text-xs text-gray-400">{formatPrice(crypto.quote.USD.price)}</div>
                </div>
              </div>
              <div className="text-sm text-green-400 font-medium">
                +{crypto.quote.USD.percent_change_24h.toFixed(2)}%
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <TrendingDown className="h-5 w-5 text-red-400 mr-2" />
          <h3 className="text-lg font-semibold text-white">Top Losers</h3>
        </div>
        <div className="space-y-3">
          {topLosers.map((crypto) => (
            <div key={crypto.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-6 w-6 bg-gray-600 rounded-full flex items-center justify-center mr-3">
                  <span className="text-xs font-bold text-white">
                    {crypto.symbol.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-medium text-white">{crypto.symbol}</div>
                  <div className="text-xs text-gray-400">{formatPrice(crypto.quote.USD.price)}</div>
                </div>
              </div>
              <div className="text-sm text-red-400 font-medium">
                {crypto.quote.USD.percent_change_24h.toFixed(2)}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}