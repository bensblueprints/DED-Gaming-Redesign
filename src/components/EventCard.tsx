import { Calendar, MapPin } from 'lucide-react'
import type { Event } from '@/data/events'

interface EventCardProps {
  event: Event
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <div className="bg-ded-surface rounded-xl border border-ded-border overflow-hidden flex flex-col md:flex-row transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover hover:border-ded-accent-blue/60">
      <div className="md:w-[200px] h-[160px] md:h-auto flex-shrink-0">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover md:rounded-l-xl"
        />
      </div>
      <div className="p-5 md:p-6 flex-1 flex flex-col justify-center">
        <h3 className="font-display text-lg md:text-xl font-semibold text-white">{event.title}</h3>
        <div className="flex items-center gap-2 mt-2 text-ded-text-secondary">
          <Calendar className="w-4 h-4 text-ded-text-muted" />
          <span className="text-sm">{event.date} @ {event.time}</span>
        </div>
        <div className="flex items-center gap-2 mt-1 text-ded-text-secondary">
          <MapPin className="w-4 h-4 text-ded-text-muted" />
          <span className="text-sm">{event.location}</span>
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-ded-accent-blue text-white text-xs font-semibold">
            ${event.cost} Entry
          </span>
          <button className="px-4 py-2 bg-ded-accent-blue text-white text-sm font-medium rounded-lg hover:bg-[#3B82F6] hover:-translate-y-0.5 transition-all duration-200">
            Register
          </button>
        </div>
      </div>
    </div>
  )
}
