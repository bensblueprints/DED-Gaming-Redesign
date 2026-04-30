export interface Coach {
  id: string
  name: string
  specialties: string[]
  rate: number
  image: string
}

export const coaches: Coach[] = [
  { id: '1', name: 'Coach Mike', specialties: ['Fortnite', 'Call of Duty'], rate: 40, image: '/images/coach-session.jpg' },
  { id: '2', name: 'Coach Sarah', specialties: ['FC 26', 'Madden NFL'], rate: 35, image: '/images/coach-session.jpg' },
  { id: '3', name: 'Coach Jay', specialties: ['Super Smash Bros.', 'Mario Kart'], rate: 30, image: '/images/coach-session.jpg' },
  { id: '4', name: 'Coach Alex', specialties: ['Valorant', 'League of Legends'], rate: 45, image: '/images/coach-session.jpg' },
  { id: '5', name: 'Coach T', specialties: ['NBA 2K', 'Rocket League'], rate: 35, image: '/images/coach-session.jpg' },
  { id: '6', name: 'Coach Kim', specialties: ['Overwatch 2', 'General FPS'], rate: 40, image: '/images/coach-session.jpg' },
]

export const coachingPricing = [
  { name: 'Solo Session', players: '1 player', price: '35–45' },
  { name: 'Duo Session', players: '2 players', price: '50–60' },
  { name: 'Team Session', players: '3–5 players', price: '75–100' },
]
