import { useState } from 'react'
import './App.css'
import { ThemeToggle } from './ThemeToggle'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ThemeToggle />
    <div className="bg-background text-foreground p-4 rounded-lg shadow">
      Welcome to Dsentr
    </div>
    </>
  )
}

export default App
