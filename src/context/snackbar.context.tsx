import { createContext, FC, PropsWithChildren, useState } from 'react'

export type SnackbarMessageType = 'ERROR' | 'SUCCESS'

interface NotifyMessageParams {
  message: string | null
  type: SnackbarMessageType
}

export type SnackbarContextType = {
  message: string | null
  type: SnackbarMessageType | null
  notify: (params: NotifyMessageParams) => void
}

const SnackbarContext = createContext({} as SnackbarContextType)

export const SnackbarContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [message, setMessage] = useState<string | null>(null)
  const [type, setType] = useState<SnackbarMessageType | null>(null)

  const notify = ({ message, type }: NotifyMessageParams) => {
    setMessage(message)
    setType(type)
    setTimeout(() => {
      setMessage(null)
      setType(null)
    }, 3000)
  }

  return (
    <SnackbarContext.Provider value={{ message, type, notify }}>
      {children}
    </SnackbarContext.Provider>
  )
}
