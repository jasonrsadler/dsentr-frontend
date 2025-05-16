import { useEffect, useRef } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useAuth } from '@/stores/auth'
import { ThemeToggle } from '@/components/ThemeToggle'
import { NavLinks } from '@/components/NavLinks'
import { MobileNav } from '@/components/MobileNav'
import Home from '@/Home'
import About from '@/About'
import HowItWorks from '@/HowItWorks'
import NotFound from '@/components/NotFound'
import { DsentrLogo } from '@/components/DsentrLogo'
import GetStarted from '@/GetStarted'
import Signup from '@/Signup'
import CheckEmail from '@/CheckEmail'
import VerifyEmail from '@/VerifyEmail'
import Login from '@/Login'
import Dashboard from '@/Dashboard'
import ProtectedRoute from '@/components/ProtectedRoute'
import LogoutHandler from '@/Logout'
import ForgotPassword from '@/ForgotPassword'
import { NavigateButton } from './components/UI/Buttons/NavigateButton'

export default function App() {
  const { user, isLoading, checkAuth } = useAuth()
  const hasCheckedAuth = useRef(false)

  useEffect(() => {
    if (hasCheckedAuth.current) return
    hasCheckedAuth.current = true
    checkAuth()
  }, [checkAuth])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-zinc-600 dark:text-zinc-300">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex justify-between items-center px-6 py-4 border-b border-zinc-200 dark:border-zinc-700">
        <div className="flex items-center gap-1 font-bold tracking-tight text-xl text-zinc-900 dark:text-zinc-100">
          <span className="leading-none">Dsentr</span>
          <span className="inline-block align-middle" style={{ height: '1em' }}>
            <DsentrLogo className="w-[1.5em] h-[1.5em]" />
          </span>
        </div>

        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-sm text-zinc-600 dark:text-zinc-300 leading-none">
              {user.first_name} {user.last_name}
            </span>

            <NavigateButton
              to="/logout"
              className="px-3 py-2 text-sm leading-none h-9"
            >
              Log out
            </NavigateButton>

            <ThemeToggle />
          </div>
        ) : (
          <div className="hidden md:flex gap-4 items-center">
            <NavLinks />

            <NavigateButton
              to="/login"
              className="px-3 py-2 text-sm leading-none h-9"
            >
              Log in
            </NavigateButton>

            <ThemeToggle />
          </div>
        )}

        <div className="md:hidden">
          <MobileNav />
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/check-email" element={<CheckEmail />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<LogoutHandler />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <footer className="text-center py-6 text-sm text-zinc-500 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-700">
        &copy; {new Date().getFullYear()} Dsentr. All rights reserved.
      </footer>
    </div>
  )
}
