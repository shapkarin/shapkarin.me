---
title: "WAGMI vs Ethers.js: Choosing Ethereum Development Library"
description: "Compare WAGMI and Ethers.js for Ethereum development. Learn the pros and cons of each library, recent changes in WAGMI v2, and how to choose the best tool for your web3 project."
order: 12
---

# WAGMI vs Ethers.js

## Table of Contents
- [Intro](#intro)
- [ABI (Application Binary Interface)](#abi-application-binary-interface)
- [Ethers.js: A Dependable Workhorse](#ethersjs-a-dependable-workhorse)
- [WAGMI: Rapid dApp Integration with a Modern Stack](#wagmi-rapid-dapp-integration-with-a-modern-stack)
- [VIEM: The Foundation Layer](#viem-the-foundation-layer)
- [Simulate Write Pattern (WAGMI v2)](#simulate-write-pattern-wagmi-v2)
- [Insights on WAGMI v2 Breaking Changes](#insights-on-wagmi-v2-breaking-changes)
- [Choosing Between WAGMI and Ethers.js](#choosing-between-wagmi-and-ethersjs)
- [Conclusion](#conclusion)

### Intro

When choosing how to integrate Ethereum and other EVM-compatible chains into your web application, two libraries frequently stand out: **WAGMI** and **Ethers.js**. Both have earned strong reputations in the web3 ecosystem, but they fill different niches and suit different developer needs. Understanding their strengths, weaknesses, and how recent changes affect your workflow can help you pick the right library—or combination of libraries—for your project.

### ABI (Application Binary Interface)

The Ethereum Virtual Machine Application Binary Interface (ABI) is a JSON specification that lists every public function, constructor, and event a compiled smart contract exposes.  
It serves as a translation layer between human-readable code and the 256-bit calldata the EVM understands, defining exactly how to encode function calls and decode returned data or event logs.  
Libraries such as **Ethers.js**, **Viem**, and **WAGMI** load an ABI so you can invoke `contract.transfer(recipient, amount)` instead of manually crafting hex strings.  
Because the ABI is deterministic and language-agnostic, any dApp, backend, or script can interact with the same on-chain contract as long as they share this interface description.

### Ethers.js: A Dependable Workhorse

**First released:** July 2016

**Pros:**  
- **Mature and Stable:** Ethers.js is a long-established, battle-tested library for interacting with Ethereum. It's used across countless production environments and is known for its reliability and well-documented APIs.  
- **Framework-Agnostic:** Ethers.js is not tied to any particular frontend framework. Whether you're building with React, Vue, or just vanilla JavaScript, you can easily integrate it into your stack. This flexibility also extends to backend and CLI environments, making it a versatile all-rounder.  
- **Full Control and Transparency:** With Ethers.js, you interact directly with providers, signers, contracts, and utilities. You get to decide how to manage state, handle async flows, and structure your code. This is great for developers who want low-level control and are comfortable wiring up their own application logic.

**Cons:**
- **More Manual Wiring:** Since Ethers.js doesn't make assumptions about your environment, you'll spend more time setting up providers, managing wallet connections, and handling queries or mutations manually. This can mean more boilerplate, especially for frontend-heavy dApps.  
- **Less Guidance Out of the Box:** Ethers.js offers many utilities but leaves architectural decisions to you. If you're new to web3 or want a ready-made solution, you might find it a bit bare-bones. You need to know what you're doing—or be prepared to learn.

Here's how you'd use Ethers.js within a React component for a typical NFT marketplace scenario:

### nftAbi.json

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
  }
]
```

```jsx
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import nftAbi from './nftAbi.json';

function NFTCard({ tokenId, contractAddress }) {
  const [nft, setNft] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNFT() {
      try {
        // Manual provider setup
        const provider = new ethers.BrowserProvider(window.ethereum);
        
        const contract = new ethers.Contract(contractAddress, nftAbi, provider);
        
        // Fetch metadata
        const tokenURI = await contract.tokenURI(tokenId);
        const owner = await contract.ownerOf(tokenId);
        
        // Fetch JSON metadata
        const response = await fetch(tokenURI);
        const metadata = await response.json();
        
        setNft({ ...metadata, owner });
      } catch (error) {
        console.error('Failed to fetch NFT:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchNFT();
  }, [tokenId, contractAddress]);

  if (loading) return <div>Loading NFT...</div>;
  if (!nft) return <div>Failed to load NFT</div>;

  return (
    <div className="nft-card">
      <img src={nft.image} alt={nft.name} />
      <h3>{nft.name}</h3>
      <p>Owner: {nft.owner}</p>
    </div>
  );
}
```

This example shows the manual nature of Ethers.js—you handle provider setup, contract instantiation, and state management yourself.

### WAGMI: Rapid dApp Integration with a Modern Stack

**First released:** September 2021 (announced September 28, 2023 for v2)

**Pros:**  
- **Ecosystem Integrations for Speed:** WAGMI originally built on top of Ethers.js, but its latest versions (notably v2) have pivoted to lean heavily on [Viem](https://viem.sh/) and [TanStack Query](https://tanstack.com/query). This combination provides powerful caching, state management, and querying capabilities. The result is a streamlined developer experience where you get React hooks that handle common tasks like fetching data, managing accounts, and sending transactions with minimal boilerplate.  
- **Multichain Support and Account Management:** WAGMI embraces multichain scenarios out of the box. It makes connecting different chains, switching networks, and handling multiple accounts straightforward. For developers working in React, it's a huge productivity boost.  
- **Quicker Prototyping:** If you're building a React-based dApp and need to move fast, WAGMI's abstractions can save you a ton of time. Hooks like `useAccount`, `useBalance`, or `useWriteContract` let you focus on product features rather than the minutiae of blockchain RPC calls.

**Cons:**  
- **Coupled to React and Certain Patterns:** WAGMI is tightly integrated with React. If you're using another framework or want something more global and framework-independent, this coupling may feel restrictive.  
- **Less Low-Level Transparency:** While WAGMI provides great convenience, it may hide some complexities. When you hit advanced scenarios or tricky edge cases, you may need to peel back its abstractions and work directly with lower-level libraries like Viem.  
- **Upgrade and API Changes Can Be Significant:** Because WAGMI sits at a higher abstraction level and integrates closely with multiple libraries, major version changes can bring more extensive modifications to the API and recommended usage patterns.

Here's the same NFT marketplace example, but using WAGMI hooks:
*using the same [](#abi-nftabi-json)*

```jsx
import React from 'react';
import { useReadContract } from 'wagmi';
import { useQuery } from '@tanstack/react-query';
import nftAbi from './nftAbi.json';

function NFTCard({ tokenId, contractAddress }) {
  const { data: tokenURI, isLoading: uriLoading } = useReadContract({
    address: contractAddress,
    abi: nftAbi,
    functionName: 'tokenURI',
    args: [tokenId],
  });

  const { data: owner, isLoading: ownerLoading } = useReadContract({
    address: contractAddress,
    abi: nftAbi,
    functionName: 'ownerOf',
    args: [tokenId],
  });

  // Custom hook for fetching metadata
  const { data: metadata, isLoading: metadataLoading } = useNFTMetadata(tokenURI);

  const isLoading = uriLoading || ownerLoading || metadataLoading;

  if (isLoading) return <div>Loading NFT...</div>;
  if (!metadata) return <div>Failed to load NFT</div>;

  return (
    <div className="nft-card">
      <img src={metadata.image} alt={metadata.name} />
      <h3>{metadata.name}</h3>
      <p>Owner: {owner}</p>
    </div>
  );
}

// Custom hook for metadata fetching with caching
function useNFTMetadata(tokenURI) {
  return useQuery({
    queryKey: ['nft-metadata', tokenURI],
    queryFn: async () => {
      if (!tokenURI) return null;
      const response = await fetch(tokenURI);
      return response.json();
    },
    enabled: !!tokenURI,
  });
}
```

Notice how WAGMI handles caching, loading states, and re-renders automatically. The code is more declarative and less concerned with low-level details.

### VIEM: The Foundation Layer

**First released:** Early 2023 (created by the WAGMI team)

VIEM deserves special mention as it's become the backbone of modern Ethereum tooling. Created by the same team behind WAGMI, VIEM is a TypeScript-first, lightweight alternative to Ethers.js that focuses on:

- **Performance:** Optimized encoding/parsing algorithms and minimal bundle size (~35kB vs Ethers.js ~120kB)
- **Type Safety:** First-class TypeScript support with automatic type inference
- **Modular Architecture:** Tree-shakable modules that you only import what you need
- **Modern Standards:** Built with modern JavaScript features like native BigInt

Here's a real-life example of building a token swap interface using VIEM directly in React:

#### erc20Abi.json
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
  }
]
```

```jsx
import React, { useState } from 'react';
import { createPublicClient, createWalletClient, http, custom, parseUnits } from 'viem';
import { mainnet } from 'viem/chains';
import erc20Abi from './erc20Abi.json';

function TokenSwap() {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [isSwapping, setIsSwapping] = useState(false);

  const publicClient = createPublicClient({
    chain: mainnet,
    transport: http()
  });

  const handleSwap = async () => {
    try {
      setIsSwapping(true);
      
      // Create wallet client
      const walletClient = createWalletClient({
        chain: mainnet,
        transport: custom(window.ethereum)
      });

      const [account] = await walletClient.getAddresses();
      
      // Simulate the transaction first
      const { request } = await publicClient.simulateContract({
        address: '0xA0b86a33E6441e4e0079d4E88b0C9a8b7f9f1234', // Token address
        abi: erc20Abi,
        functionName: 'transfer',
        args: [recipient, parseUnits(amount, 18)],
        account,
      });

      // Execute the transaction
      const hash = await walletClient.writeContract(request);
      
      // Wait for confirmation
      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      
      console.log('Swap successful:', receipt);
    } catch (error) {
      console.error('Swap failed:', error);
    } finally {
      setIsSwapping(false);
    }
  };

  return (
    <div className="token-swap">
      <h2>Token Swap</h2>
      <input
        type="text"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="text"
        placeholder="Recipient Address"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <button onClick={handleSwap} disabled={isSwapping}>
        {isSwapping ? 'Swapping...' : 'Swap Tokens'}
      </button>
    </div>
  );
}
```

VIEM gives you the performance benefits and type safety while still maintaining explicit control over your blockchain interactions.

### Simulate Write Pattern (WAGMI v2)

One of the bigger breaking changes in v2 is the shift from the old *prepare* hooks to a simulate-then-write flow. Here's a production-ready example of a governance voting component:

#### governanceAbi.json
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
  }
]
```

```jsx
import React, { useState } from 'react';
import { useSimulateContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import governanceAbi from './governanceAbi.json';

function GovernanceVoting({ proposalId, proposalTitle }) {
  const [selectedVote, setSelectedVote] = useState(null); // 0: Against, 1: For, 2: Abstain

  // Simulate the vote transaction
  const { data: simulateData, error: simulateError } = useSimulateContract({
    address: '0x5e4BE8Bc9637f0EAA1A755019e06A68ce081D58F', // Governance contract
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
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handleVote = () => {
    if (simulateData?.request) {
      writeContract(simulateData.request);
    }
  };

  const voteOptions = [
    { value: 0, label: 'Against', color: 'bg-red-500' },
    { value: 1, label: 'For', color: 'bg-green-500' },
    { value: 2, label: 'Abstain', color: 'bg-gray-500' },
  ];

  if (isSuccess) {
    return (
      <div className="vote-success">
        <h3>✅ Vote Cast Successfully!</h3>
        <p>Your vote on "{proposalTitle}" has been recorded.</p>
      </div>
    );
  }

  return (
    <div className="governance-voting">
      <h3>Vote on Proposal #{proposalId}</h3>
      <p className="proposal-title">{proposalTitle}</p>
      
      <div className="vote-options">
        {voteOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setSelectedVote(option.value)}
            className={`vote-option ${selectedVote === option.value ? 'selected' : ''} ${option.color}`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {simulateError && (
        <div className="error">
          Simulation failed: {simulateError.message}
        </div>
      )}

      {writeError && (
        <div className="error">
          Transaction failed: {writeError.message}
        </div>
      )}

      <button
        onClick={handleVote}
        disabled={!simulateData?.request || isWritePending || isConfirming}
        className="vote-button"
      >
        {isWritePending ? 'Confirming...' : isConfirming ? 'Waiting for confirmation...' : 'Cast Vote'}
      </button>
    </div>
  );
}
```

The separation between simulation and execution gives you better UX by catching errors early and showing gas estimates before the user commits to the transaction.

### Insights on WAGMI v2 Breaking Changes

WAGMI's v2 release introduced a series of breaking changes to improve long-term stability and make it a more lightweight wrapper over peer dependencies like Viem and TanStack Query. Some key changes and their implications include:

- **Peer Dependencies:**  
  TanStack Query moved to a peer dependency, giving you more control over caching and async state management. This ensures that WAGMI aligns more seamlessly with how many developers already use TanStack Query, but it means you'll need to set it up in your project's root configuration explicitly.

- **Dropping Internal Abstractions:**  
  A number of "watch" properties, built-in suspense features, and prepared transaction hooks were removed. Instead, WAGMI v2 encourages composing functionality from foundational pieces. For example, rather than relying on `watch` properties or specialized hooks, you'll integrate `useBlock`, `useBlockNumber`, or `useQueryClient` from TanStack Query directly. This approach gives you finer control and makes the system more predictable, but at the cost of some convenience.

- **Rewritten Connectors and Chain Handling:**  
  The concept of connectors has been revamped. Connectors are now defined by functions rather than classes, and they're organized through a unified entry point (`'wagmi/connectors'`). The `MetaMaskConnector` has been dropped in favor of a more generic `injected` connector that can target MetaMask specifically. Similarly, chain definitions moved to Viem's `viem/chains` repository, streamlining chain management and reflecting a preference for established standards.

- **Migration from "prepare" Hooks:**  
  The old `usePrepareContractWrite` and `usePrepareSendTransaction` hooks have been replaced by new patterns like `useSimulateContract` and `useEstimateGas`. Though this might initially seem like more work, it mirrors how you'd reason about the underlying operations at a protocol level—first simulate the contract call or estimate gas, then execute the write. It encourages a clearer mental model of what's happening under the hood.

- **ENS Name Normalization and Formatting Control:**  
  WAGMI v2 stops handling ENS normalization and certain formatting (like token units) internally. This puts the choice back in your hands, letting you decide on normalization strategies or number formatting libraries like `dnum`. It reduces bundle size and complexity inside WAGMI, but you now must handle formatting explicitly. On the upside, this gives you more power to implement custom logic, localization, or precision handling as needed.

In essence, WAGMI v2 aims to be a stable core on top of Viem and TanStack Query, with fewer hidden complexities. The team has also indicated that future major releases won't be as disruptive. This aligns with the idea that WAGMI should serve as a thin, composable layer rather than a heavy framework imposing its own logic.

### Choosing Between WAGMI and Ethers.js

Before you decide, keep bundle sizes in mind:

- **Ethers.js:** ~120 kB min+gzipped (v6). Mostly an all-or-nothing import.
- **WAGMI + peers:** core (~15 kB) + Viem (~35 kB) + TanStack Query (~20 kB). Excellent tree-shaking means unused hooks or chain data won't show up in your bundle.
- **VIEM alone:** ~35 kB min+gzipped. Highly optimized and tree-shakable.

Here's a real-world multi-chain DeFi dashboard example showing WAGMI's strengths:

#### aavePoolAbi.json

```json
[
  {
    "name": "getUserAccountData",
    "type": "function",
    "stateMutability": "view",
    "inputs": [{ "name": "user", "type": "address" }],
    "outputs": [
      { "name": "totalCollateralETH", "type": "uint256" },
      { "name": "totalDebtETH", "type": "uint256" },
      { "name": "availableBorrowsETH", "type": "uint256" },
      { "name": "currentLiquidationThreshold", "type": "uint256" },
      { "name": "ltv", "type": "uint256" },
      { "name": "healthFactor", "type": "uint256" }
    ]
  }
]
```

```jsx
import React from 'react';
import { useAccount, useBalance, useReadContracts, useSwitchChain } from 'wagmi';
import { mainnet, polygon, arbitrum } from 'wagmi/chains';
import { formatUnits } from 'viem';
import aavePoolAbi from './aavePoolAbi.json';

const SUPPORTED_CHAINS = [mainnet, polygon, arbitrum];

function DeFiDashboard() {
  const { address, chain } = useAccount();
  const { switchChain } = useSwitchChain();

  // Get native token balances across all chains
  const balanceQueries = SUPPORTED_CHAINS.map(supportedChain => ({
    chainId: supportedChain.id,
    address,
  }));

  const { data: balances } = useReadContracts({
    contracts: balanceQueries.map(query => ({
      ...query,
      abi: [], // Native balance doesn't need ABI
      functionName: 'balanceOf',
    })),
    query: {
      enabled: !!address,
    },
  });

  // Get Aave positions across chains
  const aaveContracts = [
    { chainId: mainnet.id, address: '0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9' },
    { chainId: polygon.id, address: '0x8dFf5E27EA6b7AC08EbFdf9eB090F32ee9a30fcf' },
    { chainId: arbitrum.id, address: '0x794a61358D6845594F94dc1DB02A252b5b4814aD' },
  ];

  const { data: aaveData } = useReadContracts({
    contracts: aaveContracts.map(contract => ({
      ...contract,
      abi: aavePoolAbi,
      functionName: 'getUserAccountData',
      args: [address],
    })),
    query: {
      enabled: !!address,
    },
  });

  if (!address) {
    return <div>Please connect your wallet</div>;
  }

  return (
    <div className="defi-dashboard">
      <h1>Multi-Chain DeFi Dashboard</h1>
      
      <div className="chain-selector">
        <h3>Switch Chain:</h3>
        {SUPPORTED_CHAINS.map(supportedChain => (
          <button
            key={supportedChain.id}
            onClick={() => switchChain({ chainId: supportedChain.id })}
            className={chain?.id === supportedChain.id ? 'active' : ''}
          >
            {supportedChain.name}
          </button>
        ))}
      </div>

      <div className="balances-grid">
        <h3>Native Token Balances</h3>
        {SUPPORTED_CHAINS.map((supportedChain, index) => {
          const balance = balances?.[index];
          return (
            <div key={supportedChain.id} className="balance-card">
              <h4>{supportedChain.name}</h4>
              <p>
                {balance ? formatUnits(balance.result || 0n, 18) : '0'} {supportedChain.nativeCurrency.symbol}
              </p>
            </div>
          );
        })}
      </div>

      <div className="aave-positions">
        <h3>Aave Lending Positions</h3>
        {aaveContracts.map((contract, index) => {
          const data = aaveData?.[index]?.result;
          const chainName = SUPPORTED_CHAINS.find(c => c.id === contract.chainId)?.name;
          
          return (
            <div key={contract.chainId} className="aave-card">
              <h4>Aave on {chainName}</h4>
              {data ? (
                <div>
                  <p>Collateral: {formatUnits(data[0], 18)} ETH</p>
                  <p>Debt: {formatUnits(data[1], 18)} ETH</p>
                  <p>Health Factor: {formatUnits(data[5], 18)}</p>
                </div>
              ) : (
                <p>No position found</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
```

This example showcases WAGMI's multichain capabilities, automatic caching, and how easily you can build complex DeFi interfaces.

### Conclusion

In practice, many teams mix and match these libraries. They might rely on WAGMI for easy-to-use hooks and rapid prototyping, while still dropping down to Ethers.js (or directly to Viem) when they need fine-grained control or when they're working outside of React's context. The decision ultimately hinges on your project's complexity, your team's preferred coding style, and how comfortable you are adapting to evolving abstractions and APIs.

Either way, the Ethereum tooling ecosystem is rich, and both WAGMI and Ethers.js are strong contenders. Understanding their differences—and the implications of version changes like WAGMI's shift in v2—will help you build dApps that are both maintainable and future-proof.