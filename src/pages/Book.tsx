import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Monitor, Users, CalendarDays, Check } from 'lucide-react'
import { DatePicker } from 'antd'
import type { Dayjs } from 'dayjs'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { Calendar as ShadcnCalendar } from '@/components/ui/calendar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
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

const timeSlots = ['2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM', '11PM']

export default function Book() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    type: 'Gaming Session',
    date: undefined as Dayjs | undefined,
    time: '2PM',
    guests: 1,
    requests: '',
    station: 'pc',
  })
  const [submitted, setSubmitted] = useState(false)
  const [calendarDate, setCalendarDate] = useState<Date | undefined>(new Date())

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const handleTimeChange = (_: React.MouseEvent<HTMLElement>, newTime: string | null) => {
    if (newTime) setForm(prev => ({ ...prev, time: newTime }))
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
        <div className="container-main max-w-[1000px]">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
              {/* Form */}
              <div className="bg-ded-surface rounded-xl border border-ded-border p-6 md:p-10">
                <h2 className="font-display text-2xl font-semibold text-white mb-6 text-center">Book Your Session</h2>

                {submitted ? (
                  <div className="text-center py-10">
                    <Check className="w-12 h-12 text-ded-accent-cyan mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Booking Request Sent!</h3>
                    <p className="text-ded-text-secondary">We'll confirm your booking within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-ded-text-muted mb-1.5">First Name</label>
                        <Input
                          type="text"
                          placeholder="First Name"
                          required
                          className="w-full bg-ded-bg border-ded-border text-white placeholder:text-ded-text-muted focus:border-ded-accent-blue"
                          value={form.firstName}
                          onChange={e => setForm({ ...form, firstName: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-ded-text-muted mb-1.5">Last Name</label>
                        <Input
                          type="text"
                          placeholder="Last Name"
                          required
                          className="w-full bg-ded-bg border-ded-border text-white placeholder:text-ded-text-muted focus:border-ded-accent-blue"
                          value={form.lastName}
                          onChange={e => setForm({ ...form, lastName: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-ded-text-muted mb-1.5">Email</label>
                      <Input
                        type="email"
                        placeholder="Email"
                        required
                        className="w-full bg-ded-bg border-ded-border text-white placeholder:text-ded-text-muted focus:border-ded-accent-blue"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-ded-text-muted mb-1.5">Phone</label>
                      <Input
                        type="tel"
                        placeholder="Phone"
                        required
                        className="w-full bg-ded-bg border-ded-border text-white placeholder:text-ded-text-muted focus:border-ded-accent-blue"
                        value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                      />
                    </div>

                    {/* Station Type - shadcn Select */}
                    <div>
                      <label className="block text-xs text-ded-text-muted mb-1.5">Station Type</label>
                      <Select
                        value={form.station}
                        onValueChange={val => setForm({ ...form, station: val })}
                      >
                        <SelectTrigger className="w-full bg-ded-bg border-ded-border text-white">
                          <SelectValue placeholder="Select station type" />
                        </SelectTrigger>
                        <SelectContent className="bg-ded-surface border-ded-border">
                          <SelectItem value="pc" className="text-white focus:bg-ded-surface-light focus:text-white">PC Gaming</SelectItem>
                          <SelectItem value="console" className="text-white focus:bg-ded-surface-light focus:text-white">Console Lounge</SelectItem>
                          <SelectItem value="vr" className="text-white focus:bg-ded-surface-light focus:text-white">VR Station</SelectItem>
                          <SelectItem value="board" className="text-white focus:bg-ded-surface-light focus:text-white">Board Games</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Date - Ant Design DatePicker */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-ded-text-muted mb-1.5">Date</label>
                        <DatePicker
                          className="w-full bg-ded-bg border-ded-border text-white"
                          popupClassName="dark-datepicker"
                          value={form.date}
                          onChange={date => {
                            setForm({ ...form, date: date || undefined })
                            if (date) setCalendarDate(date.toDate())
                          }}
                          format="MMM DD, YYYY"
                          placeholder="Select date"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-ded-text-muted mb-1.5">Session Type</label>
                        <Select
                          value={form.type}
                          onValueChange={val => setForm({ ...form, type: val })}
                        >
                          <SelectTrigger className="w-full bg-ded-bg border-ded-border text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-ded-surface border-ded-border">
                            <SelectItem value="Gaming Session" className="text-white focus:bg-ded-surface-light focus:text-white">Gaming Session</SelectItem>
                            <SelectItem value="Coaching Session" className="text-white focus:bg-ded-surface-light focus:text-white">Coaching Session</SelectItem>
                            <SelectItem value="Private Event" className="text-white focus:bg-ded-surface-light focus:text-white">Private Event</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Time Slot - MUI ToggleButtonGroup */}
                    <div>
                      <label className="block text-xs text-ded-text-muted mb-2">Time Slot</label>
                      <ToggleButtonGroup
                        value={form.time}
                        exclusive
                        onChange={handleTimeChange}
                        aria-label="time slot"
                        size="small"
                        sx={{
                          flexWrap: 'wrap',
                          gap: '6px',
                          '& .MuiToggleButtonGroup-grouped': {
                            border: '1px solid rgba(30, 58, 138, 0.3)',
                            borderRadius: '8px !important',
                            color: '#CBD5E1',
                            backgroundColor: '#030712',
                            textTransform: 'none',
                            fontFamily: '"Inter", sans-serif',
                            fontSize: '0.8125rem',
                            '&.Mui-selected': {
                              backgroundColor: '#2563EB',
                              color: '#FFFFFF',
                              borderColor: '#2563EB',
                            },
                            '&:hover': {
                              backgroundColor: '#111D35',
                            },
                            '&.Mui-selected:hover': {
                              backgroundColor: '#3B82F6',
                            },
                          },
                        }}
                      >
                        {timeSlots.map(t => (
                          <ToggleButton key={t} value={t} aria-label={t}>
                            {t}
                          </ToggleButton>
                        ))}
                      </ToggleButtonGroup>
                    </div>

                    <div>
                      <label className="block text-xs text-ded-text-muted mb-1.5">Number of Guests</label>
                      <Input
                        type="number"
                        min={1}
                        max={50}
                        placeholder="Number of Guests"
                        className="w-full bg-ded-bg border-ded-border text-white placeholder:text-ded-text-muted focus:border-ded-accent-blue"
                        value={form.guests}
                        onChange={e => setForm({ ...form, guests: parseInt(e.target.value) || 1 })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-ded-text-muted mb-1.5">Special Requests</label>
                      <textarea
                        rows={4}
                        placeholder="Special Requests (optional)"
                        className="w-full bg-ded-bg border border-ded-border rounded-lg px-4 py-3 text-sm text-white placeholder:text-ded-text-muted focus:border-ded-accent-blue focus:outline-none transition-colors resize-none"
                        value={form.requests}
                        onChange={e => setForm({ ...form, requests: e.target.value })}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-ded-accent-blue hover:bg-[#3B82F6] text-white font-semibold py-3 rounded-lg transition-all duration-200"
                    >
                      Submit Booking Request
                    </Button>
                    <p className="text-xs text-ded-text-muted text-center">
                      We'll confirm your booking within 24 hours.
                    </p>
                  </form>
                )}
              </div>

              {/* Sidebar - Calendar */}
              <div className="hidden lg:block">
                <div className="sticky top-24 space-y-6">
                  <div className="bg-ded-surface rounded-xl border border-ded-border p-5">
                    <h3 className="font-display text-sm font-semibold text-white mb-4">Availability</h3>
                    <ShadcnCalendar
                      mode="single"
                      selected={calendarDate}
                      onSelect={setCalendarDate}
                      className="bg-transparent text-white border-0 [&_.rdp-day]:text-white [&_.rdp-day_button:hover]:bg-ded-surface-light [&_.rdp-day_button.rdp-day_selected]:bg-ded-accent-blue [&_.rdp-head_cell]:text-ded-text-muted [&_.rdp-caption]:text-white"
                    />
                  </div>
                  <div className="bg-ded-surface rounded-xl border border-ded-border p-5">
                    <h3 className="font-display text-sm font-semibold text-white mb-3">Booking Info</h3>
                    <ul className="space-y-2 text-sm text-ded-text-secondary">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-ded-accent-cyan" />
                        Free cancellation up to 24h
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-ded-accent-cyan" />
                        Instant confirmation
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-ded-accent-cyan" />
                        Member discounts apply
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
