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
    title: Your Risk Appetite, <em>Written as Rules</em>
    lead: Which money trails count as a violation, how many points each one costs, and where you draw the line differs for every institution. DART splits this into two rulesets. The path-matching ruleset decides whether a trail is a violation. The scoring ruleset decides how serious it is and what to do. Both are open, and both are yours to edit.
    ctas:
      - { label: Get Free Access, href: /contact/ }
      - { label: Read the Docs, href: "https://width.info/docs" }
    note: Free until 31 December 2028
    visual: scores

  - type: problems
    eyebrow: Why editable rules matter
    title: The Problems with Someone Else's Rules
    items:
      - problem: A Black Box You Can't Change or Explain
        solution: |
          - All 72 built-in rules are **open**: conditions, hop range, severity and action are there to read
          - Built-in rulesets are read-only; **clone** one and change anything in your copy
        proof: Every snapshot records the ruleset used for that screening.
      - problem: One Threshold for Everything Means Misses or Noise
        solution: |
          - The further the hop, the higher the bar: by default 5% / 10% / 15% / 20% of the flow at hops 2 / 3 / 4 / 5
          - Inbound and outbound have separate weights; verdict bands follow your risk appetite
        proof: A payment company compared the same address with another tool. It said "medium-low risk, review"; DART scored it 0.
      - problem: Regulators and Banking Partners Have Their Own Requirements
        solution: |
          - Keep one ruleset per jurisdiction or partner and choose which one to run per screening
          - New official actions arrive as built-in rulesets you can switch on
        proof: FinCEN's 9714 order was published on 6 November; the DART ruleset went live the same day.

  - type: table
    tone: alt
    eyebrow: Path-matching ruleset
    title: 72 Rules in 9 Categories
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
    note: "Rules come in three shapes: self-hit (the address carries the label), direct exposure (one hop), and layered exposure (risky funds still above the threshold after several hops)."

  - type: split
    eyebrow: Scoring ruleset
    title: Where the Score Comes from, in One Formula
    text: |
      The scoring ruleset is a matrix of **direction × hop band × severity**. Each hit contributes:

      **base points × severity weight × share of funds**

      The share is measured against the address's total onchain flow, not just the part of the graph that was expanded. Hits add up, cap at 100, and map to one of four verdicts.
    points:
      - "Default severity weights: critical 1, high 0.8, medium 0.6, low 0.3"
      - "A self-hit overrides the sum with the self-hit score (100 by default): block"
      - "Run the same hits through a different scoring ruleset and the score changes; the hits don't"
    ctas:
      - { label: Scoring Formula in Detail, href: "https://width.info/docs", style: ghost }
    visual: result

  - type: faq
    eyebrow: FAQ
    title: Rulesets and Scoring Questions
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
    eyebrow: Free access
    title: Replay Your History <em>Under Your Own Policy</em>
    text: We help map your current risk categories, thresholds and actions onto DART rulesets, so your policy stays the same.
    points:
      - Old and new rules compared case by case, with reasons for every difference
      - Free until **31 December 2028**
    ctas:
      - { label: Get Free Access, href: /contact/ }
      - { label: AI Agents (MCP), href: /products/agents/ }
---
