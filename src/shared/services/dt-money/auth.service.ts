import { FormLoginParams } from '@/screens/Login/LoginForm'
import { FormRegisterParams } from '@/screens/Register/RegisterForm'
import { dtMoneyApi } from '@/shared/api/dt-money'
import { IAuthenticateResponse } from '@/shared/interfaces/https/authenticate-response'

export const authenticate = async (
  userData: FormLoginParams,
): Promise<IAuthenticateResponse> => {
  const { data } = await dtMoneyApi.post<IAuthenticateResponse>(
    '/auth/login',
    userData,
  )

  return data
}

export const registerUser = async (
  userData: FormRegisterParams,
): Promise<IAuthenticateResponse> => {
  const { data } = await dtMoneyApi.post<IAuthenticateResponse>(
    '/auth/register',
    userData,
  )
  return data
}
