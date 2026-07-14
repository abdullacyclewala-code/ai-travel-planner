export default function RouteLine({ className = '', stops = 3, animate = true }) {
  const width = 600
  const height = 120
  const points = Array.from({ length: stops }, (_, i) => {
    const x = 40 + (i * (width - 80)) / (stops - 1)
    const y = 60 + Math.sin(i * 1.3) * 30
    return { x, y }
  })
  const path = points
    .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
    .join(' ')

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={path}
        stroke="#a22f3d"
        strokeOpacity="0.45"
        strokeWidth="2"
        strokeDasharray="6 8"
        strokeLinecap="round"
        className={animate ? 'animate-drawLine' : ''}
        style={{ strokeDasharray: 400, strokeDashoffset: animate ? undefined : 0 }}
      />
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="7" fill="#f7f4ee" stroke="#576b39" strokeWidth="2" />
          <circle cx={p.x} cy={p.y} r="2.5" fill="#576b39" />
        </g>
      ))}
    </svg>
  )
}
