---
layout: layouts/page.njk
permalink: /check/
title: "Address check: look before you receive USDT"
description: Before you receive USDT, paste the address to see whether it matches a sanctions list or has been frozen by a stablecoin issuer. The DART address check is coming soon, free for individuals.
breadcrumb:
  - { label: Address check }
sections:
  - type: hero
    compact: true
    eyebrow: DART address check · Coming soon
    title: Check the Address <em>Before You Receive USDT</em>
    lead: The question OTC buyers, merchants and individuals ask most is whether an address is safe, and if their USDT was frozen, why. The DART address check brings the screening businesses use to anyone who needs it.
    ctas:
      - { label: "Tell Me When It's Live", href: /contact/ }
      - { label: "Funds Frozen or Stolen?", href: /partners/lea/, style: ghost }
    note: Free for individuals. Sign in with Google.

  - type: cards
    eyebrow: What you can check
    title: The Three Questions People Ask Most
    columns: 3
    items:
      - tag: Address check
        title: Is This Address Safe?
        text: "Paste an address and the chain and token are detected for you. You get one of three answers (no risk found, be careful, high risk) and the types of public source that matched."
      - tag: Freeze check
        title: Why Was My USDT Frozen?
        text: See whether an address has been frozen by a stablecoin issuer, when, and the onchain transaction behind it, with guidance on appeals and reporting.
      - tag: Pre-send check
        title: Warn Me Before I Send
        text: Automatic recipient checks inside wallets, a Telegram bot and a browser extension.
        points: [Rolling out over time]

  - type: split
    tone: alt
    wide: true
    eyebrow: Our principles
    title: We Name Sources, <em>Not People</em>
    text: Behind every address is a real person. Results only tell you which public sources matched, such as an official sanctions list or an issuer freeze. We never label anyone's address as a scam or money laundering.
    points:
      - Results show a level and the matched source types, never third-party addresses in full or complete fund paths
      - Sign-in and a daily limit keep the tool from being abused
      - Think we got it wrong? Submit an appeal and our labeling team will respond within a set time

  - type: cta
    title: Dealing with Something Bigger?
    text: If your funds were stolen or you were scammed and need the full money trail, that goes through law enforcement. Businesses can integrate DART directly.
    ctas:
      - { label: Law Enforcement, href: /partners/lea/ }
      - { label: For Businesses, href: /contact/, style: ghost }
---
