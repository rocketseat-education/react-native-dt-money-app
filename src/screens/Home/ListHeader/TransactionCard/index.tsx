import { TransactionType } from '@/shared/enums/transaction-type'
import { FC } from 'react'
import { Text, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useTransactionContext } from '@/context/transaction.context'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ICONS } from './strategies/icon-strategy'
import { CARD_DATA } from './strategies/card-data-strategy'
import { moneyMapper } from '@/shared/utils/money-mapper'
import clsx from 'clsx'

export type TransactionCardType = TransactionType | 'total'

interface Props {
  type: TransactionCardType | 'total'
  amount: number
}

export const TransactionCard: FC<Props> = ({ type, amount }) => {
  const iconData = ICONS[type]
  const cardData = CARD_DATA[type]

  const { transactions } = useTransactionContext()

  const lastTransaction = transactions.find(
    ({ type: transactionType }) => transactionType.id === type,
  )

  return (
    <View
      className={clsx(
        `bg-${cardData.bgColor} min-w-[280] rounded-md px-8 py-6 justify-between mr-6`,
        type === 'total' && 'mr-12',
      )}
    >
      <View className="flex-row justify-between items-center">
        <Text className="text-white text-base">{cardData.label}</Text>
        <MaterialIcons name={iconData.name} size={26} color={iconData.color} />
      </View>
      <View>
        <Text className="text-2xl text-gray-400 font-bold">
          R$ {moneyMapper(amount)}
        </Text>
        {type !== 'total' && (
          <Text className="text-gray-700">
            {lastTransaction?.createdAt
              ? format(
                  lastTransaction?.createdAt,
                  `'Última ${cardData.label.toLocaleLowerCase()} em' d 'de' MMMM`,
                  {
                    locale: ptBR,
                  },
                )
              : 'Nenhuma transação encontrada'}
          </Text>
        )}
      </View>
    </View>
  )
}
