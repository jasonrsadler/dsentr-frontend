import PlugIcon from '@/assets/svg/PlugIcon'
import ClockIcon from '@/assets/svg/ClockIcon'
import ShieldIcon from '@/assets/svg/ShieldIcon'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
      <main className="flex-grow px-6 py-20 flex flex-col items-center text-center">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight max-w-3xl">
          Automate your work with modular logic —{' '}
          <span className="text-indigo-600 dark:text-indigo-400">
            no code required
          </span>
        </h1>
        <p className="mt-6 text-lg max-w-xl text-zinc-900 dark:text-zinc-300">
          Dsentr is a modular no-code automation platform. Connect data, trigger
          workflows, and build dynamic logic without writing a single line of
          code.
        </p>
        <Link to="/get-started">
          <button className="mt-8 px-6 py-3 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400 transition">
            Get Started
          </button>
        </Link>
      </main>

      <section className="py-16 px-6 bg-zinc-50 dark:bg-zinc-800">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-10 text-center">
          <div>
            <div className="mb-4 inline-block">
              <PlugIcon />
            </div>
            <h3 className="text-xl font-semibold">Modular by Design</h3>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Build custom workflows with pluggable components that fit your
              logic.
            </p>
          </div>

          <div>
            <div className="mb-4 inline-block">
              <ClockIcon />
            </div>
            <h3 className="text-xl font-semibold">Trigger-Driven</h3>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Schedule tasks, respond to webhooks, or react to user input
              dynamically.
            </p>
          </div>

          <div>
            <div className="mb-4 inline-block">
              <ShieldIcon />
            </div>
            <h3 className="text-xl font-semibold">Secure & Scalable</h3>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Built with robust architecture using Rust and React — fast,
              secure, and ready to grow.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
