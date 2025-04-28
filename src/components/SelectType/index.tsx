import { TransactionType } from '@/shared/enums/transaction-type'
import { FC } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import clsx from 'clsx'
import { colors } from '@/shared/colors'

interface Props {
  setTransactionType: (type: TransactionType) => void
  typeId?: number
}

export const TransactionTypeSelector: FC<Props> = ({
  setTransactionType,
  typeId,
}) => {
  return (
    <View className="flex-row justify-between gap-2 mt-4">
      <TouchableOpacity
        onPress={() => setTransactionType(TransactionType.REVENUE)}
        className={clsx(
          'flex-row items-center p-2 flex-1 justify-center h-[58px] rounded-md',
          typeId === TransactionType.REVENUE
            ? 'bg-accent-brand-background-primary'
            : 'bg-background-tertiary',
        )}
      >
        <MaterialIcons
          name="arrow-circle-up"
          color={
            typeId === TransactionType.REVENUE
              ? colors.white
              : colors['accent-brand-light']
          }
          size={24}
          className="mr-2"
        />
        <Text className="text-white">Entrada</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setTransactionType(TransactionType.EXPENSE)}
        className={clsx(
          'flex-row items-center p-2 flex-1 justify-center h-[58px] rounded-md',
          typeId === TransactionType.EXPENSE
            ? 'bg-accent-red-background-primary'
            : 'bg-background-tertiary',
        )}
      >
        <MaterialIcons
          name="arrow-circle-down"
          color={
            typeId === TransactionType.EXPENSE
              ? colors.white
              : colors['accent-red']
          }
          size={24}
          className="mr-2"
        />
        <Text className="text-white">Saída</Text>
      </TouchableOpacity>
    </View>
  )
}
