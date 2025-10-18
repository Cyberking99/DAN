import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'

// 1. Get projectId from https://cloud.walletconnect.com
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'your-project-id-here'

if (!projectId || projectId === 'your-project-id-here') {
  console.warn('VITE_WALLETCONNECT_PROJECT_ID is not set. Please set it in your .env file')
}

// 2. Set up chains
const hardhat = {
  chainId: 84532,
  name: 'Base Sepolia',
  currency: 'ETH',
  explorerUrl: 'https://sepolia.basescan.org',
  rpcUrl: 'https://base-sepolia.infura.io/v3/f7f8ec54d0cd4d82b7c2b3ecbdeb734a'
}

// 3. Create modal
const metadata = {
  name: 'DeSci Agent Network (DAN)',
  description: 'A decentralized science review and certification platform powered by AI and blockchain.',
  url: 'https://dan-client.vercel.app',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

export const ethersConfig = defaultConfig({
  metadata,
  enableEIP6963: true,
  enableCoinbase: true,
})

createWeb3Modal({ ethersConfig, projectId, chains: [hardhat] })