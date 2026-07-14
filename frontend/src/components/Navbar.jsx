import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-200 ${
      isActive ? 'text-olive-800' : 'text-olive-600 hover:text-olive-800'
    }`

  return (
    <header className="sticky top-0 z-50 px-4 sm:px-8 pt-4">
      <nav className="glass max-w-6xl mx-auto flex items-center justify-between rounded-full px-5 sm:px-8 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-display font-semibold text-olive-800">Wayfare</span>
          <span className="hidden sm:inline text-[10px] uppercase tracking-[0.2em] text-rose-600 mt-1">
            AI Travel
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={linkClass} end>
            Home
          </NavLink>
          {user && (
            <>
              <NavLink to="/dashboard" className={linkClass}>
                Trips
              </NavLink>
              <NavLink to="/plan" className={linkClass}>
                Plan a Trip
              </NavLink>
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link
                to="/profile"
                className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full bg-olive-200 text-olive-800 font-semibold text-sm"
                title={user.name}
              >
                {user.name?.[0]?.toUpperCase() || 'U'}
              </Link>
              <button
                onClick={() => {
                  logout()
                  navigate('/')
                }}
                className="btn-secondary !px-4 !py-2 text-sm"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-secondary !px-4 !py-2 text-sm">
                Log in
              </Link>
              <Link to="/signup" className="btn-primary !px-4 !py-2 text-sm">
                Sign up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}
