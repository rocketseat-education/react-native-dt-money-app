import { useTransactionContext } from '@/context/transaction.context'
import { useErrorHandler } from '@/shared/hooks/useErrorHandler'
import { useEffect } from 'react'
import { ActivityIndicator, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ListHeader } from './ListHeader'
import { TransactionCard } from './TransactionCard'
import { RefreshControl } from 'react-native-gesture-handler'
import { EmptyList } from './EmptyList'
import { colors } from '@/shared/colors'

export const Home = () => {
  const {
    fetchCategories,
    fetchTransactions,
    transactions,
    refreshTransactions,
    loadMoreTransactions,
    handleLoadings,
    loadings,
  } = useTransactionContext()
  const { handleError } = useErrorHandler()

  const handleFetchCategories = async () => {
    try {
      handleLoadings({
        key: 'initial',
        value: true,
      })
      await fetchCategories()
    } catch (error) {
      handleError(error)
    } finally {
      handleLoadings({
        key: 'initial',
        value: false,
      })
    }
  }

  const handleFetchInitialTransactions = async () => {
    try {
      handleLoadings({
        key: 'initial',
        value: true,
      })
      await fetchTransactions({ page: 1 })
    } catch (error) {
      handleError(error, 'Falha ao buscar transações')
    } finally {
      handleLoadings({
        key: 'initial',
        value: false,
      })
    }
  }

  const handleLoadMoreTransactions = async () => {
    try {
      handleLoadings({
        key: 'loadMore',
        value: true,
      })
      await loadMoreTransactions()
    } catch (error) {
      handleError(error, 'Falha ao carregar novas transações')
    } finally {
      handleLoadings({
        key: 'loadMore',
        value: false,
      })
    }
  }

  const handleRefreshTransactions = async () => {
    try {
      handleLoadings({
        key: 'refresh',
        value: true,
      })
      await refreshTransactions()
    } catch (error) {
      handleError(error, 'Falha ao recarregar as transações')
    } finally {
      handleLoadings({
        key: 'refresh',
        value: false,
      })
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
        ListEmptyComponent={loadings.initial ? null : EmptyList}
        ListFooterComponent={
          loadings.loadMore ? (
            <ActivityIndicator
              color={colors['accent-brand-light']}
              size="large"
            />
          ) : null
        }
        refreshControl={
          <RefreshControl
            refreshing={loadings.refresh}
            onRefresh={handleRefreshTransactions}
          />
        }
      />
    </SafeAreaView>
  )
}
