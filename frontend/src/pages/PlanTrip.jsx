import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GlassCard from '../components/GlassCard.jsx'
import RouteLine from '../components/RouteLine.jsx'
import api from '../api/client.js'

export default function PlanTrip() {
  const [form, setForm] = useState({ destination: '', days: 3, budget: 20000 })
  const [itinerary, setItinerary] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.name === 'destination' ? e.target.value : Number(e.target.value) })

  const handleGenerate = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    setItinerary(null)
    try {
      const { data } = await api.post('/trips/generate', form)
      setItinerary(data.itinerary)
    } catch (err) {
      setError(err.response?.data?.message || 'Could not generate an itinerary. Try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      const { data } = await api.post('/trips', { ...form, itinerary })
      navigate(`/trips/${data.trip._id}`)
    } catch (err) {
      setError('Could not save this trip.')
    }
  }

  return (
    <div className="px-4 sm:px-8 py-12 max-w-5xl mx-auto min-h-[70vh]">
      <div className="text-center mb-10">
        <span className="eyebrow">New itinerary</span>
        <h1 className="font-display text-3xl sm:text-4xl mt-2 text-olive-900">Where to, next?</h1>
        <p className="text-olive-600 mt-2">Three details, one AI-drafted route.</p>
      </div>

      <GlassCard strong className="max-w-xl mx-auto">
        <form onSubmit={handleGenerate} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-olive-700">Destination</label>
            <input
              type="text"
              name="destination"
              required
              value={form.destination}
              onChange={handleChange}
              placeholder="e.g. Udaipur, Rajasthan"
              className="input-field mt-1.5"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-olive-700">Days</label>
              <input
                type="number"
                name="days"
                min={1}
                max={30}
                required
                value={form.days}
                onChange={handleChange}
                className="input-field mt-1.5"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-olive-700">Budget (₹)</label>
              <input
                type="number"
                name="budget"
                min={1000}
                step={500}
                required
                value={form.budget}
                onChange={handleChange}
                className="input-field mt-1.5"
              />
            </div>
          </div>

          {error && <p className="text-sm text-rose-600">{error}</p>}

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Drafting your route…' : 'Generate itinerary'}
          </button>
        </form>
      </GlassCard>

      {loading && (
        <div className="max-w-xl mx-auto mt-10 text-center">
          <RouteLine className="w-full h-auto" stops={3} />
          <p className="text-olive-500 text-sm mt-2">Gemini is mapping your trip…</p>
        </div>
      )}

      {itinerary && (
        <div className="mt-12">
          <GlassCard className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl text-olive-900">
                {form.destination} · {form.days} days
              </h2>
              <button onClick={handleSave} className="btn-rose !py-2 !px-5 text-sm">
                Save trip
              </button>
            </div>
            <div className="space-y-6">
              {itinerary.map((day) => (
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
      )}
    </div>
  )
}
