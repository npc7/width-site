---
layout: layouts/page.njk
permalink: /chains/
title: Supported chains and stablecoins
fullTitle: "Supported chains and stablecoins: USDT, USDC on Tron and EVM chains | Width DART"
description: "The chains and stablecoins DART screens today, from Tron to Ethereum, BSC, Arbitrum, Base and more. Paste one address and DART screens every chain where it has activity, and follows USDT0 and Circle CCTP transfers across chains."
breadcrumb:
  - { label: Platform, href: /platform/ }
  - { label: Supported chains }
sections:
  - type: hero
    compact: true
    eyebrow: Supported chains
    title: Paste one address. <em>Screen every chain it uses.</em>
    lead: DART screens stablecoins on Tron and EVM chains. Paste an address and DART finds every chain and token where it has activity. Then it screens them all in one call.
    ctas:
      - { label: Get access, href: /contact/ }
      - { label: Address screening (KYA), href: /products/kya/ }

  - type: table
    eyebrow: Coverage
    title: Chains and stablecoins <em>you can screen</em>
    head: [Chain, Stablecoins, Address type]
    rows:
      - [Tron, USDT, "Tron (T…)"]
      - [Ethereum, "USDT, USDC", "EVM (0x…)"]
      - [BSC, "USDT, USDC", "EVM (0x…)"]
      - [Arbitrum, "USDT, USDC", "EVM (0x…)"]
      - [Polygon, "USDT, USDC", "EVM (0x…)"]
      - [Hyperliquid, "USDT, USDC", "EVM (0x…)"]
      - [Morph, "USDT, USDC", "EVM (0x…)"]
      - [Base, USDC, "EVM (0x…)"]
      - [Arc, USDC, "EVM (0x…)"]
      - [Plasma, USDT, "EVM (0x…)"]
      - [Robinhood, USDG, "EVM (0x…)"]
    note: "As of 28 November 2026. The live list comes from `GET /api/v3/chains`; new chains appear there as soon as they are added."

  - type: cards
    tone: alt
    eyebrow: Many chains, one wallet
    title: One address, <em>no chain left unchecked</em>
    columns: 3
    items:
      - tag: Multi-chain KYA
        title: One call, every chain
        text: "`POST /api/v3/screen/kya/multi` finds every chain and token where the address has activity and screens each one."
        points:
          - The worst result goes on top
          - Each chain and token gets its own snapshot
        href: /products/kya/
        link: Address screening
      - tag: all_chain_labels
        title: Labels from other EVM chains count
        text: "The same 0x address is one wallet on every EVM chain, but funds and labels are stored per chain. Turn on `all_chain_labels` and labels from other EVM chains count too."
        points:
          - About 226,000 Arbitrum addresses carry no label on Arbitrum but are high-risk on another chain
          - Labels brought in from other chains show which chain they came from
        href: /zh/docs/cross-chain/
        link: Cross-chain guide
      - tag: Tracing
        title: Across bridges and swaps
        text: "Fund tracing follows the money onto the destination chain for USDT0 and for USDC through Circle CCTP."
        points:
          - CCTP covers Ethereum, Arbitrum, Base, Polygon and Arc
          - DEX swaps are resolved inside the transaction
        href: /products/investigations/
        link: Fund tracing

  - type: split
    eyebrow: Not covered
    title: Keep your current tools <em>for other assets</em>
    text: DART covers stablecoins only. BTC, Solana and other non-stablecoin assets aren't supported. Keep your current tools for those, and run DART next to them for USDT and USDC.
    points:
      - Read the live chain list with `GET /api/v3/chains` before you build a chain picker
      - Use the address type in the response to validate input
    ctas:
      - { label: Developers & API, href: /developers/, style: ghost }

  - type: faq
    eyebrow: FAQ
    title: Chain coverage questions
    items:
      - q: How do I get the current chain list?
        a: Call `GET /api/v3/chains`. It returns each chain, its tokens, the default token and the address type (`evm` or `tron`). The console's chain picker reads the same list, so new chains appear without a code change.
      - q: Do I need to know which chain an address uses?
        a: No. Paste the address and multi-chain KYA finds every chain and token where it has activity, then screens them all.
      - q: Why turn on all_chain_labels for EVM addresses?
        a: Labels are stored per chain. An address flagged on one EVM chain may carry no label on another. With `all_chain_labels` on, labels from other EVM chains count in the result.
      - q: Does DART cover BTC or Solana?
        a: No. DART covers stablecoins on the chains listed above. Keep your current tools for BTC, Solana and other assets.

  - type: cta
    eyebrow: For chain and stablecoin teams
    title: Plan screening support <em>for day one</em>
    text: If you're launching a stablecoin chain or a new stablecoin, talk to us about screening support from launch day. We'll walk through what your exchanges, wallets and payment partners will need.
    ctas:
      - { label: Talk to us, href: /contact/ }
      - { label: Cross-chain guide, href: /zh/docs/cross-chain/ }
---
