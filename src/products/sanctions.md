---
layout: layouts/page.njk
permalink: /products/sanctions/
title: Sanctions screening
fullTitle: Crypto sanctions screening in under a second | Width DART
description: "Crypto sanctions screening on our own database covering OFAC, UN, EU, UK and more: addresses, entities, individuals and companies, answered in under a second. Listed addresses are blocked by default, and direct contact above 10 USD is always a hit."
breadcrumb:
  - { label: Platform, href: /platform/ }
  - { label: Sanctions screening }
sections:
  - type: hero
    compact: true
    eyebrow: Sanctions screening
    title: Is the other side sanctioned? <em>Know in under a second.</em>
    lead: A sanctions hit is a hard stop, so the check must be instant and the lists must be current. DART searches its own sanctions database for addresses, entities, individuals and companies in under a second. When authorities issue a new order, we ship it as a built-in ruleset the same day.
    ctas:
      - { label: Get access, href: /contact/ }
      - { label: Read the docs, href: /docs/ }
    stats:
      - { value: "< 1", unit: s, label: label-only sanctions check }
      - { value: Same day, label: FinCEN 9714 order published, ruleset live }
      - { value: "10", unit: USD, label: "direct contact with sanctions above this is a hit, whatever its share" }
      - { value: "100", label: "points for a listed address, blocked by default" }

  - type: problems
    eyebrow: Sanctions screening
    title: Instant, current, <em>and nothing missed</em>
    items:
      - problem: Lists change, and your system falls behind
        detail: Official lists and enforcement orders change more often than a team can maintain rules by hand.
        solution: |
          - Our own sanctions database covers **OFAC, UN, EU, UK** and other official sources, kept current
          - New sanctions and enforcement orders become **built-in rulesets** you switch on in the console or API
        proof: The FinCEN 9714 order was published on 6 November, and DART covered it the same day.
      - problem: Sanctions checks slow down onboarding and transfers
        solution: |
          - A label-only sanctions check returns **in under a second**, fast enough for onboarding and pre-send checks
          - An address on a list gets a block verdict from its own label
        proof: Even a fully traced screening takes 0.61 s at the median.
      - problem: Checking the address alone misses money one hop away
        detail: Funds often pass through an intermediary before they reach your platform.
        solution: |
          - Direct contact with a sanctioned address is **a hit from 10 USD up**, whatever its share
          - Links a few hops away are judged by timing and the share of risky funds
          - Sanctioned exchanges **never get the exchange exemption**, so their paths always count
        proof: Every hit lists its path, hops, amount and share.

  - type: cards
    tone: alt
    eyebrow: Coverage
    title: What DART checks
    columns: 4
    items:
      - { tag: Sources, title: Official lists, text: "OFAC, UN, EU, UK and other official sanctions and enforcement lists." }
      - { tag: Subjects, title: Entities and people, text: "Sanctioned entities, individuals and companies, searchable by name." }
      - { tag: Onchain, title: Linked addresses, text: "Addresses named on the lists, plus addresses our intelligence team has verified as belonging to those entities." }
      - { tag: Orders, title: Enforcement orders, text: "Orders such as FinCEN 9714, shipped as built-in rulesets." }

  - type: split
    tone: alt
    eyebrow: Rulesets
    title: New orders, <em>ready to switch on</em>
    text: Each enforcement order has its own built-in ruleset, and every rule is readable. Built-in rulesets are read-only. To adapt one, copy it and change the conditions and points. Every snapshot records which ruleset was used.
    points:
      - Sanctions hits score at **critical** severity, and an address on a list is blocked by default
      - Switch on only the rulesets that apply to your business
      - To watch a named institution, mark the rule as a **highlight (★)** so its hits are listed on their own
    ctas:
      - { label: Rulesets & scoring, href: /products/rulesets/, style: ghost }
    visual: scores

  - type: faq
    eyebrow: FAQ
    title: Sanctions screening questions
    items:
      - q: Which lists does the sanctions database cover?
        a: OFAC, UN, EU, UK and other official sources, including entities, individuals, companies and onchain addresses, kept current.
      - q: How soon is a new order available?
        a: We turn new orders into built-in rulesets. The FinCEN 9714 order was published on 6 November, and DART covered it the same day.
      - q: Can DART catch an address that isn't listed but dealt with one that is?
        a: Yes. Direct contact above 10 USD is a hit. Links a few hops away are judged by timing and the share of risky funds, and the result lists the full path.
      - q: Does the exchange exemption let a sanctioned exchange through?
        a: No. Only ordinary exchanges are exempt. Sanctioned exchanges, or exchanges with other high-risk labels, are never exempt.
      - q: Can we run sanctions screening without full KYT?
        a: Yes. Switch on only the sanctions rulesets, or set both hop counts to 0 to check the address's own labels.

  - type: cta
    eyebrow: See it on your own data
    title: Back-screen your <em>existing addresses</em>
    text: Send us a batch of addresses (anonymized is fine). We return each result with its risk path and explain every difference from your current tool.
    ctas:
      - { label: Get access, href: /contact/ }
      - { label: Sanctions actions tracker, href: "/data/#sanctions" }
---
