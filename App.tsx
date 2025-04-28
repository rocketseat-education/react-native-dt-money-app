import NavigationRoutes from '@/routes'
import './src/styles/global.css'
import { AuthContextProvider } from '@/context/auth.context'
import { SnackbarContextProvider } from '@/context/snackbar.context'
import { Snackbar } from '@/components/Snackbar'
import { BottomSheetProvider } from '@/context/bottomsheet.context'

export default function App() {
  return (
    <SnackbarContextProvider>
      <AuthContextProvider>
        <BottomSheetProvider>
          <NavigationRoutes />
          <Snackbar />
        </BottomSheetProvider>
      </AuthContextProvider>
    </SnackbarContextProvider>
  )
}
