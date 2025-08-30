import { useParams } from 'react-router-dom'
import { useCrypto } from '../contexts/CryptoContext'
import { TradingChart } from './TradingChart'
import { OrderBook } from './OrderBook'
import { TradingForm } from './TradingForm'
import { RecentTrades } from './RecentTrades'

export const Trading = () => {
  const { symbol } = useParams<{ symbol: string }>()
  const { cryptos, selectedCrypto } = useCrypto()

  const currentCrypto = selectedCrypto || cryptos.find(crypto => crypto.symbol === symbol) || cryptos[0]

  if (!currentCrypto) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">No cryptocurrency selected</h2>
          <p className="text-gray-400">Please select a cryptocurrency to start trading</p>
        </div>
      </div>
    )
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: price < 1 ? 6 : 2
    }).format(price)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Trading Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gray-600 rounded-full flex items-center justify-center">
                <span className="text-lg font-bold text-white">
                  {currentCrypto.symbol.charAt(0)}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{currentCrypto.name}</h1>
                <p className="text-gray-400">{currentCrypto.symbol}/USD</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">
                {formatPrice(currentCrypto.quote.USD.price)}
              </div>
              <div className={`text-sm ${
                currentCrypto.quote.USD.percent_change_24h >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {currentCrypto.quote.USD.percent_change_24h >= 0 ? '+' : ''}
                {currentCrypto.quote.USD.percent_change_24h.toFixed(2)}% (24h)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trading Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chart Section */}
        <div className="lg:col-span-3">
          <TradingChart crypto={currentCrypto} />
        </div>

        {/* Trading Panel */}
        <div className="lg:col-span-1 space-y-6">
          <TradingForm crypto={currentCrypto} />
          <OrderBook crypto={currentCrypto} />
        </div>
      </div>

      {/* Recent Trades */}
      <div className="mt-6">
        <RecentTrades crypto={currentCrypto} />
      </div>
    </div>
  )
}