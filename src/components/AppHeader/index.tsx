import { Image, Text, TouchableOpacity, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { colors } from '@/shared/colors'
import { useAuthContext } from '@/context/auth.context'

export const AppHeader = () => {
  const { handleLogout } = useAuthContext()

  return (
    <View className="w-full flex-row p-8 justify-between">
      <View>
        <Image
          source={require('@/assets/Logo.png')}
          className="w-[130px] h-[30px]"
        />

        <TouchableOpacity
          onPress={handleLogout}
          className="flex-row items-center gap-2 mt-2"
        >
          <MaterialIcons name="logout" size={15} color={colors.gray[700]} />
          <Text className="text-gray-700 text-base">Sair da conta</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity className="bg-accent-brand w-[130px] items-center justify-center rounded-xl h-[50px]">
        <Text className="text-white font-bold text-sm">Nova transação</Text>
      </TouchableOpacity>
    </View>
  )
}
