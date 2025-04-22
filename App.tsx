import NavigationRoutes from '@/routes'
import './src/styles/global.css'
import { AuthContextProvider } from '@/context/auth.context'

export default function App() {
  return (
    <AuthContextProvider>
      <NavigationRoutes />
    </AuthContextProvider>
  )
}
