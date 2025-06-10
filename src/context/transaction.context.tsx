import { TransactionCategory } from '@/shared/interfaces/https/transaction-category-response'
import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from 'react'
import * as transactionService from '@/shared/services/dt-money/transaction.service'
import { CreateTransactionInterface } from '@/shared/interfaces/https/create-transaction-request'
import { Transaction } from '@/shared/interfaces/transaction'
import { TotalTransactions } from '@/shared/interfaces/https/total-transactions'
import { UpdateTransactionInterface } from '@/shared/interfaces/https/update-transaction-request'

export type TransactionContextType = {
  fetchCategories: () => Promise<void>
  categories: TransactionCategory[]
  createTransaction: (transaction: CreateTransactionInterface) => Promise<void>
  updateTransaction: (transaction: UpdateTransactionInterface) => Promise<void>
  fetchTransactions: () => Promise<void>
  totalTransactions: TotalTransactions
  transactions: Transaction[]
  refreshTransactions: () => void
  loading: boolean
}

export const TransactionContext = createContext({} as TransactionContextType)

export const TransactionContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [categories, setCategories] = useState<TransactionCategory[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(false)
  const [totalTransactions, setTotalTransactions] = useState<TotalTransactions>(
    {
      expense: 0,
      revenue: 0,
      total: 0,
    },
  )

  const refreshTransactions = async () => {
    setLoading(true)
    const transactionsResponse = await transactionService.getTransactions({
      page: 1,
      perPage: 10,
    })
    setTransactions(transactionsResponse.data)
    setTotalTransactions(transactionsResponse.totalTransactions)
    setLoading(false)
  }

  const fetchCategories = async () => {
    const categoriesResponse =
      await transactionService.getTransactionCategories()
    setCategories(categoriesResponse)
  }

  const createTransaction = async (transaction: CreateTransactionInterface) => {
    await transactionService.createTransaction(transaction)
    await refreshTransactions()
  }

  const updateTransaction = async (transaction: UpdateTransactionInterface) => {
    await transactionService.updateTransaction(transaction)
    await refreshTransactions()
  }

  const fetchTransactions = useCallback(async () => {
    const transactionsResponse = await transactionService.getTransactions({
      page: 1,
      perPage: 10,
    })
    setTransactions(transactionsResponse.data)
    setTotalTransactions(transactionsResponse.totalTransactions)
  }, [])

  return (
    <TransactionContext.Provider
      value={{
        categories,
        fetchCategories,
        createTransaction,
        fetchTransactions,
        totalTransactions,
        transactions,
        updateTransaction,
        refreshTransactions,
        loading,
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}

export const useTransactionContext = () => {
  return useContext(TransactionContext)
}
