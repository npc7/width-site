---
layout: layouts/page.njk
permalink: /trust/
title: Trust center
fullTitle: "Trust center: certifications, auditable rules and evidence | Width DART"
description: "How DART earns trust: ISO/IEC 27001, 27701 and 42001 certified, SOC 2 Type II in progress. Every score comes from 72 readable rules, never from a language model, and every screening is saved as a snapshot you can audit."
breadcrumb:
  - { label: Trust center }
sections:
  - type: hero
    compact: true
    eyebrow: Trust center
    title: Every verdict comes from <em>rules you can audit</em>
    lead: DART scores with rules you can read, not a black box or a language model. The same inputs and the same ruleset give the same result. Every screening is saved, so you can re-run it and audit it later.
    ctas:
      - { label: Request certificates, href: /contact/ }
      - { label: Rulesets & scoring, href: /products/rulesets/ }

  - type: cards
    eyebrow: Certifications
    title: Security, privacy and AI, <em>independently certified</em>
    columns: 4
    items:
      - { tag: Obtained, title: ISO/IEC 27001, text: "Information security management." }
      - { tag: Obtained, title: ISO/IEC 27701, text: "Privacy information management." }
      - { tag: Obtained, title: ISO/IEC 42001, text: "AI management system." }
      - { tag: In progress, title: SOC 2 Type II, text: "Audit in progress." }
    ctas:
      - { label: Request certificates, href: /contact/ }

  - type: table
    tone: alt
    eyebrow: How a score is made
    title: Every point traces back <em>to a rule</em>
    head: [What you can check, How DART does it]
    rows:
      - ["**Readable rules**", "Every score is computed by 72 rules in 9 categories. You can read every condition, threshold and points value"]
      - ["**Repeatable results**", "The same inputs and the same ruleset give the same result. Re-score a saved case in about a second and compare before and after"]
      - ["**Evidence for every point**", "Each point maps to a rule, a path, a hop, an amount and a share"]
      - ["**Excluded paths shown**", "Paths that didn't count are listed with the reason, for example money that left before it arrived"]
      - ["**Change control**", "Built-in rulesets are read-only. Copy one to edit it. Every snapshot records which ruleset was used"]

  - type: split
    eyebrow: AI and decisions
    title: AI helps, rules score, <em>people decide</em>
    text: DART Copilot, our AI assistant over MCP, can run screenings, explain results and help you edit rulesets. The score itself is always computed by the rules engine, never by a language model. A person on your team decides the verdict to act on.
    points:
      - An AI explanation points back to the rules, paths and amounts in the result
      - Built-in rulesets are read-only, so an AI can only change your own copy
      - Console, API and MCP share one account and the same snapshots
    ctas:
      - { label: Meet DART Copilot, href: /products/copilot/, style: ghost }

  - type: cards
    tone: alt
    eyebrow: Evidence and data integrity
    title: Evidence you can <em>pull up later</em>
    columns: 3
    items:
      - { tag: Snapshots, title: Every screening is saved, text: "Each snapshot keeps the request parameters, the ruleset and the full result. Later rule changes don't alter old snapshots. Read any snapshot back through the API by its ID." }
      - { tag: dataStatus, title: Gaps are flagged, text: "When data couldn't be fully read, the result says so in `dataStatus`. An incomplete check is never passed silently." }
      - { tag: Environments, title: A separate test environment, text: "Test on `https://test-api.width.live`, which has its own database. Production runs on `https://api.width.live`." }

  - type: cards
    eyebrow: Data principles
    title: We name sources, <em>not people</em>
    columns: 3
    items:
      - { title: No public list of risky addresses, text: "We don't publish specific risky addresses, and we never label an individual's address as a scam or money laundering.", href: /about/, link: About Width }
      - { title: Sources, not judgments, text: "The individual address check only reports which public sources matched, such as an official sanctions list.", href: /check/, link: Address check }
      - { title: Verified, logged access, text: "Investigator accounts open only after we verify the agency. Every query is logged.", href: /partners/lea/, link: Law enforcement }

  - type: faq
    eyebrow: FAQ
    title: Trust questions we hear most
    items:
      - q: Can an AI change my score?
        a: No. The rules engine computes every score. An AI assistant can run a screening, explain a result or help you edit your own copy of a ruleset, but it never produces the score. A person decides the verdict.
      - q: Will a ruleset update change my past results?
        a: No. Each snapshot keeps the parameters, ruleset and result used at the time. A new screening can differ if new transfers or labels have arrived, so store the snapshot ID with your case.
      - q: Can we re-run a screening and get the same answer?
        a: Yes. The same inputs and the same ruleset give the same result. You can also re-score a saved case with a different ruleset and compare the two.
      - q: Can you send your certificates?
        a: Yes. We share our ISO/IEC 27001, 27701 and 42001 certificates and answer your security questionnaire on request. SOC 2 Type II is in progress.
      - q: How do we test without touching production?
        a: Use the test environment at `https://test-api.width.live`. It has its own database, so ruleset IDs and snapshots differ from production.

  - type: cta
    eyebrow: Vendor review
    title: Get our certificates <em>and security answers</em>
    text: Send us your security questionnaire or due diligence list. Our teams in Singapore and Hong Kong will reply with the certificates and answers you need.
    ctas:
      - { label: Request documents, href: /contact/ }
      - { label: Platform overview, href: /platform/ }
---
