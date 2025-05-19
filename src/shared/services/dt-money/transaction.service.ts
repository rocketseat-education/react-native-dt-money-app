import { dtMoneyApi } from '@/shared/api/dt-money'
import { CreateTransactionInterface } from '@/shared/interfaces/https/create-transaction-request'
import { TransactionCategory } from '@/shared/interfaces/https/transaction-category-response'

export const getTransactionCategories = async (): Promise<
  TransactionCategory[]
> => {
  const { data } = await dtMoneyApi.get<TransactionCategory[]>(
    '/transaction/categories',
  )

  return data
}

export const createTransaction = async (
  transaction: CreateTransactionInterface,
) => {
  await dtMoneyApi.post('/transaction', transaction)
}
