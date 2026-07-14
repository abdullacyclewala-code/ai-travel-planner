export default function GlassCard({ children, className = '', strong = false }) {
  return (
    <div
      className={`${strong ? 'glass-strong' : 'glass'} rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:shadow-soft ${className}`}
    >
      {children}
    </div>
  )
}
