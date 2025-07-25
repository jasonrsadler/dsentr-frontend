import { useAuth } from '@/stores/auth'

const Dashboard = () => {
  const { user } = useAuth()
  if (user) {
    console.log('User in Dashboard:', user)
    console.log('User in Dashboard:', user.first_name)
  }
  return (
    <div className="p-4 text-white">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <p className="text-gray-900 dark:text-gray-100 mt-2">
        Welcome back, {user?.first_name || user?.email}!
      </p>
    </div>
  )
}

export default Dashboard
