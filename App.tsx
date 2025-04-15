import NavigationRoutes from '@/routes'
import './src/styles/global.css'
import { StatusBar } from 'expo-status-bar'

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationRoutes />
    </>
  )
}
