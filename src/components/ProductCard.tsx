import { useState } from 'react'
import { Check } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import type { Product } from '@/data/products'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useApp()
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="bg-ded-surface rounded-xl border border-ded-border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover hover:border-ded-accent-blue/60">
      <div className="aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h4 className="text-sm font-medium text-white">{product.name}</h4>
        <p className="text-sm text-ded-accent-blue mt-1">${product.price.toFixed(2)}</p>
        <button
          onClick={handleAdd}
          className={`w-full mt-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            added
              ? 'bg-ded-accent-cyan text-white'
              : 'border border-ded-accent-blue text-ded-accent-blue hover:bg-ded-accent-blue hover:text-white'
          }`}
        >
          {added ? (
            <span className="flex items-center justify-center gap-1">
              <Check className="w-4 h-4" /> Added
            </span>
          ) : (
            'Add to Order'
          )}
        </button>
      </div>
    </div>
  )
}
