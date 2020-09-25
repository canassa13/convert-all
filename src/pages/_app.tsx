import React from 'react'
import { AppProps } from 'next/app'
import theme from '../styles/theme'
import { ChakraProvider } from '@chakra-ui/core'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
export default MyApp
