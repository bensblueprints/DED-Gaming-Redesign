import { Link } from 'react-router-dom'
import { Gamepad2, Calendar, TrendingUp, ArrowRight } from 'lucide-react'
import PageHeader from '@/components/PageHeader'
import SectionHeading from '@/components/SectionHeading'
import ScrollReveal from '@/components/ScrollReveal'
import CoachCard from '@/components/CoachCard'
import { coaches, coachingPricing } from '@/data/coaches'

const steps = [
  {
    icon: Gamepad2,
    title: 'Choose Your Game',
    description: 'Select from our roster of coached games including Fortnite, FC 26, Madden, and more.',
  },
  {
    icon: Calendar,
    title: 'Book a Session',
    description: 'Schedule a 1-hour session that fits your calendar. Solo or group sessions available.',
  },
  {
    icon: TrendingUp,
    title: 'Play & Improve',
    description: 'Get personalized tips, strategy breakdowns, and hands-on guidance from a pro.',
  },
]

export default function Coaching() {
  return (
    <div>
      <PageHeader
        title="Level Up Your Skills"
        subtitle="Learn from experienced coaches across multiple games and platforms."
        image="/images/coach-session.jpg"
      />

      {/* How It Works */}
      <section className="section-padding">
        <div className="container-main">
          <SectionHeading
            eyebrow="How It Works"
            heading="Three steps to better gameplay"
            centered
          />
          <ScrollReveal stagger={0.15} childSelector=".step-card">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {steps.map((step, i) => (
                <div key={i} className="step-card text-center">
                  <div className="w-10 h-10 rounded-full bg-ded-accent-blue text-white flex items-center justify-center font-display font-bold text-sm mx-auto mb-4">
                    {i + 1}
                  </div>
                  <step.icon className="w-8 h-8 text-ded-accent-cyan mx-auto mb-3" />
                  <h3 className="font-display text-xl font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-ded-text-secondary">{step.description}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Coaches Roster */}
      <section className="section-padding bg-ded-surface/50">
        <div className="container-main">
          <SectionHeading
            eyebrow="Our Coaches"
            heading="Learn from the best"
            centered
          />
          <ScrollReveal stagger={0.1} childSelector=".coach-card">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {coaches.map(coach => (
                <div key={coach.id} className="coach-card">
                  <CoachCard coach={coach} />
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Pricing */}
      <section className="section-padding">
        <div className="container-main max-w-[600px]">
          <ScrollReveal>
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl md:text-[40px] font-semibold text-white">Session Pricing</h2>
            </div>
            <div className="space-y-4">
              {coachingPricing.map((tier, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-4 border-b border-ded-border"
                >
                  <div>
                    <div className="text-white font-medium">{tier.name}</div>
                    <div className="text-sm text-ded-text-muted">{tier.players}</div>
                  </div>
                  <div className="font-display text-2xl font-bold text-ded-accent-blue">
                    ${tier.price}<span className="text-sm font-normal text-ded-text-muted">/hr</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                to="/book"
                className="inline-flex items-center gap-2 px-7 py-3 bg-ded-accent-blue text-white font-semibold text-sm rounded-lg hover:bg-[#3B82F6] hover:-translate-y-0.5 transition-all duration-200"
              >
                Book a Coaching Session <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
