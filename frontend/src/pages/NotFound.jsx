import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="px-4 sm:px-8 py-32 text-center min-h-[60vh]">
      <span className="eyebrow">Off the map</span>
      <h1 className="font-display text-5xl mt-3 text-olive-900">404</h1>
      <p className="text-olive-600 mt-3">This route doesn't exist on our itinerary.</p>
      <Link to="/" className="btn-primary mt-8 inline-flex">
        Back home
      </Link>
    </div>
  )
}
