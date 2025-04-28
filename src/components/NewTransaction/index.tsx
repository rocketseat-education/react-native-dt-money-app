import { CreateTransactionInterface } from '@/shared/interfaces/https/create-transaction-request'
import { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { colors } from '@/shared/colors'
import { useBottomSheetContext } from '@/context/bottomsheet.context'

export const NewTransaction = () => {
  const { closeBottomSheet } = useBottomSheetContext()

  const [transaction, setTransaction] = useState<CreateTransactionInterface>({
    categoryId: 0,
    description: '',
    typeId: 0,
    value: 0,
  })

  return (
    <View className="px-8 py-5">
      <TouchableOpacity
        onPress={closeBottomSheet}
        className="w-full flex-row items-center justify-between"
      >
        <Text className="text-white text-xl font-bold">Nova transação</Text>
        <MaterialIcons name="close" color={colors.gray[700]} size={20} />
      </TouchableOpacity>
    </View>
  )
}
