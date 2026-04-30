import { useState } from 'react'
import { Minus, Plus, Trash2, ShoppingBag, X } from 'lucide-react'
import Chip from '@mui/material/Chip'
import { Rate } from 'antd'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import PageHeader from '@/components/PageHeader'
import ScrollReveal from '@/components/ScrollReveal'
import ProductCard from '@/components/ProductCard'
import { products, productCategories } from '@/data/products'
import { useApp } from '@/context/AppContext'

const ratings: Record<string, number> = {
  '1': 4.5, '2': 4.2, '3': 4.0, '4': 4.8, '5': 4.7,
  '6': 4.3, '7': 4.1, '8': 4.6, '9': 4.0, '10': 3.8, '11': 4.2, '12': 4.1,
}

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState('All Items')
  const [sortBy, setSortBy] = useState<'name' | 'price-low' | 'price-high'>('name')
  const [cartOpen, setCartOpen] = useState(false)
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useApp()

  const filteredProducts = activeCategory === 'All Items'
    ? products
    : products.filter(p => p.category === activeCategory)

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price
    if (sortBy === 'price-high') return b.price - a.price
    return a.name.localeCompare(b.name)
  })

  const tax = cartTotal * 0.08875
  const total = cartTotal + tax

  return (
    <div>
      <PageHeader
        title="Order & Refuel"
        subtitle="Food, drinks, and gaming essentials — delivered right to your station."
        image="/images/food-spread.jpg"
      />

      <div className="section-padding">
        <div className="container-main">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Products */}
            <div className="flex-1">
              {/* Filters */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div className="flex flex-wrap gap-2">
                  {productCategories.map(cat => (
                    <Chip
                      key={cat}
                      label={cat}
                      onClick={() => setActiveCategory(cat)}
                      sx={{
                        backgroundColor: activeCategory === cat ? '#2563EB' : '#0B1221',
                        color: activeCategory === cat ? '#FFFFFF' : '#CBD5E1',
                        border: '1px solid',
                        borderColor: activeCategory === cat ? '#2563EB' : 'rgba(30, 58, 138, 0.3)',
                        borderRadius: '9999px',
                        fontWeight: 500,
                        fontSize: '0.8125rem',
                        '&:hover': {
                          backgroundColor: activeCategory === cat ? '#3B82F6' : '#111D35',
                        },
                      }}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-ded-text-muted">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value as typeof sortBy)}
                    className="bg-ded-surface border border-ded-border rounded-lg px-3 py-1.5 text-sm text-white focus:border-ded-accent-blue focus:outline-none"
                  >
                    <option value="name">Name</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>

              {/* Product Grid */}
              <ScrollReveal stagger={0.08} childSelector=".product-card">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {sortedProducts.map(product => (
                    <div key={product.id} className="product-card">
                      <div className="relative">
                        <ProductCard product={product} />
                        <div className="absolute top-3 left-3">
                          <Rate
                            allowHalf
                            disabled
                            defaultValue={ratings[product.id] || 4}
                            className="text-[10px] [&_.ant-rate-star]:text-ded-accent-cyan [&_.ant-rate-star]:mr-0.5"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            {/* Cart Drawer Trigger + Order Summary Sidebar (desktop) */}
            <div className="lg:w-[320px] flex-shrink-0">
              <div className="lg:sticky lg:top-24">
                {/* Mobile Cart Button */}
                <div className="lg:hidden mb-4">
                  <Drawer open={cartOpen} onOpenChange={setCartOpen} direction="right">
                    <DrawerTrigger asChild>
                      <Button className="w-full bg-ded-accent-blue hover:bg-[#3B82F6] text-white">
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        View Cart ({cartCount})
                      </Button>
                    </DrawerTrigger>
                    <DrawerContent className="bg-ded-surface border-l-ded-border w-full sm:max-w-sm">
                      <DrawerHeader>
                        <DrawerTitle className="text-white font-display">Your Order</DrawerTitle>
                        <DrawerDescription className="text-ded-text-muted">
                          {cartCount} items in cart
                        </DrawerDescription>
                      </DrawerHeader>
                      <div className="p-4 flex-1 overflow-y-auto">
                        {cart.length === 0 ? (
                          <div className="text-center py-8">
                            <ShoppingBag className="w-10 h-10 text-ded-text-muted mx-auto mb-3" />
                            <p className="text-sm text-ded-text-muted">Your order is empty</p>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {cart.map(item => (
                              <div key={item.id} className="flex items-center gap-3 bg-ded-bg rounded-lg p-3">
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm text-white truncate">{item.name}</p>
                                  <p className="text-xs text-ded-accent-blue">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                                <div className="flex items-center gap-1">
                                  <button
                                    onClick={() => updateQuantity(item.id, -1)}
                                    className="w-6 h-6 flex items-center justify-center bg-ded-surface-light rounded text-ded-text-secondary hover:text-white"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <span className="w-6 text-center text-sm text-white">{item.quantity}</span>
                                  <button
                                    onClick={() => updateQuantity(item.id, 1)}
                                    className="w-6 h-6 flex items-center justify-center bg-ded-surface-light rounded text-ded-text-secondary hover:text-white"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                  <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="ml-1 text-ded-text-muted hover:text-red-400"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      {cart.length > 0 && (
                        <DrawerFooter className="border-t border-ded-border">
                          <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-sm">
                              <span className="text-ded-text-secondary">Subtotal</span>
                              <span className="text-white">${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-ded-text-secondary">Tax (8.875%)</span>
                              <span className="text-white">${tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-semibold">
                              <span className="text-white">Total</span>
                              <span className="font-display text-xl font-bold text-ded-accent-blue">${total.toFixed(2)}</span>
                            </div>
                          </div>
                          <Button className="w-full bg-ded-accent-blue hover:bg-[#3B82F6] text-white">
                            Place Order ({cartCount})
                          </Button>
                          <DrawerClose asChild>
                            <Button variant="outline" className="w-full border-ded-border text-ded-text-secondary hover:text-white hover:bg-ded-surface-light">
                              <X className="w-4 h-4 mr-1" /> Close
                            </Button>
                          </DrawerClose>
                        </DrawerFooter>
                      )}
                    </DrawerContent>
                  </Drawer>
                </div>

                {/* Desktop Sidebar */}
                <div className="hidden lg:block bg-ded-surface rounded-xl border border-ded-border p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display text-lg font-semibold text-white">Your Order</h3>
                    <span className="text-xs text-ded-text-muted">{cartCount} items</span>
                  </div>

                  {cart.length === 0 ? (
                    <div className="text-center py-8">
                      <ShoppingBag className="w-10 h-10 text-ded-text-muted mx-auto mb-3" />
                      <p className="text-sm text-ded-text-muted">Your order is empty</p>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-3 max-h-[300px] overflow-y-auto">
                        {cart.map(item => (
                          <div key={item.id} className="flex items-center gap-3">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-white truncate">{item.name}</p>
                              <p className="text-xs text-ded-accent-blue">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-6 h-6 flex items-center justify-center bg-ded-surface-light rounded text-ded-text-secondary hover:text-white"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-6 text-center text-sm text-white">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-6 h-6 flex items-center justify-center bg-ded-surface-light rounded text-ded-text-secondary hover:text-white"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="ml-1 text-ded-text-muted hover:text-red-400"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-ded-border mt-4 pt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-ded-text-secondary">Subtotal</span>
                          <span className="text-white">${cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-ded-text-secondary">Tax (8.875%)</span>
                          <span className="text-white">${tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-semibold">
                          <span className="text-white">Total</span>
                          <span className="font-display text-xl font-bold text-ded-accent-blue">${total.toFixed(2)}</span>
                        </div>
                      </div>

                      <button className="w-full mt-4 bg-ded-accent-blue text-white font-semibold text-sm py-3 rounded-lg hover:bg-[#3B82F6] transition-colors">
                        Place Order ({cartCount})
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
