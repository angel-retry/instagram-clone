import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import App from './App.jsx'
import './index.css'
import { mode } from '@chakra-ui/theme-tools'
import { BrowserRouter } from 'react-router-dom'

const styles = {
  global: (props) => ({
    body: {
      bg: mode('grey.100', '#000')(props), // props.colorMode === "light" ? 'grey.100': '#000'
      color: mode('grey.800', 'whiteAlpha.900')(props)
    }
  })
}

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false
}

const theme = extendTheme({ config, styles })

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
)
