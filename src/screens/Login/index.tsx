import { DismissKeyboardView } from '@/components/DismissKeyboard'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Text, TextInput, TouchableOpacity } from 'react-native'

export type PublicStackParamsList = {
  Login: undefined
  Register: undefined
}

export const Login = () => {
  const navigation = useNavigation<StackNavigationProp<PublicStackParamsList>>()

  return (
    <DismissKeyboardView>
      <Text>Tela de login!</Text>
      <TextInput className="bg-gray-500 w-full" />
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text>Regitrar</Text>
      </TouchableOpacity>
    </DismissKeyboardView>
  )
}
