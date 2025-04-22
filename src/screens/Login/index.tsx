import { AuthHeader } from '@/components/AuthHeader'
import { DismissKeyboardView } from '@/components/DismissKeyboard'
import { View } from 'react-native'
import { LoginForm } from './LoginForm'
import { useAuthContext } from '@/context/auth.context'

export type PublicStackParamsList = {
  Login: undefined
  Register: undefined
}

export const Login = () => {
  const { user } = useAuthContext()

  return (
    <DismissKeyboardView>
      <View className="flex-1 w-[82%] self-center">
        <AuthHeader />
        <LoginForm />
      </View>
    </DismissKeyboardView>
  )
}
