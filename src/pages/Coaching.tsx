import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Gamepad2, Calendar, TrendingUp } from 'lucide-react'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import { Progress } from 'antd'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import PageHeader from '@/components/PageHeader'
import SectionHeading from '@/components/SectionHeading'
import ScrollReveal from '@/components/ScrollReveal'
import { coaches, coachingPricing } from '@/data/coaches'

const bookingSteps = [
  'Select Coach',
  'Pick Time',
  'Confirm',
]

const coachSkills: Record<string, { skill: string; percent: number }[]> = {
  'Coach Mike': [
    { skill: 'Aim', percent: 95 },
    { skill: 'Building', percent: 90 },
    { skill: 'Strategy', percent: 85 },
  ],
  'Coach Sarah': [
    { skill: 'Game Sense', percent: 92 },
    { skill: 'Tactics', percent: 88 },
    { skill: 'Communication', percent: 90 },
  ],
  'Coach Jay': [
    { skill: 'Tech Skill', percent: 94 },
    { skill: 'Matchups', percent: 89 },
    { skill: 'Mental Game', percent: 87 },
  ],
  'Coach Alex': [
    { skill: 'Aim', percent: 96 },
    { skill: 'Macro Play', percent: 93 },
    { skill: 'Team Coordination', percent: 91 },
  ],
  'Coach T': [
    { skill: 'Ball Control', percent: 91 },
    { skill: 'Positioning', percent: 88 },
    { skill: 'Aerials', percent: 85 },
  ],
  'Coach Kim': [
    { skill: 'Aim', percent: 93 },
    { skill: 'Utility Usage', percent: 90 },
    { skill: 'Leadership', percent: 92 },
  ],
}

const coachCategories: Record<string, string[]> = {
  'All Coaches': coaches.map(c => c.id),
  'FPS Specialists': ['1', '4', '6'],
  'Strategy Coaches': ['2', '3', '5'],
}

