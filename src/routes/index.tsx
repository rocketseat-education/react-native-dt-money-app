import { NavigationContainer } from '@react-navigation/native'
import { useCallback } from 'react'
import { PrivateRoutes } from './PrivateRoutes'
import { PublicRoutes } from './PublicRoutes'
import { SystemBars } from 'react-native-edge-to-edge'
import { useAuthContext } from '@/context/auth.context'

const NavigationRoutes = () => {
  const { token, user } = useAuthContext()

  const Routes = useCallback(() => {
    if (!user || !token) {
      return <PublicRoutes />
    } else {
      return <PrivateRoutes />
    }
  }, [user, token])

  return (
    <NavigationContainer>
      <SystemBars style="light" />
      <Routes />
    </NavigationContainer>
  )
}

export default NavigationRoutes
