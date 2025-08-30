import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Dashboard } from './components/Dashboard'
import { Trading } from './components/Trading'
import { Portfolio } from './components/Portfolio'
import { CryptoProvider } from './contexts/CryptoContext'

function App() {
  return (
    <CryptoProvider>
      <Router>
        <div className="min-h-screen bg-gray-900 text-white">
          <Navbar />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/trading/:symbol?" element={<Trading />} />
              <Route path="/portfolio" element={<Portfolio />} />
            </Routes>
          </main>
        </div>
      </Router>
    </CryptoProvider>
  )
}

export default App