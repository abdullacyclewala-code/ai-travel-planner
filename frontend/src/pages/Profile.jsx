import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import GlassCard from '../components/GlassCard.jsx'
import api from '../api/client.js'

export default function Profile() {
  const { user, login, token } = useAuth()
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '' })
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setError('')
    setLoading(true)
    try {
      const { data } = await api.put('/users/me', form)
      login(data.user, token)
      setMessage('Profile updated.')
    } catch (err) {
      setError(err.response?.data?.message || 'Could not update your profile.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="px-4 sm:px-8 py-12 max-w-2xl mx-auto min-h-[70vh]">
      <div className="mb-8">
        <span className="eyebrow">Account</span>
        <h1 className="font-display text-3xl mt-2 text-olive-900">Your profile</h1>
      </div>

      <GlassCard strong>
        <div className="flex items-center gap-4 mb-8">
          <div className="h-16 w-16 rounded-full bg-olive-200 text-olive-800 font-display text-2xl flex items-center justify-center">
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <div>
            <p className="font-display text-xl text-olive-900">{user?.name}</p>
            <p className="text-sm text-olive-500">{user?.email}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-olive-700">Full name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="input-field mt-1.5"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-olive-700">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="input-field mt-1.5"
            />
          </div>

          {message && <p className="text-sm text-olive-700">{message}</p>}
          {error && <p className="text-sm text-rose-600">{error}</p>}

          <button type="submit" disabled={loading} className="btn-primary w-full mt-2">
            {loading ? 'Saving…' : 'Save changes'}
          </button>
        </form>
      </GlassCard>
    </div>
  )
}
