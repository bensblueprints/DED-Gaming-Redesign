import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Monitor, Users, CalendarDays, Check } from 'lucide-react'
import PageHeader from '@/components/PageHeader'
import ScrollReveal from '@/components/ScrollReveal'

const bookingOptions = [
  {
    icon: Monitor,
    title: 'Gaming Session',
    description: 'Drop in for casual or competitive play. Reserve a PC or console station.',
    price: '$5/hr PC',
    priceNote: '$8/hr Console',
    cta: 'Book Now',
    ctaLink: '#form',
    primary: true,
  },
  {
    icon: Users,
    title: 'Coaching Session',
    description: 'One-on-one training with a pro coach. Available for multiple games.',
    price: 'Starting at $35/hr',
    priceNote: '',
    cta: 'Find a Coach',
    ctaLink: '/coaching',
    primary: false,
  },
  {
    icon: CalendarDays,
    title: 'Private Event',
    description: 'Reserve the entire lounge or a section for your group event.',
    price: 'Custom pricing',
    priceNote: '',
    cta: 'Request Quote',
    ctaLink: '#form',
    primary: false,
  },
]

export default function Book() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    type: 'Gaming Session',
    date: '',
    time: '2PM',
    guests: 1,
    requests: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div>
      <PageHeader
        title="Reserve Your Spot"
        subtitle="Book a gaming station, schedule a coaching session, or reserve the lounge for your event."
        image="/images/about-lounge.jpg"
      />

      {/* Booking Options */}
      <section className="section-padding">
        <div className="container-main">
          <ScrollReveal stagger={0.15} childSelector=".booking-option">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {bookingOptions.map((opt, i) => (
                <div key={i} className="booking-option">
                  <div className="bg-ded-surface rounded-xl border border-ded-border p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover hover:border-ded-accent-blue/60 h-full flex flex-col">
                    <opt.icon className="w-12 h-12 text-ded-accent-blue mx-auto mb-4" />
                    <h3 className="font-display text-xl font-semibold text-white">{opt.title}</h3>
                    <p className="mt-2 text-sm text-ded-text-secondary flex-1">{opt.description}</p>
                    <div className="mt-4">
                      <div className="font-display text-xl font-bold text-ded-accent-cyan">{opt.price}</div>
                      {opt.priceNote && <div className="text-xs text-ded-text-muted">{opt.priceNote}</div>}
                    </div>
                    <Link
                      to={opt.ctaLink}
                      className={`mt-6 inline-block px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                        opt.primary
                          ? 'bg-ded-accent-blue text-white hover:bg-[#3B82F6]'
                          : 'border border-ded-accent-blue text-ded-accent-blue hover:bg-ded-accent-blue hover:text-white'
                      }`}
                    >
                      {opt.cta}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Booking Form */}
      <section id="form" className="section-padding bg-ded-surface/50">
        <div className="container-main max-w-[800px]">
          <ScrollReveal>
            <div className="bg-ded-surface rounded-xl border border-ded-border p-6 md:p-10">
              <h2 className="font-display text-2xl font-semibold text-white mb-6 text-center">Book Your Session</h2>
              
              {submitted ? (
                <div className="text-center py-10">
                  <Check className="w-12 h-12 text-ded-accent-cyan mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Booking Request Sent!</h3>
                  <p className="text-ded-text-secondary">We'll confirm your booking within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First Name"
                      required
                      className="w-full bg-ded-bg border border-ded-border rounded-lg px-4 py-3 text-sm text-white placeholder:text-ded-text-muted focus:border-ded-accent-blue focus:outline-none transition-colors"
                      value={form.firstName}
                      onChange={e => setForm({ ...form, firstName: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      required
                      className="w-full bg-ded-bg border border-ded-border rounded-lg px-4 py-3 text-sm text-white placeholder:text-ded-text-muted focus:border-ded-accent-blue focus:outline-none transition-colors"
                      value={form.lastName}
                      onChange={e => setForm({ ...form, lastName: e.target.value })}
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    className="w-full bg-ded-bg border border-ded-border rounded-lg px-4 py-3 text-sm text-white placeholder:text-ded-text-muted focus:border-ded-accent-blue focus:outline-none transition-colors"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    required
                    className="w-full bg-ded-bg border border-ded-border rounded-lg px-4 py-3 text-sm text-white placeholder:text-ded-text-muted focus:border-ded-accent-blue focus:outline-none transition-colors"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                  />
                  <select
                    className="w-full bg-ded-bg border border-ded-border rounded-lg px-4 py-3 text-sm text-white focus:border-ded-accent-blue focus:outline-none transition-colors"
                    value={form.type}
                    onChange={e => setForm({ ...form, type: e.target.value })}
                  >
                    <option>Gaming Session</option>
                    <option>Coaching Session</option>
                    <option>Private Event</option>
                  </select>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="date"
                      required
                      className="w-full bg-ded-bg border border-ded-border rounded-lg px-4 py-3 text-sm text-white focus:border-ded-accent-blue focus:outline-none transition-colors"
                      value={form.date}
                      onChange={e => setForm({ ...form, date: e.target.value })}
                    />
                    <select
                      className="w-full bg-ded-bg border border-ded-border rounded-lg px-4 py-3 text-sm text-white focus:border-ded-accent-blue focus:outline-none transition-colors"
                      value={form.time}
                      onChange={e => setForm({ ...form, time: e.target.value })}
                    >
                      {['2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM', '11PM'].map(t => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <input
                    type="number"
                    min={1}
                    max={50}
                    placeholder="Number of Guests"
                    className="w-full bg-ded-bg border border-ded-border rounded-lg px-4 py-3 text-sm text-white placeholder:text-ded-text-muted focus:border-ded-accent-blue focus:outline-none transition-colors"
                    value={form.guests}
                    onChange={e => setForm({ ...form, guests: parseInt(e.target.value) || 1 })}
                  />
                  <textarea
                    rows={4}
                    placeholder="Special Requests (optional)"
                    className="w-full bg-ded-bg border border-ded-border rounded-lg px-4 py-3 text-sm text-white placeholder:text-ded-text-muted focus:border-ded-accent-blue focus:outline-none transition-colors resize-none"
                    value={form.requests}
                    onChange={e => setForm({ ...form, requests: e.target.value })}
                  />
                  <button
                    type="submit"
                    className="w-full bg-ded-accent-blue text-white font-semibold text-sm py-3 rounded-lg hover:bg-[#3B82F6] hover:-translate-y-0.5 transition-all duration-200"
                  >
                    Submit Booking Request
                  </button>
                  <p className="text-xs text-ded-text-muted text-center">
                    We'll confirm your booking within 24 hours.
                  </p>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
