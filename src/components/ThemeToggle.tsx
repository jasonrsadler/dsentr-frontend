import { useTheme } from '@/hooks/useTheme'
import SunIcon from '@/assets/svg/SunIcon'
import MoonIcon from '@/assets/svg/MoonIcon'

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-secondary p-2 rounded-full"
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}
