import { useState } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import PageHeader from '@/components/PageHeader'
import SectionHeading from '@/components/SectionHeading'
import ScrollReveal from '@/components/ScrollReveal'
import MembershipCard from '@/components/MembershipCard'
import { membershipTiers, comparisonFeatures, faqItems } from '@/data/memberships'

export default function Membership() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div>
      <PageHeader
        title="Membership Tiers"
        subtitle="Join the DED Gaming community and unlock exclusive benefits."
        image="/images/about-lounge.jpg"
      />

      {/* Membership Plans */}
      <section className="section-padding">
        <div className="container-main">
          <SectionHeading
            eyebrow="Membership Plans"
            heading="Choose your tier"
            centered
          />
          <ScrollReveal stagger={0.15} childSelector=".membership-card">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1280px] mx-auto">
              {membershipTiers.map(tier => (
                <div key={tier.id} className="membership-card">
                  <MembershipCard tier={tier} />
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Benefits Comparison */}
      <section className="section-padding bg-ded-surface/50">
        <div className="container-main max-w-[960px]">
          <SectionHeading
            eyebrow="Compare Benefits"
            heading="See what's included"
            centered
          />
          <ScrollReveal>
            <div className="bg-ded-surface rounded-xl border border-ded-border overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-ded-border">
                    <th className="text-left px-6 py-4 text-sm font-medium text-ded-text-muted">Feature</th>
                    <th className="text-center px-6 py-4 text-sm font-medium text-ded-text-muted">Basic</th>
                    <th className="text-center px-6 py-4 text-sm font-medium text-ded-accent-blue">Pro</th>
                    <th className="text-center px-6 py-4 text-sm font-medium text-ded-accent-cyan">Elite</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((feature, i) => (
                    <tr
                      key={i}
                      className={`border-b border-ded-border ${
                        (i % 2 === 1) ? 'bg-ded-surface-light/30' : ''
                      }`}
                    >
                      <td className="px-6 py-3.5 text-sm text-white">{feature.name}</td>
                      <td className="text-center px-6 py-3.5">
                        {typeof feature.basic === 'boolean' ? (
                          feature.basic ? (
                            <Check className="w-4 h-4 text-ded-accent-cyan mx-auto" />
                          ) : (
                            <span className="text-ded-text-muted">—</span>
                          )
                        ) : (
                          <span className="text-sm text-ded-text-secondary">{feature.basic}</span>
                        )}
                      </td>
                      <td className="text-center px-6 py-3.5">
                        {typeof feature.pro === 'boolean' ? (
                          feature.pro ? (
                            <Check className="w-4 h-4 text-ded-accent-cyan mx-auto" />
                          ) : (
                            <span className="text-ded-text-muted">—</span>
                          )
                        ) : (
                          <span className="text-sm text-ded-accent-blue font-medium">{feature.pro}</span>
                        )}
                      </td>
                      <td className="text-center px-6 py-3.5">
                        {typeof feature.elite === 'boolean' ? (
                          feature.elite ? (
                            <Check className="w-4 h-4 text-ded-accent-cyan mx-auto" />
                          ) : (
                            <span className="text-ded-text-muted">—</span>
                          )
                        ) : (
                          <span className="text-sm text-ded-accent-cyan font-medium">{feature.elite}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding">
        <div className="container-main max-w-[720px]">
          <SectionHeading
            eyebrow="FAQ"
            heading="Common questions"
            centered
          />
          <ScrollReveal stagger={0.1} childSelector=".faq-item">
            <div className="space-y-4 mt-8">
              {faqItems.map((item, i) => (
                <div key={i} className="faq-item">
                  <div className="bg-ded-surface rounded-xl border border-ded-border overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-ded-surface-light/50 transition-colors"
                    >
                      <span className="text-sm font-medium text-white">{item.question}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-ded-text-muted transition-transform duration-300 ${
                          openFaq === i ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <div
                      className="overflow-hidden transition-all duration-300"
                      style={{
                        maxHeight: openFaq === i ? '200px' : '0',
                      }}
                    >
                      <p className="px-5 pb-4 text-sm text-ded-text-secondary">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
