interface RecentTradesProps {
  crypto: any
}

export const RecentTrades = ({ crypto }: RecentTradesProps) => {
  // Generate mock recent trades
  const generateRecentTrades = () => {
    const trades = []
    const basePrice = crypto.quote.USD.price

    for (let i = 0; i < 20; i++) {
      const variation = (Math.random() - 0.5) * 0.02
      const price = basePrice * (1 + variation)
      const amount = Math.random() * 5
      const time = new Date(Date.now() - i * 60000)

      trades.push({
        id: i,
        price,
        amount,
        time,
        side: Math.random() > 0.5 ? 'buy' : 'sell'
      })
    }

    return trades
  }

  const recentTrades = generateRecentTrades()

  const formatPrice = (price: number) => {
    return price.toFixed(2)
  }

  const formatAmount = (amount: number) => {
    return amount.toFixed(4)
  }

  const formatTime = (time: Date) => {
    return time.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    })
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Recent Trades</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-xs text-gray-400 border-b border-gray-700">
              <th className="text-left py-2">Time</th>
              <th className="text-left py-2">Price (USD)</th>
              <th className="text-left py-2">Amount ({crypto.symbol})</th>
              <th className="text-left py-2">Side</th>
            </tr>
          </thead>
          <tbody>
            {recentTrades.map((trade) => (
              <tr key={trade.id} className="text-sm border-b border-gray-700/50">
                <td className="py-2 text-gray-400">{formatTime(trade.time)}</td>
                <td className={`py-2 ${trade.side === 'buy' ? 'text-green-400' : 'text-red-400'}`}>
                  {formatPrice(trade.price)}
                </td>
                <td className="py-2 text-white">{formatAmount(trade.amount)}</td>
                <td className="py-2">
                  <span className={`px-2 py-1 rounded text-xs ${
                    trade.side === 'buy' 
                      ? 'bg-green-600/20 text-green-400' 
                      : 'bg-red-600/20 text-red-400'
                  }`}>
                    {trade.side.toUpperCase()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}