import { Link } from 'react-router-dom'
import { Check, ArrowRight, Calendar as CalendarIcon, MapPin, Clock } from 'lucide-react'
import { Calendar as AntCalendar } from 'antd'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Chip from '@mui/material/Chip'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import PageHeader from '@/components/PageHeader'
import SectionHeading from '@/components/SectionHeading'
import ScrollReveal from '@/components/ScrollReveal'
import { events } from '@/data/events'
import { faqItems } from '@/data/memberships'

const eventDateMap: Record<string, string> = {
  '1': '2026-05-30',
  '2': '2026-05-31',
  '3': '2026-06-04', // Wednesday recurring
  '4': '2026-06-07',
  '5': '2026-06-14',
}

const eventTags: Record<string, { label: string; color: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' }> = {
  'Madden Tournament': { label: 'Tournament', color: 'error' },
  "FC '26 Tournament": { label: 'Tournament', color: 'error' },
  'Super Smash Bros. Weekly': { label: 'Casual', color: 'info' },
  'Rocket League 2v2': { label: 'Tournament', color: 'error' },
  'NBA 2K26 Tournament': { label: 'Tournament', color: 'error' },
}

const registrationStatus: Record<string, { label: string; color: string }> = {
  '1': { label: 'Open', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
  '2': { label: 'Open', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
  '3': { label: 'Open', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
  '4': { label: 'Waitlist', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
  '5': { label: 'Full', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
}

export default function Events() {
  return (
    <div>
      <PageHeader
        title="Tournaments & Events"
        subtitle="Compete, connect, and level up your game."
        image="/images/events-stage.jpg"
      />

      {/* Calendar */}
      <section className="section-padding pb-8">
        <div className="container-main max-w-[960px]">
          <SectionHeading eyebrow="Calendar" heading="Event Calendar" centered />
          <ScrollReveal>
            <div className="mt-8 bg-ded-surface rounded-xl border border-ded-border p-4 md:p-6">
              <AntCalendar
                fullscreen
                className="custom-ant-calendar"
                fullCellRender={(current, info) => {
                  const dateStr = current.format('YYYY-MM-DD')
                  const hasEvent = Object.values(eventDateMap).includes(dateStr)
                  if (info.type === 'date') {
                    return (
                      <div
                        className={`ant-picker-cell-inner ${hasEvent ? 'bg-ded-accent-blue/20 text-ded-accent-blue font-semibold rounded-md' : ''}`}
                        style={{ minHeight: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        {current.date()}
                        {hasEvent && <div className="absolute bottom-0.5 w-1 h-1 rounded-full bg-ded-accent-cyan" />}
                      </div>
                    )
                  }
                  return info.originNode
                }}
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Event Listings */}
      <section className="section-padding">
        <div className="container-main">
          <SectionHeading
            eyebrow="Upcoming Events"
            heading="Mark your calendar"
            centered
          />
          <ScrollReveal stagger={0.12} childSelector=".event-card">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
              {events.map(event => (
                <div key={event.id} className="event-card">
                  <Card
                    className="h-full overflow-hidden"
                    sx={{
                      background: 'linear-gradient(180deg, #0B1221 0%, #111D35 100%)',
                      border: '1px solid rgba(30, 58, 138, 0.3)',
                      borderRadius: '12px',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={event.image}
                      alt={event.title}
                      className="h-48 object-cover"
                    />
                    <CardContent className="flex-1 flex flex-col p-5">
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Chip
                          label={eventTags[event.title]?.label || 'Event'}
                          color={eventTags[event.title]?.color || 'default'}
                          size="small"
                          sx={{
                            borderRadius: '9999px',
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            backgroundColor: eventTags[event.title]?.color === 'error' ? 'rgba(239,68,68,0.15)' : 'rgba(37,99,235,0.15)',
                            color: eventTags[event.title]?.color === 'error' ? '#F87171' : '#60A5FA',
                            border: '1px solid',
                            borderColor: eventTags[event.title]?.color === 'error' ? 'rgba(239,68,68,0.3)' : 'rgba(37,99,235,0.3)',
                          }}
                        />
                        <Badge className={registrationStatus[event.id]?.color || 'bg-ded-surface-light text-ded-text-muted'}>
                          {registrationStatus[event.id]?.label || 'Open'}
                        </Badge>
                      </div>
                      <h3 className="font-display text-lg font-semibold text-white mb-2">{event.title}</h3>
                      <div className="flex items-center gap-2 text-ded-text-secondary text-sm mb-1">
                        <CalendarIcon className="w-4 h-4 text-ded-text-muted" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-2 text-ded-text-secondary text-sm mb-1">
                        <Clock className="w-4 h-4 text-ded-text-muted" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-2 text-ded-text-secondary text-sm mb-4">
                        <MapPin className="w-4 h-4 text-ded-text-muted" />
                        {event.location}
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        <span className="font-display text-xl font-bold text-ded-accent-blue">
                          ${event.cost}
                          <span className="text-xs font-normal text-ded-text-muted ml-1">entry</span>
                        </span>
                        <button className="px-4 py-2 bg-ded-accent-blue text-white text-sm font-medium rounded-lg hover:bg-[#3B82F6] hover:-translate-y-0.5 transition-all duration-200">
                          Register
                        </button>
                      </div>
                    </CardContent>
                  </Card>
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

      {/* FAQ */}
      <section className="section-padding">
        <div className="container-main max-w-[720px]">
          <SectionHeading
            eyebrow="FAQ"
            heading="Event Questions"
            centered
          />
          <ScrollReveal>
            <div className="mt-8">
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border-ded-border">
                    <AccordionTrigger className="text-white hover:text-ded-accent-blue text-left">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-ded-text-secondary">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
