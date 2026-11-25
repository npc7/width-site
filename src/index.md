---
layout: layouts/page.njk
bodyClass: home-v2
title: Stablecoin AML screening for USDT and USDC
fullTitle: Width DART | Stablecoin AML screening, KYT and address risk for USDT & USDC
description: DART screens USDT and USDC flows in time order, so exchanges, wallets and payment companies keep tainted funds out without false alarms. Sanctions checks in under a second. Free until 31 December 2028.
sections:
  - type: ledger
    eyebrow: WIDTH DART · Stablecoin risk screening
    title: Stablecoin Risk Screening <em>That Actually Works</em>
    lead: "Funds are traced hop by hop in time order, so false alarms drop. Every point ties back to a rule and a path, so anyone on your team can read the result. Go live with one API call, edit the rules yourself, and re-score a case in about a second. Built for USDT and USDC."
    ctas:
      - { label: Get Free Access, href: /contact/ }
    note: Free until 31 December 2028 · Console, API and MCP included
    stats:
      - { value: 1.5M+, label: "API calls a week in production, November 2026" }
      - { value: "0.61", unit: s, label: "median time for a fully traced screening" }
      - { value: 200M, label: "labeled addresses, with sanctions, freeze and hack labels kept current" }
      - { value: Same day, label: "FinCEN 9714 order published, ruleset live" }

  - type: showcase
    id: how
    title: Accurate, Easy to Read, <em>Yours to Tune</em>
    lead: "Most screening tools give you a number. DART gives you the number, the reason behind it, and the controls to change it."
    items:
      - { tag: Accurate, title: "Only Money That Arrived First Counts", text: "Every hop is checked for timing, and paths that run backwards in time are dropped. Distant links need a higher share of risky funds before they count. When results differ from another tool, timing is the most common reason." }
      - { tag: Easy to read, title: "A Score and the Highlights, Side by Side", text: "Read the 0–100 score and the highlighted hits together. Every point maps to a rule, a path, a hop, an amount and a share, saved as an immutable snapshot." }
      - { tag: Yours to tune, title: "Change a Rule, See the New Result in a Second", text: "Copy a ruleset, set your own thresholds, and re-judge the original case without tracing again. The before and after sit side by side." }

  - type: split
    id: tracing
    tone: alt
    eyebrow: Built with investigators
    title: Many Transactions, <em>One Money Trail</em>
    text: "A scam case rarely comes as one transfer. Victims pay in dozens of transactions, and the money splits, merges and changes chains. Shaped with law enforcement investigators who trace stablecoin cases every day, DART puts every transaction into a single case and follows them all forward together."
    points:
      - "**Up to 500 transactions in one case**, or start from an address. USDT and USDC on Tron and Ethereum"
      - "**See where the funds meet**: addresses shared across the transactions come to the top"
      - "**See where the money is now**: still at unlabeled addresses (freeze leads), at exchanges, or at sanctioned and frozen addresses, with each address's current balance read from the chain"
      - "**Choose how funds are apportioned**: pro rata, first in first out, or last in first out"
      - "**Through bridges and swaps**: USDT0 and Circle CCTP transfers continue on the destination chain, and DEX swaps are resolved inside the transaction instead of spilling into pool noise"
    ctas:
      - { label: Fund Tracing & Investigations, href: /products/investigations/ }
      - { label: For Law Enforcement, href: /partners/lea/ }
    visual: multitrace

  - type: cases
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

  - type: table
    id: why
    tone: alt
    eyebrow: Next to your current tools
    title: Already Have a KYT Provider? <em>Here's What DART Adds</em>
    lead: Most teams we work with already run one or more onchain analytics tools. DART is built to sit next to them, not to copy them.
    head: [When you need, DART gives you]
    rows:
      - ["To know why two tools disagree", "Every point traced to a rule, a path, a hop, an amount and a share, so a disagreement becomes a line-by-line comparison"]
      - ["Fewer false alarms on stablecoin flows", "Time-ordered tracing and higher bars for distant links, both on by default"]
      - ["Your own policy, not a vendor's", "Both rulesets are readable and editable. A rule change re-scores a stored case in about a second"]
      - ["New government actions covered fast", "The FinCEN 9714 order was published on 6 November. A ruleset was live the same day"]
      - ["Results your own systems can use", "Structured JSON with the score, the verdict, the highlights and the full evidence, plus MCP for AI agents"]
      - ["Deep stablecoin investigations", "Many transactions traced together in one case, with current balances and freeze leads"]
      - ["To try it without a budget line", "Free until **31 December 2028**"]
    note: DART covers USDT and USDC. Keep your current tools for other assets.

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
        text: Put every transaction in a case into one trace, follow the funds across hops and chains, and see where the money sits now.
        points:
          - "**Many transactions, one case**: up to 500 traced together, with the addresses where they meet and current balances"
          - "**Across chains**: USDT0 and USDC via Circle CCTP continue on the destination chain"
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

  - type: posts
    title: Latest Articles
    limit: 3

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
