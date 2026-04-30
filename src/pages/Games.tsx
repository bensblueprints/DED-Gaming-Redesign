import { useState, useMemo } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Link } from 'react-router-dom'
import { ArrowRight, Info } from 'lucide-react'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import IconButton from '@mui/material/IconButton'
import { Tabs as AntTabs } from 'antd'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import PageHeader from '@/components/PageHeader'
import ScrollReveal from '@/components/ScrollReveal'
import { games, gameCategories } from '@/data/games'
import type { Game } from '@/data/games'

const difficultyMap: Record<string, string> = {
  'FPS': 'Hard',
  'Tactical FPS': 'Hard',
  'Battle Royale': 'Medium',
  'MOBA': 'Hard',
  'Fighting': 'Medium',
  'Sports/Racing': 'Easy',
  'Sports': 'Easy',
  'Racing': 'Easy',
  'Party': 'Easy',
  'Platform': 'Easy',
  'Action RPG': 'Medium',
  'Sandbox': 'Easy',
  'Action': 'Medium',
  'Hero Shooter': 'Medium',
  'Mecha Combat': 'Medium',
}

const difficultyColor: Record<string, string> = {
  'Easy': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  'Medium': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  'Hard': 'bg-red-500/20 text-red-400 border-red-500/30',
}

function GameDetailDialog({ game, children }: { game: Game; children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-ded-surface border-ded-border text-white max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-xl text-white">{game.name}</DialogTitle>
          <DialogDescription className="text-ded-text-secondary">
            {game.genre}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <div className="aspect-video rounded-lg overflow-hidden border border-ded-border">
            <img src={game.image} alt={game.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-white mb-2">Platforms</h4>
            <div className="flex flex-wrap gap-2">
              {game.platforms.map(p => (
                <Badge key={p} variant="outline" className="text-ded-text-secondary border-ded-border">
                  {p}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-white mb-2">Genre & Difficulty</h4>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-ded-accent-blue text-white">{game.genre}</Badge>
              <Badge className={difficultyColor[difficultyMap[game.genre] || 'Medium']}>
                {difficultyMap[game.genre] || 'Medium'}
              </Badge>
            </div>
          </div>
          <div className="pt-2">
            <Button asChild className="w-full bg-ded-accent-blue hover:bg-[#3B82F6] text-white">
              <Link to="/book">Book This Game</Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function Games() {
  const [activeCategory, setActiveCategory] = useState('All Games')
  const isMd = useMediaQuery('(min-width:768px)')
  const isLg = useMediaQuery('(min-width:1024px)')
  const isXl = useMediaQuery('(min-width:1280px)')
  const cols = isXl ? 5 : isLg ? 4 : isMd ? 3 : 2

  const filteredGames = useMemo(() => {
    if (activeCategory === 'All Games') return games
    if (activeCategory === 'Free PC Games') {
      return games.filter(g =>
        ['Fortnite','Apex Legends','Brawlhalla','Counter-Strike 2','Dota 2','Fall Guys','League of Legends','Overwatch 2','Roblox','Rocket League','Team Fortress 2','Valorant','Halo Infinite','Smite','Marvel Rivals',"Call of Duty: Warzone",'Mecha BREAK','PUBG'].includes(g.name)
      )
    }
    if (activeCategory === 'Paid PC Games') {
      return games.filter(g =>
        ['Elden Ring','Minecraft','Call of Duty: Black Ops 6','GTA 5','Cyberpunk 2077'].includes(g.name)
      )
    }
    if (activeCategory === 'Nintendo Games') {
      return games.filter(g => g.platforms.includes('Nintendo Switch'))
    }
    if (activeCategory === 'XBOX Games') {
      return games.filter(g => g.platforms.includes('Xbox'))
    }
    if (activeCategory === 'PlayStation Games') {
      return games.filter(g => g.platforms.includes('PlayStation'))
    }
    return games
  }, [activeCategory])

  const tabItems = gameCategories.map(cat => ({
    key: cat,
    label: cat,
    children: null,
  }))

  return (
    <div>
      <PageHeader
        title="Our Game Library"
        subtitle="From competitive esports titles to casual favorites — we've got something for every player."
        image="/images/games-hero.jpg"
      />

      {/* Categories - Ant Design Tabs */}
      <section className="pt-10 pb-6">
        <div className="container-main">
          <AntTabs
            activeKey={activeCategory}
            onChange={setActiveCategory}
            items={tabItems}
            className="[&_.ant-tabs-nav]:before:border-b-ded-border [&_.ant-tabs-tab]:text-ded-text-secondary [&_.ant-tabs-tab-active]:text-white [&_.ant-tabs-ink-bar]:bg-ded-accent-blue"
            centered
          />
        </div>
      </section>

      {/* Games Grid - MUI ImageList Masonry */}
      <section className="section-padding">
        <div className="container-main">
          <ScrollReveal stagger={0.06} childSelector=".game-item">
            <ImageList variant="masonry" cols={cols} gap={16}>
              {filteredGames.map(game => (
                <ImageListItem key={game.id} className="game-item overflow-hidden rounded-xl">
                  <GameDetailDialog game={game}>
                    <div className="cursor-pointer group">
                      <img
                        src={game.image}
                        alt={game.name}
                        loading="lazy"
                        className="w-full rounded-xl transition-transform duration-300 group-hover:scale-105"
                      />
                      <ImageListItemBar
                        title={game.name}
                        subtitle={game.genre}
                        position="below"
                        sx={{
                          background: 'transparent',
                          '& .MuiImageListItemBar-title': {
                            color: '#FFFFFF',
                            fontFamily: '"Space Grotesk", sans-serif',
                            fontWeight: 600,
                            fontSize: '0.875rem',
                          },
                          '& .MuiImageListItemBar-subtitle': {
                            color: '#64748B',
                            fontSize: '0.75rem',
                          },
                        }}
                        actionIcon={
                          <IconButton sx={{ color: '#CBD5E1' }} aria-label={`info about ${game.name}`}>
                            <Info className="w-4 h-4" />
                          </IconButton>
                        }
                      />
                      <div className="flex flex-wrap gap-1 mt-1 px-1">
                        <Badge className={`text-[10px] px-1.5 py-0 ${difficultyColor[difficultyMap[game.genre] || 'Medium']}`}>
                          {difficultyMap[game.genre] || 'Medium'}
                        </Badge>
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0 text-ded-text-secondary border-ded-border">
                          {game.platforms.slice(0, 2).join(', ')}
                          {game.platforms.length > 2 && '...'}
                        </Badge>
                      </div>
                    </div>
                  </GameDetailDialog>
                </ImageListItem>
              ))}
            </ImageList>
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
