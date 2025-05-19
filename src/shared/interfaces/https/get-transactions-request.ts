import { Transaction } from '../transaction'
import { TotalTransactions } from './total-transactions'

export interface GetTransactionsParams {
  page: number
  perPage: number
  from?: Date
  to?: Date
  typeId?: number
  categoryId?: number
  searchText?: string
}

export interface GetTransactionsResponse {
  data: Transaction[]
  totalRows: number
  totalPages: number
  page: number
  perPage: number
  totalTransactions: TotalTransactions
}
