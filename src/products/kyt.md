---
layout: layouts/page.njk
permalink: /products/kyt/
title: Transaction screening (KYT)
fullTitle: Stablecoin KYT transaction screening for deposits & withdrawals | Width DART
description: KYT transaction screening for USDT and USDC. Check where every deposit came from and where every withdrawal is going, traced in time order, with separate inbound and outbound rulesets.
breadcrumb:
  - { label: Platform, href: /platform/ }
  - { label: Transaction screening (KYT) }
sections:
  - type: hero
    compact: true
    eyebrow: KYT · Transaction screening
    title: Where Did This Deposit Come from, <em>and Where Is This Withdrawal Going?</em>
    lead: Exchanges, payment companies and custodians need every deposit and withdrawal checked before funds are credited or released. DART traces the source and destination of one specific transfer, with separate rulesets for each direction, and returns a score, a verdict and the evidence behind it.
    ctas:
      - { label: Get Free Access, href: /contact/ }
      - { label: Read the Docs, href: "https://width.info/docs" }
    note: Free until 31 December 2028
    visual: scores

  - type: problems
    eyebrow: What KYT has to get right
    title: Where Deposit and Withdrawal Screening Breaks Down
    items:
      - problem: A Deposit May Carry Frozen or Stolen Funds
        detail: Once it is credited, a freeze or a recovery claim can land on you and your user.
        solution: |
          - **Deposits (inbound)**: trace the transfer upstream for sanctioned, issuer-frozen, hacked, scam or mixer funds
          - Only funds that arrived before they moved on are counted; backwards paths are dropped
          - Scored by share of risky funds, so you can credit, review or hold before the money lands
        proof: 300,000–400,000 API calls a day in production, across exchanges, wallets, custodians and card programs.
      - problem: A User Withdraws to a Risky Address and You Carry the Risk
        solution: |
          - **Withdrawals (outbound)**: check the destination and what lies downstream: sanctions, terrorist financing, scams
          - KYT-IN and KYT-OUT rulesets are separate, so each direction gets its own policy
          - Or screen both sides in one call and get a merged result
        proof: "New official actions ship as built-in rulesets: FinCEN's 9714 order was published on 6 November and the DART ruleset went live the same day."
      - problem: One Transaction, Many Transfers
        detail: Contract calls and batch payouts often move tokens several times in a single transaction.
        solution: |
          - List every token transfer in the transaction, in event order
          - Pick the one you care about with `event_index` (or by sender / recipient) and screen just that
        proof: Listing transfers is free. Only the transfer you screen is charged.

  - type: steps
    eyebrow: Where it fits
    title: Where KYT Sits in Your Flow
    items:
      - { label: Deposit, title: After confirmation, before crediting, text: "Screen the source with KYT-IN. Clean deposits credit automatically; review and EDD cases go to a queue." }
      - { label: Withdrawal, title: After request, before signing, text: Screen the destination with KYT-OUT and stop high-risk transfers before funds leave. }
      - { label: Triage, title: Four Verdicts, text: "0–19 pass, 20–49 review, 50–79 EDD, 80–100 block. Tune the bands to your risk appetite." }
      - { label: Evidence, title: Snapshot Saved, text: Every screening's parameters and full result are stored as an immutable snapshot for audit. }

  - type: cards
    eyebrow: Capabilities
    title: What Comes with Every Screening
    columns: 3
    items:
      - { title: Direction-Aware, text: "Deposits look upstream, withdrawals look downstream, each with its own rules and weights." }
      - { title: Time Order, text: "A hop counts only if funds arrived before they left. Fewer false alarms." }
      - { title: Materiality Thresholds, text: "Further hops need a bigger share: 5% / 10% / 15% / 20% at hops 2 / 3 / 4 / 5 by default." }
      - { title: Exchange Exemption, text: "Paths stop at other exchanges, so their customers' history isn't pinned on yours. Can be switched off." }
      - { title: Cross-Chain, text: USDC moved through Circle CCTP is followed onto the destination chain. }
      - { title: Batch Rescans, text: "Upload past transactions by CSV and re-screen them in one go, at launch or after a rule change." }

  - type: faq
    eyebrow: FAQ
    title: Transaction Screening Questions
    items:
      - q: Why use different rulesets for deposits and withdrawals?
        a: They answer different questions. For a deposit you want to know whether the money is tainted; for a withdrawal, whether it is going somewhere it shouldn't. DART ships built-in KYT-IN and KYT-OUT rulesets that you can tune separately.
      - q: Will screening slow down deposits and payouts?
        a: Sanctions checks return in under a second and most screenings finish within a minute. For very active addresses traced deep, use async mode and act when the result is ready.
      - q: What if a transaction contains several token transfers?
        a: Call the transfer list endpoint to see every token transfer in the transaction, then pass the `event_index` of the one to screen. Listing transfers is not charged.
      - q: Can DART follow funds across chains?
        a: Yes for USDC moved through Circle CCTP. The path continues on the destination chain.
      - q: We already run a KYT tool. Can we test DART first?
        a: Yes. Keep your current tool running and send us a batch of past transactions. We return a result and risk path for each, with a diff against your current tool. DART is free until 31 December 2028.

  - type: cta
    eyebrow: Free access
    title: Run Your Past Transactions <em>Side by Side</em>
    text: No change to your current flow. Compare the results and judge for yourself.
    points:
      - A result and risk path for every transaction, with a **diff against your current tool**
      - Free until **31 December 2028**
    ctas:
      - { label: Get Free Access, href: /contact/ }
      - { label: Solutions for Exchanges, href: /solutions/exchanges/ }
---
