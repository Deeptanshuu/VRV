/* eslint-disable no-undef */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import theme from './theme'
import { Monitoring } from "react-scan/monitoring"; 


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Monitoring
      apiKey="0TDwqd9KrbD9F0dScQe7_ymE2iZzZ1BS"
      url="https://monitoring.react-scan.com/api/v1/ingest"
    />
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)
