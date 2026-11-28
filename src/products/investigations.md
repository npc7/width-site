---
layout: layouts/page.njk
permalink: /products/investigations/
title: Fund tracing & investigations
fullTitle: Onchain fund tracing for USDT & USDC investigations | Width DART
description: Trace USDT and USDC hop by hop from any address or transaction, with labeled counterparties, time-ordered paths and USDC cross-chain tracing via CCTP. Built for compliance investigators and law enforcement.
breadcrumb:
  - { label: Platform, href: /platform/ }
  - { label: Fund tracing & investigations }
sections:
  - type: hero
    compact: true
    eyebrow: Investigations · Fund tracing
    title: Where the money came from and where it went, <em>on one graph</em>
    lead: A suspicious deposit to review, stolen funds to chase, a case report to write. Start from an address, a transaction, or every transaction in a case at once, and DART expands the flow upstream and downstream, labels every counterparty, drops paths that can't hold up in time, and follows funds across chains.
    ctas:
      - { label: Book a demo, href: /contact/ }
      - { label: For law enforcement, href: /partners/lea/ }
    visual: flow

  - type: problems
    eyebrow: What investigators need
    title: Where tracing time actually goes
    items:
      - problem: A few hops out, the graph turns into a hairball
        detail: Busy addresses have hundreds of counterparties at every hop. Nobody can read that by hand.
        solution: |
          - Keep only paths that **hold up in time**: funds arrive before they move on
          - Set a minimum amount and a node limit per hop to see the main flow first
          - Paths stop at exchanges and other known entities instead of expanding into noise
        proof: In one large exchange-hack trace, resolving DEX swaps inside the transaction cut 1,003 paths to 10.
      - problem: One case, dozens of transactions
        detail: Victims pay in many transfers, and the money splits, merges and moves on. Tracing each one by hand and lining them up takes days.
        solution: |
          - Put **up to 500 transactions** into one case and trace them all forward together
          - Addresses where the transactions **meet** come to the top
          - See where the money **is now**, with each address's current balance read from the chain: unlabeled addresses are freeze leads, exchanges get freeze requests
          - Choose how funds are apportioned at each address: pro rata, first-in-first-out or last-in-first-out
          - DEX swaps are resolved inside the transaction, and lending, yield and bridge pools are endpoints, so the graph stays readable
        proof: Shaped with law enforcement investigators who use it on live stablecoin cases.
      - problem: You don't know who the counterparties are
        solution: |
          - 200 million labeled addresses, including the wallets of 428 exchanges, plus sanctions, issuer-freeze, hack, scam and mixer labels
          - Every node on the graph shows its label and risk level
        proof: Labels are verified and updated continuously by our intelligence team.
      - problem: The trail goes cold when funds change chains
        solution: |
          - USDC moved through **Circle CCTP** and USDT moved through **USDT0** are followed onto the destination chain
          - An address is checked on every chain and token where it has activity
        proof: In a production test, an 807,030 USDC transfer from Ethereum to Arbitrum through CCTP was matched to its destination.

  - type: steps
    tone: alt
    eyebrow: How it works
    title: From one lead to a case file
    items:
      - { label: Start, title: Enter an address or transactions, text: "A victim's address, a suspicious deposit or a reported address. Chain and token are detected automatically." }
      - { label: Expand, title: Trace upstream and downstream, text: "See where funds came from and where they went, with hop depth set for the case." }
      - { label: Assess, title: Let labels and shares decide, text: "Each path shows hops, amounts, timestamps and the share of risky funds, so the real money trail stands out." }
      - { label: Record, title: Snapshots and reports, text: "Every query is saved as a snapshot. For priority cases our analysts write the tracing report." }

  - type: cards
    eyebrow: Who it's for
    title: Two kinds of investigation
    columns: 2
    items:
      - tag: Compliance teams
        title: Reviewing flagged transactions
        text: When a screening lands in review or EDD, open the fund graph, see the whole story behind the transfer, then release it or escalate.
        points:
          - Hit paths link straight from the screening result
          - The basis for each decision is kept with the snapshot
      - tag: Law enforcement
        title: Case tracing and evidence
        text: Follow funds from a victim or suspect address and get evidence packs when working with exchanges and issuers on freezes. Investigator accounts open after identity verification.
        points:
          - Priority cases get a tracing report from our analysts
          - Every query is logged
        href: /partners/lea/
        link: Law Enforcement Partnership

  - type: faq
    eyebrow: FAQ
    title: Fund tracing questions
    items:
      - q: How many hops can DART trace?
        a: Hop depth is configurable. For daily screening we suggest 3 inbound and 1 outbound; investigations can go deeper, with a minimum amount and a per-hop node limit to keep the graph readable.
      - q: Why were some paths excluded?
        a: DART requires funds to arrive at each hop before they move on. A path where money left before it arrived means the money could not have come from that source, so it is excluded, and the result says so.
      - q: Can I trace several transactions at once?
        a: Yes. Add up to 500 transaction hashes to one case. DART traces them together, shows the addresses where they meet, and reads each address's current balance from the chain.
      - q: How are funds apportioned when an address mixes money from several sources?
        a: Pro rata by default. You can switch to first in first out or last in first out, and DART reads the address's ledger in order. Where a ledger cannot be read in full, that address falls back to pro rata and is marked on the graph.
      - q: Does DART trace across chains?
        a: Yes for USDC moved through Circle CCTP and USDT moved through USDT0. The path continues on the destination chain.
      - q: How can a law enforcement agency get access?
        a: Apply through the law enforcement partnership page. We verify the agency before opening investigator accounts and agree the terms of cooperation directly.
      - q: Are queries recorded?
        a: Yes. Every query is saved as a snapshot with its parameters and full result, available at any time.

  - type: cta
    eyebrow: Book a demo
    title: Bring a real lead. <em>We'll trace it with you.</em>
    text: Compliance teams and law enforcement agencies can book a live session, and we expand the fund graph on your own case.
    points:
      - "Compliance teams: run it on your own past cases first"
      - "Law enforcement: access after agency verification, terms agreed directly"
    ctas:
      - { label: Book a demo, href: /contact/ }
      - { label: For law enforcement, href: /partners/lea/ }
---