export default function Coaching() {
  const [activeBookingStep, setActiveBookingStep] = useState(0)
  const [activeTab, setActiveTab] = useState('All Coaches')

  const filteredCoaches = activeTab === 'All Coaches'
    ? coaches
    : coaches.filter(c => coachCategories[activeTab]?.includes(c.id))

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
              {[
                { icon: Gamepad2, title: 'Choose Your Game', description: 'Select from our roster of coached games including Fortnite, FC 26, Madden, and more.' },
                { icon: Calendar, title: 'Book a Session', description: 'Schedule a 1-hour session that fits your calendar. Solo or group sessions available.' },
                { icon: TrendingUp, title: 'Play & Improve', description: 'Get personalized tips, strategy breakdowns, and hands-on guidance from a pro.' },
              ].map((step, i) => (
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

      {/* Booking Flow Stepper */}
      <section className="section-padding bg-ded-surface/50">
        <div className="container-main max-w-[800px]">
          <SectionHeading
            eyebrow="Booking Flow"
            heading="Reserve Your Coach"
            centered
          />
          <ScrollReveal>
            <div className="mt-8 bg-ded-surface rounded-xl border border-ded-border p-6 md:p-10">
              <Stepper activeStep={activeBookingStep} alternativeLabel>
                {bookingSteps.map((label) => (
                  <Step key={label}>
                    <StepLabel
                      sx={{
                        '& .MuiStepLabel-label': {
                          color: '#CBD5E1',
                          fontFamily: '"Space Grotesk", sans-serif',
                          '&.Mui-active': { color: '#FFFFFF', fontWeight: 600 },
                          '&.Mui-completed': { color: '#06B6D4' },
                        },
                        '& .MuiStepIcon-root': {
                          color: 'rgba(30, 58, 138, 0.3)',
                          '&.Mui-active': { color: '#2563EB' },
                          '&.Mui-completed': { color: '#06B6D4' },
                        },
                      }}
                    >
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
              <div className="mt-8 text-center">
                <p className="text-ded-text-secondary text-sm mb-4">
                  {activeBookingStep === 0 && 'Browse our coaches below and click "Book Session" to begin.'}
                  {activeBookingStep === 1 && 'Select a date and time that works for you.'}
                  {activeBookingStep === 2 && 'Review your booking details and confirm your session.'}
                </p>
                <div className="flex justify-center gap-3">
                  {activeBookingStep > 0 && (
                    <button
                      onClick={() => setActiveBookingStep(s => s - 1)}
                      className="px-5 py-2 text-sm text-ded-text-secondary border border-ded-border rounded-lg hover:border-ded-accent-blue transition-colors"
                    >
                      Back
                    </button>
                  )}
                  {activeBookingStep < 2 && (
                    <button
                      onClick={() => setActiveBookingStep(s => s + 1)}
                      className="px-5 py-2 text-sm text-white bg-ded-accent-blue rounded-lg hover:bg-[#3B82F6] transition-colors"
                    >
                      Next
                    </button>
                  )}
                  {activeBookingStep === 2 && (
                    <Link
                      to="/book"
                      className="px-5 py-2 text-sm text-white bg-ded-accent-cyan rounded-lg hover:bg-[#0891B2] transition-colors"
                    >
                      Confirm Booking
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Coaches Roster */}
      <section className="section-padding">
        <div className="container-main">
          <SectionHeading
            eyebrow="Our Coaches"
            heading="Learn from the best"
            centered
          />

          <Tabs defaultValue="All Coaches" className="w-full mt-8" onValueChange={setActiveTab}>
            <TabsList className="bg-ded-surface border border-ded-border mx-auto flex w-fit">
              {Object.keys(coachCategories).map(cat => (
                <TabsTrigger
                  key={cat}
                  value={cat}
                  className="data-[state=active]:bg-ded-accent-blue data-[state=active]:text-white text-ded-text-secondary px-4"
                >
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value={activeTab} className="mt-8">
              <ScrollReveal stagger={0.1} childSelector=".coach-card">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCoaches.map(coach => (
                    <div key={coach.id} className="coach-card">
                      <div className="bg-ded-surface rounded-xl border border-ded-border p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover hover:border-ded-accent-blue/60 group h-full flex flex-col">
                        <Avatar className="w-20 h-20 mx-auto mb-4 border-[3px] border-ded-accent-blue group-hover:scale-105 transition-transform duration-300">
                          <AvatarImage src={coach.image} alt={coach.name} />
                          <AvatarFallback className="bg-ded-accent-blue text-white font-display text-xl">
                            {coach.name.replace('Coach ', '').charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <h3 className="font-display text-lg font-semibold text-white">{coach.name}</h3>
                        <div className="flex flex-wrap justify-center gap-1.5 mt-2">
                          {coach.specialties.map(s => (
                            <Badge key={s} variant="outline" className="text-ded-text-secondary border-ded-border text-xs">
                              {s}
                            </Badge>
                          ))}
                        </div>

                        {/* Skill Bars - Ant Design Progress */}
                        <div className="mt-4 space-y-3 text-left flex-1">
                          {(coachSkills[coach.name] || []).map(skill => (
                            <div key={skill.skill}>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-ded-text-secondary">{skill.skill}</span>
                                <span className="text-ded-accent-cyan font-medium">{skill.percent}%</span>
                              </div>
                              <Progress
                                percent={skill.percent}
                                size="small"
                                strokeColor="#06B6D4"
                                trailColor="rgba(30, 58, 138, 0.2)"
                                showInfo={false}
                              />
                            </div>
                          ))}
                        </div>

                        <div className="mt-4">
                          <span className="font-display text-2xl font-bold text-ded-accent-cyan">${coach.rate}</span>
                          <span className="text-sm text-ded-text-muted">/hr</span>
                        </div>
                        <Link
                          to="/book"
                          className="mt-4 inline-block px-5 py-2 rounded-lg text-sm font-medium border border-ded-accent-blue text-ded-accent-blue hover:bg-ded-accent-blue hover:text-white transition-all duration-200"
                        >
                          Book Session
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Pricing */}
      <section className="section-padding bg-ded-surface/50">
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
