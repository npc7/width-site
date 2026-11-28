---
layout: layouts/page.njk
permalink: /solutions/exchanges/
title: Crypto exchange KYT for deposits and withdrawals
description: Crypto exchange KYT for USDT and USDC deposits and withdrawals. Time-ordered tracing cuts false positives, exchange counterparties are exempt, and every score is explained.
breadcrumb:
  - { label: Solutions, href: /solutions/ }
  - { label: Exchanges }
sections:
  - type: hero
    compact: true
    eyebrow: Solutions · Exchanges
    title: Screen every deposit and withdrawal, <em>without the false alarms</em>
    lead: Deposits are about where the money came from; withdrawals are about where it is going. DART traces funds hop by hop in time order and drops paths the money could not have taken, so your compliance team only works the cases that matter.
    ctas:
      - { label: Get access, href: "/contact/?type=exchange" }
      - { label: Read the docs, href: /docs/ }
    visual: result

  - type: problems
    eyebrow: Exchange compliance
    title: Why exchange review queues overflow
    items:
      - problem: Too many deposit alerts for the review team
        detail: If a tool only asks "are these addresses connected?", ordinary deposits get traced a few hops out to something risky, and most alerts end up as false positives.
        solution: |
          - A hop only counts if the funds **arrived before they left**. Paths where money left before it arrived are dropped
          - **Share of funds matters**: the further the hop, the higher the threshold, so a trace amount of bad money doesn't condemn an address
          - Four verdicts (pass, review, EDD, block) mean reviewers only see the middle two
        proof: Excluded paths are listed with the reason, so a reviewer can see why an alert did not fire.
      - problem: Getting dragged in by other exchanges' users
        detail: A hot wallet touches thousands of addresses a day. Trace through another exchange and you will almost always hit something risky.
        solution: |
          - **Exchange counterparties are exempt by default**: tracing stops at another exchange, so other users of that exchange don't count against you
          - Sanctioned or high-risk exchanges are **never exempt**, and DART recognizes the wallets of 428 exchanges
        proof: A Middle East exchange runs deposit and withdrawal screening with the exemption on by default.
      - problem: New sanctions and orders outpace your rules
        detail: Official lists and enforcement orders change faster every year. Maintaining rules in-house is slow and easy to get wrong.
        solution: |
          - We turn new sanctions and enforcement orders into **built-in rulesets** you can select in the console or API
          - Every rule is readable. Copy a ruleset and adjust it to your own policy
        proof: To watch one named exchange, mark its rule as a highlight (★) instead of switching the exemption off.

  - type: steps
    tone: alt
    eyebrow: Where DART sits
    title: One check on the way in, one on the way out
    lead: Deposits are screened inbound and withdrawals outbound, each with its own ruleset and hop depth.
    items:
      - { label: Deposit, title: Funds land onchain, text: A user's deposit confirms and your system has the transaction hash. }
      - { label: KYT-IN, title: Screen the source, text: Trace upstream in time order against the inbound ruleset and get a 0–100 score. }
      - { label: Decide, title: Credit or hold, text: Pass credits straight away; review and EDD go to a queue; block freezes and escalates. }
      - { label: Withdrawal, title: Screen the destination, text: Before release, run KYA or KYT-OUT on the target address. Critical hits such as sanctions are blocked. }

  - type: cases
    eyebrow: Customers
    title: Exchanges already on DART
    columns: 2
    items:
      - tag: Exchange · Middle East
        title: A Middle East exchange
        text: Screens deposits and withdrawals automatically, with exchange counterparties exempt by default, so it isn't dragged in by other exchanges' users.
      - tag: Regulatory update
        metric: Same day
        metricLabel: From new order to built-in ruleset
        title: FinCEN 9714 order
        text: Published on 6 November, live as a DART built-in ruleset the same day. Customers selected it in the console and could identify related funds in their deposits and withdrawals.
    note: Customer names withheld for confidentiality. Figures from DART production data, November 2026.

  - type: faq
    eyebrow: FAQ
    title: Questions exchanges ask
    items:
      - q: Does the exchange exemption let risk slip through?
        a: The exemption only stops tracing once a path reaches another exchange. If the screened address carries a risk label itself, or a path hits a rule before it reaches an exchange, it still counts. Sanctioned or high-risk exchanges are never exempt. To watch one named exchange, use a highlight rule instead of switching the exemption off.
      - q: Should deposits and withdrawals use the same rules?
        a: We don't recommend it. Deposits look at where funds came from (inbound) and withdrawals at where they go (outbound). DART ships separate KYT-IN and KYT-OUT rulesets. Hops default to 3 inbound and 1 outbound, and both are adjustable.
      - q: Will screening slow down crediting?
        a: A fully traced screening takes 0.61 s at the median, and 90% finish within 5 s. Deep traces on very active addresses take longer, so use async mode and either credit then act on the result, or hold then release.
      - q: Do we have to add rules when a new list is published?
        a: No. We turn new sanctions and enforcement orders into built-in rulesets, usually the day they are published. You can still copy and edit any ruleset.
      - q: What can we show an examiner?
        a: Every screening is kept as a snapshot of the request, the ruleset and the full result. Pull them in bulk over the API to report on any period. The product manual documents rule definitions and the scoring formula, so it can sit alongside your internal policy.

  - type: cta
    eyebrow: See it on your own data
    title: Run it <em>next to your current tools</em>
    text: Nothing to switch off. Send us a batch of historical deposit and withdrawal addresses (anonymized is fine) and we explain every difference.
    points:
      - A result for every address, with the path behind it and a **diff against your current tools**
      - Stablecoins on DART, everything else stays where it is
    ctas:
      - { label: Get access, href: "/contact/?type=exchange" }
      - { label: Book a demo, href: "/contact/?type=exchange" }
---
