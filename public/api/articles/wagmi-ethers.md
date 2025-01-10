---
title: "WAGMI vs Ethers.js: Choosing the Right Ethereum Development Library"
description: "Compare WAGMI and Ethers.js for Ethereum development. Learn the pros and cons of each library, recent changes in WAGMI v2, and how to choose the best tool for your web3 project."
---

When choosing how to integrate Ethereum and other EVM-compatible chains into your web application, two libraries frequently stand out: **WAGMI** and **Ethers.js**. Both have earned strong reputations in the web3 ecosystem, but they fill different niches and suit different developer needs. Understanding their strengths, weaknesses, and how recent changes affect your workflow can help you pick the right library—or combination of libraries—for your project.

### Ethers.js: A Dependable Workhorse

**Pros:**  
- **Mature and Stable:** Ethers.js is a long-established, battle-tested library for interacting with Ethereum. It’s used across countless production environments and is known for its reliability and well-documented APIs.  
- **Framework-Agnostic:** Ethers.js is not tied to any particular frontend framework. Whether you’re building with React, Vue, or just vanilla JavaScript, you can easily integrate it into your stack. This flexibility also extends to backend and CLI environments, making it a versatile all-rounder.  
- **Full Control and Transparency:** With Ethers.js, you interact directly with providers, signers, contracts, and utilities. You get to decide how to manage state, handle async flows, and structure your code. This is great for developers who want low-level control and are comfortable wiring up their own application logic.

**Cons:**  
- **More Manual Wiring:** Since Ethers.js doesn’t make assumptions about your environment, you’ll spend more time setting up providers, managing wallet connections, and handling queries or mutations manually. This can mean more boilerplate, especially for frontend-heavy dApps.  
- **Less Guidance Out of the Box:** Ethers.js offers many utilities but leaves architectural decisions to you. If you’re new to web3 or want a ready-made solution, you might find it a bit bare-bones. You need to know what you’re doing—or be prepared to learn.

### WAGMI: Rapid dApp Integration with a Modern Stack

**Pros:**  
- **Ecosystem Integrations for Speed:** WAGMI originally built on top of Ethers.js, but its latest versions (notably v2) have pivoted to lean heavily on [Viem](https://viem.sh/) and [TanStack Query](https://tanstack.com/query). This combination provides powerful caching, state management, and querying capabilities. The result is a streamlined developer experience where you get React hooks that handle common tasks like fetching data, managing accounts, and sending transactions with minimal boilerplate.  
- **Multichain Support and Account Management:** WAGMI embraces multichain scenarios out of the box. It makes connecting different chains, switching networks, and handling multiple accounts straightforward. For developers working in React, it’s a huge productivity boost.  
- **Quicker Prototyping:** If you’re building a React-based dApp and need to move fast, WAGMI’s abstractions can save you a ton of time. Hooks like `useAccount`, `useBalance`, or `useWriteContract` let you focus on product features rather than the minutiae of blockchain RPC calls.

**Cons:**  
- **Coupled to React and Certain Patterns:** WAGMI is tightly integrated with React. If you’re using another framework or want something more global and framework-independent, this coupling may feel restrictive.  
- **Less Low-Level Transparency:** While WAGMI provides great convenience, it may hide some complexities. When you hit advanced scenarios or tricky edge cases, you may need to peel back its abstractions and work directly with lower-level libraries like Viem.  
- **Upgrade and API Changes Can Be Significant:** Because WAGMI sits at a higher abstraction level and integrates closely with multiple libraries, major version changes can bring more extensive modifications to the API and recommended usage patterns.

### Insights on WAGMI v2 Breaking Changes

WAGMI’s v2 release introduced a series of breaking changes to improve long-term stability and make it a more lightweight wrapper over peer dependencies like Viem and TanStack Query. Some key changes and their implications include:

- **Peer Dependencies:**  
  TanStack Query moved to a peer dependency, giving you more control over caching and async state management. This ensures that WAGMI aligns more seamlessly with how many developers already use TanStack Query, but it means you’ll need to set it up in your project’s root configuration explicitly.

- **Dropping Internal Abstractions:**  
  A number of “watch” properties, built-in suspense features, and prepared transaction hooks were removed. Instead, WAGMI v2 encourages composing functionality from foundational pieces. For example, rather than relying on `watch` properties or specialized hooks, you’ll integrate `useBlock`, `useBlockNumber`, or `useQueryClient` from TanStack Query directly. This approach gives you finer control and makes the system more predictable, but at the cost of some convenience.

- **Reworked Connectors and Chain Handling:**  
  The concept of connectors has been revamped. Connectors are now defined by functions rather than classes, and they’re organized through a unified entry point (`'wagmi/connectors'`). The `MetaMaskConnector` has been dropped in favor of a more generic `injected` connector that can target MetaMask specifically. Similarly, chain definitions moved to Viem’s `viem/chains` repository, streamlining chain management and reflecting a preference for established standards.

- **Migration from “prepare” Hooks:**  
  The old `usePrepareContractWrite` and `usePrepareSendTransaction` hooks have been replaced by new patterns like `useSimulateContract` and `useEstimateGas`. Though this might initially seem like more work, it mirrors how you’d reason about the underlying operations at a protocol level—first simulate the contract call or estimate gas, then execute the write. It encourages a clearer mental model of what’s happening under the hood.

- **ENS Name Normalization and Formatting Control:**  
  WAGMI v2 stops handling ENS normalization and certain formatting (like token units) internally. This puts the choice back in your hands, letting you decide on normalization strategies or number formatting libraries like `dnum`. It reduces bundle size and complexity inside WAGMI, but you now must handle formatting explicitly. On the upside, this gives you more power to implement custom logic, localization, or precision handling as needed.

In essence, WAGMI v2 aims to be a stable core on top of Viem and TanStack Query, with fewer hidden complexities. The team has also indicated that future major releases won’t be as disruptive. This aligns with the idea that WAGMI should serve as a thin, composable layer rather than a heavy framework imposing its own logic.

### Choosing Between WAGMI and Ethers.js

- **If You Prefer More Control:**  
  Ethers.js is your friend. It’s stable, well-documented, and doesn’t force any architectural decisions. You define your providers, your queries, and your caching strategy. It’s a toolkit for developers who know what they’re doing or who want to learn by building things from scratch.

- **If You Value Convenience and Speed (and Use React):**  
  WAGMI, especially in its v2 form, provides a structured approach. You opt into their patterns—multichain support, account management, integrated queries—so you can start shipping features faster. Just be prepared to follow their upgrade paths and integrate with peer dependencies like TanStack Query and Viem.

- **Long-Term Evolution:**  
  With WAGMI v2’s promise to avoid large-scale breaking changes going forward, it’s settling into a more stable ecosystem role, acting as a helpful glue between various libraries. Ethers.js remains a reliable choice, but as the ecosystem evolves, you might find WAGMI’s curated approach more appealing if your app is UI-heavy and you appreciate having standard patterns readily available.

### Conclusion

In practice, many teams mix and match these libraries. They might rely on WAGMI for easy-to-use hooks and rapid prototyping, while still dropping down to Ethers.js (or directly to Viem) when they need fine-grained control or when they’re working outside of React’s context. The decision ultimately hinges on your project’s complexity, your team’s preferred coding style, and how comfortable you are adapting to evolving abstractions and APIs.

Either way, the Ethereum tooling ecosystem is rich, and both WAGMI and Ethers.js are strong contenders. Understanding their differences—and the implications of version changes like WAGMI’s shift in v2—will help you build dApps that are both maintainable and future-proof.