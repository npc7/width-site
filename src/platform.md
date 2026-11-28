---
layout: layouts/page.njk
permalink: /platform/
title: "DART platform overview: how a screening works"
description: DART puts onchain data, address labels, time-ordered fund tracing, rules and scoring in one engine. Send an address or a transaction and get a score, a verdict and the evidence for every point. Median 0.61 s for a fully traced screening.
breadcrumb:
  - { label: Platform overview }
sections:
  - type: hero
    compact: true
    eyebrow: Platform overview
    title: An address goes in. <em>A decision you can explain comes out.</em>
    lead: Send an address or a transaction. DART traces the funds in time order, checks every path against your rules and scores the risky share. You get a score, a verdict and the evidence behind every point.
    ctas:
      - { label: Get access, href: /contact/ }
      - { label: Read the docs, href: /docs/ }
    visual: result

  - type: stack
    id: stack
    tone: alt
    title: One dataset, three layers, <em>one AI assistant</em>
    lead: Labels, screening verdicts and fund tracing all run on the same data and the same rules. The AI assistant does the legwork, and your team signs off.
    layers:
      - name: DART Trace
        role: Investigate
        text: Turn dozens of transfers into one money trail. Trace up to 500 transactions in one case, see where funds meet and where they sit now, and keep tracing across USDT0 and CCTP bridges.
        links:
          - { label: Fund tracing, href: /products/investigations/ }
          - { label: Law enforcement, href: /partners/lea/ }
      - name: DART Screen
        role: Decide
        text: Screen addresses, transactions and sanctions. 72 readable rules score hops, time order and share of risky funds from 0 to 100, with four verdicts — pass, review, EDD, block.
        links:
          - { label: Address screening (KYA), href: /products/kya/ }
          - { label: Transaction screening (KYT), href: /products/kyt/ }
          - { label: Sanctions screening, href: /products/sanctions/ }
          - { label: Rulesets and scoring, href: /products/rulesets/ }
      - name: DART Intel
        role: Know
        text: 200 million labeled addresses, over 90% of them exchange addresses, covering 428 exchanges. Our own sanctions database, plus issuer-freeze, hack, scam and mixer labels kept current. Labels from other EVM chains can count too.
        links:
          - { label: Labels and intelligence, href: /products/intelligence/ }
          - { label: Supported chains, href: /chains/ }
          - { label: Sanctions tracker, href: /data/ }
    copilot:
      name: DART Copilot
      role: AI assistant
      text: AI does the legwork. Your team signs off. Call DART over MCP from the AI tools you already use.
      points:
        - Start a screening in one sentence and get every result explained
        - Tune a ruleset and re-score the original task in about a second
        - "**Scores always come from the rules engine, never from a language model**, so the same input gives the same result"
      href: /products/copilot/
      link: Meet DART Copilot

  - type: steps
    eyebrow: Four layers, all built in-house
    title: We built every layer, <em>so you can change it and explain it</em>
    items:
      - { label: Layer 1, title: Onchain data, text: "USDT and USDC transfers on Tron and the major EVM chains, updated in near real time. The live chain list comes from the API." }
      - { label: Layer 2, title: Address labels, text: "200 million labeled addresses, including the hot wallets and deposit addresses of 428 exchanges, plus sanctions, issuer-freeze, hack and scam labels kept current." }
      - { label: Layer 3, title: Time-ordered tracing, text: "Each hop is expanded upstream and downstream. Only paths where funds arrived before they moved on are kept." }
      - { label: Layer 4, title: Rules and scoring, text: "The path-matching ruleset decides what counts as a hit. The scoring ruleset turns the risky share into a 0–100 score and one of four verdicts." }

  - type: table
    tone: alt
    eyebrow: What "easy to work with" means
    title: Six claims, <em>each with evidence</em>
    head: [What you get, How DART does it, Evidence]
    rows:
      - ["**Accurate**: fewer false alarms", "A hop counts only if funds arrived before they moved on. Hops 2–5 need 5% / 10% / 15% / 20% of the funds to be risky. Exchange counterparties are exempt by default", "When DART and another tool disagree, timing is the most common reason"]
      - ["**Nothing severe missed**", "Direct contact with sanctions or terrorist financing is a hit from 10 USD up, whatever its share. Sanctioned exchanges are never exempt. Highlighted hits are listed on their own. Labels from other EVM chains can count too", "About 226,000 Arbitrum addresses carry no label on Arbitrum but are high-risk on another chain. With all-chain labels on, they all count"]
      - ["**Explainable**", "Every point maps to a rule, a path, a hop, an amount and a share. Excluded paths show why. Incomplete data is flagged on the result", "Each snapshot keeps the parameters, ruleset and evidence, even if you change the rules later"]
      - ["**Yours to tune**", "72 rules in 9 categories, all readable. Copy a ruleset to edit it, then re-score the original case", "Re-scoring takes about a second, with no new trace, and shows before and after side by side"]
      - ["**Keeps up**", "New sanctions and enforcement orders become built-in rulesets. Customer requests go straight into the build queue", "FinCEN 9714 ruleset live the day the order was published. A social platform's cross-chain request shipped the next day"]
      - ["**Fast to run and to integrate**", "Sync and async modes. One call checks an address on every chain. Console, API, CSV and MCP on one account", "Median 0.61 s for a fully traced screening, 90% under 5 s. A leading wallet reached 70,000 a day within a week"]

  - type: cards
    eyebrow: Capabilities
    title: Pick the question you need answered
    columns: 3
    items:
      - { tag: KYA, title: Address screening, text: "Is this address safe to deal with? Its own labels, direct contacts and indirect exposure in one result.", href: /products/kya/ }
      - { tag: KYT, title: Transaction screening, text: "Where did this deposit come from, and where is this withdrawal going? One ruleset per direction.", href: /products/kyt/ }
      - { tag: Sanctions, title: Sanctions screening, text: "Is this address on a sanctions list? Answered in under a second, with new orders covered the same day.", href: /products/sanctions/ }
      - { tag: Tracing, title: Fund tracing & investigations, text: "Up to 500 transactions in one case, followed across chains and through swaps.", href: /products/investigations/ }
      - { tag: Rules, title: Rulesets & scoring, text: "72 readable rules and an editable scoring matrix. Your risk appetite, written as rules.", href: /products/rulesets/ }
      - { tag: DART Copilot, title: AI assistant, text: "19 MCP tools so an AI agent can screen addresses, read results and edit rules.", href: /products/copilot/ }

  - type: split
    reverse: true
    eyebrow: Verdicts
    title: Four verdicts, <em>not block-all</em>
    text: Every screening returns a 0–100 score and one of four verdicts. Your team triages by verdict, so as few cases as possible need a person. Thresholds and the points for each rule follow your risk appetite.
    points:
      - "Default bands: 0–19 pass, 20–49 review, 50–79 enhanced due diligence, 80–100 block"
      - An address carrying a sanctions or other severe label scores 100 and is blocked by default
      - Inbound and outbound are weighted separately, and distant hops weigh less
    visual: scores

  - type: faq
    eyebrow: FAQ
    title: Common questions
    items:
      - q: Which chains and tokens does DART cover?
        a: DART covers USDT and USDC on Tron and the major EVM chains. The live list comes from `GET /api/v3/chains`. Paste an address and DART finds every chain and token where it has activity, then screens them all. Keep your current tools for BTC and other assets.
      - q: How long does a screening take?
        a: A label-only check (0 hops both ways) usually returns within a second. A fully traced screening takes 0.61 s at the median, and 90% finish within 5 s. Very active addresses traced deep take longer, so use async mode for those.
      - q: Fewer false alarms sounds like letting more through. Does it?
        a: No. Time order and share thresholds only filter distant, weak links. Direct contact with sanctions or terrorist financing is a hit from 10 USD up. Sanctioned exchanges are never exempt. Highlighted hits are listed on their own, so your policy can say "any highlight goes to review".
      - q: Can we change the rules?
        a: Yes. Built-in rulesets are read-only. Copy one and change any condition, threshold or points value. Every snapshot records which ruleset was used.
      - q: We already use another onchain analytics tool. How does DART fit?
        a: Run them side by side. DART handles stablecoins and your other assets stay where they are. Start by screening a batch of historical addresses on both, and we explain every difference.

  - type: cta
    title: Test it <em>on your own data</em>
    text: Send us a batch of historical addresses, including ones you know are bad and ones you know are clean. We return each result with its risk path and explain every difference.
    ctas:
      - { label: Get access, href: /contact/ }
      - { label: Read the docs, href: /docs/ }
---
