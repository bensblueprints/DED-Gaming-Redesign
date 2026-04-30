interface SectionHeadingProps {
  eyebrow: string
  heading: string
  description?: string
  centered?: boolean
}

export default function SectionHeading({ eyebrow, heading, description, centered = false }: SectionHeadingProps) {
  return (
    <div className={`mb-10 md:mb-14 ${centered ? 'text-center' : ''}`}>
      <span className="text-xs font-medium uppercase tracking-[0.08em] text-ded-accent-blue block mb-3">
        {eyebrow}
      </span>
      <h2 className="font-display text-3xl md:text-[40px] font-semibold text-white leading-tight tracking-tight">
        {heading}
      </h2>
      {description && (
        <p className={`mt-4 text-base text-ded-text-secondary leading-relaxed max-w-[640px] ${centered ? 'mx-auto' : ''}`}>
          {description}
        </p>
      )}
    </div>
  )
}
