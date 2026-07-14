import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import RouteLine from '../components/RouteLine.jsx'
import GlassCard from '../components/GlassCard.jsx'

const FEATURES = [
  {
    title: 'AI-crafted itineraries',
    body: 'Tell us where, how long, and your budget. Gemini drafts a day-by-day plan built around how you actually travel.',
  },
  {
    title: 'Save every trip',
    body: 'Keep a running log of plans, past and future, in one calm place you can return to anytime.',
  },
  {
    title: 'Built around budget',
    body: 'Every itinerary respects the number you give it, from stays to street food.',
  },
]

const STEPS = [
  { label: 'Tell Wayfare', body: 'Destination, trip length, and budget — three fields, thirty seconds.' },
  { label: 'AI drafts the route', body: 'Gemini builds a day-by-day plan, stop by stop, meal by meal.' },
  { label: 'Save & revisit', body: 'Keep it in your trip list, edit anytime, share when you\u2019re ready.' },
]

export default function Landing() {
  const { user } = useAuth()

  return (
    <div className="px-4 sm:px-8">
      {/* Hero */}
      <section className="max-w-6xl mx-auto pt-16 sm:pt-24 pb-12 text-center relative">
        <span className="eyebrow animate-fadeUp">Your next trip, mapped in minutes</span>
        <h1
          className="font-display text-4xl sm:text-6xl leading-[1.1] mt-5 text-olive-900 animate-fadeUp"
          style={{ animationDelay: '0.1s', opacity: 0 }}
        >
          Wander further,
          <br />
          <span className="italic text-rose-600">plan a little less.</span>
        </h1>
        <p
          className="max-w-xl mx-auto mt-6 text-olive-700 text-lg animate-fadeUp"
          style={{ animationDelay: '0.2s', opacity: 0 }}
        >
          Wayfare turns a destination, a day count, and a budget into a real itinerary —
          drafted by AI, refined by you.
        </p>

        <div
          className="flex items-center justify-center gap-4 mt-8 animate-fadeUp"
          style={{ animationDelay: '0.3s', opacity: 0 }}
        >
          <Link to={user ? '/plan' : '/signup'} className="btn-primary">
            Plan my trip
          </Link>
          <Link to={user ? '/dashboard' : '/login'} className="btn-secondary">
            {user ? 'View my trips' : 'Log in'}
          </Link>
        </div>

        <div className="mt-14 max-w-2xl mx-auto animate-fadeUp" style={{ animationDelay: '0.4s', opacity: 0 }}>
          <RouteLine className="w-full h-auto" stops={4} />
          <div className="flex justify-between text-xs text-olive-500 px-2 -mt-2">
            <span>Departure</span>
            <span>Stop</span>
            <span>Stop</span>
            <span>Arrival</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto py-16">
        <div className="grid sm:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <GlassCard key={f.title} className="animate-float" >
              <h3 className="font-display text-xl text-olive-900">{f.title}</h3>
              <p className="text-sm text-olive-600 mt-3 leading-relaxed">{f.body}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* How it works — real sequence, so numbering is earned */}
      <section className="max-w-6xl mx-auto py-16">
        <div className="text-center mb-12">
          <span className="eyebrow">The route</span>
          <h2 className="font-display text-3xl sm:text-4xl mt-3 text-olive-900">
            Three stops to a finished itinerary
          </h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          {STEPS.map((s, i) => (
            <div key={s.label} className="relative">
              <GlassCard strong>
                <span className="font-display text-4xl text-rose-300">0{i + 1}</span>
                <h3 className="font-display text-lg mt-3 text-olive-900">{s.label}</h3>
                <p className="text-sm text-olive-600 mt-2 leading-relaxed">{s.body}</p>
              </GlassCard>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto py-16">
        <GlassCard strong className="text-center">
          <h2 className="font-display text-3xl text-olive-900">Ready to draft your itinerary?</h2>
          <p className="text-olive-600 mt-3">It takes less time than packing your bag.</p>
          <Link to={user ? '/plan' : '/signup'} className="btn-rose mt-6 inline-flex">
            Get started
          </Link>
        </GlassCard>
      </section>
    </div>
  )
}
