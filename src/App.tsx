import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AppProvider } from '@/context/AppContext'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import LoginModal from '@/components/LoginModal'
import Home from '@/pages/Home'
import Games from '@/pages/Games'
import Events from '@/pages/Events'
import Coaching from '@/pages/Coaching'
import Book from '@/pages/Book'
import Shop from '@/pages/Shop'
import Membership from '@/pages/Membership'
import Account from '@/pages/Account'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <AppProvider>
      <ScrollToTop />
      <div className="min-h-screen bg-ded-bg">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<Games />} />
            <Route path="/events" element={<Events />} />
            <Route path="/coaching" element={<Coaching />} />
            <Route path="/book" element={<Book />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </main>
        <Footer />
        <LoginModal />
      </div>
    </AppProvider>
  )
}
