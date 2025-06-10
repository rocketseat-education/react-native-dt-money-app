import { useTransactionContext } from '@/context/transaction.context'
import { useErrorHandler } from '@/shared/hooks/useErrorHandler'
import { useEffect } from 'react'
import { FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ListHeader } from './ListHeader'
import { TransactionCard } from './TransactionCard'
import { RefreshControl } from 'react-native-gesture-handler'

export const Home = () => {
  const {
    fetchCategories,
    fetchTransactions,
    transactions,
    refreshTransactions,
    loading,
    loadMoreTransactions,
  } = useTransactionContext()
  const { handleError } = useErrorHandler()

  const handleFetchCategories = async () => {
    try {
      await fetchCategories()
    } catch (error) {
      handleError(error)
    }
  }

  const handleFetchInitialTransactions = async () => {
    try {
      await fetchTransactions({ page: 1 })
    } catch (error) {
      handleError(error, 'Falha ao buscar transações')
    }
  }

  const handleLoadMoreTransactions = async () => {
    try {
      await loadMoreTransactions()
    } catch (error) {
      handleError(error, 'Falha ao carregar novas transações')
    }
  }

  const handleRefreshTransactions = async () => {
    try {
      await refreshTransactions()
    } catch (error) {
      handleError(error, 'Falha ao recarregar as transações')
    }
  }

  useEffect(() => {
    ;(async () => {
      await Promise.all([
        handleFetchCategories(),
        handleFetchInitialTransactions(),
      ])
    })()
  }, [])

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <FlatList
        className="bg-background-secondary"
        keyExtractor={({ id }) => `transaction-${id}`}
        data={transactions}
        renderItem={({ item }) => <TransactionCard transaction={item} />}
        ListHeaderComponent={ListHeader}
        onEndReached={handleLoadMoreTransactions}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={handleRefreshTransactions}
          />
        }
      />
    </SafeAreaView>
  )
}
