import { NavigationContainer } from '@react-navigation/native'
import { PublicRoutes } from './PublicRoutes'
import { useCallback, useState } from 'react'
import { PrivateRoutes } from './PrivateRoutes'
import { SystemBars } from 'react-native-edge-to-edge'

const NavigationRoutes = () => {
  const [user, setUser] = useState(undefined)

  const Routes = useCallback(() => {
    if (!user) {
      return <PublicRoutes />
    } else {
      return <PrivateRoutes />
    }
  }, [user])

  return (
    <NavigationContainer>
      <SystemBars style="light" />
      <Routes />
    </NavigationContainer>
  )
}

export default NavigationRoutes
