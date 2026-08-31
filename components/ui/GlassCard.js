export default function GlassCard({ children, className = '' }) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-sm ${className}`}
    >
      {children}
    </div>
  )
}
