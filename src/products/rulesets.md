---
layout: layouts/page.njk
permalink: /products/rulesets/
title: Rulesets & scoring
fullTitle: Configurable AML rulesets and risk scoring for crypto | Width DART
description: 72 open rules across 9 risk categories, from sanctions and terrorist financing to hacks and scams, scored by direction, hop, severity and share of funds. Clone the built-ins and tune them to your risk appetite.
breadcrumb:
  - { label: Platform, href: /platform/ }
  - { label: Rulesets & scoring }
sections:
  - type: hero
    compact: true
    eyebrow: Rulesets & scoring
    title: Your risk appetite, <em>written as rules</em>
    lead: Which money trails count as a violation, how many points each one costs, and where you draw the line differs for every institution. DART splits this into two rulesets. The path-matching ruleset decides whether a trail is a violation. The scoring ruleset decides how serious it is and what to do. Both are open, and both are yours to edit.
    ctas:
      - { label: Get access, href: /contact/ }
      - { label: Read the docs, href: /docs/ }
    visual: scores

  - type: problems
    eyebrow: Why editable rules matter
    title: The problems with someone else's rules
    items:
      - problem: A black box you can't change or explain
        solution: |
          - All 72 built-in rules are **open**: conditions, hop range, severity and action are there to read
          - Built-in rulesets are read-only; **clone** one and change anything in your copy
        proof: Every snapshot records the ruleset used for that screening.
      - problem: One threshold for everything means misses or noise
        solution: |
          - The further the hop, the higher the bar: by default 5% / 10% / 15% / 20% of the flow at hops 2 / 3 / 4 / 5
          - Inbound and outbound have separate weights; verdict bands follow your risk appetite
        proof: After a rule change, re-score the original case in about a second, with no new trace, and compare before and after.
      - problem: Regulators and banking partners have their own requirements
        solution: |
          - Keep one ruleset per jurisdiction or partner and choose which one to run per screening
          - New sanctions and enforcement orders arrive as built-in rulesets you can switch on
        proof: FinCEN's 9714 order was published on 6 November; the DART ruleset went live the same day.

  - type: table
    tone: alt
    eyebrow: Path-matching ruleset
    title: 72 rules in 9 categories
    lead: Each rule answers one question, whether this money trail is a violation. A hit carries the rule's severity and action, but no score.
    head: [Category, Rules, Default Severity, Typical Cases]
    rows:
      - [High-risk entities, "16", High, "High-risk service providers, unlicensed operators"]
      - [Cybercrime, "12", High, "Hacks, scams, phishing"]
      - [Obfuscation, "8", High, Mixers and other obfuscation services]
      - [Sanctions, "6", Critical, Entities on official sanctions lists]
      - [Terrorist financing, "6", Critical, Funds linked to terrorism]
      - [Enforcement freezes, "6", Critical, "Stablecoin issuer freezes, law enforcement freezes"]
      - [Illicit markets, "6", Critical, Darknet markets]
      - [Other financial crime, "6", Critical, Money laundering and other financial crime]
      - [Gambling, "6", Medium, Gambling platforms]
    note: "Rules come in three shapes: own label (the address carries the label), direct contact (one hop, a hit from 10 USD up) and indirect exposure (risky funds still above the threshold at hops 2–5)."

  - type: split
    eyebrow: Scoring ruleset
    title: Where the score comes from, in one formula
    text: |
      The scoring ruleset is a matrix of **direction × hop band × severity**. Each hit contributes:

      **base points × severity weight × share of funds**

      The share is measured against the address's total onchain flow, not just the part of the graph that was expanded. Hits add up, cap at 100, and map to one of four verdicts.
    points:
      - "Default severity weights: critical 1, high 0.8, medium 0.6, low 0.3"
      - "An own-label hit overrides the sum with its own score (100 by default): block"
      - "Run the same hits through a different scoring ruleset and the score changes; the hits don't"
    ctas:
      - { label: Scoring formula in detail, href: "https://width.info/docs", style: ghost }
    visual: result

  - type: faq
    eyebrow: FAQ
    title: Rulesets and scoring questions
    items:
      - q: What is the difference between the path-matching and scoring rulesets?
        a: The path-matching ruleset only answers whether a money trail is a violation and which rule it breaks. It never produces a score. The score comes entirely from the scoring ruleset, so the same hits can score differently under a different scoring ruleset while the hits themselves stay the same.
      - q: Can I edit the built-in rulesets?
        a: Built-ins are read-only so every customer has a stable baseline. Clone one and you can change anything in your copy; each ruleset is stored separately.
      - q: What are the verdict bands?
        a: By default 0–19 pass, 20–49 review, 50–79 enhanced due diligence and 80–100 block. You can move the bands to match your risk appetite.
      - q: Why do further hops need a bigger share?
        a: The further a hop is from the screened address, the more hands the money has passed through and the weaker the link. By default risky funds must reach 5% / 10% / 15% / 20% of the flow at hops 2 / 3 / 4 / 5 before they count, so an address that brushed against a little tainted money isn't treated like the source.
      - q: Can an AI assistant edit rules for me?
        a: Yes. DART's MCP tools cover reading and writing rulesets and rules, so you can describe a policy in plain language and have your assistant draft or adjust the rules.

  - type: cta
    eyebrow: See it on your own data
    title: Replay your history <em>under your own policy</em>
    text: We help map your current risk categories, thresholds and actions onto DART rulesets, so your policy stays the same.
    points:
      - Old and new rules compared case by case, with reasons for every difference
    ctas:
      - { label: Get access, href: /contact/ }
      - { label: Meet DART Copilot, href: /products/copilot/ }
---
