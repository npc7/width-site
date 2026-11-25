---
layout: layouts/page.njk
bodyClass: home-v2
title: Stablecoin AML screening for USDT and USDC
fullTitle: Width DART | Stablecoin AML screening, KYT and address risk for USDT & USDC
description: DART screens USDT and USDC flows in time order, so exchanges, wallets and payment companies keep tainted funds out without false alarms. Sanctions checks in under a second. Free until 31 December 2028.
sections:
  - type: ledger
    eyebrow: WIDTH DART · Stablecoin risk screening
    title: Know Where the Money Came from <em>Before You Accept It</em>
    lead: "DART screens USDT and USDC flows hop by hop, in time order. Bad funds stay out, and good customers get through."
    ctas:
      - { label: Get Free Access, href: /contact/ }
    note: Free until 31 December 2028 · Console, API and MCP included
    stats:
      - { value: 300K+, label: API calls a day in production }
      - { value: "< 1", unit: s, label: sanctions screening response }
      - { value: 200M, label: "labeled addresses, with sanctions, freeze and hack labels kept current" }
      - { value: Same day, label: "FinCEN 9714 order published, ruleset live" }

  - type: showcase
    id: how
    title: Every Point <em>Has a Reason</em>
    lead: "The path-matching ruleset decides what counts as a violation. The scoring ruleset decides how serious it is and what to do. You can change both."
    items:
      - { tag: Time Order, title: "Count Only Funds That Arrived First", text: "Every hop is checked for timing. Paths that run backwards in time are dropped, so false alarms fall at the source." }
      - { tag: Share of Funds, title: "The Further Away, the Higher the Bar", text: "By default risky funds must reach 5% / 10% / 15% / 20% of the total at hops 2 / 3 / 4 / 5 before they count." }
      - { tag: Evidence, title: "When the Regulator Asks Why, Show Them", text: "Every point maps to a rule, with the path, hop, amount and share listed, and saved as an immutable snapshot." }

  - type: cases
    tone: alt
    eyebrow: In production
    title: Teams Already Running on DART
    items:
      - icon: wallet
        tag: Wallet
        metric: 70,000+
        metricLabel: screenings a day, within a week of going live
        title: A Leading Self-Custody Wallet
        text: On the day the FinCEN 9714 order was published, it could flag related funds in deposits and withdrawals. Hop depth and other settings are tuned to its own risk policy.
      - icon: users
        tag: Social · payments
        metric: Paid tier
        metricLabel: safety turned into revenue
        title: A Web3 Social Platform
        text: Bundled DART into its paid membership. Every incoming and outgoing transfer is fully checked, so members don't send USDT to terrorist-financing addresses.
      - icon: lock
        tag: Custody · WaaS
        metric: 17–18K
        metricLabel: screenings every working day
        title: A Wallet and Custody Infrastructure Provider
        text: Screens every deposit and withdrawal for its enterprise wallets. Its clients get KYA and KYT out of the box instead of buying their own.
    note: Customer names withheld for confidentiality. Figures from DART production data, November 2026.

  - type: audiences
    id: who
    eyebrow: Start with your business
    title: What Kind of Team Are You? Here's the Problem We Solve for You
    lead: One data layer and one engine, set up for the exact points where your business takes on risk.
    items:
      - label: Exchanges
        title: Screen Every Deposit and Withdrawal, Without False Alarms
        text: Check where deposits came from and where withdrawals are going. Paths that can't have happened in time are dropped, so your compliance team only works the cases that matter.
        points:
          - "**Deposits judged in time order**: only funds that arrived before they moved on are counted"
          - "**Exchange counterparties are exempt by default**, so another exchange's users never drag you in"
          - "**New rules the same day**: the FinCEN 9714 order was published on 6 November, and a built-in ruleset was live that same day"
          - Every result carries its risk path and an immutable snapshot, ready for your regulator
        href: /solutions/exchanges/
        link: Solutions for Exchanges
      - label: Wallets
        title: Warn Users Before They Send, and After They Receive
        text: Wallet users mostly hold and move USDT and USDC. One accurate warning at the moment of sending or receiving is the most direct protection a wallet can give.
        points:
          - "**Before send**: flag recipients tied to sanctions, terrorist financing or scams"
          - "**After receive**: alert users when incoming funds trace back to frozen, hacked or scam funds, before their own balance gets caught in a freeze"
          - "**Safety that pays for itself**: one platform bundles DART into a paid membership"
          - A leading self-custody wallet went from first calls to 70,000+ screenings a day within a week
        href: /solutions/wallets/
        link: Solutions for Wallets
      - label: Payments & Cards
        title: Keep Tainted Funds Out of Card Schemes and Fiat Rails
        text: Screen the source of funds before a card top-up, an off-ramp or a merchant payout. When your bank or card scheme asks, every decision has evidence behind it.
        points:
          - "**Screen before funds land**: sanctions, issuer freezes, hacks and scams are tiered, not lumped together"
          - "**Four dispositions, not block-all**: pass, review, enhanced due diligence, block, with thresholds you set"
          - "**Rulesets per banking partner** or card scheme requirement"
          - Every screening is saved as an immutable snapshot for reconciliation and audit
        href: /solutions/payments/
        link: Solutions for Payments
      - label: Custody & WaaS
        title: KYA and KYT, Built In for Every Client You Serve
        text: Every business on your platform needs deposit and withdrawal screening. Integrate DART once and your clients don't have to buy their own.
        points:
          - "**Automatic screening for every enterprise wallet**, with results kept per client"
          - "**MPC sweep setups** come with a ready integration guide"
          - A wallet and custody infrastructure provider screens 17,000–18,000 transfers every working day
          - Console, API and CSV batch share one account
        href: /solutions/custody/
        link: Solutions for Custody
      - label: Law Enforcement
        title: Turn Scattered Transfers Into One Complete Money Trail
        text: Start from a single address, follow the funds across hops and chains, and export tracing reports you can use in a case.
        points:
          - "**Fund tracing**: hop-by-hop upstream and downstream, with cross-chain USDC tracing via CCTP"
          - "**Case support**: our analysts write tracing reports for priority cases and prepare evidence packs for freeze requests"
          - "**Hands-on training** in onchain tracing for investigators"
          - Accounts opened after identity verification; every query is logged
        href: /partners/lea/
        link: Partner with Us
      - label: Individuals
        title: Check an Address Before You Receive USDT
        text: "The question OTC buyers, merchants and individuals ask most: is this address safe? And if my USDT was frozen, why?"
        points:
          - "**Address check**: paste an address, the chain and token are detected, you get a three-level answer"
          - "**Freeze check**: has this address been frozen by a stablecoin issuer, and when"
          - We only report which public sources matched. We never label a person's address
        href: /check/
        link: About the Address Check

  - type: news
    title: News & Highlights
    lead: "The latest from DART: announcements, product updates and industry notes."
    placeholder: true
    items:
      - { tag: News, title: News Headline Placeholder One, text: One-line summary placeholder. Replace before launch. }
      - { tag: Product Update, title: News Headline Placeholder Two, text: One-line summary placeholder. Replace before launch. }
      - { tag: Highlight, title: News Headline Placeholder Three, text: One-line summary placeholder. Replace before launch. }

  - type: cta
    eyebrow: Free access
    title: Run It <em>Next to Your Current Tools</em>
    text: Nothing to switch off. Send us a batch of historical addresses (anonymized is fine) and judge the results yourself.
    points:
      - We return a result and risk path for every address, with a **diff against your current tools**
      - Stablecoins on DART, other assets stay where they are
      - Free until **31 December 2028**, with engineers on hand in a shared group
    ctas:
      - { label: Get Free Access, href: /contact/ }
      - { label: Read the Docs, href: "https://width.info/docs" }
---
