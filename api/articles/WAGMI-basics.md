---
title: "WAGMI Library Tutorial: Complete Guide to Building dApps with WAGMI and VIEM in 2025"
description: "Master WAGMI library for React dApp development. Learn WAGMI hooks, VIEM integration, multichain support, and best practices with practical examples. Complete WAGMI tutorial for beginners to advanced developers."
keywords: "WAGMI, WAGMI library, WAGMI dApp, WAGMI VIEM, React Web3, Ethereum development, dApp tutorial, blockchain hooks, multichain dApp"
date: 2025-01-15
---

# WAGMI Library: Complete Guide to Building React dApps in 2025

## Table of Contents
- [What is WAGMI Library?](#what-is-wagmi-library)
  - [Key Features of WAGMI Library](#key-features-of-wagmi-library)
- [WAGMI vs Traditional Web3 Libraries](#wagmi-vs-traditional-web3-libraries)
  - [Bundle Size Comparison (2025)](#bundle-size-comparison-2025)
  - [Developer Experience: WAGMI v1 vs v2](#developer-experience-wagmi-v1-vs-v2)
  - [Breaking Changes from v1 to v2](#breaking-changes-from-v1-to-v2)
- [WAGMI and VIEM Integration](#wagmi-and-viem-integration)
  - [Why WAGMI Uses VIEM](#why-wagmi-uses-viem)
  - [VIEM Standalone Example](#viem-standalone-example)
- [Setting Up Your First WAGMI dApp](#setting-up-your-first-wagmi-dapp)
  - [Project Structure for ABI Management](#project-structure-for-abi-management)
  - [Installation and Configuration](#installation-and-configuration)
  - [Basic WAGMI Configuration](#basic-wagmi-configuration)
- [Essential WAGMI Hooks for dApp Development](#essential-wagmi-hooks-for-dapp-development)
  - [Core Account Management Hooks](#core-account-management-hooks)
  - [Contract Interaction Hooks](#contract-interaction-hooks)
- [Building NFT Components with WAGMI](#building-nft-components-with-wagmi)
  - [Complete NFT Marketplace Component](#complete-nft-marketplace-component)
- [WAGMI Multichain dApp Development](#wagmi-multichain-dapp-development)
  - [Advanced Multichain DeFi Dashboard](#advanced-multichain-defi-dashboard)
- [Advanced WAGMI Patterns: Simulate-Write Flow](#advanced-wagmi-patterns-simulate-write-flow)
  - [Governance Voting with Transaction Simulation](#governance-voting-with-transaction-simulation)
- [WAGMI Performance Optimization](#wagmi-performance-optimization)
  - [Bundle Size Optimization](#bundle-size-optimization)
  - [React Query Optimization](#react-query-optimization)
- [WAGMI Best Practices for Production](#wagmi-best-practices-for-production)
  - [Error Handling and User Experience](#error-handling-and-user-experience)
  - [Production Environment Configuration](#production-environment-configuration)
- [Troubleshooting Common WAGMI Issues](#troubleshooting-common-wagmi-issues)
  - [Common Issues and Solutions](#common-issues-and-solutions)
  - [Debug Tools and Monitoring](#debug-tools-and-monitoring)
  - [Working with ABI Files: Best Practices](#working-with-abi-files-best-practices)
    - [Generating ABI Files from Smart Contracts](#generating-abi-files-from-smart-contracts)
    - [TypeScript Integration for Better DX](#typescript-integration-for-better-dx)
    - [Validating ABI Files](#validating-abi-files)
- [Related Articles and Resources](#related-articles-and-resources)
  - [Essential WAGMI Learning Resources](#essential-wagmi-learning-resources)
  - [React and Web3 Development](#react-and-web3-development)
  - [DeFi and NFT Development](#defi-and-nft-development)
  - [Security and Best Practices](#security-and-best-practices)

## What is WAGMI Library?

**WAGMI** (Web3 Application Generator for Multiple Interfaces) is a collection of React hooks that make building Ethereum dApps faster and more reliable. Released in September 2021 and completely rewritten in v2 (September 2023), WAGMI has become the de facto standard for React-based Web3 development.

### Key Features of WAGMI Library:
- **React-First Architecture**: Built specifically for React applications with intuitive hooks
- **TypeScript Support**: First-class TypeScript integration with automatic type inference
- **Multichain Ready**: Support for 100+ EVM-compatible networks out of the box
- **Automatic Caching**: Built-in state management with TanStack Query integration
- **Modern Tech Stack**: Powered by VIEM for optimal performance and bundle size

**Related Resources:**
- [Official WAGMI Documentation](https://wagmi.sh/)
- [WAGMI v1 Documentation](https://wagmi.sh/v1)
- [WAGMI v2 React Documentation](https://wagmi.sh/react)
- [VIEM Documentation](https://viem.sh/)
- [WAGMI GitHub Repository](https://github.com/wevm/wagmi)
- [React Hooks Documentation](https://react.dev/reference/react)

## WAGMI vs Traditional Web3 Libraries

### Developer Experience: WAGMI v1 vs v2

```jsx
// WAGMI v1 – useContractRead (legacy API)
import { useContractRead } from 'wagmi'; // v1
import erc20Abi from './abis/erc20Abi.json';

function TokenBalanceV1({ address, tokenAddress }) {
  const { data: balance } = useContractRead({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: [address],
  });

  return (
    <span className="text-gray-900 font-mono">
      {balance?.toString() ?? '0'}
    </span>
  );
}

// WAGMI v2 – useReadContract (current API)
import { useReadContract } from 'wagmi';

function TokenBalanceV2({ address, tokenAddress }) {
  const { data: balance } = useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: [address],
  });

  return (
    <span className="text-gray-900 font-mono">
      {balance?.toString() ?? '0'}
    </span>
  );
}

// Core (framework-agnostic) example using wagmi actions
import { readContract } from 'wagmi/actions';

const balance = await readContract({
  address: tokenAddress,
  abi: erc20Abi,
  functionName: 'balanceOf',
  args: [userAddress],
  chainId: 1,
});
console.log(balance.toString());
```

**Note:** All examples use Tailwind CSS utility classes (e.g., `text-gray-900`, `font-mono`) to keep styling minimal and consistent.

### Breaking Changes from v1 to v2

1. **Package Structure** — Separate `wagmi` (react + core) and `wagmi/actions` (framework-agnostic helpers).  
2. **Renamed Hooks** — `useContractRead` ➜ `useReadContract`, `useContractWrite` ➜ `useWriteContract`, etc.  
3. **Unified Config** — New `createConfig` replaces multiple providers; configuration is now passed directly to `<WagmiProvider>`.  
4. **VIEM Under the Hood** — All serialization/parsing now uses VIEM, exposing BigInt values by default.  
5. **Args Ordering** — Function arguments are now provided as `args` array (no longer spread).  
6. **Event Handling** — `watchContractEvent` is replaced by `watchEvent` with an improved filter API.  
7. **Error Objects** — Error objects follow EIP-1474 & VIEM conventions (`cause`, `shortMessage`, `metaMessages`).

For a complete migration guide, see the [official documentation](https://wagmi.sh/react/guides/migrate-from-v1-to-v2).

**Related Articles:**
- [React Performance Optimization Guide](https://react.dev/learn/render-and-commit)
- [Web3 Development Best Practices](https://ethereum.org/developers/)

## WAGMI and VIEM Integration

**VIEM** is the modern, lightweight Ethereum library that powers WAGMI v2. Created by the same team, VIEM provides the low-level blockchain interactions while WAGMI adds the React-specific abstractions.

### Why WAGMI Uses VIEM

- **Performance**: Highly optimized JSON-RPC batching and caching via VIEM
- **Bundle Size**: ~70 kB (minified + gzip) with full tree-shaking support
- **Type Safety**: Native TypeScript with zero configuration
- **Tree Shaking**: Import only what you use

### VIEM Standalone Example

```jsx
import { createPublicClient, createWalletClient, http, custom } from 'viem';
import { mainnet } from 'viem/chains';
import { useState } from 'react';
import erc20Abi from './abis/erc20Abi.json';

// VIEM clients setup
const publicClient = createPublicClient({
  chain: mainnet,
  transport: http()
});

function TokenTransfer() {
  const [isTransferring, setIsTransferring] = useState(false);

  const handleTransfer = async () => {
    try {
      setIsTransferring(true);
      
      // Create wallet client
      const walletClient = createWalletClient({
        chain: mainnet,
        transport: custom(window.ethereum)
      });

      const [account] = await walletClient.getAddresses();
      
      // Simulate transaction
      const { request } = await publicClient.simulateContract({
        address: '0xA0b86a33E6441e4e0079d4E88b0C9a8b7f9f1234',
        abi: erc20Abi,
        functionName: 'transfer',
        args: ['0x742d35Cc6634C0532925a3b8D6Cd1C', 1000000000000000000n],
        account,
      });

      // Execute transaction
      const hash = await walletClient.writeContract(request);
      
      // Wait for confirmation
      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      console.log('Transfer successful:', receipt);
      
    } catch (error) {
      console.error('Transfer failed:', error);
    } finally {
      setIsTransferring(false);
    }
  };

  return (
    <button onClick={handleTransfer} disabled={isTransferring}>
      {isTransferring ? 'Transferring...' : 'Transfer Tokens'}
    </button>
  );
}
```

**Related Documentation:**
- [VIEM Official Documentation](https://viem.sh/)

## Setting Up Your First WAGMI dApp

### Project Structure for ABI Management

Before diving into WAGMI development, it's important to organize your ABI files properly. Create the following directory structure in your project:

```
src/
├── abis/
│   ├── erc20Abi.json
│   ├── nftAbi.json
│   ├── aavePoolAbi.json
│   └── governanceAbi.json
├── components/
├── hooks/
└── utils/
```

**Why separate ABI files?**
- **Reusability**: Use the same ABI across multiple components
- **Type Safety**: Better TypeScript integration and autocomplete
- **Maintainability**: Easy to update contract interfaces
- **Bundle Optimization**: Only import what you need
- **Version Control**: Track ABI changes separately from component logic

### Installation and Configuration

```bash
# Install WAGMI and dependencies
npm install wagmi viem @tanstack/react-query

# For Web3Modal integration (optional)
npm install @web3modal/wagmi @web3modal/siwe
```

### Basic WAGMI Configuration

```jsx
// wagmi.config.js
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { mainnet, sepolia, polygon, arbitrum } from 'wagmi/chains'

const projectId = 'YOUR_WALLETCONNECT_PROJECT_ID'

const metadata = {
  name: 'WAGMI dApp Tutorial',
  description: 'Learn WAGMI with practical examples',
  url: 'https://your-dapp.com',
  icons: ['https://your-dapp.com/icon.png']
}

const chains = [mainnet, sepolia, polygon, arbitrum]

export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  enableWalletConnect: true,
  enableInjected: true,
  enableEIP6963: true,
  enableCoinbase: true,
})

// App.jsx
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { config } from './wagmi.config'

const queryClient = new QueryClient()

createWeb3Modal({
  wagmiConfig: config,
  projectId: 'YOUR_PROJECT_ID',
  enableAnalytics: true,
  enableOnramp: true
})

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <YourDApp />
      </QueryClientProvider>
    </WagmiProvider>
  )
}
```

**Setup Resources:**
- [WalletConnect Project Setup](https://cloud.walletconnect.com/)
- [Web3Modal Documentation](https://docs.walletconnect.com/web3modal/react/wagmi)

## Essential WAGMI Hooks for dApp Development

### Core Account Management Hooks

```jsx
import { 
  useAccount, 
  useConnect, 
  useDisconnect, 
  useBalance,
  useEnsName,
  useEnsAvatar 
} from 'wagmi';

function WalletInfo() {
  const { address, isConnected, chain } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName });
  const { data: balance } = useBalance({ address });
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  if (!isConnected) {
    return (
      <div className="wallet-connection">
        <h3>Connect Your Wallet</h3>
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            className="connector-button"
          >
            Connect {connector.name}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="wallet-info">
      <div className="user-profile">
        {ensAvatar && <img src={ensAvatar} alt="ENS Avatar" />}
        <div>
          <h4>{ensName || address}</h4>
          <p>Chain: {chain?.name}</p>
          <p>Balance: {balance?.formatted} {balance?.symbol}</p>
        </div>
      </div>
      <button onClick={() => disconnect()}>Disconnect</button>
    </div>
  );
}
```

### Contract Interaction Hooks

**erc20Abi.json**
```json
[
  {
    "name": "balanceOf",
    "type": "function",
    "stateMutability": "view",
    "inputs": [{ "name": "account", "type": "address" }],
    "outputs": [{ "name": "", "type": "uint256" }]
  },
  {
    "name": "transfer",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [
      { "name": "to", "type": "address" },
      { "name": "amount", "type": "uint256" }
    ],
    "outputs": [{ "name": "", "type": "bool" }]
  },
  {
    "name": "approve",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [
      { "name": "spender", "type": "address" },
      { "name": "amount", "type": "uint256" }
    ],
    "outputs": [{ "name": "", "type": "bool" }]
  },
  {
    "name": "allowance",
    "type": "function",
    "stateMutability": "view",
    "inputs": [
      { "name": "owner", "type": "address" },
      { "name": "spender", "type": "address" }
    ],
    "outputs": [{ "name": "", "type": "uint256" }]
  }
]
```

```jsx
import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import erc20Abi from './abis/erc20Abi.json';

function TokenOperations({ tokenAddress }) {
  const { address } = useAccount();
  
  // Read contract data
  const { data: balance, isLoading } = useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: [address],
  });

  // Write contract transaction
  const { writeContract, data: hash, isPending } = useWriteContract();
  
  // Wait for transaction confirmation
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handleTransfer = () => {
    writeContract({
      address: tokenAddress,
      abi: erc20Abi,
      functionName: 'transfer',
      args: ['0x742d35Cc6634C0532925a3b8D6Cd1C', 1000000000000000000n],
    });
  };

  return (
    <div className="token-operations">
      <h3>Token Operations</h3>
      <p>Balance: {isLoading ? 'Loading...' : balance?.toString()}</p>
      
      <button 
        onClick={handleTransfer}
        disabled={isPending || isConfirming}
      >
        {isPending ? 'Confirming...' : isConfirming ? 'Processing...' : 'Transfer Tokens'}
      </button>
      
      {isSuccess && <p className="success">Transfer completed!</p>}
    </div>
  );
}
```

**Hook References:**
- [WAGMI Hooks API Reference](https://wagmi.sh/react/api/hooks)
- [React Hooks Best Practices](https://react.dev/reference/react/hooks)

## Building NFT Components with WAGMI

### Complete NFT Marketplace Component

**nftAbi.json**
```json
[
  {
    "name": "tokenURI",
    "type": "function",
    "stateMutability": "view",
    "inputs": [{ "name": "tokenId", "type": "uint256" }],
    "outputs": [{ "name": "", "type": "string" }]
  },
  {
    "name": "ownerOf",
    "type": "function",
    "stateMutability": "view",
    "inputs": [{ "name": "tokenId", "type": "uint256" }],
    "outputs": [{ "name": "", "type": "address" }]
  },
  {
    "name": "approve",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [
      { "name": "to", "type": "address" },
      { "name": "tokenId", "type": "uint256" }
    ],
    "outputs": []
  },
  {
    "name": "transferFrom",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [
      { "name": "from", "type": "address" },
      { "name": "to", "type": "address" },
      { "name": "tokenId", "type": "uint256" }
    ],
    "outputs": []
  }
]
```

```jsx
import { useReadContract } from 'wagmi';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import nftAbi from './abis/nftAbi.json';

function NFTCard({ tokenId, contractAddress }) {
  const [imageError, setImageError] = useState(false);

  // Fetch token URI
  const { data: tokenURI, isLoading: uriLoading } = useReadContract({
    address: contractAddress,
    abi: nftAbi,
    functionName: 'tokenURI',
    args: [tokenId],
  });

  // Fetch token owner
  const { data: owner, isLoading: ownerLoading } = useReadContract({
    address: contractAddress,
    abi: nftAbi,
    functionName: 'ownerOf',
    args: [tokenId],
  });

  // Fetch metadata with caching
  const { data: metadata, isLoading: metadataLoading, error } = useQuery({
    queryKey: ['nft-metadata', tokenURI],
    queryFn: async () => {
      if (!tokenURI) return null;
      
      // Handle IPFS URLs
      const url = tokenURI.startsWith('ipfs://') 
        ? tokenURI.replace('ipfs://', 'https://ipfs.io/ipfs/')
        : tokenURI;
      
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch metadata');
      return response.json();
    },
    enabled: !!tokenURI,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });

  const isLoading = uriLoading || ownerLoading || metadataLoading;

  if (isLoading) {
    return (
      <div className="nft-card loading">
        <div className="skeleton-image"></div>
        <div className="skeleton-text"></div>
        <div className="skeleton-text short"></div>
      </div>
    );
  }

  if (error || !metadata) {
    return (
      <div className="nft-card error">
        <div className="error-placeholder">Failed to load NFT</div>
      </div>
    );
  }

  return (
    <div className="nft-card">
      <div className="nft-image-container">
        {!imageError ? (
          <img 
            src={metadata.image?.startsWith('ipfs://') 
              ? metadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/')
              : metadata.image
            }
            alt={metadata.name}
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className="image-placeholder">🖼️</div>
        )}
      </div>
      
      <div className="nft-details">
        <h3 className="nft-name">{metadata.name || `#${tokenId}`}</h3>
        <p className="nft-description">{metadata.description}</p>
        
        <div className="nft-attributes">
          {metadata.attributes?.slice(0, 3).map((attr, index) => (
            <span key={index} className="attribute-tag">
              {attr.trait_type}: {attr.value}
            </span>
          ))}
        </div>
        
        <div className="nft-owner">
          <small>Owner: {owner?.slice(0, 6)}...{owner?.slice(-4)}</small>
        </div>
      </div>
    </div>
  );
}

// NFT Collection Component
function NFTCollection({ contractAddress, maxTokens = 10 }) {
  const tokenIds = Array.from({ length: maxTokens }, (_, i) => i + 1);

  return (
    <div className="nft-collection">
      <h2>NFT Collection</h2>
      <div className="nft-grid">
        {tokenIds.map(tokenId => (
          <NFTCard 
            key={tokenId}
            tokenId={tokenId}
            contractAddress={contractAddress}
          />
        ))}
      </div>
    </div>
  );
}
```

**NFT Development Resources:**
- [OpenSea NFT API](https://docs.opensea.io/reference/api-overview)
- [IPFS for NFT Storage](https://docs.ipfs.tech/)
- [ERC-721 Standard](https://eips.ethereum.org/EIPS/eip-721)

## WAGMI Multichain dApp Development

### Advanced Multichain DeFi Dashboard

**aavePoolAbi.json**
```json
[
  {
    "name": "getUserAccountData",
    "type": "function",
    "stateMutability": "view",
    "inputs": [
      { "name": "user", "type": "address" }
    ],
    "outputs": [
      { "name": "totalCollateralETH", "type": "uint256" },
      { "name": "totalDebtETH", "type": "uint256" },
      { "name": "availableBorrowsETH", "type": "uint256" },
      { "name": "currentLiquidationThreshold", "type": "uint256" },
      { "name": "ltv", "type": "uint256" },
      { "name": "healthFactor", "type": "uint256" }
    ]
  },
  {
    "name": "getReserveData",
    "type": "function",
    "stateMutability": "view",
    "inputs": [
      { "name": "asset", "type": "address" }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "components": [
          { "name": "liquidityRate", "type": "uint256" },
          { "name": "variableBorrowRate", "type": "uint256" },
          { "name": "stableBorrowRate", "type": "uint256" }
        ]
      }
    ]
  }
]
```

```jsx
import { 
  useAccount, 
  useBalance, 
  useReadContracts, 
  useSwitchChain,
  useChainId 
} from 'wagmi';
import { mainnet, polygon, arbitrum, optimism, base } from 'wagmi/chains';
import { formatUnits } from 'viem';
import aavePoolAbi from './abis/aavePoolAbi.json';
import erc20Abi from './abis/erc20Abi.json';

const SUPPORTED_CHAINS = [mainnet, polygon, arbitrum, optimism, base];

const AAVE_POOLS = {
  [mainnet.id]: '0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9',
  [polygon.id]: '0x8dFf5E27EA6b7AC08EbFdf9eB090F32ee9a30fcf',
  [arbitrum.id]: '0x794a61358D6845594F94dc1DB02A252b5b4814aD',
  [optimism.id]: '0x794a61358D6845594F94dc1DB02A252b5b4814aD',
  [base.id]: '0xA238Dd80C259a72e81d7e4664a9801593F98d1c5',
};

function MultiChainDeFiDashboard() {
  const { address } = useAccount();
  const { switchChain, isPending: isSwitching } = useSwitchChain();
  const currentChainId = useChainId();

  // Get native token balances across all chains
  const { data: balances } = useReadContracts({
    contracts: SUPPORTED_CHAINS.map(chain => ({
      chainId: chain.id,
      address: '0x0000000000000000000000000000000000000000', // Native token
      abi: erc20Abi, // Using ERC20 ABI for balance check
      functionName: 'balanceOf',
      args: [address],
    })),
    query: {
      enabled: !!address,
      refetchInterval: 30000, // Refetch every 30 seconds
    },
  });

  // Get Aave lending positions
  const { data: aavePositions, isLoading: aaveLoading } = useReadContracts({
    contracts: Object.entries(AAVE_POOLS).map(([chainId, poolAddress]) => ({
      chainId: parseInt(chainId),
      address: poolAddress,
      abi: aavePoolAbi,
      functionName: 'getUserAccountData',
      args: [address],
    })),
    query: {
      enabled: !!address,
      refetchInterval: 60000, // Refetch every minute
    },
  });

  const handleChainSwitch = async (chainId) => {
    try {
      await switchChain({ chainId });
    } catch (error) {
      console.error('Failed to switch chain:', error);
    }
  };

  if (!address) {
    return (
      <div className="dashboard-placeholder">
        <h2>Connect Your Wallet</h2>
        <p>Connect your wallet to view your multichain portfolio</p>
      </div>
    );
  }

  return (
    <div className="multichain-dashboard">
      <header className="dashboard-header">
        <h1>🌐 Multichain DeFi Dashboard</h1>
        <div className="current-chain">
          Current: {SUPPORTED_CHAINS.find(c => c.id === currentChainId)?.name}
        </div>
      </header>

      {/* Chain Switcher */}
      <section className="chain-switcher">
        <h3>Switch Network</h3>
        <div className="chain-buttons">
          {SUPPORTED_CHAINS.map(chain => (
            <button
              key={chain.id}
              onClick={() => handleChainSwitch(chain.id)}
              disabled={isSwitching}
              className={`chain-button ${currentChainId === chain.id ? 'active' : ''}`}
            >
              <img 
                src={`https://cryptologos.cc/logos/${chain.name.toLowerCase()}-logo.png`}
                alt={chain.name}
                width="20"
                height="20"
                onError={(e) => e.target.style.display = 'none'}
              />
              {chain.name}
            </button>
          ))}
        </div>
      </section>

      {/* Native Token Balances */}
      <section className="balances-section">
        <h3>💰 Native Token Balances</h3>
        <div className="balances-grid">
          {SUPPORTED_CHAINS.map((chain, index) => {
            const balance = balances?.[index];
            const formattedBalance = balance?.result 
              ? formatUnits(balance.result, 18)
              : '0';

            return (
              <div key={chain.id} className="balance-card">
                <div className="chain-info">
                  <h4>{chain.name}</h4>
                  <span className="chain-id">#{chain.id}</span>
                </div>
                <div className="balance-amount">
                  <span className="amount">{parseFloat(formattedBalance).toFixed(4)}</span>
                  <span className="symbol">{chain.nativeCurrency.symbol}</span>
                </div>
                <div className="balance-status">
                  {balance?.status === 'success' ? '✅' : balance?.status === 'failure' ? '❌' : '⏳'}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Aave Lending Positions */}
      <section className="aave-section">
        <h3>🏦 Aave Lending Positions</h3>
        {aaveLoading ? (
          <div className="loading-state">Loading positions...</div>
        ) : (
          <div className="aave-grid">
            {Object.entries(AAVE_POOLS).map(([chainId, poolAddress], index) => {
              const chainName = SUPPORTED_CHAINS.find(c => c.id === parseInt(chainId))?.name;
              const data = aavePositions?.[index]?.result;
              
              if (!data || data[0] === 0n) {
                return (
                  <div key={chainId} className="aave-card empty">
                    <h4>Aave on {chainName}</h4>
                    <p>No lending position found</p>
                  </div>
                );
              }

              const [totalCollateral, totalDebt, availableBorrows, , , healthFactor] = data;
              const healthFactorFormatted = formatUnits(healthFactor, 18);
              const isHealthy = parseFloat(healthFactorFormatted) > 1.5;

              return (
                <div key={chainId} className={`aave-card ${isHealthy ? 'healthy' : 'warning'}`}>
                  <h4>Aave on {chainName}</h4>
                  <div className="position-details">
                    <div className="metric">
                      <label>Collateral:</label>
                      <span>{formatUnits(totalCollateral, 18).slice(0, 8)} ETH</span>
                    </div>
                    <div className="metric">
                      <label>Debt:</label>
                      <span>{formatUnits(totalDebt, 18).slice(0, 8)} ETH</span>
                    </div>
                    <div className="metric">
                      <label>Available:</label>
                      <span>{formatUnits(availableBorrows, 18).slice(0, 8)} ETH</span>
                    </div>
                    <div className={`metric health-factor ${isHealthy ? 'healthy' : 'warning'}`}>
                      <label>Health Factor:</label>
                      <span>{healthFactorFormatted.slice(0, 6)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Portfolio Summary */}
      <section className="portfolio-summary">
        <h3>📊 Portfolio Summary</h3>
        <div className="summary-cards">
          <div className="summary-card">
            <h4>Total Chains</h4>
            <span className="big-number">{SUPPORTED_CHAINS.length}</span>
          </div>
          <div className="summary-card">
            <h4>Active Positions</h4>
            <span className="big-number">
              {aavePositions?.filter(pos => pos.result?.[0] > 0n).length || 0}
            </span>
          </div>
          <div className="summary-card">
            <h4>Connected Networks</h4>
            <span className="big-number">
              {balances?.filter(bal => bal.status === 'success').length || 0}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
```

**Multichain Resources:**
- [Chain List](https://chainlist.org/)
- [L2BEAT Analytics](https://l2beat.com/)
- [Multichain Bridge Protocols](https://defillama.com/bridges)

## Advanced WAGMI Patterns: Simulate-Write Flow

### Governance Voting with Transaction Simulation

**governanceAbi.json**
```json
[
  {
    "name": "vote",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [
      { "name": "proposalId", "type": "uint256" },
      { "name": "support", "type": "uint8" }
    ],
    "outputs": []
  },
  {
    "name": "getVotes",
    "type": "function",
    "stateMutability": "view",
    "inputs": [
      { "name": "account", "type": "address" },
      { "name": "blockNumber", "type": "uint256" }
    ],
    "outputs": [{ "name": "", "type": "uint256" }]
  },
  {
    "name": "propose",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [
      { "name": "targets", "type": "address[]" },
      { "name": "values", "type": "uint256[]" },
      { "name": "calldatas", "type": "bytes[]" },
      { "name": "description", "type": "string" }
    ],
    "outputs": [{ "name": "", "type": "uint256" }]
  },
  {
    "name": "getProposal",
    "type": "function",
    "stateMutability": "view",
    "inputs": [
      { "name": "proposalId", "type": "uint256" }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "components": [
          { "name": "id", "type": "uint256" },
          { "name": "proposer", "type": "address" },
          { "name": "eta", "type": "uint256" },
          { "name": "startBlock", "type": "uint256" },
          { "name": "endBlock", "type": "uint256" },
          { "name": "forVotes", "type": "uint256" },
          { "name": "againstVotes", "type": "uint256" },
          { "name": "abstainVotes", "type": "uint256" },
          { "name": "canceled", "type": "bool" },
          { "name": "executed", "type": "bool" }
        ]
      }
    ]
  }
]
```

```jsx
import { 
  useSimulateContract, 
  useWriteContract, 
  useWaitForTransactionReceipt,
  useGasPrice,
  useEstimateFeesPerGas 
} from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { useState } from 'react';
import governanceAbi from './abis/governanceAbi.json';

const GOVERNANCE_CONTRACT = '0x5e4BE8Bc9637f0EAA1A755019e06A68ce081D58F';

function GovernanceVoting({ proposalId, proposalTitle, proposalDescription }) {
  const [selectedVote, setSelectedVote] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Get current gas prices for estimation
  const { data: gasPrice } = useGasPrice();
  const { data: feeData } = useEstimateFeesPerGas();

  // Simulate the vote transaction
  const { 
    data: simulateData, 
    error: simulateError,
    isLoading: isSimulating 
  } = useSimulateContract({
    address: GOVERNANCE_CONTRACT,
    abi: governanceAbi,
    functionName: 'vote',
    args: [proposalId, selectedVote],
    query: {
      enabled: selectedVote !== null,
    },
  });

  // Execute the vote
  const { 
    writeContract, 
    data: hash, 
    isPending: isWritePending,
    error: writeError 
  } = useWriteContract();

  // Wait for transaction confirmation
  const { 
    isLoading: isConfirming, 
    isSuccess,
    data: receipt 
  } = useWaitForTransactionReceipt({
    hash,
  });

  const voteOptions = [
    { value: 0, label: 'Against', emoji: '❌', color: 'red' },
    { value: 1, label: 'For', emoji: '✅', color: 'green' },
    { value: 2, label: 'Abstain', emoji: '🤷', color: 'gray' },
  ];

  const handleVoteSelection = (voteValue) => {
    setSelectedVote(voteValue);
    setShowConfirmation(true);
  };

  const handleConfirmVote = () => {
    if (simulateData?.request) {
      writeContract(simulateData.request);
      setShowConfirmation(false);
    }
  };

  const calculateGasCost = () => {
    if (!simulateData?.gas || !gasPrice) return null;
    
    const gasCost = simulateData.gas * gasPrice;
    return formatEther(gasCost);
  };

  if (isSuccess) {
    return (
      <div className="vote-success">
        <div className="success-animation">🎉</div>
        <h3>Vote Cast Successfully!</h3>
        <p>Your vote on "{proposalTitle}" has been recorded on-chain.</p>
        <div className="transaction-details">
          <p><strong>Transaction Hash:</strong></p>
          <code>{hash}</code>
          <p><strong>Block Number:</strong> {receipt?.blockNumber?.toString()}</p>
          <p><strong>Gas Used:</strong> {receipt?.gasUsed?.toString()}</p>
        </div>
        <button onClick={() => window.location.reload()}>Vote on Another Proposal</button>
      </div>
    );
  }

  return (
    <div className="governance-voting">
      <div className="proposal-header">
        <h2>Proposal #{proposalId}</h2>
        <h3>{proposalTitle}</h3>
        <p className="proposal-description">{proposalDescription}</p>
      </div>

      {!showConfirmation ? (
        <div className="vote-selection">
          <h4>Cast Your Vote</h4>
          <div className="vote-options">
            {voteOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleVoteSelection(option.value)}
                className={`vote-option vote-option--${option.color}`}
                disabled={isSimulating}
              >
                <span className="vote-emoji">{option.emoji}</span>
                <span className="vote-label">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="vote-confirmation">
          <h4>Confirm Your Vote</h4>
          <div className="selected-vote">
            <span>You are voting: </span>
            <strong>
              {voteOptions.find(opt => opt.value === selectedVote)?.emoji}{' '}
              {voteOptions.find(opt => opt.value === selectedVote)?.label}
            </strong>
          </div>

          {/* Transaction Preview */}
          <div className="transaction-preview">
            <h5>Transaction Preview</h5>
            {isSimulating ? (
              <div className="loading">Simulating transaction...</div>
            ) : simulateError ? (
              <div className="error">
                <p>❌ Simulation Failed</p>
                <details>
                  <summary>Error Details</summary>
                  <pre>{simulateError.message}</pre>
                </details>
              </div>
            ) : simulateData ? (
              <div className="simulation-success">
                <p>✅ Transaction will succeed</p>
                <div className="gas-estimate">
                  <p><strong>Estimated Gas:</strong> {simulateData.gas?.toString()}</p>
                  <p><strong>Gas Price:</strong> {gasPrice ? formatEther(gasPrice) : 'Loading...'} ETH</p>
                  <p><strong>Estimated Cost:</strong> ~{calculateGasCost()} ETH</p>
                </div>
              </div>
            ) : null}
          </div>

          <div className="confirmation-actions">
            <button
              onClick={() => setShowConfirmation(false)}
              className="btn-secondary"
            >
              Back
            </button>
            <button
              onClick={handleConfirmVote}
              disabled={!simulateData?.request || isWritePending || isConfirming}
              className="btn-primary"
            >
              {isWritePending 
                ? 'Confirm in Wallet...' 
                : isConfirming 
                  ? 'Confirming Transaction...' 
                  : 'Cast Vote'
              }
            </button>
          </div>
        </div>
      )}

      {writeError && (
        <div className="error transaction-error">
          <h5>Transaction Failed</h5>
          <p>{writeError.message}</p>
        </div>
      )}
    </div>
  );
}

// Usage example
function GovernanceProposals() {
  const proposals = [
    {
      id: 1,
      title: "Increase Block Rewards by 10%",
      description: "This proposal suggests increasing mining rewards to improve network security and incentivize more validators."
    },
    {
      id: 2,
      title: "Implement EIP-4844 (Proto-Danksharding)",
      description: "Enable proto-danksharding to reduce Layer 2 transaction costs and improve scalability."
    }
  ];

  return (
    <div className="governance-app">
      <h1>🏛️ DAO Governance</h1>
      {proposals.map(proposal => (
        <GovernanceVoting
          key={proposal.id}
          proposalId={proposal.id}
          proposalTitle={proposal.title}
          proposalDescription={proposal.description}
        />
      ))}
    </div>
  );
}
```

**Governance Resources:**
- [OpenZeppelin Governance](https://docs.openzeppelin.com/contracts/4.x/governance)
- [Compound Governor](https://compound.finance/docs/governance)
- [DAO Tooling Comparison](https://www.tally.xyz/)

## WAGMI Performance Optimization

### Bundle Size Optimization

```jsx
// ❌ Bad: Importing entire WAGMI library
import * as wagmi from 'wagmi';

// ✅ Good: Import only what you need
import { useAccount, useBalance, useReadContract } from 'wagmi';

// ✅ Better: Use dynamic imports for large components
import { lazy, Suspense } from 'react';

const HeavyNFTGallery = lazy(() => import('./components/NFTGallery'));

function App() {
  return (
    <Suspense fallback={<div>Loading gallery...</div>}>
      <HeavyNFTGallery />
    </Suspense>
  );
}
```

### React Query Optimization

```jsx
import { useQueryClient } from '@tanstack/react-query';
import { useReadContract } from 'wagmi';

function OptimizedTokenData({ address }) {
  const queryClient = useQueryClient();

  const { data, isLoading } = useReadContract({
    address,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: [userAddress],
    query: {
      // Stale time: 30 seconds
      staleTime: 30 * 1000,
      // Cache time: 5 minutes
      gcTime: 5 * 60 * 1000,
      // Refetch on window focus
      refetchOnWindowFocus: true,
      // Refetch interval: 60 seconds
      refetchInterval: 60 * 1000,
      // Retry failed requests 3 times
      retry: 3,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  });

  // Prefetch related data
  const prefetchTokenInfo = () => {
    queryClient.prefetchQuery({
      queryKey: ['tokenInfo', address],
      queryFn: () => fetchTokenInfo(address),
      staleTime: 10 * 60 * 1000, // 10 minutes
    });
  };

  return (
    <div onMouseEnter={prefetchTokenInfo}>
      Balance: {isLoading ? 'Loading...' : data?.toString()}
    </div>
  );
}
```

**Performance Resources:**
- [React Query Performance Guide](https://tanstack.com/query/latest/docs/react/guides/performance)
- [Bundle Analyzer Tools](https://www.npmjs.com/package/webpack-bundle-analyzer)

## WAGMI Best Practices for Production

### Error Handling and User Experience

```jsx
import { useAccount, useConnect, useConnectors } from 'wagmi';
import { useEffect, useState } from 'react';

function RobustWalletConnection() {
  const { address, isConnected, isConnecting, isReconnecting } = useAccount();
  const { connect, error: connectError, isPending } = useConnect();
  const connectors = useConnectors();
  const [lastError, setLastError] = useState(null);

  // Clear errors after successful connection
  useEffect(() => {
    if (isConnected) {
      setLastError(null);
    }
  }, [isConnected]);

  // Handle connection errors
  useEffect(() => {
    if (connectError) {
      setLastError(connectError.message);
      
      // Analytics tracking
      if (typeof gtag !== 'undefined') {
        gtag('event', 'wallet_connection_error', {
          error_message: connectError.message,
          wallet_type: connectError.connector?.name || 'unknown'
        });
      }
    }
  }, [connectError]);

  const handleConnect = async (connector) => {
    try {
      setLastError(null);
      await connect({ connector });
      
      // Analytics tracking
      if (typeof gtag !== 'undefined') {
        gtag('event', 'wallet_connected', {
          wallet_type: connector.name
        });
      }
    } catch (error) {
      console.error('Connection failed:', error);
      setLastError(error.message);
    }
  };

  if (isConnected) {
    return (
      <div className="wallet-connected">
        <span className="status-indicator">🟢</span>
        <span>{address?.slice(0, 6)}...{address?.slice(-4)}</span>
      </div>
    );
  }

  return (
    <div className="wallet-connection">
      <h3>Connect Your Wallet</h3>
      
      {/* Connection Status */}
      {(isConnecting || isReconnecting || isPending) && (
        <div className="connection-status">
          <div className="spinner"></div>
          <span>
            {isReconnecting ? 'Reconnecting...' : 'Connecting...'}
          </span>
        </div>
      )}

      {/* Error Display */}
      {lastError && (
        <div className="error-message">
          <span className="error-icon">⚠️</span>
          <div>
            <strong>Connection Failed</strong>
            <p>{lastError}</p>
            {lastError.includes('rejected') && (
              <small>Please approve the connection in your wallet</small>
            )}
          </div>
        </div>
      )}

      {/* Connector Buttons */}
      <div className="connectors-grid">
        {connectors.map((connector) => {
          const isReady = connector.type !== 'injected' || typeof window !== 'undefined';
          
          return (
            <button
              key={connector.uid}
              onClick={() => handleConnect(connector)}
              disabled={!isReady || isPending}
              className={`connector-button ${!isReady ? 'disabled' : ''}`}
            >
              <img 
                src={getConnectorIcon(connector.name)}
                alt={connector.name}
                width="24"
                height="24"
              />
              <span>{connector.name}</span>
              {!isReady && <small>(Not installed)</small>}
            </button>
          );
        })}
      </div>

      {/* Help Links */}
      <div className="help-links">
        <a href="https://ethereum.org/wallets/" target="_blank" rel="noopener noreferrer">
          Don't have a wallet? Get one here →
        </a>
      </div>
    </div>
  );
}

// Utility function for connector icons
function getConnectorIcon(connectorName) {
  const icons = {
    'MetaMask': '/icons/metamask.svg',
    'WalletConnect': '/icons/walletconnect.svg',
    'Coinbase Wallet': '/icons/coinbase.svg',
    'Rainbow': '/icons/rainbow.svg',
  };
  return icons[connectorName] || '/icons/wallet-generic.svg';
}
```

### Production Environment Configuration

```jsx
// config/wagmi.production.js
import { http, createConfig } from 'wagmi';
import { mainnet, polygon, arbitrum, optimism } from 'wagmi/chains';
import { coinbaseWallet, metaMask, walletConnect } from 'wagmi/connectors';

// Environment-specific RPC URLs
const rpcUrls = {
  [mainnet.id]: process.env.REACT_APP_MAINNET_RPC_URL || mainnet.rpcUrls.default.http[0],
  [polygon.id]: process.env.REACT_APP_POLYGON_RPC_URL || polygon.rpcUrls.default.http[0],
  [arbitrum.id]: process.env.REACT_APP_ARBITRUM_RPC_URL || arbitrum.rpcUrls.default.http[0],
  [optimism.id]: process.env.REACT_APP_OPTIMISM_RPC_URL || optimism.rpcUrls.default.http[0],
};

export const wagmiConfig = createConfig({
  chains: [mainnet, polygon, arbitrum, optimism],
  connectors: [
    metaMask({
      dappMetadata: {
        name: 'Your dApp Name',
        url: 'https://your-dapp.com',
      },
    }),
    walletConnect({
      projectId: process.env.REACT_APP_WALLETCONNECT_PROJECT_ID,
      metadata: {
        name: 'Your dApp',
        description: 'Your dApp Description',
        url: 'https://your-dapp.com',
        icons: ['https://your-dapp.com/icon.png'],
      },
    }),
    coinbaseWallet({
      appName: 'Your dApp',
      appLogoUrl: 'https://your-dapp.com/logo.png',
    }),
  ],
  transports: {
    [mainnet.id]: http(rpcUrls[mainnet.id]),
    [polygon.id]: http(rpcUrls[polygon.id]),
    [arbitrum.id]: http(rpcUrls[arbitrum.id]),
    [optimism.id]: http(rpcUrls[optimism.id]),
  },
  batch: {
    multicall: {
      batchSize: 1024 * 200, // 200kb
      wait: 16, // 16ms
    },
  },
  // Enable polling for better UX
  pollingInterval: 4_000,
});
```

**Production Resources:**
- [WAGMI Production Checklist](https://wagmi.sh/react/guides/migrate-from-v1-to-v2)
- [Web3 Security Best Practices](https://consensys.github.io/smart-contract-best-practices/)

## Troubleshooting Common WAGMI Issues

### Common Issues and Solutions

```jsx
// Issue 1: Hydration errors in Next.js
import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';

function SafeWalletInfo() {
  const { address, isConnected } = useAccount();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return <div>Loading...</div>;
  }

  return isConnected ? (
    <div>Connected: {address}</div>
  ) : (
    <div>Not connected</div>
  );
}

// Issue 2: Chain switching failures
import { useSwitchChain } from 'wagmi';
import { useState } from 'react';

function ChainSwitcher() {
  const { switchChain, error, isPending } = useSwitchChain();
  const [lastError, setLastError] = useState(null);

  const handleSwitchChain = async (chainId) => {
    try {
      setLastError(null);
      await switchChain({ chainId });
    } catch (error) {
      // Handle specific error types
      if (error.code === 4902) {
        setLastError('Chain not added to wallet. Please add it manually.');
      } else if (error.code === 4001) {
        setLastError('User rejected chain switch request.');
      } else {
        setLastError(error.message);
      }
    }
  };

  return (
    <div>
      <button 
        onClick={() => handleSwitchChain(1)} 
        disabled={isPending}
      >
        Switch to Mainnet
      </button>
      {lastError && <div className="error">{lastError}</div>}
    </div>
  );
}

// Issue 3: Contract interaction failures
import { useWriteContract, useSimulateContract } from 'wagmi';

function RobustContractWrite({ address, abi, functionName, args }) {
  const { data: simulateData, error: simulateError } = useSimulateContract({
    address,
    abi,
    functionName,
    args,
  });

  const { writeContract, error: writeError, isPending } = useWriteContract();

  const handleWrite = () => {
    if (!simulateData) {
      console.error('Cannot write: simulation failed or pending');
      return;
    }

    writeContract(simulateData.request);
  };

  return (
    <div>
      <button 
        onClick={handleWrite}
        disabled={!simulateData || isPending}
      >
        {isPending ? 'Writing...' : 'Write Contract'}
      </button>
      
      {simulateError && (
        <div className="error">
          Simulation Error: {simulateError.shortMessage || simulateError.message}
        </div>
      )}
      
      {writeError && (
        <div className="error">
          Write Error: {writeError.shortMessage || writeError.message}
        </div>
      )}
    </div>
  );
}
```

### Debug Tools and Monitoring

```jsx
// Development debugging component
function WAGMIDebugger() {
  const { address, chain, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="wagmi-debugger" style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '10px',
      fontSize: '12px',
      fontFamily: 'monospace',
      zIndex: 9999,
    }}>
      <h4>WAGMI Debug Info</h4>
      <div>Connected: {isConnected ? '✅' : '❌'}</div>
      <div>Address: {address || 'None'}</div>
      <div>Chain: {chain?.name || 'Unknown'} (ID: {chain?.id || 'N/A'})</div>
      <div>Balance: {balance?.formatted || 'N/A'} {balance?.symbol || ''}</div>
    </div>
  );
}
```

**Troubleshooting Resources:**
- [WAGMI GitHub Issues](https://github.com/wevm/wagmi/issues)
- [WAGMI Discord Community](https://discord.gg/wagmi)
- [Ethereum Stack Exchange](https://ethereum.stackexchange.com/)

### Working with ABI Files: Best Practices

#### Generating ABI Files from Smart Contracts

```bash
# Using Hardhat
npx hardhat compile
# ABIs will be in artifacts/contracts/YourContract.sol/YourContract.json

# Using Foundry
forge build
# ABIs will be in out/YourContract.sol/YourContract.json

# Extract just the ABI:
jq '.abi' artifacts/contracts/Token.sol/Token.json > src/abis/tokenAbi.json
```

#### TypeScript Integration for Better DX

**wagmi.config.ts** (for automatic ABI generation)
```typescript
import { defineConfig } from '@wagmi/cli'
import { foundry, hardhat } from '@wagmi/cli/plugins'

export default defineConfig({
  out: 'src/generated/wagmi.ts',
  contracts: [],
  plugins: [
    foundry({
      project: './contracts',
      include: ['**/*.sol'],
    }),
    hardhat({
      project: './contracts',
    }),
  ],
})
```

**types/contracts.ts**
```typescript
import type { Abi } from 'viem'
import erc20Abi from '../abis/erc20Abi.json'
import nftAbi from '../abis/nftAbi.json'
import governanceAbi from '../abis/governanceAbi.json'
import aavePoolAbi from '../abis/aavePoolAbi.json'

export const contractAbis = {
  erc20: erc20Abi as Abi,
  nft: nftAbi as Abi,
  governance: governanceAbi as Abi,
  aavePool: aavePoolAbi as Abi,
} as const

export type ContractName = keyof typeof contractAbis
```

#### Validating ABI Files

```javascript
// scripts/validate-abis.js
const fs = require('fs');
const path = require('path');

const abiDir = path.join(__dirname, '../src/abis');
const abiFiles = fs.readdirSync(abiDir);

abiFiles.forEach(file => {
  const filePath = path.join(abiDir, file);
  try {
    const abi = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    // Validate ABI structure
    if (!Array.isArray(abi)) {
      throw new Error(`${file}: ABI must be an array`);
    }
    
    abi.forEach((item, index) => {
      if (!item.name || !item.type) {
        throw new Error(`${file}: Invalid ABI item at index ${index}`);
      }
    });
    
    console.log(`✅ ${file} is valid`);
  } catch (error) {
    console.error(`❌ ${file}: ${error.message}`);
    process.exit(1);
  }
});
```

**ABI Management Resources:**
- [WAGMI CLI Documentation](https://wagmi.sh/cli/getting-started)
- [ABI Specification](https://docs.soliditylang.org/en/latest/abi-spec.html)
- [Contract Verification on Etherscan](https://docs.etherscan.io/tutorials/verifying-contracts-programmatically)

---

## Related Articles and Resources

### Essential WAGMI Learning Resources
- [Official WAGMI Documentation](https://wagmi.sh/) - Complete API reference and guides
- [VIEM Documentation](https://viem.sh/) - Low-level Ethereum library powering WAGMI
- [TanStack Query Guide](https://tanstack.com/query/latest) - Caching and state management
- [Web3Modal Integration](https://docs.walletconnect.com/web3modal/react/wagmi) - Wallet connection UI

### React and Web3 Development
- [React Hooks Best Practices](https://react.dev/reference/react/hooks) - Official React documentation
- [Next.js Web3 Integration](https://nextjs.org/docs) - Building production dApps
- [Ethereum Development Documentation](https://ethereum.org/developers/) - Core blockchain concepts

### DeFi and NFT Development
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/) - Secure smart contract patterns
- [Uniswap SDK Integration](https://docs.uniswap.org/) - DEX functionality
- [OpenSea API Documentation](https://docs.opensea.io/) - NFT marketplace integration

### Security and Best Practices
- [Web3 Security Guidelines](https://consensys.github.io/smart-contract-best-practices/) - Security best practices
- [MetaMask Integration Guide](https://docs.metamask.io/guide/) - Wallet integration patterns
- [Ethereum EIP Standards](https://eips.ethereum.org/) - Protocol specifications

This comprehensive guide covers everything you need to start building production-ready dApps with WAGMI library in 2025. From basic setup to advanced multichain patterns, you now have the knowledge to leverage WAGMI's full potential in your React applications. 