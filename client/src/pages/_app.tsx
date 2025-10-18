import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ethersConfig } from '@/lib/walletconnect'

// This initializes the Web3Modal and makes its context available globally.
ethersConfig

export default function App({ Component, pageProps }: AppProps) {
  return (
      <Component {...pageProps} />
  )
}