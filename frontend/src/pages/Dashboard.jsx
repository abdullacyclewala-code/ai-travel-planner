import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import TripCard from '../components/TripCard.jsx'
import GlassCard from '../components/GlassCard.jsx'
import api from '../api/client.js'

export default function Dashboard() {
  const { user } = useAuth()
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const { data } = await api.get('/trips')
        setTrips(data.trips || [])
      } catch (err) {
        setError('Could not load your trips right now.')
      } finally {
        setLoading(false)
      }
    }
    fetchTrips()
  }, [])

  return (
    <div className="px-4 sm:px-8 py-12 max-w-6xl mx-auto min-h-[70vh]">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <span className="eyebrow">Your trips</span>
          <h1 className="font-display text-3xl sm:text-4xl mt-2 text-olive-900">
            Welcome back, {user?.name?.split(' ')[0] || 'traveler'}
          </h1>
        </div>
        <Link to="/plan" className="btn-primary">
          + Plan a new trip
        </Link>
      </div>

      {loading && <p className="text-olive-600">Loading your trips…</p>}
      {error && <p className="text-rose-600">{error}</p>}

      {!loading && !error && trips.length === 0 && (
        <GlassCard strong className="text-center py-16">
          <h3 className="font-display text-2xl text-olive-900">No trips yet</h3>
          <p className="text-olive-600 mt-2">
            Your saved itineraries will show up here once you plan your first trip.
          </p>
          <Link to="/plan" className="btn-rose mt-6 inline-flex">
            Plan your first trip
          </Link>
        </GlassCard>
      )}

      {!loading && trips.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <TripCard key={trip._id} trip={trip} />
          ))}
        </div>
      )}
    </div>
  )
}
