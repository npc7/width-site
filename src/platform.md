---
layout: layouts/page.njk
permalink: /platform/
title: "DART platform overview: data, tracing, rules and scoring"
description: DART is an onchain risk engine built around stablecoins, with 200M labeled addresses, time-ordered fund tracing, 72 open rules and a 0–100 fund-attribution score. Console, API and MCP on one account.
breadcrumb:
  - { label: Platform overview }
sections:
  - type: hero
    compact: true
    eyebrow: Platform overview
    title: One Engine, <em>from Data to Decision</em>
    lead: DART puts onchain data, fund tracing, rules and scoring into a single engine. Submit an address or a transaction and get back a score, a disposition and the reasoning behind every point.
    ctas:
      - { label: Get Free Access, href: /contact/ }
      - { label: Read the Docs, href: "https://width.info/docs" }
    visual: result

  - type: steps
    eyebrow: Architecture
    title: Every Layer Is Our Own
    lead: Data, labels, rules and scoring are all built in-house, so they can follow your policy and every conclusion can be traced to its source.
    items:
      - { label: Layer 1, title: Onchain Data, text: "USDT and USDC flows on 11 chains, updated in near real time." }
      - { label: Layer 2, title: Address Labels, text: "200M labeled addresses, over 90% of them exchange addresses, plus continuously updated sanctions, freeze and hack labels." }
      - { label: Layer 3, title: Time-Ordered Tracing, text: "Hop-by-hop expansion upstream and downstream, keeping only paths that work in time." }
      - { label: Layer 4, title: Rules and Scoring, text: "Path-matching rules flag violations; the scoring ruleset turns them into a 0–100 score and a disposition." }

  - type: cards
    tone: alt
    eyebrow: Capabilities
    title: Pick by the Question You Need Answered
    columns: 3
    items:
      - { tag: KYA, title: Address Screening, text: "Is this address safe to deal with? Self-hits, direct exposure and indirect exposure in one view.", href: /products/kya/ }
      - { tag: KYT, title: Transaction Screening, text: "Where did this deposit come from, and where is this withdrawal going? Each direction judged on its own.", href: /products/kyt/ }
      - { tag: Sanctions, title: Sanctions Screening, text: "Entities, individuals, companies and addresses on official sanctions lists, answered in under a second.", href: /products/sanctions/ }
      - { tag: Tracing, title: Fund Tracing & Investigations, text: "Follow funds across hops and chains, and export a tracing report.", href: /products/investigations/ }
      - { tag: Rules, title: Rulesets & Scoring, text: "72 open rules and an editable scoring matrix. Your risk appetite, written as rules.", href: /products/rulesets/ }
      - { tag: MCP, title: AI Agents, text: "19 MCP tools so an AI agent can screen, read results and edit rules.", href: /products/agents/ }

  - type: split
    reverse: true
    tone: alt
    eyebrow: Disposition
    title: Four Dispositions, <em>Not Block-All</em>
    text: Every screening returns a 0–100 score and one of four dispositions, so your team can triage instead of reviewing everything. Thresholds and the points behind each rule are yours to tune.
    points:
      - A self-hit on a severe label such as sanctions scores 100 and blocks outright
      - Inbound and outbound exposure are weighted separately, and further hops weigh less
      - Every screening is kept as an immutable snapshot
    visual: scores

  - type: faq
    eyebrow: FAQ
    title: Common Questions
    items:
      - q: Which chains and tokens does DART cover?
        a: DART focuses on USDT and USDC across 11 chains. Paste an address and DART finds every chain and token it has flow on, then screens them in one go. Keep your existing tools for BTC and other assets; each covers its own.
      - q: How many hops does it trace, and is it slow?
        a: Hop depth is configurable; for everyday screening we suggest 3 hops inbound and 1 outbound. Sanctions screening returns in under a second. Most address screenings return within a minute; very active addresses traced deep take longer and can run in async mode.
      - q: Can we change the rules?
        a: Yes. Built-in rulesets are read-only; clone one and change any condition, threshold or weight. Each ruleset is saved separately, so you can always show which rules were in force at a given time.
      - q: Can we show results to a regulator?
        a: Every point maps to a rule, and each result lists the path, hop, amount, share and points. Every screening is saved as an immutable snapshot you can pull from the console or API.
      - q: What does it cost?
        a: DART is free until 31 December 2028, with console, API and MCP included. See [pricing](/pricing/).

  - type: cta
    title: Test It <em>on Your Own Data</em>
    text: Send us a batch of historical addresses, including ones you've confirmed as risky and ones you know are clean. We'll return a result, risk path and explanation for every one.
    ctas:
      - { label: Get Free Access, href: /contact/ }
      - { label: Book a Demo, href: /contact/ }
---
