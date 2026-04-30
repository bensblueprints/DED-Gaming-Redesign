export interface MembershipTier {
  id: string
  name: string
  price: number
  period: string
  featured?: boolean
  features: string[]
}

export const membershipTiers: MembershipTier[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 5,
    period: 'month',
    features: [
      'Access to standard gaming stations',
      'Member-only events',
      '5% discount on food & drinks',
      'Online booking',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 15,
    period: 'month',
    featured: true,
    features: [
      'Everything in Basic',
      'Priority station reservations',
      '10% discount on food & drinks',
      '1 free coaching session per month',
      'Exclusive tournaments',
    ],
  },
  {
    id: 'elite',
    name: 'Elite',
    price: 30,
    period: 'month',
    features: [
      'Everything in Pro',
      'Unlimited priority access',
      '20% discount on food & drinks',
      '4 free coaching sessions per month',
      'Private event discounts',
      'VIP lounge access',
    ],
  },
]

export const comparisonFeatures = [
  { name: 'Station Access', basic: true, pro: true, elite: true },
  { name: 'Booking Priority', basic: false, pro: true, elite: true },
  { name: 'Food Discount', basic: '5%', pro: '10%', elite: '20%' },
  { name: 'Coaching Credits', basic: false, pro: '1/mo', elite: '4/mo' },
  { name: 'Member Events', basic: true, pro: true, elite: true },
  { name: 'Tournament Access', basic: false, pro: true, elite: true },
  { name: 'VIP Lounge', basic: false, pro: false, elite: true },
  { name: 'Guest Passes', basic: false, pro: '1/mo', elite: '4/mo' },
]

export const faqItems = [
  {
    question: 'Can I cancel my membership anytime?',
    answer: 'Yes, all memberships can be cancelled at any time with no cancellation fees.',
  },
  {
    question: 'Do coaching sessions roll over?',
    answer: 'Coaching sessions must be used within the billing month and do not roll over.',
  },
  {
    question: 'Can I upgrade my tier?',
    answer: 'Yes, you can upgrade at any time. The price difference will be prorated.',
  },
  {
    question: 'Is there a family plan?',
    answer: 'We offer a 20% discount on additional family memberships under the same account.',
  },
  {
    question: 'What payment methods are accepted?',
    answer: 'We accept all major credit cards, debit cards, and Apple Pay.',
  },
]
