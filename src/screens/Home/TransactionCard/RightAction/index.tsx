import { TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { colors } from '@/shared/colors'
import { FC, useState } from 'react'
import { DeleteModal } from './DeleteModal'
import * as transactionService from '@/shared/services/dt-money/transaction.service'
import { useErrorHandler } from '@/shared/hooks/useErrorHandler'
import { useSnackbarContext } from '@/context/snackbar.context'

interface Params {
  transactionId: number
}

export const RightAction: FC<Params> = ({ transactionId }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const { notify } = useSnackbarContext()

  const showModal = () => setModalVisible(true)

  const hideModal = () => setModalVisible(false)

  const { handleError } = useErrorHandler()

  const handleDeleteTransaction = async () => {
    try {
      setLoading(true)
      await transactionService.deleteTransaction(transactionId)
      notify({
        message: 'Transação deletada com sucesso',
        messageType: 'SUCCESS',
      })
      hideModal()
    } catch (error) {
      handleError(error, 'Falha ao deletar a transação')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        className="h-[140] bg-accent-red-background-primary w-[80] rounded-r-md items-center justify-center"
        onPress={showModal}
      >
        <MaterialIcons name="delete-outline" color={colors.white} size={30} />
      </TouchableOpacity>
      <DeleteModal
        visible={modalVisible}
        hideModal={hideModal}
        handleDeleteTransaction={handleDeleteTransaction}
        loading={loading}
      />
    </>
  )
}
