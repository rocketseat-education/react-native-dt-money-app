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
import {
  Filters,
  Pagination,
} from '@/shared/interfaces/https/get-transactions-request'

interface FetchTransactionParams {
  page: number
}

interface Loadings {
  initial: boolean
  refresh: boolean
  loadMore: boolean
}

interface HandleLoadingParams {
  key: keyof Loadings
  value: boolean
}

interface HandleFiltersParams {
  key: keyof Filters
  value: Date | boolean | number
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
  loadMoreTransactions: () => Promise<void>
  loadings: Loadings
  handleLoadings: (params: HandleLoadingParams) => void
  pagination: Pagination
  setSearchText: (text: string) => void
  searchText: string
  filters: Filters
  handleFilters: (params: HandleFiltersParams) => void
}

export const TransactionContext = createContext({} as TransactionContextType)

export const TransactionContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [categories, setCategories] = useState<TransactionCategory[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [searchText, setSearchText] = useState('')
  const [filters, setFilters] = useState<Filters>({
    categoryIds: {},
    typeId: undefined,
    from: undefined,
    to: undefined,
  })

  const [loadings, setLoadings] = useState({
    initial: false,
    refresh: false,
    loadMore: false,
  })
  const [totalTransactions, setTotalTransactions] = useState<TotalTransactions>(
    {
      expense: 0,
      revenue: 0,
      total: 0,
    },
  )

  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    perPage: 15,
    totalRows: 0,
    totalPages: 0,
  })

  const handleLoadings = ({ key, value }: HandleLoadingParams) =>
    setLoadings((prevValue) => ({ ...prevValue, [key]: value }))

  const refreshTransactions = useCallback(async () => {
    const { page, perPage } = pagination
    const transactionsResponse = await transactionService.getTransactions({
      page: 1,
      perPage: page * perPage,
    })
    setTransactions(transactionsResponse.data)
    setTotalTransactions(transactionsResponse.totalTransactions)
    setPagination({
      ...pagination,
      page,
      totalPages: transactionsResponse.totalPages,
      totalRows: transactionsResponse.totalRows,
    })
  }, [pagination])

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
      const transactionsResponse = await transactionService.getTransactions({
        page,
        perPage: pagination.perPage,
        searchText,
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
    },
    [pagination, searchText],
  )

  const loadMoreTransactions = useCallback(async () => {
    if (loadings.loadMore || pagination.page >= pagination.totalPages) return
    fetchTransactions({ page: pagination.page + 1 })
  }, [loadings.loadMore, pagination])

  const handleFilters = ({ key, value }: HandleFiltersParams) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

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
        loadMoreTransactions,
        handleLoadings,
        loadings,
        pagination,
        setSearchText,
        searchText,
        filters,
        handleFilters,
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}

export const useTransactionContext = () => {
  return useContext(TransactionContext)
}
