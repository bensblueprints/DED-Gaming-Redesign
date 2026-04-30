import { useState } from 'react'
import type { Coach } from '@/data/coaches'

interface CoachCardProps {
  coach: Coach
}

export default function CoachCard({ coach }: CoachCardProps) {
  const [booked, setBooked] = useState(false)

  const handleBook = () => {
    setBooked(true)
    setTimeout(() => setBooked(false), 2000)
  }

  return (
    <div className="bg-ded-surface rounded-xl border border-ded-border p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover hover:border-ded-accent-blue/60 group">
      <div className="relative w-20 h-20 mx-auto mb-4 overflow-hidden rounded-full border-[3px] border-ded-accent-blue group-hover:scale-105 transition-transform duration-300">
        <img
          src={coach.image}
          alt={coach.name}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="font-display text-lg font-semibold text-white">{coach.name}</h3>
      <div className="flex flex-wrap justify-center gap-1.5 mt-2">
        {coach.specialties.map(s => (
          <span key={s} className="px-2.5 py-0.5 bg-ded-surface-light text-ded-text-secondary text-xs rounded">
            {s}
          </span>
        ))}
      </div>
      <div className="mt-3">
        <span className="font-display text-xl font-bold text-ded-accent-cyan">${coach.rate}</span>
        <span className="text-sm text-ded-text-muted">/hr</span>
      </div>
      <button
        onClick={handleBook}
        className={`mt-4 px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
          booked
            ? 'bg-ded-accent-cyan text-white'
            : 'border border-ded-accent-blue text-ded-accent-blue hover:bg-ded-accent-blue hover:text-white'
        }`}
      >
        {booked ? 'Requested!' : 'Book Session'}
      </button>
    </div>
  )
}
