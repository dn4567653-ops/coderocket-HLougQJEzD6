import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface TradingChartProps {
  crypto: any
}

export const TradingChart = ({ crypto }: TradingChartProps) => {
  // Generate mock chart data
  const generateChartData = () => {
    const data = []
    const basePrice = crypto.quote.USD.price
    const now = new Date()
    
    for (let i = 23; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 60 * 60 * 1000)
      const variation = (Math.random() - 0.5) * 0.1
      const price = basePrice * (1 + variation)
      
      data.push({
        time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        price: price,
        volume: Math.random() * 1000000
      })
    }
    
    return data
  }

  const chartData = generateChartData()

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">{crypto.symbol}/USD Chart</h3>
        <div className="flex space-x-2">
          {['1H', '4H', '1D', '1W', '1M'].map((timeframe) => (
            <button
              key={timeframe}
              className="px-3 py-1 text-sm bg-gray-700 text-gray-300 rounded hover:bg-gray-600 hover:text-white transition-colors"
            >
              {timeframe}
            </button>
          ))}
        </div>
      </div>
      
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="time" 
              stroke="#9CA3AF"
              fontSize={12}
            />
            <YAxis 
              stroke="#9CA3AF"
              fontSize={12}
              domain={['dataMin - 100', 'dataMax + 100']}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#F9FAFB'
              }}
              formatter={(value: any) => [
                new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD'
                }).format(value),
                'Price'
              ]}
            />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke="#EAB308" 
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}