import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCrypto } from '../contexts/CryptoContext'
import { ArrowUpDown, TrendingUp, TrendingDown, Star } from 'lucide-react'
import { Button } from './ui/button'

export const CryptoTable = () => {
  const { cryptos, setSelectedCrypto } = useCrypto()
  const navigate = useNavigate()
  const [sortBy, setSortBy] = useState<'rank' | 'price' | 'change24h' | 'marketCap' | 'volume'>('rank')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [favorites, setFavorites] = useState<Set<number>>(new Set())

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: price < 1 ? 6 : 2
    }).format(price)
  }

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e12) return `$${(marketCap / 1e12).toFixed(2)}T`
    if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(2)}B`
    if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}M`
    return `$${marketCap.toFixed(0)}`
  }

  const formatVolume = (volume: number) => {
    if (volume >= 1e9) return `$${(volume / 1e9).toFixed(2)}B`
    if (volume >= 1e6) return `$${(volume / 1e6).toFixed(2)}M`
    if (volume >= 1e3) return `$${(volume / 1e3).toFixed(2)}K`
    return `$${volume.toFixed(0)}`
  }

  const handleSort = (column: typeof sortBy) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortOrder('asc')
    }
  }

  const handleRowClick = (crypto: any) => {
    setSelectedCrypto(crypto)
    navigate(`/trading/${crypto.symbol}`)
  }

  const toggleFavorite = (cryptoId: number, event: React.MouseEvent) => {
    event.stopPropagation()
    const newFavorites = new Set(favorites)
    if (favorites.has(cryptoId)) {
      newFavorites.delete(cryptoId)
    } else {
      newFavorites.add(cryptoId)
    }
    setFavorites(newFavorites)
  }

  const sortedCryptos = [...cryptos].sort((a, b) => {
    let aValue, bValue
    
    switch (sortBy) {
      case 'price':
        aValue = a.quote.USD.price
        bValue = b.quote.USD.price
        break
      case 'change24h':
        aValue = a.quote.USD.percent_change_24h
        bValue = b.quote.USD.percent_change_24h
        break
      case 'marketCap':
        aValue = a.quote.USD.market_cap
        bValue = b.quote.USD.market_cap
        break
      case 'volume':
        aValue = a.quote.USD.volume_24h
        bValue = b.quote.USD.volume_24h
        break
      default:
        aValue = a.cmc_rank || a.id
        bValue = b.cmc_rank || b.id
    }

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-white">Top Cryptocurrencies</h3>
        <p className="text-sm text-gray-400">Real-time data from CoinMarketCap</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('rank')}
                  className="text-gray-300 hover:text-white p-0"
                >
                  Rank <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('price')}
                  className="text-gray-300 hover:text-white p-0"
                >
                  Price <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('change24h')}
                  className="text-gray-300 hover:text-white p-0"
                >
                  24h Change <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('volume')}
                  className="text-gray-300 hover:text-white p-0"
                >
                  Volume (24h) <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('marketCap')}
                  className="text-gray-300 hover:text-white p-0"
                >
                  Market Cap <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {sortedCryptos.map((crypto) => (
              <tr
                key={crypto.id}
                className="hover:bg-gray-700 cursor-pointer transition-colors"
                onClick={() => handleRowClick(crypto)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => toggleFavorite(crypto.id, e)}
                      className="text-gray-400 hover:text-yellow-400 transition-colors"
                    >
                      <Star 
                        className={`h-4 w-4 ${favorites.has(crypto.id) ? 'fill-yellow-400 text-yellow-400' : ''}`} 
                      />
                    </button>
                    <span>{crypto.cmc_rank || crypto.id}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 bg-gray-600 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-white">
                        {crypto.symbol.charAt(0)}
                      </span>
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-white">{crypto.name}</div>
                      <div className="text-sm text-gray-400">{crypto.symbol}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-medium">
                  {formatPrice(crypto.quote.USD.price)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className={`flex items-center ${
                    crypto.quote.USD.percent_change_24h >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {crypto.quote.USD.percent_change_24h >= 0 ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    )}
                    {Math.abs(crypto.quote.USD.percent_change_24h).toFixed(2)}%
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {formatVolume(crypto.quote.USD.volume_24h)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {formatMarketCap(crypto.quote.USD.market_cap)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRowClick(crypto)
                    }}
                  >
                    Trade
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}