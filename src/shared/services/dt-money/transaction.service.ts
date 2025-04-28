import { dtMoneyApi } from '@/shared/api/dt-money'
import { TransactionCategory } from '@/shared/interfaces/https/transaction-category-response'

export const getTransactionCategories = async (): Promise<
  TransactionCategory[]
> => {
  const { data } = await dtMoneyApi.get<TransactionCategory[]>(
    '/transaction/categories',
  )

  return data
}
