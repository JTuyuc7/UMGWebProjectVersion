import '@/styles/globals.css'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import createEmotionCache from '@/utility/createEmotionCache'
import lightTheme from '@/theme/lightTheme'
import { AuthProvier } from '@/context'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

const clientSideEmotionCache = createEmotionCache()

export default function App({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}) {
  // return <Component {...pageProps} />

  return (
    <CacheProvider value={emotionCache}>
      <AuthProvier>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <Component {...pageProps} />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            //rtl={false}
            //pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </ThemeProvider>
      </AuthProvier>
    </CacheProvider>
  )
}
