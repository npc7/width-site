---
layout: layouts/page.njk
permalink: /products/kyt/
title: Transaction screening (KYT)
fullTitle: Stablecoin KYT for USDT and USDC deposits and withdrawals | Width DART
description: KYT transaction screening for USDT and USDC. Check where every deposit came from and where every withdrawal is going, traced in time order, with separate inbound and outbound rulesets. Median 0.61 s for a fully traced screening.
breadcrumb:
  - { label: Platform, href: /platform/ }
  - { label: Transaction screening (KYT) }
sections:
  - type: hero
    compact: true
    eyebrow: KYT · Transaction screening
    title: Where did this deposit come from? <em>Where is this withdrawal going?</em>
    lead: Exchanges, payment companies and custodians need every deposit and withdrawal checked before funds are credited or released. DART traces the source or destination of one specific transfer, with a separate ruleset for each direction, and returns a score, a verdict and the evidence behind it.
    ctas:
      - { label: Get access, href: /contact/ }
      - { label: Read the docs, href: /docs/ }
    visual: scores

  - type: problems
    eyebrow: Where deposit and withdrawal screening gets stuck
    title: Three problems we hear most
    items:
      - problem: A deposit may come from frozen or stolen funds
        detail: Once it is credited, any later freeze or recovery can land on you and your user.
        solution: |
          - **Deposits (inbound)**: trace the transfer upstream for sanctioned, issuer-frozen, hacked, scam or mixer funds
          - Only funds that arrived before they moved on count. Paths where money left before it arrived are dropped
          - The risky share sets the score, so you can pass, review or block before crediting
        proof: Median 0.61 s for a fully traced screening, 90% under 5 s, so crediting isn't held up.
      - problem: A user withdraws to a risky address, and you carry the risk
        solution: |
          - **Withdrawals (outbound)**: check the recipient and where its money goes next, for sanctions, terrorist financing or scams
          - Separate KYT-IN and KYT-OUT rulesets, each tuned on its own
          - Or screen both directions in one call and get one merged result
        proof: New orders become built-in rulesets. The FinCEN 9714 order was published on 6 November and DART covered it the same day.
      - problem: One transaction holds several transfers. Which one do you screen?
        detail: Contract calls and batch payouts often move tokens several times in a single transaction.
        solution: |
          - List every token transfer in the transaction, in event order
          - Pick one with `event_index` (or the sender and recipient), and the result covers that transfer only
        proof: Listing transfers isn't counted. Only the transfer you screen is.

  - type: steps
    eyebrow: Where it fits
    title: Check the source before crediting, <em>the destination before paying out</em>
    items:
      - { label: Deposit, title: After confirmation, before crediting, text: "Screen the source with the KYT-IN ruleset. Clean deposits credit automatically. Review and EDD cases go to your team." }
      - { label: Withdrawal, title: After the request, before signing, text: "Screen the recipient and destination with the KYT-OUT ruleset. High-risk withdrawals are stopped." }
      - { label: Verdict, title: Four bands, text: "Default bands: 0–19 pass, 20–49 review, 50–79 EDD, 80–100 block. Thresholds follow your risk appetite." }
      - { label: Record, title: A snapshot every time, text: "The request, the ruleset and the full result are kept as a snapshot for audits and examinations." }

  - type: cards
    eyebrow: What's included
    title: Six things that make KYT work
    columns: 3
    items:
      - { title: Direction-aware, text: "Deposits look upstream, withdrawals look downstream. Rules and weights are set separately for each." }
      - { title: Time-ordered, text: "A hop counts only if funds arrived before they moved on. Paths that fail the timing check are left out." }
      - { title: Higher bars for distant hops, text: "5% / 10% / 15% / 20% of the funds must be risky at hops 2 / 3 / 4 / 5. Direct contact needs no share." }
      - { title: Exchange exemption, text: "A path stops at an ordinary exchange, so other exchanges' users never drag you in. Sanctioned exchanges are never exempt." }
      - { title: Cross-chain, text: "USDC moved through Circle CCTP and USDT moved through USDT0 are followed onto the destination chain." }
      - { title: Batch back-screening, text: "Import historical transactions by CSV and screen them in one go, at launch or after a rule change." }

  - type: faq
    eyebrow: FAQ
    title: Transaction screening questions
    items:
      - q: Why use different rulesets for deposits and withdrawals?
        a: The questions differ. For deposits you ask whether the money came from tainted sources. For withdrawals you ask whether it is going to a risky party. DART ships KYT-IN and KYT-OUT rulesets, and you tune each on its own.
      - q: Will screening slow down crediting or payouts?
        a: A fully traced screening takes 0.61 s at the median, and 90% finish within 5 s. For very active addresses traced deep, use async mode and act when the result is ready.
      - q: A transaction contains several token transfers. Which one is screened?
        a: Call the transfers endpoint to list every token transfer in the transaction, then pick the one to screen with `event_index`. Listing transfers isn't counted.
      - q: Can DART follow money that crossed chains?
        a: Yes. USDC moved through Circle CCTP and USDT moved through USDT0 continue on the destination chain. Other bridges are endpoints, and the node shows which bridge it is.
      - q: We already run a KYT tool. Can we test first?
        a: Yes. Keep your current system running. Send us historical transactions and we return each result and risk path, with every difference from your current tool explained.

  - type: cta
    eyebrow: See it on your own data
    title: Run historical transactions <em>side by side</em>
    text: Keep your current flow. Compare the results and decide for yourself which is more accurate.
    points:
      - A result and risk path for each transaction, with **every difference from your current tool explained**
      - Stablecoins on DART, other assets stay where they are
    ctas:
      - { label: Get access, href: /contact/ }
      - { label: Solutions for exchanges, href: /solutions/exchanges/ }
---
