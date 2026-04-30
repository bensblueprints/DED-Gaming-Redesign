import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  category: string
}

interface AppContextType {
  // Auth
  isLoggedIn: boolean
  user: { name: string; email: string; gamerTag: string } | null
  login: () => void
  logout: () => void
  
  // Login Modal
  isLoginOpen: boolean
  openLogin: () => void
  closeLogin: () => void
  
  // Cart
  cart: CartItem[]
  addToCart: (item: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, delta: number) => void
  clearCart: () => void
  cartTotal: number
  cartCount: number
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<{ name: string; email: string; gamerTag: string } | null>(null)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [cart, setCart] = useState<CartItem[]>([])

  const login = useCallback(() => {
    setIsLoggedIn(true)
    setUser({ name: 'Alex Chen', email: 'alex@example.com', gamerTag: 'DED_Alex' })
    setIsLoginOpen(false)
  }, [])

  const logout = useCallback(() => {
    setIsLoggedIn(false)
    setUser(null)
  }, [])

  const openLogin = useCallback(() => setIsLoginOpen(true), [])
  const closeLogin = useCallback(() => setIsLoginOpen(false), [])

  const addToCart = useCallback((item: Omit<CartItem, 'quantity'>) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }, [])

  const removeFromCart = useCallback((id: string) => {
    setCart(prev => prev.filter(i => i.id !== id))
  }, [])

  const updateQuantity = useCallback((id: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.id !== id) return i
      const newQty = i.quantity + delta
      return newQty <= 0 ? null : { ...i, quantity: newQty }
    }).filter(Boolean) as CartItem[])
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <AppContext.Provider value={{
      isLoggedIn, user, login, logout,
      isLoginOpen, openLogin, closeLogin,
      cart, addToCart, removeFromCart, updateQuantity, clearCart,
      cartTotal, cartCount,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
