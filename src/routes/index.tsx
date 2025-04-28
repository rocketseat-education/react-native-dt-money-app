import { NavigationContainer } from '@react-navigation/native'
import { useCallback, useState } from 'react'
import { PrivateRoutes } from './PrivateRoutes'
import { PublicRoutes } from './PublicRoutes'
import { SystemBars } from 'react-native-edge-to-edge'
import { useAuthContext } from '@/context/auth.context'
import { Loading } from '@/screens/Loading'

const NavigationRoutes = () => {
  const [loading, setLoading] = useState(true)
  const { token, user } = useAuthContext()

  const Routes = useCallback(() => {
    if (loading) {
      return <Loading setLoading={setLoading} />
    }

    if (!user || !token) {
      return <PublicRoutes />
    } else {
      return <PrivateRoutes />
    }
  }, [user, token, loading])

  return (
    <NavigationContainer>
      <SystemBars style="light" />
      <Routes />
    </NavigationContainer>
  )
}

export default NavigationRoutes
