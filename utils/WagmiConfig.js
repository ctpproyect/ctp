"use client"

import { createConfig, configureChains, sepolia } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

export const { chains, publicClient } = configureChains(
    [sepolia],
    [
        alchemyProvider({
            apiKey: 'https://eth-sepolia.g.alchemy.com/v2/vUt7NeIM6eJhh41J7HxgeSu_PEMHXAk8',
        }),
        publicProvider(),
    ],
    { stallTimeout: 5000 },
)
export const config = createConfig({
    autoConnect: false,
    connectors: [
        new InjectedConnector({
            chains,
            options: {
                name: 'Injected',
                shimDisconnect: true,
            },
        }),
        new MetaMaskConnector({
            chains, options: {
                shimDisconnect: true,
            },
        }),
        new CoinbaseWalletConnector({
            chains,
            options: {
                appName: 'wagmi',
            },
        }),
        new WalletConnectConnector({
            chains,
            options: {
                projectId: 'a3f27ab7aa7ca796529899ade00f2a63',
            },
        }),
    ],
    publicClient,
})
