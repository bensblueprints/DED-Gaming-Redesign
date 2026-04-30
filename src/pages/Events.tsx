import { Link } from 'react-router-dom'
import { Check, ArrowRight } from 'lucide-react'
import PageHeader from '@/components/PageHeader'
import SectionHeading from '@/components/SectionHeading'
import ScrollReveal from '@/components/ScrollReveal'
import EventCard from '@/components/EventCard'
import { events } from '@/data/events'

export default function Events() {
  return (
    <div>
      <PageHeader
        title="Tournaments & Events"
        subtitle="Compete, connect, and level up your game."
        image="/images/events-stage.jpg"
      />

      {/* Event Listings */}
      <section className="section-padding">
        <div className="container-main">
          <SectionHeading
            eyebrow="Upcoming Events"
            heading="Mark your calendar"
            centered
          />
          <ScrollReveal stagger={0.12} childSelector=".event-card">
            <div className="space-y-6 max-w-[800px] mx-auto">
              {events.map(event => (
                <div key={event.id} className="event-card">
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Host Your Own Event */}
      <section className="section-padding bg-ded-surface/50">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <div>
                <h2 className="font-display text-3xl md:text-[40px] font-semibold text-white leading-tight mb-4">
                  Host Your Own Tournament
                </h2>
                <p className="text-ded-text-secondary leading-relaxed mb-6">
                  Birthday parties, corporate team building, or a private competition with friends — we'll help you plan an unforgettable event.
                </p>
                <ul className="space-y-3 mb-8">
                  {['Custom tournament brackets', 'Reserved gaming stations', 'Catering options available', 'Dedicated event coordinator'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-ded-text-secondary">
                      <Check className="w-5 h-5 text-ded-accent-cyan flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/book"
                  className="inline-flex items-center gap-2 px-7 py-3 bg-ded-accent-blue text-white font-semibold text-sm rounded-lg hover:bg-[#3B82F6] hover:-translate-y-0.5 transition-all duration-200"
                >
                  Book an Event <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <img
                src="/images/lounge-private.jpg"
                alt="Private Event Setup"
                className="rounded-lg w-full object-cover"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  )
}
