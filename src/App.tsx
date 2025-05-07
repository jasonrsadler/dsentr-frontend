import { ThemeToggle } from '@/components/ThemeToggle'
import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div className="bg-white text-black dark:bg-zinc-900 dark:text-white min-h-screen flex flex-col">
      <header className="flex justify-between items-center px-6 py-4 border-b border-zinc-200 dark:border-zinc-700">
        <div className="text-xl font-bold tracking-tight">Dsentr</div>
        <nav className="space-x-6">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/how-it-works" className="hover:underline">How It Works</Link>
        </nav>
        <ThemeToggle />
      </header>

      <main className="flex-grow px-6 py-20 flex flex-col items-center text-center">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight max-w-3xl">
          Automate your work with modular logic — <span className="text-indigo-600 dark:text-indigo-400">no code required</span>
        </h1>
        <p className="mt-6 text-lg max-w-xl text-zinc-700 dark:text-zinc-300">
          Dsentr is a modular no-code automation platform. Connect data, trigger workflows, and build dynamic logic without writing a single line of code.
        </p>
        <button className="mt-8 px-6 py-3 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400 transition">
          Get Started
        </button>
      </main>

      <section className="bg-zinc-50 dark:bg-zinc-800 py-16 px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-10 text-center">
          <div>
            <div className="mb-4 inline-block">
              {/* Plug icon */}
              <svg className="w-10 h-10 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M12 16v6m0-6v-4m4-4l4-4M8 4L4 0m0 20l4-4m12 4l-4-4M4 8L0 4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold">Modular by Design</h3>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">Build custom workflows with pluggable components that fit your logic.</p>
          </div>

          <div>
            <div className="mb-4 inline-block">
              {/* Clock icon */}
              <svg className="w-10 h-10 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold">Trigger-Driven</h3>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">Schedule tasks, respond to webhooks, or react to user input dynamically.</p>
          </div>

          <div>
            <div className="mb-4 inline-block">
              {/* Shield check icon */}
              <svg className="w-10 h-10 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold">Secure & Scalable</h3>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">Built with robust architecture using Rust and React — fast, secure, and ready to grow.</p>
          </div>
        </div>
      </section>

      <footer className="text-center py-6 text-sm text-zinc-500 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-700">
        &copy; {new Date().getFullYear()} Dsentr. All rights reserved.
      </footer>
    </div>
  )
}
