import { AuthHeader } from '@/components/AuthHeader'
import { DismissKeyboardView } from '@/components/DismissKeyboard'
import { View } from 'react-native'
import { RegisterForm } from './RegisterForm'

export const Register = () => {
  return (
    <DismissKeyboardView>
      <View className="flex-1 w-[82%] self-center">
        <AuthHeader />
        <RegisterForm />
      </View>
    </DismissKeyboardView>
  )
}
