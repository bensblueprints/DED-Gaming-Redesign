import { useState } from 'react'
import Paper from '@mui/material/Paper'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Check from '@mui/icons-material/Check'
import Close from '@mui/icons-material/Close'
import { Table as AntTable } from 'antd'
import { Switch } from '@/components/ui/switch'
import { Alert, AlertTitle } from '@/components/ui/alert'
import PageHeader from '@/components/PageHeader'
import SectionHeading from '@/components/SectionHeading'
import ScrollReveal from '@/components/ScrollReveal'
import { membershipTiers, comparisonFeatures } from '@/data/memberships'

export default function Membership() {
  const [isAnnual, setIsAnnual] = useState(false)

  const discount = 0.17 // ~17% discount for annual

  const pricing = membershipTiers.map(tier => ({
    ...tier,
    displayPrice: isAnnual ? Math.round(tier.price * 12 * (1 - discount)) : tier.price,
    displayPeriod: isAnnual ? 'year' : 'month',
    monthlyEquivalent: isAnnual ? Math.round(tier.price * (1 - discount)) : null,
  }))

  const columns = [
    {
      title: 'Feature',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <span className="text-white font-medium">{text}</span>,
    },
    {
      title: 'Basic',
      dataIndex: 'basic',
      key: 'basic',
      align: 'center' as const,
      render: (val: boolean | string) => renderCell(val),
    },
    {
      title: <span className="text-ded-accent-blue font-semibold">Pro</span>,
      dataIndex: 'pro',
      key: 'pro',
      align: 'center' as const,
      render: (val: boolean | string) => renderCell(val, true),
    },
    {
      title: <span className="text-ded-accent-cyan font-semibold">Elite</span>,
      dataIndex: 'elite',
      key: 'elite',
      align: 'center' as const,
      render: (val: boolean | string) => renderCell(val, false, true),
    },
  ]

  function renderCell(val: boolean | string, isPro = false, isElite = false) {
    if (typeof val === 'boolean') {
      return val ? (
        <Check className="w-5 h-5 text-ded-accent-cyan mx-auto" />
      ) : (
        <Close className="w-4 h-4 text-ded-text-muted mx-auto" />
      )
    }
    return (
      <span className={`text-sm font-medium ${isPro ? 'text-ded-accent-blue' : isElite ? 'text-ded-accent-cyan' : 'text-ded-text-secondary'}`}>
        {val}
      </span>
    )
  }

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

          {/* Monthly/Annual Toggle */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <span className={`text-sm ${!isAnnual ? 'text-white font-medium' : 'text-ded-text-muted'}`}>Monthly</span>
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
            />
            <span className={`text-sm ${isAnnual ? 'text-white font-medium' : 'text-ded-text-muted'}`}>
              Annual <span className="text-ded-accent-cyan text-xs">(Save 17%)</span>
            </span>
          </div>

          <ScrollReveal stagger={0.15} childSelector=".membership-card">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1280px] mx-auto mt-10">
              {pricing.map(tier => (
                <div key={tier.id} className="membership-card relative">
                  {tier.featured && (
                    <Alert className="absolute -top-3 left-1/2 -translate-x-1/2 w-auto px-4 py-1.5 bg-ded-accent-blue border-none text-white rounded-full z-10 [&>svg]:hidden">
                      <AlertTitle className="text-xs font-semibold m-0 text-white">Most Popular</AlertTitle>
                    </Alert>
                  )}
                  <Paper
                    elevation={0}
                    className="h-full rounded-xl overflow-hidden relative"
                    sx={{
                      background: tier.featured
                        ? 'linear-gradient(135deg, #0B1221 0%, #111D35 100%)'
                        : '#0B1221',
                      border: tier.featured
                        ? '2px solid #2563EB'
                        : '1px solid rgba(30, 58, 138, 0.3)',
                      borderRadius: '12px',
                      p: 6,
                    }}
                  >
                    {tier.featured && (
                      <div
                        className="absolute inset-0 rounded-xl opacity-10 pointer-events-none"
                        style={{ background: 'radial-gradient(circle at top right, rgba(37,99,235,0.3), transparent 70%)' }}
                      />
                    )}
                    <div className="relative z-10">
                      <div className="text-center mb-6">
                        <h3 className="font-display text-xl font-semibold text-white">{tier.name}</h3>
                        <div className="mt-2 flex items-baseline justify-center gap-1">
                          <span className="font-display text-3xl font-bold text-ded-accent-blue">${tier.displayPrice}</span>
                          <span className="text-sm text-ded-text-muted">/{tier.displayPeriod}</span>
                        </div>
                        {isAnnual && tier.monthlyEquivalent && (
                          <p className="text-xs text-ded-accent-cyan mt-1">
                            ${tier.monthlyEquivalent}/mo equivalent
                          </p>
                        )}
                      </div>

                      <List dense sx={{ py: 0 }}>
                        {tier.features.map((feature, i) => (
                          <ListItem key={i} sx={{ px: 0, py: 0.75 }}>
                            <ListItemIcon sx={{ minWidth: 28 }}>
                              <Check className="w-4 h-4 text-ded-accent-cyan" />
                            </ListItemIcon>
                            <span className="text-sm text-ded-text-secondary">{feature}</span>
                          </ListItem>
                        ))}
                      </List>

                      <button
                        className={`w-full mt-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${
                          tier.featured
                            ? 'bg-ded-accent-cyan text-white hover:bg-[#0891B2] hover:-translate-y-0.5'
                            : 'bg-transparent border border-ded-accent-blue text-ded-accent-blue hover:bg-ded-accent-blue hover:text-white'
                        }`}
                      >
                        {tier.featured ? 'Join Pro' : `Join ${tier.name}`}
                      </button>
                    </div>
                  </Paper>
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
            <div className="bg-ded-surface rounded-xl border border-ded-border overflow-hidden mt-8">
              <AntTable
                columns={columns}
                dataSource={comparisonFeatures.map((f, i) => ({ ...f, key: i }))}
                pagination={false}
                bordered={false}
                className="comparison-table"
                rowClassName={() => 'bg-transparent hover:bg-ded-surface-light/30'}
              />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
