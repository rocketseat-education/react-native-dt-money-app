import { TransactionType } from '@/shared/enums/transaction-type'
import { TransactionCardType } from '..'
import { colors } from '@/shared/colors'
import { MaterialIcons } from '@expo/vector-icons'

interface IconsData {
  name: keyof typeof MaterialIcons.glyphMap
  color: string
}

export const ICONS: Record<TransactionCardType, IconsData> = {
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
