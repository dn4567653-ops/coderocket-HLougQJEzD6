interface OrderBookProps {
  crypto: any
}

export const OrderBook = ({ crypto }: OrderBookProps) => {
  // Generate mock order book data
  const generateOrderBook = () => {
    const basePrice = crypto.quote.USD.price
    const bids = []
    const asks = []

    for (let i = 0; i < 10; i++) {
      bids.push({
        price: basePrice - (i + 1) * (basePrice * 0.001),
        amount: Math.random() * 10,
        total: 0
      })
      
      asks.push({
        price: basePrice + (i + 1) * (basePrice * 0.001),
        amount: Math.random() * 10,
        total: 0
      })
    }

    return { bids, asks }
  }

  const { bids, asks } = generateOrderBook()

  const formatPrice = (price: number) => {
    return price.toFixed(2)
  }

  const formatAmount = (amount: number) => {
    return amount.toFixed(4)
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Order Book</h3>
      
      <div className="space-y-4">
        {/* Asks (Sell Orders) */}
        <div>
          <div className="grid grid-cols-3 gap-2 text-xs text-gray-400 mb-2">
            <span>Price (USD)</span>
            <span>Amount</span>
            <span>Total</span>
          </div>
          <div className="space-y-1">
            {asks.slice(0, 5).reverse().map((ask, index) => (
              <div key={index} className="grid grid-cols-3 gap-2 text-xs">
                <span className="text-red-400">{formatPrice(ask.price)}</span>
                <span className="text-white">{formatAmount(ask.amount)}</span>
                <span className="text-gray-400">{formatAmount(ask.amount)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Current Price */}
        <div className="text-center py-2 border-t border-b border-gray-700">
          <div className="text-lg font-bold text-white">
            {formatPrice(crypto.quote.USD.price)}
          </div>
          <div className={`text-xs ${
            crypto.quote.USD.percent_change_24h >= 0 ? 'text-green-400' : 'text-red-400'
          }`}>
            {crypto.quote.USD.percent_change_24h >= 0 ? '+' : ''}
            {crypto.quote.USD.percent_change_24h.toFixed(2)}%
          </div>
        </div>

        {/* Bids (Buy Orders) */}
        <div>
          <div className="space-y-1">
            {bids.slice(0, 5).map((bid, index) => (
              <div key={index} className="grid grid-cols-3 gap-2 text-xs">
                <span className="text-green-400">{formatPrice(bid.price)}</span>
                <span className="text-white">{formatAmount(bid.amount)}</span>
                <span className="text-gray-400">{formatAmount(bid.amount)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}