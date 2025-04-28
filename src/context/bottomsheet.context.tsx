import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useState,
} from 'react'

interface BottomSheetContextType {
  openBottomSheet: (content: React.ReactNode, index: number) => void
  closeBottomSheet: () => void
}

export const BottomSheetContext = createContext<BottomSheetContextType>(
  {} as BottomSheetContextType,
)

export const BottomSheetProvider: FC<PropsWithChildren> = ({ children }) => {
  const [content, setContent] = useState<React.ReactNode | null>(null)

  const openBottomSheet = useCallback(
    (newContent: React.ReactNode, index: number) => {
      setContent(newContent)
    },
    [],
  )

  const closeBottomSheet = useCallback(() => {
    setContent(null)
  }, [])

  return (
    <BottomSheetContext.Provider
      value={{
        openBottomSheet,
        closeBottomSheet,
      }}
    >
      {children}
    </BottomSheetContext.Provider>
  )
}
