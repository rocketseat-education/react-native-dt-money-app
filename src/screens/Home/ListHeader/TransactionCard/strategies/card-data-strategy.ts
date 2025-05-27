import { TransactionType } from '@/shared/enums/transaction-type'
import { TransactionCardType } from '..'

interface CardData {
  label: string
  bgColor: string
}

export const CARD_DATA: Record<TransactionCardType, CardData> = {
  [TransactionType.EXPENSE]: {
    label: 'Saída',
    bgColor: 'background-tertiary',
  },
  [TransactionType.REVENUE]: {
    label: 'Entrada',
    bgColor: 'background-tertiary',
  },
  total: {
    label: 'Total',
    bgColor: 'accent-brand-background-primary',
  },
}
