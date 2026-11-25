---
layout: layouts/page.njk
permalink: /products/sanctions/
title: Sanctions screening
fullTitle: Crypto sanctions screening API in under a second | Width DART
description: "Crypto sanctions screening on a self-built database covering OFAC, UN, EU, UK and more: entities, individuals, companies and onchain addresses, answered in under a second."
breadcrumb:
  - { label: Platform, href: /platform/ }
  - { label: Sanctions screening }
sections:
  - type: hero
    compact: true
    eyebrow: Sanctions screening
    title: Is the Other Side Sanctioned? <em>Know in Under a Second.</em>
    lead: Sanctions are the line you can't cross and the check you can't wait for. DART searches its own sanctions database for addresses, entities, individuals and companies in under a second. When authorities act, we turn it into a built-in ruleset fast so you can switch it on; the FinCEN 9714 order was live the day it was published.
    ctas:
      - { label: Get Free Access, href: /contact/ }
      - { label: Read the Docs, href: "https://width.info/docs" }
    note: Free until 31 December 2028
    stats:
      - { value: "< 1", unit: s, label: Sanctions check response }
      - { value: Same day, label: FinCEN 9714 order live as a ruleset the day it was published }
      - { value: 200M, label: "Labeled addresses, with sanctions, freeze and hack labels kept current" }
      - { value: "11", unit: chains, label: USDT and USDC covered }

  - type: problems
    eyebrow: What sanctions screening has to get right
    title: Not Slow, Not Leaky, Not Noisy
    items:
      - problem: Lists Change Faster Than Your Rules
        detail: Official lists and enforcement orders are updated more often than ever. Maintaining rules by hand can't keep up.
        solution: |
          - A self-built sanctions database covering **OFAC, UN, EU, UK** and more, updated continuously
          - New official actions become **built-in rulesets** you can select in the console or the API
        proof: FinCEN's 9714 order was published on 6 November. The matching DART ruleset went live the same day.
      - problem: Sanctions Checks Hold Up Onboarding and Payouts
        solution: |
          - Sanctions checks return **in under a second**, fast enough for pre-transfer and onboarding checks
          - An address that is itself listed is a self-hit and comes back as a block
        proof: 300,000–400,000 API calls a day in production.
      - problem: Checking Only the Address Misses One-Hop-Away Funds
        detail: Funds often pass through an intermediary before they reach you.
        solution: |
          - Direct and multi-hop exposure are checked too, in time order and by share of funds
          - For strict sanctions screening, switch off the exchange exemption so paths are followed through exchanges as well
        proof: Every hit lists its path, hop, amount and share.

  - type: cards
    tone: alt
    eyebrow: Coverage
    title: What You Can Screen Against
    columns: 4
    items:
      - { tag: Sources, title: Official Lists, text: "OFAC, UN, EU, UK and other official sanctions and enforcement lists." }
      - { tag: Parties, title: Entities and People, text: "Sanctioned entities, individuals and companies, searchable by name." }
      - { tag: Onchain, title: Linked Addresses, text: Addresses named on the lists and addresses we attribute to those entities. }
      - { tag: Actions, title: Enforcement Orders, text: "Actions such as FinCEN's 9714 order, shipped as built-in rulesets." }

  - type: split
    tone: alt
    eyebrow: Rulesets
    title: New Actions, Ready to Switch On
    text: Each official action maps to a built-in ruleset, and every rule is readable. Built-in rulesets are read-only; clone one to apply your own policy. Every snapshot records which ruleset a screening used.
    points:
      - Sanctions hits score at **critical** severity; a self-hit is a block by default
      - Rulesets carry a jurisdiction, so you enable only what applies to you
      - After a list update, the ruleset version behind every past result stays on record
    ctas:
      - { label: Rulesets & Scoring, href: /products/rulesets/, style: ghost }
    visual: scores

  - type: faq
    eyebrow: FAQ
    title: Sanctions Screening Questions
    items:
      - q: Which lists does the sanctions database cover?
        a: Official sources including OFAC, the UN, the EU and the UK, covering entities, individuals, companies and onchain addresses. It is updated continuously.
      - q: How soon can we use a new official action?
        a: We turn new official actions into built-in rulesets. FinCEN's 9714 order, for example, was published on 6 November and was available in DART the same day.
      - q: How fast is sanctions screening?
        a: Under a second, which makes it practical before transfers and during onboarding.
      - q: Can DART catch an address that isn't listed but deals with listed ones?
        a: Yes. DART checks direct and multi-hop exposure in time order and by share of risky funds, and shows the full path. For sanctions use cases you can switch off the exchange exemption so paths are followed through exchanges too.
      - q: Can we run sanctions screening without full KYT?
        a: Yes. Enable only the sanctions rulesets, or screen only the address's own labels, depending on what your compliance policy requires.

  - type: cta
    eyebrow: Free access
    title: Start by <em>Rescanning What You Already Have</em>
    text: Send us a batch of addresses, anonymized is fine, and get a result and risk path for each.
    points:
      - Includes a **diff against your current tool**, with reasons
      - Free until **31 December 2028**
    ctas:
      - { label: Get Free Access, href: /contact/ }
      - { label: Sanctions Actions Tracker, href: "/data/#sanctions" }
---
