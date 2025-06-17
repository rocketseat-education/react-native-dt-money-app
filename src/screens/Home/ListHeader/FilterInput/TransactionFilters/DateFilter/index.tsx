import { useTransactionContext } from '@/context/transaction.context'
import clsx from 'clsx'
import { format, isValid } from 'date-fns'
import { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import DateTimePicker from 'react-native-modal-datetime-picker'

export const DateFilter = () => {
  const { filters, handleFilters } = useTransactionContext()

  const [showStartDatePicker, setShowStartDatePicker] = useState(false)
  const [showEndDatePicker, setShowEndDatePicker] = useState(false)

  const onStartCancel = () => {
    setShowStartDatePicker(false)
  }
  const onStartConfirm = (selectedDate: Date) => {
    setShowStartDatePicker(false)
    handleFilters({ key: 'from', value: selectedDate })
  }

  const onEndCancel = () => {
    setShowEndDatePicker(false)
  }
  const onEndConfirm = (selectedDate: Date) => {
    setShowEndDatePicker(false)
    handleFilters({ key: 'to', value: selectedDate })
  }

  const formatDate = (date?: Date) => {
    if (!date || !isValid(date)) {
      return undefined
    }
    return format(date, 'dd/MM/yyyy')
  }

  return (
    <>
      <Text className="text-base font-medium mb-5 text-gray-600">Data</Text>

      <View className="flex-row justify-between mb-6">
        <View className="w-[48%]">
          <TouchableOpacity
            onPress={() => setShowStartDatePicker(true)}
            className="rounded-md p-2 border-b border-gray-800"
          >
            <Text
              className={clsx(
                'text-lg',
                filters.from ? 'text-white' : 'text-gray-700',
              )}
            >
              {formatDate(filters.from) || 'De'}
            </Text>
          </TouchableOpacity>
        </View>

        <View className="w-[48%]">
          <TouchableOpacity
            onPress={() => setShowEndDatePicker(true)}
            className="rounded-md p-2 border-b border-gray-800"
          >
            <Text
              className={clsx(
                'text-lg',
                filters.to ? 'text-white' : 'text-gray-700',
              )}
            >
              {formatDate(filters.to) || 'Até'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <DateTimePicker
        isVisible={showStartDatePicker}
        date={filters.from}
        onCancel={onStartCancel}
        onConfirm={onStartConfirm}
        mode="date"
        confirmTextIOS="Confirmar"
        cancelTextIOS="Cancelar"
        locale="pt-BR"
      />

      <DateTimePicker
        isVisible={showEndDatePicker}
        date={filters.to}
        onCancel={onEndCancel}
        onConfirm={onEndConfirm}
        mode="date"
        confirmTextIOS="Confirmar"
        cancelTextIOS="Cancelar"
        locale="pt-BR"
      />
    </>
  )
}
