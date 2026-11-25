---
layout: layouts/page.njk
permalink: /solutions/wallets/
title: Wallet address risk warnings for USDT and USDC
description: Warn wallet users before they send and after they receive USDT or USDC. Screen recipients and incoming funds for sanctions, terrorist financing and frozen or hacked funds.
breadcrumb:
  - { label: Solutions, href: /solutions/ }
  - { label: Wallets }
sections:
  - type: hero
    compact: true
    eyebrow: Solutions · Wallets
    title: A Warning Before They Send, <em>a Heads-Up After They Receive</em>
    lead: Wallet users mostly hold and move USDT and USDC. One accurate warning at the moment of sending or receiving is the most direct protection a wallet can offer. DART judges risk in time order, so warnings are fast and right, and don't scare off ordinary users.
    ctas:
      - { label: Get Free Access, href: "/contact/?type=wallet" }
      - { label: Read the Docs, href: "https://width.info/docs" }
    note: Free until 31 December 2028
    visual: flow

  - type: problems
    eyebrow: Wallet challenges
    title: What Wallet Users Run Into
    items:
      - problem: Users Send Funds Where They Shouldn't
        detail: A transfer can't be pulled back. If the recipient is tied to sanctions or terrorist financing, the user can get caught up too.
        solution: |
          - **Check the recipient before sending**: when it matches sanctions, terrorist financing or scam sources, show it on the confirm screen
          - Sanctions checks return in **under a second**, so sending isn't slowed down
        proof: A Web3 social platform built send and receive checks into a paid membership, so users avoid paying terrorist-financing addresses and the CFT risk that comes with it.
      - problem: Users Receive Bad Funds and Get Frozen Too
        detail: If incoming USDT came from issuer-frozen, hacked or scam funds, the freeze can land on the user, and the complaint lands on the wallet.
        solution: |
          - **Check the source after receiving**: trace upstream in time order. Only money that arrived before it left counts
          - Alert the user when funds trace back to issuer freezes, hacks or scams
        proof: Stablecoin issuer-freeze labels are already in production.
      - problem: So Many Warnings That Users Stop Reading Them
        detail: Warn on every transfer and users learn to click past it. Too many false alarms and they leave.
        solution: |
          - Paths that run backwards in time are dropped, and small shares of risky funds don't count
          - Exchange counterparties are exempt by default, so ordinary transfers to and from exchanges aren't flagged
          - Four result levels, so the wallet can interrupt only on the top ones
        proof: In one payment company's test, an address another tool rated "medium-low risk, needs review" scored 0 on DART. The risky funds could not have reached it in time.

  - type: steps
    tone: alt
    eyebrow: Where DART sits
    title: Two Moments, One Clear Message
    items:
      - { label: Before send, title: User Enters a Recipient, text: Call address screening before the confirm screen. }
      - { label: Warn, title: Warn by Level, text: Pass stays silent. Higher levels show which public source matched; the user decides. }
      - { label: After receive, title: New Funds Arrive, text: Screen the incoming transfer inbound to check where it came from. }
      - { label: Alert, title: Flag a Bad Source, text: Notify the user when funds trace to frozen, hacked or scam money, before a freeze spreads. }

  - type: cases
    eyebrow: Customers
    title: Wallets Already on DART
    columns: 3
    items:
      - tag: Wallet
        metric: 70,000+
        metricLabel: Screenings a day, within a week
        title: A Top-Tier Self-Custody Wallet
        text: From first calls to 70,000+ screenings a day in one week. On the day FinCEN's 9714 order was published, it could identify related funds in deposits and withdrawals. Hops and other parameters are configured to its own risk policy.
      - tag: Social · Payments
        metric: Paid tier
        metricLabel: Safety that earns revenue
        title: A Web3 Social Platform
        text: Bundles DART into a paid membership. Every receipt and withdrawal is fully checked, counterparty risk is flagged, and users avoid paying terrorist-financing addresses.
      - tag: Wallet
        title: A Self-Custody Wallet
        text: Screens deposits and withdrawals automatically, with rulesets tuned to its own risk appetite.
    note: Customer names withheld for confidentiality. Figures from DART production data, November 2026.

  - type: faq
    eyebrow: FAQ
    title: Questions Wallets Ask
    items:
      - q: Will a pre-send check make users wait?
        a: Sanctions checks return in under a second, and sync address screening returns the result directly. For very active addresses with deep traces, use async mode so the send flow isn't blocked.
      - q: How should we word the warning?
        a: We recommend naming only the public source that matched, such as an official sanctions list or an issuer freeze, without calling a personal address a "scam" or "money laundering". Let the user decide whether to continue.
      - q: A self-custody wallet doesn't hold user funds. Why screen?
        a: Screening protects your users. It keeps them from paying sanctioned or terrorist-financing addresses and tells them early when they receive bad funds. Some wallets also offer it as a paid safety feature.
      - q: What if an address holds funds on several chains?
        a: Use the all-chain endpoint. DART detects every chain and token with activity, screens them in one call, returns a result per chain and puts the worst one on top.
      - q: Can it handle our volume?
        a: DART handles 300,000–400,000 API calls a day in production. One top-tier self-custody wallet reached 70,000+ a day within a week of going live. We size capacity with you before launch.

  - type: cta
    eyebrow: Free access
    title: Run It <em>Next to Your Current Tools</em>
    text: Keep your existing security scanner. Send us a batch of historical addresses (anonymized is fine) and we explain every difference.
    points:
      - A result for every address, with the path behind it and a **diff against your current tools**
      - Stablecoins on DART, everything else stays where it is
      - Free until **31 December 2028**
    ctas:
      - { label: Get Free Access, href: "/contact/?type=wallet" }
      - { label: Book a Demo, href: "/contact/?type=wallet" }
---
