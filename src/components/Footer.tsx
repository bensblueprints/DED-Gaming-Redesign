import { Link } from 'react-router-dom'
import { Facebook, Instagram, Twitter, MessageCircle, Twitch } from 'lucide-react'

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'Games', path: '/games' },
  { label: 'Events', path: '/events' },
  { label: 'Coaching', path: '/coaching' },
  { label: 'Book', path: '/book' },
  { label: 'Shop', path: '/shop' },
  { label: 'Membership', path: '/membership' },
]

const infoLinks = [
  { label: 'PC Specs', path: '/#specs' },
  { label: 'Pricing', path: '/book' },
  { label: 'Birthday Parties', path: '/book' },
  { label: 'Corporate Events', path: '/book' },
  { label: 'FAQ', path: '/membership' },
]

export default function Footer() {
  return (
    <footer className="bg-ded-bg border-t border-ded-border">
      <div className="container-main pt-16 md:pt-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ded-accent-blue to-ded-accent-cyan flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor" opacity="0.3"/>
                  <circle cx="9" cy="10" r="1.5" fill="currentColor"/>
                  <circle cx="15" cy="10" r="1.5" fill="currentColor"/>
                  <path d="M8 15c1.5 2 3.5 2 4 2s2.5 0 4-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                </svg>
              </div>
              <span className="font-display font-bold text-xl text-white">DED GAMING</span>
            </Link>
            <p className="text-sm text-ded-text-muted max-w-[240px] mb-6">
              Port Chester's Ultimate Gaming Authority
            </p>
            <div className="flex items-center gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-ded-text-muted hover:text-ded-accent-blue transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-ded-text-muted hover:text-ded-accent-blue transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-ded-text-muted hover:text-ded-accent-blue transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-ded-text-muted hover:text-ded-accent-blue transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="https://twitch.tv" target="_blank" rel="noopener noreferrer" className="text-ded-text-muted hover:text-ded-accent-blue transition-colors">
                <Twitch className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-widest text-ded-text-muted mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-ded-text-secondary hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-widest text-ded-text-muted mb-4">Information</h4>
            <ul className="space-y-2.5">
              {infoLinks.map(link => (
                <li key={link.label}>
                  <Link to={link.path} className="text-sm text-ded-text-secondary hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-widest text-ded-text-muted mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 text-ded-accent-blue mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="text-sm text-white">42 Westchester Ave</p>
                  <p className="text-sm text-ded-text-secondary">Port Chester, NY 10573</p>
                </div>
              </div>
              <a href="tel:3475727763" className="flex items-center gap-2 text-sm text-ded-accent-blue hover:underline">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (347) 572-7763
              </a>
              <a href="mailto:host@dedesc.com" className="flex items-center gap-2 text-sm text-ded-accent-blue hover:underline">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                host@dedesc.com
              </a>
              <div className="pt-2">
                <p className="text-xs text-ded-text-muted">Sun–Thu: 2PM – Midnight</p>
                <p className="text-xs text-ded-text-muted">Fri–Sat: 2PM – 2AM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-ded-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-ded-text-muted">© 2025 DED Gaming. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs text-ded-text-muted">
            <Link to="/" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>·</span>
            <Link to="/" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
