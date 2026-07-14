import { Link } from 'react-router-dom'

export default function TripCard({ trip }) {
  return (
    <Link to={`/trips/${trip._id}`}>
      <div className="glass rounded-3xl p-6 h-full flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-soft cursor-pointer group">
        <div>
          <span className="eyebrow">{trip.days} day{trip.days > 1 ? 's' : ''}</span>
          <h3 className="font-display text-2xl mt-2 text-olive-900 group-hover:text-olive-700 transition-colors">
            {trip.destination}
          </h3>
          <p className="text-sm text-olive-600 mt-2 line-clamp-2">{trip.summary}</p>
        </div>
        <div className="flex items-center justify-between mt-6">
          <span className="text-sm font-medium text-rose-600">₹{trip.budget?.toLocaleString('en-IN')}</span>
          <span className="text-xs text-olive-500">{new Date(trip.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </Link>
  )
}
