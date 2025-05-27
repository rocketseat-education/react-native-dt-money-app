import { colors } from '@/shared/colors'
import { TransactionType } from '@/shared/enums/transaction-type'
import { FC } from 'react'
import { View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

type TransactionCardType = TransactionType | 'total'

interface Props {
  type: TransactionCardType | 'total'
  amount: number
}

interface IconsData {
  name: keyof typeof MaterialIcons.glyphMap
  color: string
}

const ICONS: Record<TransactionCardType, IconsData> = {
  [TransactionType.REVENUE]: {
    color: colors['accent-brand-light'],
    name: 'arrow-circle-up',
  },
  [TransactionType.EXPENSE]: {
    color: colors['accent-red'],
    name: 'arrow-circle-down',
  },
  total: {
    name: 'attach-money',
    color: colors.white,
  },
}

export const TransactionCard: FC<Props> = ({ type, amount }) => {
  const iconData = ICONS[type]

  return (
    <View>
      <MaterialIcons name={iconData.name} size={26} color={iconData.color} />
    </View>
  )
}
