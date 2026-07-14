import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import GlassCard from '../components/GlassCard.jsx'
import api from '../api/client.js'

export default function TripDetails() {
  const { id } = useParams()
  const [trip, setTrip] = useState(null)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const { data } = await api.get(`/trips/${id}`)
        setTrip(data.trip)
      } catch (err) {
        setError('Trip not found.')
      }
    }
    fetchTrip()
  }, [id])

  const handleDelete = async () => {
    if (!confirm('Delete this trip? This cannot be undone.')) return
    try {
      await api.delete(`/trips/${id}`)
      navigate('/dashboard')
    } catch (err) {
      setError('Could not delete this trip.')
    }
  }

  if (error) {
    return (
      <div className="px-4 sm:px-8 py-24 text-center">
        <p className="text-rose-600">{error}</p>
      </div>
    )
  }

  if (!trip) {
    return (
      <div className="px-4 sm:px-8 py-24 text-center text-olive-600">Loading trip…</div>
    )
  }

  return (
    <div className="px-4 sm:px-8 py-12 max-w-4xl mx-auto min-h-[70vh]">
      <GlassCard strong>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <span className="eyebrow">{trip.days} day itinerary</span>
            <h1 className="font-display text-3xl sm:text-4xl mt-2 text-olive-900">{trip.destination}</h1>
            <p className="text-rose-600 font-medium mt-1">₹{trip.budget?.toLocaleString('en-IN')} budget</p>
          </div>
          <button onClick={handleDelete} className="btn-secondary !py-2 !px-5 text-sm">
            Delete trip
          </button>
        </div>

        <div className="mt-8 space-y-6">
          {trip.itinerary?.map((day) => (
            <div key={day.day} className="border-l-2 border-olive-200 pl-5 relative">
              <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-olive-500 border-2 border-sand" />
              <h3 className="font-display text-lg text-olive-900">Day {day.day}</h3>
              <ul className="mt-2 space-y-1.5 text-sm text-olive-700">
                {day.activities.map((act, idx) => (
                  <li key={idx}>{act}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}
