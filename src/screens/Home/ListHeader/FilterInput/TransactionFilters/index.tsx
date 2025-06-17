import { Text, TouchableOpacity, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { colors } from '@/shared/colors'
import { useBottomSheetContext } from '@/context/bottomsheet.context'
import { DateFilter } from './DateFilter'
import { CategoryFilter } from './CategoryFilter'
import { TypeFilter } from './TypeFilter'
import { AppButton } from '@/components/AppButton'
import { useTransactionContext } from '@/context/transaction.context'
import { useErrorHandler } from '@/shared/hooks/useErrorHandler'

export const TransactionsFilters = () => {
  const { closeBottomSheet } = useBottomSheetContext()
  const { fetchTransactions, handleLoadings, resetFilter } =
    useTransactionContext()
  const { handleError } = useErrorHandler()

  const handleFetchTransactions = async () => {
    try {
      handleLoadings({ key: 'refresh', value: true })
      await fetchTransactions({ page: 1 })
    } catch (error) {
      handleError(error, 'Falha ao aplicar filtros')
    } finally {
      handleLoadings({
        key: 'refresh',
        value: false,
      })
      closeBottomSheet()
    }
  }

  const handleResetFilter = async () => {
    try {
      handleLoadings({ key: 'refresh', value: true })
      await resetFilter()
    } catch (error) {
      handleError(error, 'Falha ao limpar filtros')
    } finally {
      handleLoadings({
        key: 'refresh',
        value: false,
      })
      closeBottomSheet()
    }
  }

  return (
    <View className="flex-1 p-6">
      <View className="flex-row justify-between">
        <Text className="text-xl font-bold mb-5 text-white">
          Filtrar transações
        </Text>
        <TouchableOpacity onPress={closeBottomSheet}>
          <MaterialIcons name="close" size={20} color={colors.gray[600]} />
        </TouchableOpacity>
      </View>

      <DateFilter />
      <CategoryFilter />
      <TypeFilter />

      <View className="flex-row gap-4 mt-8">
        <AppButton
          className="flex-1"
          widthFull={false}
          mode="outline"
          onPress={handleResetFilter}
        >
          Limpar filtros
        </AppButton>
        <AppButton
          className="flex-1"
          widthFull={false}
          onPress={handleFetchTransactions}
        >
          Filtrar
        </AppButton>
      </View>
    </View>
  )
}
