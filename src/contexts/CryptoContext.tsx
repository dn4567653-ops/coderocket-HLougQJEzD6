import React, { createContext, useContext, useState, useEffect } from 'react'

interface CryptoData {
  id: number
  name: string
  symbol: string
  slug: string
  cmc_rank: number
  quote: {
    USD: {
      price: number
      percent_change_24h: number
      percent_change_7d: number
      market_cap: number
      volume_24h: number
      circulating_supply: number
      total_supply: number
      max_supply: number | null
      last_updated: string
    }
  }
}

interface GlobalMetrics {
  active_cryptocurrencies: number
  total_cryptocurrencies: number
  active_market_pairs: number
  active_exchanges: number
  total_market_cap: number
  total_volume_24h: number
  btc_dominance: number
  eth_dominance: number
}

interface CryptoContextType {
  cryptos: CryptoData[]
  globalMetrics: GlobalMetrics | null
  loading: boolean
  error: string | null
  selectedCrypto: CryptoData | null
  setSelectedCrypto: (crypto: CryptoData | null) => void
  refreshData: () => void
}

const CryptoContext = createContext<CryptoContextType | undefined>(undefined)

export const useCrypto = () => {
  const context = useContext(CryptoContext)
  if (!context) {
    throw new Error('useCrypto must be used within a CryptoProvider')
  }
  return context
}

// API configuration
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-deployed-backend.com/api' 
  : 'http://localhost:3001/api'

export const CryptoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cryptos, setCryptos] = useState<CryptoData[]>([])
  const [globalMetrics, setGlobalMetrics] = useState<GlobalMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoData | null>(null)

  const generateFallbackData = (): CryptoData[] => {
    const mockCryptos = [
      { name: 'Bitcoin', symbol: 'BTC', basePrice: 43000, rank: 1 },
      { name: 'Ethereum', symbol: 'ETH', basePrice: 2600, rank: 2 },
      { name: 'Tether', symbol: 'USDT', basePrice: 1.00, rank: 3 },
      { name: 'BNB', symbol: 'BNB', basePrice: 310, rank: 4 },
      { name: 'Solana', symbol: 'SOL', basePrice: 98, rank: 5 },
      { name: 'XRP', symbol: 'XRP', basePrice: 0.63, rank: 6 },
      { name: 'USDC', symbol: 'USDC', basePrice: 1.00, rank: 7 },
      { name: 'Cardano', symbol: 'ADA', basePrice: 0.48, rank: 8 },
      { name: 'Dogecoin', symbol: 'DOGE', basePrice: 0.08, rank: 9 },
      { name: 'Avalanche', symbol: 'AVAX', basePrice: 37, rank: 10 }
    ]

    return mockCryptos.map((crypto, index) => {
      const priceVariation = (Math.random() - 0.5) * 0.05
      const price = crypto.basePrice * (1 + priceVariation)
      
      return {
        id: index + 1,
        name: crypto.name,
        symbol: crypto.symbol,
        slug: crypto.name.toLowerCase().replace(/\s+/g, '-'),
        cmc_rank: crypto.rank,
        quote: {
          USD: {
            price: price,
            percent_change_24h: (Math.random() - 0.5) * 10,
            percent_change_7d: (Math.random() - 0.5) * 20,
            market_cap: price * (Math.random() * 500000000 + 100000000),
            volume_24h: Math.random() * 5000000000,
            circulating_supply: Math.random() * 1000000000,
            total_supply: Math.random() * 1000000000,
            max_supply: Math.random() > 0.5 ? Math.random() * 1000000000 : null,
            last_updated: new Date().toISOString()
          }
        }
      }
    })
  }

  const fetchCryptos = async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch cryptocurrency listings
      const response = await fetch(`${API_BASE_URL}/cryptocurrency/listings/latest?start=1&limit=50&convert=USD`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      if (data.status && data.status.error_code === 0) {
        setCryptos(data.data)
        console.log('Successfully fetched live data from CoinMarketCap API')
      } else {
        throw new Error(data.status?.error_message || 'API returned error')
      }

    } catch (err) {
      console.error('Error fetching live data, using fallback:', err)
      setError('Using demo data - backend server may not be running')
      setCryptos(generateFallbackData())
    } finally {
      setLoading(false)
    }
  }

  const fetchGlobalMetrics = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/global-metrics/quotes/latest?convert=USD`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      if (data.status && data.status.error_code === 0) {
        setGlobalMetrics({
          active_cryptocurrencies: data.data.active_cryptocurrencies,
          total_cryptocurrencies: data.data.total_cryptocurrencies,
          active_market_pairs: data.data.active_market_pairs,
          active_exchanges: data.data.active_exchanges,
          total_market_cap: data.data.quote.USD.total_market_cap,
          total_volume_24h: data.data.quote.USD.total_volume_24h,
          btc_dominance: data.data.btc_dominance,
          eth_dominance: data.data.eth_dominance
        })
      }
    } catch (err) {
      console.error('Error fetching global metrics:', err)
    }
  }

  const refreshData = () => {
    fetchCryptos()
    fetchGlobalMetrics()
  }

  useEffect(() => {
    fetchCryptos()
    fetchGlobalMetrics()

    // Refresh data every 2 minutes
    const interval = setInterval(() => {
      fetchCryptos()
      fetchGlobalMetrics()
    }, 120000)

    return () => clearInterval(interval)
  }, [])

  return (
    <CryptoContext.Provider value={{
      cryptos,
      globalMetrics,
      loading,
      error,
      selectedCrypto,
      setSelectedCrypto,
      refreshData
    }}>
      {children}
    </CryptoContext.Provider>
  )
}