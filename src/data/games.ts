export interface Game {
  id: string
  name: string
  platforms: string[]
  genre: string
  image: string
}

export const games: Game[] = [
  // Free PC Games
  { id: '1', name: 'Fortnite', platforms: ['PC', 'PlayStation', 'Xbox'], genre: 'Battle Royale', image: '/images/fortnite.jpg' },
  { id: '2', name: 'Apex Legends', platforms: ['PC', 'PlayStation', 'Xbox'], genre: 'Battle Royale', image: '/images/apex-legends.jpg' },
  { id: '3', name: 'Brawlhalla', platforms: ['PC', 'PlayStation', 'Xbox', 'Switch'], genre: 'Fighting', image: '/images/brawlhalla.jpg' },
  { id: '4', name: 'Counter-Strike 2', platforms: ['PC'], genre: 'FPS', image: '/images/counter-strike-2.jpg' },
  { id: '5', name: 'Dota 2', platforms: ['PC'], genre: 'MOBA', image: '/images/dota-2.jpg' },
  { id: '6', name: 'Fall Guys', platforms: ['PC', 'PlayStation', 'Xbox', 'Switch'], genre: 'Party', image: '/images/fall-guys.jpg' },
  { id: '7', name: 'League of Legends', platforms: ['PC'], genre: 'MOBA', image: '/images/league-of-legends.jpg' },
  { id: '8', name: 'Overwatch 2', platforms: ['PC', 'PlayStation', 'Xbox', 'Switch'], genre: 'FPS', image: '/images/overwatch-2.jpg' },
  { id: '9', name: 'Roblox', platforms: ['PC', 'PlayStation', 'Xbox', 'Switch'], genre: 'Platform', image: '/images/roblox.jpg' },
  { id: '10', name: 'Rocket League', platforms: ['PC', 'PlayStation', 'Xbox', 'Switch'], genre: 'Sports/Racing', image: '/images/rocket-league.jpg' },
  { id: '11', name: 'Team Fortress 2', platforms: ['PC'], genre: 'FPS', image: '/images/team-fortress-2.jpg' },
  { id: '12', name: 'Valorant', platforms: ['PC'], genre: 'Tactical FPS', image: '/images/valorant.jpg' },
  { id: '13', name: 'Halo Infinite', platforms: ['PC', 'Xbox'], genre: 'FPS', image: '/images/halo-infinite.jpg' },
  { id: '14', name: 'Smite', platforms: ['PC', 'PlayStation', 'Xbox', 'Switch'], genre: 'MOBA', image: '/images/smite.jpg' },
  { id: '15', name: 'Marvel Rivals', platforms: ['PC', 'PlayStation', 'Xbox'], genre: 'Hero Shooter', image: '/images/marvel-rivals.jpg' },
  { id: '16', name: "Call of Duty: Warzone", platforms: ['PC', 'PlayStation', 'Xbox'], genre: 'Battle Royale', image: '/images/call-of-duty-warzone.jpg' },
  { id: '17', name: 'Mecha BREAK', platforms: ['PC'], genre: 'Mecha Combat', image: '/images/mecha-break.jpg' },
  { id: '18', name: 'PUBG', platforms: ['PC', 'PlayStation', 'Xbox'], genre: 'Battle Royale', image: '/images/pubg.jpg' },
  
  // Paid PC Games
  { id: '19', name: 'Elden Ring', platforms: ['PC', 'PlayStation', 'Xbox'], genre: 'Action RPG', image: '/images/elden-ring.jpg' },
  { id: '20', name: 'Minecraft', platforms: ['PC', 'PlayStation', 'Xbox', 'Switch'], genre: 'Sandbox', image: '/images/minecraft.jpg' },
  { id: '21', name: 'Call of Duty: Black Ops 6', platforms: ['PC', 'PlayStation', 'Xbox'], genre: 'FPS', image: '/images/call-of-duty-black-ops-6.jpg' },
  { id: '22', name: 'GTA 5', platforms: ['PC', 'PlayStation', 'Xbox'], genre: 'Action', image: '/images/gta-5.jpg' },
  { id: '23', name: 'Cyberpunk 2077', platforms: ['PC', 'PlayStation', 'Xbox'], genre: 'Action RPG', image: '/images/cyberpunk-2077.jpg' },
  
  // Nintendo Games
  { id: '24', name: 'Mario Kart 8 Deluxe', platforms: ['Nintendo Switch'], genre: 'Racing', image: '/images/mario-kart-8.jpg' },
  { id: '25', name: 'Super Smash Bros. Ultimate', platforms: ['Nintendo Switch'], genre: 'Fighting', image: '/images/super-smash-bros.jpg' },
  
  // Xbox/PlayStation
  { id: '26', name: 'NBA 2K26', platforms: ['PC', 'PlayStation', 'Xbox', 'Switch'], genre: 'Sports', image: '/images/nba-2k26.jpg' },
]

export const gameCategories = ['All Games', 'Free PC Games', 'Paid PC Games', 'Nintendo Games', 'XBOX Games', 'PlayStation Games']
