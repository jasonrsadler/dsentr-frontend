import { Route, Routes } from 'react-router-dom'
import { ThemeToggle } from '@/components/ThemeToggle'
import { NavLinks } from '@/components/NavLinks'
import Home from '@/Home'
import About from '@/About'
import HowItWorks from './HowItWorks'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex justify-between items-center px-6 py-4 border-b border-zinc-200 dark:border-zinc-700">
        <div className="text-xl font-bold tracking-tight">Dsentr</div>
        <NavLinks />
        <ThemeToggle />
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
      </Routes>

      <footer className="text-center py-6 text-sm text-zinc-500 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-700">
        &copy; {new Date().getFullYear()} Dsentr. All rights reserved.
      </footer>
    </div>
  )
}
