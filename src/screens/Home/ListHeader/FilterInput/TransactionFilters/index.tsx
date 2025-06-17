import { Text, TouchableOpacity, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { colors } from '@/shared/colors'
import { useBottomSheetContext } from '@/context/bottomsheet.context'
import { DateFilter } from './DateFilter'
import { CategoryFilter } from './CategoryFilter'

export const TransactionsFilters = () => {
  const { closeBottomSheet } = useBottomSheetContext()

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
    </View>
  )
}
