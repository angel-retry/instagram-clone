import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import App from './App.jsx'
import './index.css'
import { mode } from '@chakra-ui/theme-tools'

const styles = {
  global: (props) => ({
    body: {
      bg: mode('grey.100', '#000')(props), // props.colorMode === "dark" ? darkMode : lightMode
      color: mode('grey.800', 'whiteAlpha.900')(props)
    }
  })
}

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false
}

const theme = extendTheme({ config })

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
)
