import { useState } from 'react'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import PageHeader from '@/components/PageHeader'
import ScrollReveal from '@/components/ScrollReveal'
import ProductCard from '@/components/ProductCard'
import { products, productCategories } from '@/data/products'
import { useApp } from '@/context/AppContext'

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState('All Items')
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useApp()

  const filteredProducts = activeCategory === 'All Items'
    ? products
    : products.filter(p => p.category === activeCategory)

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
              {/* Categories */}
              <div className="flex flex-wrap gap-2 mb-8">
                {productCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-250 ${
                      activeCategory === cat
                        ? 'bg-ded-accent-blue text-white'
                        : 'bg-ded-surface text-ded-text-secondary hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <ScrollReveal stagger={0.08} childSelector=".product-card">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                    <div key={product.id} className="product-card">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:w-[320px] flex-shrink-0">
              <div className="sticky top-24 bg-ded-surface rounded-xl border border-ded-border p-6">
                <h3 className="font-display text-lg font-semibold text-white mb-4">Your Order</h3>
                
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
  )
}
