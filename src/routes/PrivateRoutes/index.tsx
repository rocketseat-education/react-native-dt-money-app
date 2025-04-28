import { Home } from '@/screens/Home'
import { createStackNavigator } from '@react-navigation/stack'

export type PrivateStackParamsList = {
  Home: undefined
}

export const PrivateRoutes = () => {
  const PrivateStack = createStackNavigator<PrivateStackParamsList>()

  return (
    <PrivateStack.Navigator screenOptions={{ headerShown: false }}>
      <PrivateStack.Screen name="Home" component={Home} />
    </PrivateStack.Navigator>
  )
}
