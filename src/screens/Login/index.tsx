import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Text, TouchableOpacity, View } from 'react-native'

export type PublicStackParamsList = {
  Login: undefined
  Register: undefined
}

export const Login = () => {
  const navigation = useNavigation<StackNavigationProp<PublicStackParamsList>>()

  return (
    <View className="flex-1 items-center justify-center">
      <Text>Tela de login!</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text>Regitrar</Text>
      </TouchableOpacity>
    </View>
  )
}
