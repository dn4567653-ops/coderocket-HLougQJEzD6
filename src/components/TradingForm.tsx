import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

interface TradingFormProps {
  crypto: any
}

export const TradingForm = ({ crypto }: TradingFormProps) => {
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market')
  const [amount, setAmount] = useState('')
  const [price, setPrice] = useState(crypto.quote.USD.price.toString())

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: price < 1 ? 6 : 2
    }).format(price)
  }

  const handleBuy = () => {
    console.log('Buy order:', { crypto: crypto.symbol, amount, price, orderType })
  }

  const handleSell = () => {
    console.log('Sell order:', { crypto: crypto.symbol, amount, price, orderType })
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Trade {crypto.symbol}</h3>
      
      <Tabs defaultValue="buy" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-gray-700">
          <TabsTrigger value="buy" className="text-white data-[state=active]:bg-green-600">
            Buy
          </TabsTrigger>
          <TabsTrigger value="sell" className="text-white data-[state=active]:bg-red-600">
            Sell
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="buy" className="space-y-4 mt-4">
          <div className="space-y-4">
            <div className="flex space-x-2">
              <Button
                variant={orderType === 'market' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setOrderType('market')}
                className="flex-1"
              >
                Market
              </Button>
              <Button
                variant={orderType === 'limit' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setOrderType('limit')}
                className="flex-1"
              >
                Limit
              </Button>
            </div>

            {orderType === 'limit' && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Price (USD)
                </label>
                <Input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Amount ({crypto.symbol})
              </label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <div className="text-sm text-gray-400">
              <div className="flex justify-between">
                <span>Current Price:</span>
                <span>{formatPrice(crypto.quote.USD.price)}</span>
              </div>
              <div className="flex justify-between">
                <span>Total:</span>
                <span>
                  {amount && price ? 
                    formatPrice(parseFloat(amount) * parseFloat(price)) : 
                    '$0.00'
                  }
                </span>
              </div>
            </div>

            <Button onClick={handleBuy} className="w-full bg-green-600 hover:bg-green-700">
              Buy {crypto.symbol}
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="sell" className="space-y-4 mt-4">
          <div className="space-y-4">
            <div className="flex space-x-2">
              <Button
                variant={orderType === 'market' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setOrderType('market')}
                className="flex-1"
              >
                Market
              </Button>
              <Button
                variant={orderType === 'limit' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setOrderType('limit')}
                className="flex-1"
              >
                Limit
              </Button>
            </div>

            {orderType === 'limit' && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Price (USD)
                </label>
                <Input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Amount ({crypto.symbol})
              </label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <div className="text-sm text-gray-400">
              <div className="flex justify-between">
                <span>Current Price:</span>
                <span>{formatPrice(crypto.quote.USD.price)}</span>
              </div>
              <div className="flex justify-between">
                <span>Total:</span>
                <span>
                  {amount && price ? 
                    formatPrice(parseFloat(amount) * parseFloat(price)) : 
                    '$0.00'
                  }
                </span>
              </div>
            </div>

            <Button onClick={handleSell} className="w-full bg-red-600 hover:bg-red-700">
              Sell {crypto.symbol}
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}