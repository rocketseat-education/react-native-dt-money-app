import { AppButton } from '@/components/AppButton'
import { AppInput } from '@/components/AppInput'
import { PublicStackParamsList } from '@/routes/PublicRoutes'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'
import { Text, View } from 'react-native'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from './schema'
import { useAuthContext } from '@/context/auth.context'
import { AxiosError } from 'axios'

export interface FormRegisterParams {
  email: string
  name: string
  password: string
  confirmPassword: string
}

export const RegisterForm = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormRegisterParams>({
    defaultValues: {
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(schema),
  })

  const { handleRegister } = useAuthContext()

  const navigation = useNavigation<NavigationProp<PublicStackParamsList>>()

  const onSubmit = async (userData: FormRegisterParams) => {
    try {
      await handleRegister(userData)
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data)
      }
    }
  }

  return (
    <>
      <AppInput
        control={control}
        name="name"
        placeholder="Seu nome"
        lable="NOME"
        leftIconName="person"
      />

      <AppInput
        control={control}
        name="email"
        lable="EMAIL"
        leftIconName="mail-outline"
        placeholder="mail@example.br"
      />

      <AppInput
        control={control}
        name="password"
        lable="SENHA"
        placeholder="Sua senha"
        leftIconName="lock-outline"
        secureTextEntry
      />

      <AppInput
        control={control}
        name="confirmPassword"
        lable="SENHA"
        leftIconName="lock-outline"
        placeholder="Confirme sua senha"
        secureTextEntry
      />

      <View className="flex-1 justify-between mt-8 mb-6 min-h-[250px]">
        <AppButton onPress={handleSubmit(onSubmit)} iconName="arrow-forward">
          Cadastrar
        </AppButton>

        <View>
          <Text className="mb-6 text-gray-300 text-base">
            Já possui uma conta?
          </Text>
          <AppButton
            onPress={() => navigation.navigate('Login')}
            iconName="arrow-forward"
            mode="outline"
          >
            Acessar
          </AppButton>
        </View>
      </View>
    </>
  )
}
