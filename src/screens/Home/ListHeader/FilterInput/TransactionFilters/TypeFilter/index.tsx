import { useTransactionContext } from '@/context/transaction.context'
import { TransactionType } from '@/shared/enums/transaction-type'
import Checkbox from 'expo-checkbox'
import { Text, TouchableOpacity, View } from 'react-native'

export const TypeFilter = () => {
  const { handleFilters, filters } = useTransactionContext()

  const selectType = (typeId: TransactionType) => {
    handleFilters({ key: 'typeId', value: typeId })
  }

  return (
    <View className="mb-6">
      <Text className="text-base font-medium mb-5 text-gray-600">
        Tipo de transação
      </Text>

      <TouchableOpacity
        className="flex-row items-center py-2"
        onPress={() => selectType(TransactionType.REVENUE)}
      >
        <Checkbox
          className="mr-4"
          value={filters.typeId === TransactionType.REVENUE}
          onValueChange={() => selectType(TransactionType.REVENUE)}
        />
        <Text className="text-lg text-white">Entrada</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="flex-row items-center py-2"
        onPress={() => selectType(TransactionType.EXPENSE)}
      >
        <Checkbox
          className="mr-4"
          value={filters.typeId === TransactionType.EXPENSE}
          onValueChange={() => selectType(TransactionType.EXPENSE)}
        />
        <Text className="text-lg text-white">Saída</Text>
      </TouchableOpacity>
    </View>
  )
}
