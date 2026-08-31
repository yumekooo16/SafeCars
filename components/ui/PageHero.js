export default function PageHero({ title, subtitle, accent = 'blue' }) {
  const accentClass =
    accent === 'amber'
      ? 'from-white to-amber-400'
      : 'from-white to-blue-500'

  return (
    <section className="relative pt-32 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.12),transparent_55%)]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1
          className={`text-4xl sm:text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r ${accentClass} bg-clip-text text-transparent`}
        >
          {title}
        </h1>
        {subtitle ? (
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        ) : null}
      </div>
    </section>
  )
}
