import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

interface AssetAllocationProps {
  assets: Array<{
    symbol: string
    name: string
    value: number
  }>
}

export const AssetAllocation = ({ assets }: AssetAllocationProps) => {
  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0)
  
  const chartData = assets.map(asset => ({
    name: asset.symbol,
    value: asset.value,
    percentage: ((asset.value / totalValue) * 100).toFixed(1)
  }))

  const COLORS = ['#EAB308', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-white mb-6">Asset Allocation</h3>
      
      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#F9FAFB'
              }}
              formatter={(value: any) => [formatPrice(value), 'Value']}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-3">
        {chartData.map((asset, index) => (
          <div key={asset.name} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-sm font-medium text-white">{asset.name}</span>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-white">{asset.percentage}%</div>
              <div className="text-xs text-gray-400">{formatPrice(asset.value)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}