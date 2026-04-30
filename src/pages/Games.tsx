import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import PageHeader from '@/components/PageHeader'
import ScrollReveal from '@/components/ScrollReveal'
import { games, gameCategories } from '@/data/games'

export default function Games() {
  const [activeCategory, setActiveCategory] = useState('All Games')

  const filteredGames = activeCategory === 'All Games'
    ? games
    : games.filter(g => {
        if (activeCategory === 'Free PC Games') {
          return ['Fortnite','Apex Legends','Brawlhalla','Counter-Strike 2','Dota 2','Fall Guys','League of Legends','Overwatch 2','Roblox','Rocket League','Team Fortress 2','Valorant','Halo Infinite','Smite','Marvel Rivals',"Call of Duty: Warzone",'Mecha BREAK','PUBG'].includes(g.name)
        }
        if (activeCategory === 'Paid PC Games') {
          return ['Elden Ring','Minecraft','Call of Duty: Black Ops 6','GTA 5','Cyberpunk 2077','Among Us','Dead by Daylight','Guilty Gear Strive','Helldivers 2','Left 4 Dead 2','Phasmophobia','Rainbow Six Siege','Rust','Sea of Thieves','Stardew Valley','Street Fighter 6','Terraria','Tekken 8'].includes(g.name)
        }
        if (activeCategory === 'Nintendo Games') {
          return g.platforms.includes('Nintendo Switch')
        }
        if (activeCategory === 'XBOX Games') {
          return g.platforms.includes('Xbox')
        }
        if (activeCategory === 'PlayStation Games') {
          return g.platforms.includes('PlayStation')
        }
        return true
      })

  return (
    <div>
      <PageHeader
        title="Our Game Library"
        subtitle="From competitive esports titles to casual favorites — we've got something for every player."
        image="/images/games-hero.jpg"
      />

      {/* Categories */}
      <section className="pt-10 pb-6">
        <div className="container-main">
          <div className="flex flex-wrap justify-center gap-2">
            {gameCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-250 ${
                  activeCategory === cat
                    ? 'bg-ded-accent-blue text-white'
                    : 'bg-ded-surface text-ded-text-secondary hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Games Grid */}
      <section className="section-padding">
        <div className="container-main">
          <ScrollReveal stagger={0.06} childSelector=".game-card">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5">
              {filteredGames.map(game => (
                <div key={game.id} className="game-card">
                  <div className="bg-ded-surface rounded-xl border border-ded-border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover hover:border-ded-accent-blue/60 group">
                    <div className="aspect-[3/4] overflow-hidden">
                      <img
                        src={game.image}
                        alt={game.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-display text-sm font-semibold text-white truncate">{game.name}</h3>
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {game.platforms.slice(0, 2).map(p => (
                          <span key={p} className="px-1.5 py-0.5 bg-ded-surface-light text-ded-text-secondary text-[10px] rounded">
                            {p}
                          </span>
                        ))}
                        {game.platforms.length > 2 && (
                          <span className="px-1.5 py-0.5 bg-ded-surface-light text-ded-text-secondary text-[10px] rounded">+{game.platforms.length - 2}</span>
                        )}
                      </div>
                      <p className="text-[10px] text-ded-text-muted mt-1">{game.genre}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-ded-surface">
        <div className="container-main text-center max-w-[600px]">
          <h3 className="font-display text-2xl font-semibold text-white">Don't see your game?</h3>
          <p className="mt-3 text-ded-text-secondary">
            We're always expanding our library. Reach out and let us know what you'd like to play.
          </p>
          <Link
            to="/book"
            className="inline-flex items-center gap-2 mt-6 px-6 py-2.5 border border-ded-accent-blue text-ded-accent-blue text-sm font-medium rounded-lg hover:bg-ded-accent-blue hover:text-white transition-all duration-250"
          >
            Contact Us <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
