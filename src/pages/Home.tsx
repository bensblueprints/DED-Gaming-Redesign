import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Cpu, Monitor, Zap, HardDrive, Gamepad2, ArrowRight, MapPin, Phone, Mail, Clock,
  MonitorPlay, Trophy, Users
} from 'lucide-react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { Timeline } from 'antd'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import StepContent from '@mui/material/StepContent'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as ReTooltip, ResponsiveContainer
} from 'recharts'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Card as ShadcnCard, CardContent as ShadcnCardContent } from '@/components/ui/card'
import SectionHeading from '@/components/SectionHeading'
import ScrollReveal from '@/components/ScrollReveal'
import EventCard from '@/components/EventCard'
import ProductCard from '@/components/ProductCard'
import { events } from '@/data/events'
import { products } from '@/data/products'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 55, suffix: '+', label: 'Gaming Stations', icon: MonitorPlay },
  { value: 25, suffix: '+', label: 'PC Gaming Rigs', icon: Cpu },
  { value: 5, suffix: '', label: 'Board Game Tables', icon: Gamepad2 },
  { value: 100, suffix: '+', label: 'Games Available', icon: Trophy },
]

const specs = [
  { icon: Cpu, name: 'Processor', value: 'AMD Ryzen 5 5600X' },
  { icon: Monitor, name: 'Graphics', value: 'NVIDIA RTX 3060 TI' },
  { icon: Zap, name: 'Memory', value: '32GB DDR4' },
  { icon: Gamepad2, name: 'Monitor', value: '240Hz Gaming Display' },
  { icon: HardDrive, name: 'Storage', value: 'NVMe SSD' },
]

const journeyMilestones = [
  { children: '2021 - Founded', color: '#06B6D4' as const },
  { children: '2022 - 50+ Stations', color: '#2563EB' as const },
  { children: '2023 - First Tournament', color: '#06B6D4' as const },
  { children: '2024 - Community 1000+', color: '#2563EB' as const },
]

const howItWorksSteps = [
  { label: 'Book Online', description: 'Reserve your station or session through our easy online booking system.' },
  { label: 'Check In', description: 'Arrive at DED Gaming and check in with our friendly front desk staff.' },
  { label: 'Game On', description: 'Jump into your session and enjoy premium gaming at its finest.' },
]

const shopPreview = products.slice(0, 6)
const eventsPreview = events.slice(0, 2)

const growthData = [
  { month: 'Jan', players: 120 },
  { month: 'Feb', players: 180 },
  { month: 'Mar', players: 250 },
  { month: 'Apr', players: 320 },
  { month: 'May', players: 410 },
  { month: 'Jun', players: 530 },
  { month: 'Jul', players: 680 },
  { month: 'Aug', players: 850 },
  { month: 'Sep', players: 920 },
  { month: 'Oct', players: 1100 },
  { month: 'Nov', players: 1350 },
  { month: 'Dec', players: 1600 },
]

