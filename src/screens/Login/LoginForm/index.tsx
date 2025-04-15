import { AppButton } from '@/components/AppButton'
import { AppInput } from '@/components/AppInput'
import { PublicStackParamsList } from '@/routes/PublicRoutes'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'
import { Text, View } from 'react-native'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from './schema'

export interface FormLoginParams {
  email: string
  password: string
}

export const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormLoginParams>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  })

  const navigation = useNavigation<NavigationProp<PublicStackParamsList>>()

  const onSubmit = async () => {}

  return (
    <>
      <AppInput
        control={control}
        name="email"
        lable="EMAIL"
        placeholder="mail@example.br"
        leftIconName="mail-outline"
      />
      <AppInput
        control={control}
        name="password"
        lable="SENHA"
        placeholder="Sua senha"
        leftIconName="lock-outline"
        secureTextEntry
      />

      <View className="flex-1 justify-between mt-8 mb-6 min-h-[250px]">
        <AppButton onPress={handleSubmit(onSubmit)} iconName="arrow-forward">
          Login
        </AppButton>

        <View>
          <Text className="mb-6 text-gray-300 text-base">
            Ainda não possui uma conta?
          </Text>
          <AppButton
            onPress={() => navigation.navigate('Register')}
            iconName="arrow-forward"
            mode="outline"
          >
            Cadastrar
          </AppButton>
        </View>
      </View>
    </>
  )
}
