export interface Event {
  id: string
  title: string
  date: string
  time: string
  cost: number
  location: string
  image: string
}

export const events: Event[] = [
  { id: '1', title: 'Madden Tournament', date: 'Friday, May 30, 2026', time: '7:00PM – 10:00PM', cost: 20, location: 'Console Lounge', image: '/images/event-madden.png' },
  { id: '2', title: "FC '26 Tournament", date: 'Saturday, May 31, 2026', time: '7:00PM – 10:00PM', cost: 20, location: 'Console Lounge', image: '/images/event-fc26.png' },
  { id: '3', title: 'Super Smash Bros. Weekly', date: 'Every Wednesday', time: '6:00PM – 9:00PM', cost: 10, location: 'Free Play Area', image: '/images/event-smash.png' },
  { id: '4', title: 'Rocket League 2v2', date: 'Sunday, June 7, 2026', time: '5:00PM – 8:00PM', cost: 15, location: 'PC Gaming', image: '/images/event-rocket-league.png' },
  { id: '5', title: 'NBA 2K26 Tournament', date: 'Saturday, June 14, 2026', time: '7:00PM – 10:00PM', cost: 20, location: 'Console Lounge', image: '/images/nba-2k26.jpg' },
]