function AnimatedStatCard({ stat }: { stat: typeof stats[0] }) {
  const [count, setCount] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        const obj = { val: 0 }
        gsap.to(obj, {
          val: stat.value,
          duration: 1.5,
          ease: 'power2.out',
          snap: { val: 1 },
          onUpdate: () => setCount(Math.round(obj.val)),
        })
      },
    })
    return () => trigger.kill()
  }, [stat.value])

  return (
    <div ref={cardRef}>
      <Card
        className="relative overflow-hidden"
        sx={{
          background: 'linear-gradient(135deg, #0B1221 0%, #111D35 100%)',
          border: '1px solid rgba(30, 58, 138, 0.3)',
          borderRadius: '12px',
        }}
      >
        <div className="absolute inset-0 rounded-xl opacity-20 pointer-events-none"
          style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.15) 0%, rgba(6,182,212,0.15) 100%)' }}
        />
        <CardContent className="relative z-10 p-6 text-center">
          <stat.icon className="w-7 h-7 text-ded-accent-cyan mx-auto mb-3" />
          <div className="font-display text-4xl md:text-5xl font-bold text-white">
            {count}{stat.suffix}
          </div>
          <div className="mt-2 text-sm text-ded-text-secondary">{stat.label}</div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const heroImageRef = useRef<HTMLDivElement>(null)
  const heroContentRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero content entrance
      gsap.from(heroContentRef.current?.children || [], {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.5,
      })

      // Hero scroll effect - fade and dim
      if (heroImageRef.current && heroRef.current) {
        gsap.to(heroImageRef.current, {
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
          filter: 'brightness(0.3)',
          scale: 1.1,
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <div>
      {/* Hero Section */}
      <div ref={heroRef} className="relative h-screen">
        <div
          ref={heroImageRef}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/hero-gamer.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ded-bg via-ded-bg/40 to-transparent" />

        <div
          ref={heroContentRef}
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4"
        >
          <span className="text-xs font-medium uppercase tracking-[0.1em] text-ded-accent-cyan mb-4">
            Welcome to
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight max-w-[900px]" style={{ textShadow: '0 2px 40px rgba(0,0,0,0.8)' }}>
            Port Chester's Ultimate Gaming Authority
          </h1>
          <p className="mt-6 text-base md:text-lg text-ded-text-secondary max-w-[560px]">
            High-end gaming stations. Competitive tournaments. A community built for players.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              to="/book"
              className="px-7 py-3 bg-ded-accent-blue text-white font-semibold text-sm rounded-lg hover:bg-[#3B82F6] hover:-translate-y-0.5 transition-all duration-200 shadow-glow-blue"
            >
              Book a Session
            </Link>
            <Link
              to="/events"
              className="px-7 py-3 border border-ded-accent-blue text-ded-accent-blue font-semibold text-sm rounded-lg hover:bg-ded-accent-blue hover:text-white transition-all duration-250"
            >
              View Events
            </Link>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="section-padding">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 items-center">
            <ScrollReveal direction="left">
              <div>
                <SectionHeading
                  eyebrow="About DED Gaming"
                  heading="Where Competitive Gaming Comes Alive"
                />
                <p className="text-ded-text-secondary leading-relaxed mb-4">
                  DED Gaming is an Electronic Sports Center (ESC) based in Port Chester, New York. We're committed to bringing a sense of community to the gaming industry with high-end gaming stations at accessible prices. Whether you're a casual player or aspiring pro, our space is designed for you.
                </p>
                <p className="text-ded-text-secondary leading-relaxed mb-6">
                  Book a PC for yourself, join a tournament, or host your next party in our energetic, state-of-the-art facility.
                </p>
                <Link
                  to="/book"
                  className="inline-flex items-center gap-2 px-6 py-2.5 border border-ded-accent-blue text-ded-accent-blue text-sm font-medium rounded-lg hover:bg-ded-accent-blue hover:text-white transition-all duration-250"
                >
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="relative">
                <img
                  src="/images/about-lounge.jpg"
                  alt="DED Gaming Lounge"
                  className="rounded-lg w-full object-cover"
                />
                <div className="absolute -bottom-4 -right-4 md:bottom-4 md:right-4 bg-ded-surface/90 backdrop-blur-md border border-ded-border rounded-lg px-5 py-4">
                  <div className="font-display text-3xl font-bold text-ded-accent-cyan">55+</div>
                  <div className="text-xs text-ded-text-muted">Gaming Stations</div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Our Journey Timeline */}
      <section className="section-padding bg-ded-surface/50">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <ScrollReveal direction="left">
              <div>
                <SectionHeading
                  eyebrow="Our Story"
                  heading="Our Journey"
                />
                <p className="text-ded-text-secondary leading-relaxed mt-4">
                  From a small gaming lounge to Port Chester's premier esports destination, DED Gaming has grown alongside our incredible community.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="bg-ded-surface rounded-xl border border-ded-border p-6 md:p-8">
                <Timeline
                  items={journeyMilestones}
                  className="[&_.ant-timeline-item-tail]:bg-ded-border"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section ref={statsRef} className="bg-ded-surface py-14 md:py-16">
        <div className="container-main">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <AnimatedStatCard key={i} stat={stat} />
            ))}
          </div>
        </div>
      </section>

      {/* PC Specs */}
      <section id="specs" className="section-padding">
        <div className="container-main">
          <SectionHeading
            eyebrow="Premium Hardware"
            heading="Every station is equipped for competitive play"
            centered
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-12">
            <ScrollReveal direction="left" stagger={0.1} childSelector=".spec-item">
              <div className="space-y-0">
                {specs.map((spec, i) => (
                  <div
                    key={i}
                    className="spec-item flex items-center gap-4 py-4 border-b border-ded-border"
                  >
                    <spec.icon className="w-6 h-6 text-ded-accent-cyan flex-shrink-0" />
                    <div>
                      <div className="text-xs text-ded-text-muted uppercase tracking-wider">{spec.name}</div>
                      <div className="text-base font-medium text-white">{spec.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <img
                src="/images/pc-interior.jpg"
                alt="Gaming PC Interior"
                className="rounded-lg w-full object-cover border border-ded-border/50"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* How It Works - MUI Stepper */}
      <section className="section-padding bg-ded-surface/50">
        <div className="container-main max-w-[960px]">
          <SectionHeading
            eyebrow="Simple Process"
            heading="How It Works"
            centered
          />
          <ScrollReveal>
            <div className="mt-12 bg-ded-surface rounded-xl border border-ded-border p-6 md:p-10">
              <Stepper activeStep={activeStep} orientation="vertical" nonLinear>
                {howItWorksSteps.map((step, index) => (
                  <Step key={index} completed={index < activeStep}>
                    <StepLabel
                      onClick={() => setActiveStep(index)}
                      sx={{
                        '& .MuiStepLabel-label': {
                          color: index === activeStep ? '#FFFFFF !important' : '#64748B',
                          fontFamily: '"Space Grotesk", sans-serif',
                          fontWeight: 600,
                          cursor: 'pointer',
                        },
                        '& .MuiStepIcon-root': {
                          color: index <= activeStep ? '#2563EB' : 'rgba(30, 58, 138, 0.3)',
                        },
                      }}
                    >
                      {step.label}
                    </StepLabel>
                    <StepContent>
                      <p className="text-ded-text-secondary text-sm">{step.description}</p>
                      <div className="mt-4 flex gap-3">
                        {index > 0 && (
                          <button
                            onClick={() => setActiveStep(index - 1)}
                            className="px-4 py-1.5 text-xs text-ded-text-secondary border border-ded-border rounded-lg hover:border-ded-accent-blue transition-colors"
                          >
                            Back
                          </button>
                        )}
                        {index < howItWorksSteps.length - 1 && (
                          <button
                            onClick={() => setActiveStep(index + 1)}
                            className="px-4 py-1.5 text-xs text-white bg-ded-accent-blue rounded-lg hover:bg-[#3B82F6] transition-colors"
                          >
                            Next
                          </button>
                        )}
                        {index === howItWorksSteps.length - 1 && (
                          <Link
                            to="/book"
                            className="px-4 py-1.5 text-xs text-white bg-ded-accent-cyan rounded-lg hover:bg-[#0891B2] transition-colors"
                          >
                            Book Now
                          </Link>
                        )}
                      </div>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Community Growth - Recharts Area Chart */}
      <section className="section-padding">
        <div className="container-main max-w-[960px]">
          <SectionHeading
            eyebrow="Community"
            heading="Community Growth"
            centered
          />
          <ScrollReveal>
            <div className="mt-10 bg-ded-surface rounded-xl border border-ded-border p-6 md:p-8">
              <div className="flex items-center gap-2 mb-6">
                <Users className="w-5 h-5 text-ded-accent-cyan" />
                <span className="text-sm text-ded-text-secondary">Active Players (Monthly)</span>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={growthData}>
                  <defs>
                    <linearGradient id="colorPlayers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(30, 58, 138, 0.2)" />
                  <XAxis dataKey="month" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                  <ReTooltip
                    contentStyle={{
                      backgroundColor: '#0B1221',
                      border: '1px solid rgba(30, 58, 138, 0.3)',
                      borderRadius: '8px',
                      color: '#FFFFFF',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="players"
                    stroke="#2563EB"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorPlayers)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="section-padding bg-ded-surface/50">
        <div className="container-main">
          <SectionHeading
            eyebrow="Upcoming Events"
            heading="Join the competition — tournaments for all skill levels"
            centered
          />
          <ScrollReveal stagger={0.15} childSelector=".event-card">
            <div className="space-y-6 max-w-[800px] mx-auto">
              {eventsPreview.map(event => (
                <div key={event.id} className="event-card">
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          </ScrollReveal>
          <div className="text-center mt-10">
            <Link
              to="/events"
              className="inline-flex items-center gap-2 text-ded-accent-blue text-sm font-medium hover:underline"
            >
              View All Events <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Membership CTA */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #0B1221 0%, #111D35 50%, #0B1221 100%)' }}>
        <div className="container-main text-center max-w-[720px]">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-[40px] font-semibold text-white leading-tight">
              Level Up with a Membership
            </h2>
            <p className="mt-4 text-ded-text-secondary">
              Get exclusive access to member-only events, discounted rates, priority booking, and more.
            </p>
            <Link
              to="/membership"
              className="inline-block mt-6 px-7 py-3 bg-ded-accent-blue text-white font-semibold text-sm rounded-lg hover:bg-[#3B82F6] hover:-translate-y-0.5 transition-all duration-200"
            >
              View Memberships
            </Link>
            <p className="mt-3 text-xs text-ded-text-muted">Starting at $5/month</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Food & Drink Preview - shadcn Carousel */}
      <section className="section-padding">
        <div className="container-main">
          <SectionHeading
            eyebrow="Fuel Your Session"
            heading="Snacks, drinks, and energy — delivered to your station"
            centered
          />
          <ScrollReveal>
            <div className="mt-10">
              <Carousel
                opts={{
                  align: 'start',
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-4">
                  {shopPreview.map(product => (
                    <CarouselItem key={product.id} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                      <ShadcnCard className="bg-ded-surface border-ded-border h-full">
                        <ShadcnCardContent className="p-0">
                          <ProductCard product={product} />
                        </ShadcnCardContent>
                      </ShadcnCard>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex -left-12 bg-ded-surface border-ded-border text-white hover:bg-ded-surface-light hover:text-white" />
                <CarouselNext className="hidden md:flex -right-12 bg-ded-surface border-ded-border text-white hover:bg-ded-surface-light hover:text-white" />
              </Carousel>
            </div>
          </ScrollReveal>
          <div className="text-center mt-10">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-ded-accent-blue text-sm font-medium hover:underline"
            >
              View Full Menu <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Contact / Location */}
      <section className="section-padding bg-ded-surface/50">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ScrollReveal direction="left">
              <div>
                <SectionHeading
                  eyebrow="Find Us"
                  heading="Ready to play? Drop by or reach out."
                />
                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-ded-accent-blue mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-white">42 Westchester Ave</p>
                      <p className="text-ded-text-secondary">Port Chester, NY 10573</p>
                    </div>
                  </div>
                  <a href="tel:3475727763" className="flex items-center gap-3 text-ded-accent-blue hover:underline">
                    <Phone className="w-5 h-5" />
                    (347) 572-7763
                  </a>
                  <a href="mailto:host@dedesc.com" className="flex items-center gap-3 text-ded-accent-blue hover:underline">
                    <Mail className="w-5 h-5" />
                    host@dedesc.com
                  </a>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-ded-text-muted mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-ded-text-secondary">
                      <p>Sun–Thu: 2PM – Midnight</p>
                      <p>Fri–Sat: 2PM – 2AM</p>
                    </div>
                  </div>
                </div>
                <a
                  href="https://maps.google.com/?q=42+Westchester+Ave+Port+Chester+NY+10573"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-6 px-6 py-2.5 bg-ded-accent-blue text-white text-sm font-medium rounded-lg hover:bg-[#3B82F6] transition-colors"
                >
                  Get Directions
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3014.123456789!2d-73.6654321!3d41.0012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDAwJzA0LjQiTiA3M8KwMzknNTUuNiJX!5e0!3m2!1sen!2sus!4v1234567890"
                className="w-full h-[350px] md:h-[400px] rounded-lg border border-ded-border"
                style={{ filter: 'grayscale(100%) invert(92%) contrast(83%)' }}
                loading="lazy"
                title="DED Gaming Location"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  )
}
