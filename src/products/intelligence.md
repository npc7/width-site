---
layout: layouts/page.njk
permalink: /products/intelligence/
title: DART Intel
fullTitle: "DART Intel: address labels and sanctions data for USDT and USDC | Width DART"
description: "DART Intel is the data layer behind every DART verdict: 200 million labeled addresses, the wallets of 428 exchanges, our own sanctions database and risk labels in 9 categories, kept per chain and verified by our intelligence team."
breadcrumb:
  - { label: Platform, href: /platform/ }
  - { label: DART Intel }
sections:
  - type: hero
    compact: true
    eyebrow: DART Intel · Intelligence
    title: Every verdict starts with <em>knowing who is who</em>
    lead: A score is only as good as the labels under it. DART Intel is the data layer every screening, trace and Copilot answer stands on. It tells you which counterparties are exchanges, which addresses are sanctioned or frozen, and which are tied to hacks, scams or mixers.
    ctas:
      - { label: Get access, href: /contact/ }
      - { label: How labels are sourced, href: /zh/docs/labels/ }
    stats:
      - { value: 200M, label: labeled addresses }
      - { value: 90%+, label: of them are exchange addresses }
      - { value: "428", label: exchanges whose wallets DART recognizes }
      - { value: "9", label: risk label categories, from sanctions to gambling }

  - type: problems
    eyebrow: Why the data layer matters
    title: Bad labels make <em>bad verdicts</em>
    items:
      - problem: You can't tell an exchange from a risky counterparty
        detail: Most stablecoin flows touch an exchange. If those wallets are unlabeled, every busy address looks linked to something.
        solution: |
          - **200 million labeled addresses**, and more than 90% of them are exchange addresses
          - Hot wallets and deposit addresses of **428 exchanges**, so exchange counterparties are exempt by default
          - Sanctioned or high-risk exchanges carry risk labels and are never exempt
        proof: Neutral labels such as exchanges, DEXs and bridges tell you who the counterparty is and add no points.
      - problem: Official lists change faster than your rules
        detail: Sanctions lists and enforcement orders change often, and maintaining them by hand falls behind.
        solution: |
          - Our own sanctions database covers **OFAC, UN, EU, UK** and other official sources
          - It holds entities, individuals, companies and the onchain addresses those lists publish
          - New sanctions and enforcement orders ship as **built-in rulesets** you switch on, with no rules to write
        proof: The FinCEN 9714 order was published on 6 November, and its ruleset went live the same day.
      - problem: A label on one chain is invisible on another
        detail: An EVM address is the same wallet on every EVM chain, but labels are stored per chain and address.
        solution: |
          - Turn on **all-chain labels**, and labels from other EVM chains count as the address's own
          - Labels from another chain can lift the exchange exemption, never grant it
          - If the cross-chain lookup fails, the screening fails instead of passing quietly
        proof: About 226,000 Arbitrum addresses carry no label on Arbitrum but are high-risk on another chain.

  - type: table
    tone: alt
    eyebrow: Risk labels
    title: Nine risk categories, <em>each with a default severity</em>
    lead: Every label has four levels, from category down to address type, plus a severity. One address can carry several labels.
    head: [Category, What it covers, Default severity]
    rows:
      - [Sanctions, "Sanctioned entities, restricted entities, sanctioned jurisdictions", Critical]
      - [Terrorism financing, Wallets linked to terrorist organizations, Critical]
      - [Public freezing action, Addresses frozen or seized by law enforcement, Critical]
      - [Illicit markets, "Human trafficking, illicit services, child sexual abuse material", Critical]
      - [Other financial crimes, "Suspected money laundering, tax evasion", Critical]
      - [Cybercrime, "Stolen funds, ransomware, phishing, Ponzi schemes, pig butchering, rug pulls, honeypot contracts, fake presales, gray-market services", High]
      - [Obfuscation, "Mixers, privacy wallets, privacy coins, centralized cross-chain swaps, crypto ATMs", High]
      - [High-risk entities, "Sanctioned exchanges, exchanges with weak AML controls or in high-risk jurisdictions, high-risk OTC desks", High]
      - [Gambling, "Online casinos, sports betting, unlicensed gambling", Medium to high]
    note: "Neutral labels (exchanges and DeFi, banks, payment firms, merchants, custodians) carry no risk. They identify the counterparty. Every rule can target a category, sub-category, entity or address type."

  - type: cards
    eyebrow: Sources
    title: Where risk labels <em>come from</em>
    columns: 2
    items:
      - tag: Official
        title: Sanctions and counter-terrorism lists
        text: OFAC, UN, EU, UK, Singapore and other official lists, plus the wallet addresses they publish. Official counter-terrorism freeze and seizure orders.
      - tag: Issuers and enforcement
        title: Freezes and seizures
        text: Freeze records from the USDT and USDC issuers, with the time of each freeze. Public filings from law enforcement agencies.
      - tag: Incidents and reports
        title: Hacks, scams and phishing
        text: Addresses grouped by security incident, from project notices, security firm disclosures and onchain tracing of stolen funds. Scam and phishing addresses come from public reports, verified by our intelligence team.
      - tag: Services and regulators
        title: Mixers and high-risk entities
        text: Contract and deposit addresses that mixing services publish. Regulator warnings and enforcement notices, plus exchange addresses we collect ourselves.

  - type: steps
    tone: alt
    eyebrow: Quality control
    title: How a label <em>earns its place</em>
    items:
      - { label: Traceable, title: Every label has a source, text: "Labels from public sources trace back to the original publication. Intelligence labels are verified by a person." }
      - { label: Checked, title: Three checks on the way in, text: "An independent check before loading, sample checks during loading, and a review by chain and entity afterwards." }
      - { label: Correctable, title: Mistakes come out fast, text: "Every label change can be fully reverted. Question a label and we show its source; confirmed mislabels are corrected quickly." }

  - type: split
    eyebrow: Principles
    title: Labels describe risk, <em>not people</em>
    text: A label says which kind of public risk fact an address is linked to. It is not a judgment about a person. Your ruleset and verdict bands decide whether to block.
    points:
      - We never publish specific risky addresses
      - We don't label an individual's address
      - Public data boards use only event-level and entity-level data that traces back to the chain or an official notice
    ctas:
      - { label: Data center, href: /data/, style: ghost }
      - { label: Label sources (docs), href: /zh/docs/labels/, style: ghost }

  - type: cards
    eyebrow: Where Intel shows up
    title: One data layer, <em>every DART product</em>
    columns: 3
    items:
      - { tag: DART Screen, title: Address screening (KYA), text: "Own labels, direct contacts and indirect exposure, checked on every chain where the address is active.", href: /products/kya/ }
      - { tag: DART Screen, title: Sanctions screening, text: "A label-only check against the sanctions database, usually back in under a second.", href: /products/sanctions/ }
      - { tag: DART Trace, title: Fund tracing, text: "Every node on the fund graph shows its label and risk level.", href: /products/investigations/ }

  - type: faq
    eyebrow: FAQ
    title: Data and label questions
    items:
      - q: Can I check only whether an address itself is listed?
        a: Yes. Set inflow and outflow hops to 0. DART traces no funds and compares the address's own labels with the own-label rules, usually within a second. See [sanctions screening](/products/sanctions/).
      - q: Are labels the same on every EVM chain?
        a: Labels are stored per chain and address. With `all_chain_labels` on, labels from other EVM chains count as the address's own, and they are listed with their source chain. Contract labels don't cross chains, and the option does not apply to Tron.
      - q: How do new sanctions and enforcement orders reach my screening?
        a: We turn them into built-in rulesets. Pick one in the console or pass its `ruleset_id`, with no rules to write. Built-in rulesets are read-only, so copy one to adapt it.
      - q: What if I think a label is wrong?
        a: Send us the address. We show where the label came from, and a confirmed mislabel is corrected quickly. Every label change can be reverted in full.
      - q: Do you publish lists of risky addresses?
        a: No. We never publish specific risky addresses, and we don't label an individual's address. Labels are used inside screening, and results say which kind of public source was hit.

  - type: cta
    eyebrow: See it on your own data
    title: Run your addresses <em>side by side</em>
    text: Send us a batch of past addresses (anonymized is fine). We return each result with the labels behind it and explain every difference from your current tool.
    ctas:
      - { label: Get access, href: /contact/ }
      - { label: Address screening (KYA), href: /products/kya/ }
---
