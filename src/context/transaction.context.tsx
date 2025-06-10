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
import { Pagination } from '@/shared/interfaces/https/get-transactions-request'

interface FetchTransactionParams {
  page: number
}

export type TransactionContextType = {
  fetchCategories: () => Promise<void>
  categories: TransactionCategory[]
  createTransaction: (transaction: CreateTransactionInterface) => Promise<void>
  updateTransaction: (transaction: UpdateTransactionInterface) => Promise<void>
  fetchTransactions: (params: FetchTransactionParams) => Promise<void>
  totalTransactions: TotalTransactions
  transactions: Transaction[]
  refreshTransactions: () => void
  loading: boolean
  loadMoreTransactions: () => Promise<void>
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

  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    perPage: 3,
    totalRows: 0,
    totalPages: 0,
  })

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

  const fetchTransactions = useCallback(
    async ({ page = 1 }: FetchTransactionParams) => {
      setLoading(true)

      const transactionsResponse = await transactionService.getTransactions({
        page,
        perPage: pagination.perPage,
      })

      if (page === 1) {
        setTransactions(transactionsResponse.data)
      } else {
        setTransactions((prevState) => [
          ...prevState,
          ...transactionsResponse.data,
        ])
      }
      setTotalTransactions(transactionsResponse.totalTransactions)
      setPagination({
        ...pagination,
        page,
        totalRows: transactionsResponse.totalRows,
        totalPages: transactionsResponse.totalPages,
      })
      setLoading(false)
    },
    [pagination],
  )

  const loadMoreTransactions = useCallback(async () => {
    if (loading || pagination.page >= pagination.totalPages) return
    fetchTransactions({ page: pagination.page + 1 })
  }, [loading, pagination])

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
        loadMoreTransactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}

export const useTransactionContext = () => {
  return useContext(TransactionContext)
}
