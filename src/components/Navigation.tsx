import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Phone, ShoppingCart, Bell } from 'lucide-react'
import Badge from '@mui/material/Badge'
import IconButton from '@mui/material/IconButton'
import { Badge as AntBadge } from 'antd'
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
} from '@/components/ui/menubar'
import { useApp } from '@/context/AppContext'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Events', path: '/events' },
  { label: 'Coaching', path: '/coaching' },
  { label: 'Book', path: '/book' },
  { label: 'Shop', path: '/shop' },
  { label: 'Membership', path: '/membership' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const { openLogin, isLoggedIn, user, cartCount } = useApp()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[rgba(3,7,18,0.85)] backdrop-blur-xl shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="container-main">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ded-accent-blue to-ded-accent-cyan flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor" opacity="0.3"/>
                  <circle cx="9" cy="10" r="1.5" fill="currentColor"/>
                  <circle cx="15" cy="10" r="1.5" fill="currentColor"/>
                  <path d="M8 15c1.5 2 3.5 2 4 2s2.5 0 4-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                </svg>
              </div>
              <span className="font-display font-bold text-lg md:text-xl text-white tracking-tight">
                DED GAMING
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative text-sm font-medium tracking-wider transition-colors duration-250 group ${
                    location.pathname === link.path
                      ? 'text-white'
                      : 'text-ded-text-secondary hover:text-white'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-ded-accent-blue transition-all duration-250 ${
                      location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              ))}

              {/* Games Dropdown via shadcn Menubar */}
              <Menubar className="border-none bg-transparent">
                <MenubarMenu>
                  <MenubarTrigger className="text-sm font-medium tracking-wider text-ded-text-secondary hover:text-white data-[state=open]:text-white bg-transparent border-none cursor-pointer">
                    Games
                  </MenubarTrigger>
                  <MenubarContent className="bg-ded-surface border-ded-border">
                    <MenubarItem asChild className="cursor-pointer focus:bg-ded-surface-light focus:text-white">
                      <Link to="/games">All Games</Link>
                    </MenubarItem>
                    <MenubarItem asChild className="cursor-pointer focus:bg-ded-surface-light focus:text-white">
                      <Link to="/games?cat=pc">PC Games</Link>
                    </MenubarItem>
                    <MenubarItem asChild className="cursor-pointer focus:bg-ded-surface-light focus:text-white">
                      <Link to="/games?cat=console">Console Games</Link>
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Cart Icon with MUI Badge */}
              <Link to="/shop" className="relative">
                <IconButton size="small" sx={{ color: '#CBD5E1' }} className="hover:text-white transition-colors">
                  <Badge badgeContent={cartCount} color="primary" max={99}>
                    <ShoppingCart className="w-5 h-5" />
                  </Badge>
                </IconButton>
              </Link>

              {/* Notification Ant Badge */}
              <div className="hidden md:block">
                <AntBadge dot color="#06B6D4">
                  <IconButton size="small" sx={{ color: '#CBD5E1' }} className="hover:text-white transition-colors">
                    <Bell className="w-5 h-5" />
                  </IconButton>
                </AntBadge>
              </div>

              <a
                href="tel:3475727763"
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-ded-accent-blue text-ded-accent-blue text-sm font-medium hover:bg-ded-accent-blue hover:text-white transition-all duration-250"
              >
                <Phone className="w-4 h-4" />
                (347) 572-7763
              </a>
              {isLoggedIn ? (
                <Link
                  to="/account"
                  className="hidden md:flex items-center gap-2 text-sm font-medium text-ded-text-secondary hover:text-white transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-ded-surface-light flex items-center justify-center text-ded-accent-cyan font-bold text-xs">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  {user?.name?.split(' ')[0]}
                </Link>
              ) : (
                <button
                  onClick={openLogin}
                  className="hidden md:block text-sm font-medium text-ded-text-secondary hover:text-white transition-colors"
                >
                  Log In
                </button>
              )}
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden text-white p-2"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-ded-surface">
          <div className="container-main pt-6">
            <div className="flex justify-between items-center mb-12">
              <span className="font-display font-bold text-xl text-white">DED GAMING</span>
              <button onClick={() => setMobileOpen(false)} className="text-white p-2">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-col gap-6">
              {[...navLinks, { label: 'Games', path: '/games' }].map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-2xl font-display font-semibold ${
                    location.pathname === link.path ? 'text-ded-accent-blue' : 'text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-6 border-t border-ded-border">
                {isLoggedIn ? (
                  <Link to="/account" className="text-lg text-ded-text-secondary">My Account</Link>
                ) : (
                  <button onClick={openLogin} className="text-lg text-ded-text-secondary">Log In</button>
                )}
              </div>
              <a href="tel:3475727763" className="flex items-center gap-2 text-ded-accent-blue mt-4">
                <Phone className="w-5 h-5" />
                (347) 572-7763
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
