import { useTransactionContext } from '@/context/transaction.context'
import { useErrorHandler } from '@/shared/hooks/useErrorHandler'
import { useEffect } from 'react'
import { FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ListHeader } from './ListHeader'
import { TransactionCard } from './TransactionCard'

export const Home = () => {
  const { fetchCategories, fetchTransactions, transactions } =
    useTransactionContext()
  const { handleError } = useErrorHandler()

  const handleFetchCategories = async () => {
    try {
      await fetchCategories()
    } catch (error) {
      handleError(error)
    }
  }

  useEffect(() => {
    ;(async () => {
      await Promise.all([handleFetchCategories(), fetchTransactions()])
    })()
  }, [])

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <FlatList
        className="bg-background-secondary"
        ListHeaderComponent={ListHeader}
        keyExtractor={({ id }) => `transaction-${id}`}
        data={transactions}
        renderItem={({ item }) => <TransactionCard transaction={item} />}
      />
    </SafeAreaView>
  )
}
