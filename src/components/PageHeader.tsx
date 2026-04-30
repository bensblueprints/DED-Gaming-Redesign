import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

interface PageHeaderProps {
  title: string
  subtitle?: string
  image?: string
}

export default function PageHeader({ title, subtitle, image }: PageHeaderProps) {
  return (
    <section className="relative min-h-[300px] md:min-h-[400px] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-ded-bg via-ded-surface to-ded-surface-light" />
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(37,99,235,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37,99,235,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Optional background image */}
      {image && (
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${image})` }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 container-main text-center py-20">
        <div className="flex items-center justify-center gap-2 text-xs text-ded-text-muted mb-4">
          <Link to="/" className="hover:text-ded-text-secondary transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-ded-text-secondary">{title}</span>
        </div>
        <h1 className="font-display text-4xl md:text-[56px] font-bold text-white leading-tight tracking-tight mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-base md:text-lg text-ded-text-secondary max-w-[560px] mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
