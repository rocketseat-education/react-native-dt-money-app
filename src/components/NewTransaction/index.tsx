import { CreateTransactionInterface } from '@/shared/interfaces/https/create-transaction-request'
import { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { colors } from '@/shared/colors'
import { useBottomSheetContext } from '@/context/bottomsheet.context'
import CurrencyInput from 'react-native-currency-input'

export const NewTransaction = () => {
  const { closeBottomSheet } = useBottomSheetContext()

  const [transaction, setTransaction] = useState<CreateTransactionInterface>({
    categoryId: 0,
    description: '',
    typeId: 0,
    value: 0,
  })

  const setTransactionData = (
    key: keyof CreateTransactionInterface,
    value: string | number,
  ) => {
    setTransaction((prevData) => ({
      ...prevData,
      [key]: value,
    }))
  }

  console.log(transaction)

  return (
    <View className="px-8 py-5">
      <TouchableOpacity
        onPress={closeBottomSheet}
        className="w-full flex-row items-center justify-between"
      >
        <Text className="text-white text-xl font-bold">Nova transação</Text>
        <MaterialIcons name="close" color={colors.gray[700]} size={20} />
      </TouchableOpacity>

      <View className="flex-1 my-8">
        <TextInput
          onChangeText={(text) => setTransactionData('description', text)}
          placeholder="Descrição"
          placeholderTextColor={colors.gray[700]}
          value={transaction.description}
          className="text-white text-lg h-[50px] bg-background-primary my-2 rounded-md pl-4"
        />
        <CurrencyInput
          value={transaction.value}
          prefix="R$ "
          delimiter="."
          separator=","
          precision={2}
          minValue={0}
          onChangeValue={(value) => setTransactionData('value', value ?? 0)}
          className="text-white text-lg h-[50px] bg-background-primary my-2 rounded-md pl-4"
        />
      </View>
    </View>
  )
}
