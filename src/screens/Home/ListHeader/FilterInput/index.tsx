import { useTransactionContext } from '@/context/transaction.context'
import { colors } from '@/shared/colors'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

export const FilterInput = () => {
  const { pagination } = useTransactionContext()

  return (
    <View className="mb-4 w-[90%] self-center">
      <View className="w-full flex-row justify-between items-center mt-4 mb-3">
        <Text className="text-white text-xl font-bold">Transações</Text>
        <Text className="text-gray-700 text-base">
          {pagination.totalRows} {pagination.totalRows === 1 ? 'Item' : 'Itens'}
        </Text>
      </View>

      <TouchableOpacity className="flex-row items-center justify-between h-16">
        <TextInput
          className="h-[50] text-white w-full bg-background-primary text-lg pl-4"
          placeholderTextColor={colors.gray[600]}
          placeholder="Busque uma transação"
        />
        <TouchableOpacity className="absolute right-0">
          <MaterialIcons
            name="filter-list"
            color={colors['accent-brand-light']}
            size={26}
            className="mr-3"
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  )
}
