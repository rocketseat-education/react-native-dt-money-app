import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { FC, PropsWithChildren } from 'react'
import clsx from 'clsx'
import { colors } from '@/shared/colors'
type AppButtonMode = 'fill' | 'outline'

interface AppButtonParams extends TouchableOpacityProps {
  mode?: AppButtonMode
  iconName?: keyof typeof MaterialIcons.glyphMap
}

export const AppButton: FC<PropsWithChildren<AppButtonParams>> = ({
  children,
  mode = 'fill',
  iconName,
  ...rest
}) => {
  const isFill = mode === 'fill'

  return (
    <TouchableOpacity
      {...rest}
      className={clsx(
        'w-full rounded-xl px-5 flex-row items-center h-button',
        iconName ? 'justify-between' : 'justify-center',
        {
          'bg-accent-brand': isFill,
          'bg-none border border-accent-brand': !isFill,
        },
      )}
    >
      <Text
        className={clsx('text-base', {
          'text-white': isFill,
          'text-accent-brand': !isFill,
        })}
      >
        {children}
      </Text>

      {iconName && (
        <MaterialIcons
          name={iconName}
          size={24}
          color={isFill ? colors.white : colors['accent-brand']}
        />
      )}
    </TouchableOpacity>
  )
}
