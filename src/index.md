---
layout: layouts/page.njk
bodyClass: home-v2
title: Stablecoin AML screening for USDT and USDC
fullTitle: Width DART | Stop tainted USDT and USDC, clear everyone else
description: DART screens USDT and USDC in time order. It only counts money that could actually have reached you, so false alarms drop, and every point comes with its evidence. Median 0.61 s for a fully traced screening.
sections:
  - type: ledger
    eyebrow: WIDTH DART · USDT and USDC risk screening
    title: Stop tainted stablecoins. <em>Clear everyone else.</em>
    lead: "DART only counts money that could actually have reached you. Every hop is checked for timing, and paths where money left before it arrived are dropped. Every point ties to a rule and a path, so you can explain any decision to a regulator."
    ctas:
      - { label: Get access, href: /contact/ }
    note: Free until 31 December 2028 · Console, API and MCP included
    stats:
      - { value: "0.61", unit: s, label: "median time for a fully traced screening" }
      - { value: 1.5M+, label: "API calls a week in production, November 2026" }
      - { value: 200M, label: "labeled addresses, covering 428 exchanges" }
      - { value: Same day, label: "FinCEN 9714 order published, ruleset live" }

  - type: story
    id: story
    title: Others ask if it's connected. <em>DART asks if the money actually got there.</em>
    lead: Trace any address a few hops out and you will almost always touch something risky. If connection is all that counts, good addresses get flagged as high risk. DART checks the time and amount of every hop, and only counts money that could actually have reached you.
    old:
      label: The connection approach
      q: Is this address connected to a risky one?
      points:
        - "**Ignores order**: paths where money left before it arrived still count"
        - "**Ignores size**: a trace amount can drag an address into high risk"
        - "**The further you trace, the more you connect**, and the review queue keeps growing"
      result: You get a score that is hard to explain
    new:
      label: The DART approach
      q: Did risky money actually reach this address, and how much?
      points:
        - "**A hop counts only if funds arrived before they left**. Paths that fail the time check are dropped"
        - "**Further hops need a bigger share**: 5% / 10% / 15% / 20% of risky funds by default at hops 2–5"
        - "**Serious risk is never missed**: direct contact with sanctions or terrorist financing above 10 USD is a hit, whatever its share"
      result: Every point maps to a rule and a path you can show an examiner
    tagline: From connection to causation

  - type: showcase
    id: how
    title: Fewer false alarms, <em>without letting risk through</em>
    lead: "Most screening tools give you a number. DART gives you the number, the reason behind it, and the controls to change it."
    items:
      - { tag: Accurate, title: "Only money that could reach you counts", text: "A hop counts only if funds arrived before they moved on. Distant links need a higher share of risky funds. Other exchanges' users never drag you in. When DART and another tool disagree, timing is the most common reason." }
      - { tag: Nothing serious missed, title: "Severe risk always shows up", text: "Direct contact with a sanctioned or terrorist-financing address is a hit from 10 USD up, whatever its share. Sanctioned exchanges are never exempt. Highlighted hits are listed on their own, never diluted by the score. Incomplete data is flagged on the result." }
      - { tag: Explainable, title: "Every decision has its evidence", text: "Every point maps to a rule, a path, a hop, an amount and a share. Excluded paths show why. Each snapshot keeps the parameters and ruleset used, even if you change the rules later." }

  - type: stack
    id: stack
    tone: alt
    title: One dataset, three layers, <em>one AI assistant</em>
    lead: Labels, screening verdicts and fund tracing all run on the same data and the same rules. The AI assistant does the legwork, and your team signs off.
    layers:
      - name: DART Trace
        role: Investigate
        text: Turn dozens of transfers into one money trail. Trace up to 500 transactions in one case, see where funds meet and where they sit now, and keep tracing across USDT0 and CCTP bridges.
        links:
          - { label: Fund tracing, href: /products/investigations/ }
          - { label: Law enforcement, href: /partners/lea/ }
      - name: DART Screen
        role: Decide
        text: Screen addresses, transactions and sanctions. 72 readable rules score hops, time order and share of risky funds from 0 to 100, with four verdicts — pass, review, EDD, block.
        links:
          - { label: Address screening (KYA), href: /products/kya/ }
          - { label: Transaction screening (KYT), href: /products/kyt/ }
          - { label: Sanctions screening, href: /products/sanctions/ }
          - { label: Rulesets and scoring, href: /products/rulesets/ }
      - name: DART Intel
        role: Know
        text: 200 million labeled addresses, over 90% of them exchange addresses, covering 428 exchanges. Our own sanctions database, plus issuer-freeze, hack, scam and mixer labels kept current. Labels from other EVM chains can count too.
        links:
          - { label: Labels and intelligence, href: /products/intelligence/ }
          - { label: Supported chains, href: /chains/ }
          - { label: Sanctions tracker, href: /data/ }
    copilot:
      name: DART Copilot
      role: AI assistant
      text: AI does the legwork. Your team signs off. Call DART over MCP from the AI tools you already use.
      points:
        - Start a screening in one sentence and get every result explained
        - Tune a ruleset and re-score the original task in about a second
        - "**Scores always come from the rules engine, never from a language model**, so the same input gives the same result"
      href: /products/copilot/
      link: Meet DART Copilot

  - type: cases
    eyebrow: In production
    title: Teams already running on DART
    items:
      - icon: wallet
        tag: Wallet
        metric: 70,000+
        metricLabel: screenings a day, within a week of going live
        title: A leading self-custody wallet
        text: Went from its first call to over 70,000 screenings a day in under a week, with hop depth and other settings tuned to its own risk policy.
      - icon: users
        tag: Social · payments
        metric: Next day
        metricLabel: from their question to a live fix
        title: A Web3 social platform
        text: Screens every member transfer as part of a paid membership. When they found one address scoring differently across chains, all-chain labels went live the next day.
      - icon: lock
        tag: Custody · WaaS
        metric: 17,000–18,000
        metricLabel: screenings every working day
        title: A wallet and custody infrastructure provider
        text: Screens every deposit and withdrawal for its enterprise wallets, so its clients get KYA and KYT without buying their own.
    note: Customer names withheld. Figures from DART production data, November 2026.

  - type: table
    id: why
    tone: alt
    eyebrow: Next to your current tools
    title: Already have a KYT provider? <em>Here's what DART adds</em>
    lead: Most teams we work with already run one or more onchain analytics tools. DART is not another copy of them. It is the stablecoin specialist that explains its own answer.
    head: [When you need, DART gives you]
    rows:
      - ["To know why two tools disagree", "Every point traced to a rule, a path, a hop, an amount and a share, so a disagreement becomes a line-by-line comparison"]
      - ["Fewer false alarms, nothing severe missed", "Time-ordered tracing and higher bars for distant links. Direct contact with sanctions or terrorist financing is a hit from 10 USD up"]
      - ["Your own policy, not a vendor's", "72 rules, all readable and editable. A rule change re-scores a stored case in about a second"]
      - ["New sanctions covered fast", "The FinCEN 9714 order was published on 6 November and a ruleset was live the same day. Customer requests often ship the next day"]
      - ["Every chain an address lives on", "An EVM address is the same wallet on every EVM chain. One call checks them all and puts the worst result on top"]
      - ["Results your own systems can use", "Structured JSON with the score, the verdict, the highlights and the full evidence, plus MCP for AI agents"]
    note: DART covers USDT and USDC. Keep your current tools for other assets.

  - type: audiences
    id: who
    eyebrow: Start with your business
    title: Use it where your business takes on risk
    lead: One data layer and one engine, set up for the exact points where your business takes on risk.
    items:
      - label: Exchanges
        title: Screen every deposit and withdrawal, and keep the review queue short
        text: Check where deposits came from and where withdrawals are going. Paths where money left before it arrived are dropped, and other exchanges' users never drag you in.
        points:
          - "**Deposits judged in time order**: only funds that arrived before they moved on count"
          - "**Exchange counterparties exempt by default**, except sanctioned or high-risk exchanges"
          - "**Separate rulesets for deposits and withdrawals**, each tuned on its own"
          - Every result carries its risk path and a snapshot, ready for your regulator
        href: /solutions/exchanges/
        link: Solutions for exchanges
      - label: Wallets
        title: Warn users before they send and after they receive
        text: Wallet users mostly hold USDT and USDC. One accurate warning at the moment of sending or receiving is the most direct protection a wallet can give.
        points:
          - "**Before send**: flag recipients tied to sanctions, terrorist financing or scams"
          - "**After receive**: alert users when incoming funds trace back to frozen, hacked or scam funds"
          - "**Few warnings, all meaningful**, so users still read them"
          - A leading self-custody wallet reached 70,000+ screenings a day within a week
        href: /solutions/wallets/
        link: Solutions for wallets
      - label: Payments & cards
        title: Keep tainted funds out of card schemes and fiat rails
        text: Screen the source of funds before a card top-up, an off-ramp or a merchant payout. When your bank or card scheme asks, every decision has evidence behind it.
        points:
          - "**Screen before funds land**: sanctions, issuer freezes, hacks and scams handled by tier"
          - "**Four verdicts, not block-all**: pass, review, enhanced due diligence, block"
          - "**One ruleset per banking partner** or card scheme"
          - Every screening is kept as a snapshot for reconciliation and audit
        href: /solutions/payments/
        link: Solutions for payments
      - label: Custody & WaaS
        title: KYA and KYT built in for every client you serve
        text: Every business on your platform needs deposit and withdrawal screening. Integrate DART once and your clients don't have to buy their own.
        points:
          - "**Every enterprise wallet screened automatically**, with rules and results kept per client"
          - "**Screen before you sweep**, so tainted funds never reach your main wallet"
          - A wallet and custody infrastructure provider screens 17,000–18,000 transfers every working day
          - Console, API and CSV batch share one account
        href: /solutions/custody/
        link: Solutions for custody
      - label: Law enforcement
        title: Turn dozens of transfers into one fund trail
        text: Put every transaction in a case into one trace, follow the funds across hops and chains, and see where the money sits now.
        points:
          - "**Up to 500 transactions in one case**, with the addresses where they meet and current balances"
          - "**Across chains**: USDT0 and USDC via Circle CCTP continue on the destination chain"
          - "**Case support**: our analysts write tracing reports for priority cases and prepare evidence for freeze requests"
          - Accounts open after agency verification. Every query is logged
        href: /partners/lea/
        link: Partner with us
      - label: Individuals
        title: Check an address before you receive USDT
        text: "The question OTC buyers, merchants and individuals ask most: is this address safe? And if my USDT was frozen, why?"
        points:
          - "**Address check**: paste an address, the chain and token are detected, and you get a three-level answer"
          - "**Freeze check**: has a stablecoin issuer frozen this address, and when"
          - We only report which public sources matched. We never label a person's address
        href: /check/
        link: About the address check

  - type: split
    id: tracing
    eyebrow: Built with investigators
    title: Many transactions, <em>one fund trail</em>
    text: "A scam case rarely comes as one transfer. Victims pay in dozens of transactions, and the money splits, merges and changes chains. We shaped DART's multi-transaction tracing with law enforcement investigators who trace stablecoin cases every day. Put every transaction in a case into one trace and follow them all forward together."
    points:
      - "**Up to 500 transactions in one case**, or start from an address"
      - "**See where the funds meet**: addresses shared across the transactions come to the top"
      - "**See where the money is now**: still at unlabeled addresses (freeze leads), at exchanges, or at sanctioned and frozen addresses, with each address's current balance read from the chain"
      - "**Choose how funds are apportioned**: pro rata, first-in-first-out (FIFO) or last-in-first-out (LIFO)"
      - "**Through bridges and swaps**: USDT0 and Circle CCTP transfers continue on the destination chain, and DEX swaps are resolved inside the transaction instead of spilling into pool noise"
    ctas:
      - { label: Fund tracing & investigations, href: /products/investigations/ }
      - { label: For law enforcement, href: /partners/lea/ }
    visual: multitrace

  - type: posts
    title: Latest articles
    limit: 3

  - type: cta
    eyebrow: See it on your own data
    title: Run it <em>next to your current tools</em>
    text: Nothing to switch off. Send us a batch of historical addresses or transactions (anonymized is fine) and judge the results yourself.
    points:
      - We return a result and risk path for each one, with **every difference from your current tools explained**
      - Stablecoins on DART, other assets stay where they are
      - Free until **31 December 2028**, with engineers on hand in a shared group
    ctas:
      - { label: Get access, href: /contact/ }
      - { label: Read the docs, href: /docs/ }
---
