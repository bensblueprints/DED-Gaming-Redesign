import { Check } from 'lucide-react'
import type { MembershipTier } from '@/data/memberships'

interface MembershipCardProps {
  tier: MembershipTier
}

export default function MembershipCard({ tier }: MembershipCardProps) {
  const isFeatured = tier.featured

  return (
    <div
      className={`relative bg-ded-surface rounded-xl p-6 transition-all duration-300 hover:-translate-y-1.5 ${
        isFeatured
          ? 'border-2 border-ded-accent-blue shadow-glow-blue'
          : 'border border-ded-border shadow-card hover:shadow-card-hover'
      }`}
    >
      {isFeatured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-ded-accent-blue text-white text-xs font-semibold px-3 py-1 rounded-full">
          MOST POPULAR
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="font-display text-xl font-semibold text-white">{tier.name}</h3>
        <div className="mt-2 flex items-baseline justify-center gap-1">
          <span className="font-display text-3xl font-bold text-ded-accent-blue">${tier.price}</span>
          <span className="text-sm text-ded-text-muted">/{tier.period}</span>
        </div>
      </div>

      <div className="border-t border-ded-border pt-6 space-y-3">
        {tier.features.map((feature, i) => (
          <div key={i} className="flex items-start gap-3">
            <Check className="w-4 h-4 text-ded-accent-cyan mt-0.5 flex-shrink-0" />
            <span className="text-sm text-ded-text-secondary">{feature}</span>
          </div>
        ))}
      </div>

      <button
        className={`w-full mt-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${
          isFeatured
            ? 'bg-ded-accent-cyan text-white hover:bg-[#0891B2] hover:-translate-y-0.5'
            : 'bg-transparent border border-ded-accent-blue text-ded-accent-blue hover:bg-ded-accent-blue hover:text-white'
        }`}
      >
        {isFeatured ? 'Join Pro' : `Join ${tier.name}`}
      </button>
    </div>
  )
}
