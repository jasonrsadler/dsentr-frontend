import { Route, Routes } from 'react-router-dom'
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
import Login from './Login'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex justify-between items-center px-6 py-4 border-b border-zinc-200 dark:border-zinc-700">
        <div className="flex items-center gap-1 font-bold tracking-tight text-xl text-zinc-900 dark:text-zinc-100">
          <span className="leading-none">Dsentr</span>
          <span className="inline-block align-middle" style={{ height: '1em' }}>
            <DsentrLogo className="w-[1.5em] h-[1.5em]" />
          </span>
        </div>

        <div className="hidden md:flex gap-4 items-center">
          <NavLinks />
          <ThemeToggle />
        </div>
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
        <Route path="*" element={<NotFound />} />
        <Route path="/check-email" element={<CheckEmail />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      <footer className="text-center py-6 text-sm text-zinc-500 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-700">
        &copy; {new Date().getFullYear()} Dsentr. All rights reserved.
      </footer>
    </div>
  )
}
