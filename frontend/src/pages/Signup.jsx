import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import GlassCard from '../components/GlassCard.jsx'
import api from '../api/client.js'

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { data } = await api.post('/auth/signup', form)
      login(data.user, data.token)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Could not create your account. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="px-4 sm:px-8 min-h-[75vh] flex items-center justify-center py-16">
      <GlassCard strong className="w-full max-w-md">
        <span className="eyebrow">Start planning</span>
        <h1 className="font-display text-3xl mt-2 text-olive-900">Create your account</h1>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="text-sm font-medium text-olive-700">Full name</label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Alex Rivera"
              className="input-field mt-1.5"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-olive-700">Email</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="input-field mt-1.5"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-olive-700">Password</label>
            <input
              type="password"
              name="password"
              required
              minLength={6}
              value={form.password}
              onChange={handleChange}
              placeholder="At least 6 characters"
              className="input-field mt-1.5"
            />
          </div>

          {error && <p className="text-sm text-rose-600">{error}</p>}

          <button type="submit" disabled={loading} className="btn-primary w-full mt-2">
            {loading ? 'Creating account…' : 'Sign up'}
          </button>
        </form>

        <p className="text-sm text-olive-600 mt-6 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-rose-600 font-medium hover:underline">
            Log in
          </Link>
        </p>
      </GlassCard>
    </div>
  )
}
