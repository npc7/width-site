---
layout: layouts/page.njk
permalink: /products/kya/
title: Address screening (KYA)
fullTitle: USDT and USDC address risk screening (KYA) | Width DART
description: DART address screening (KYA). Paste a USDT or USDC address, and DART finds every chain where it is active, checks its own labels, direct contacts and indirect exposure in time order, and returns a 0–100 score, a verdict and the evidence for every point.
breadcrumb:
  - { label: Platform, href: /platform/ }
  - { label: Address screening (KYA) }
sections:
  - type: hero
    compact: true
    eyebrow: KYA · Address screening
    title: Is this address <em>safe to deal with?</em>
    lead: Check the address before you onboard a customer, accept a payment or whitelist a counterparty. DART looks at who the address is, who it deals with directly and where its money came from, counting only money that could actually have reached it. You get a 0–100 score, a verdict and the evidence for every point.
    ctas:
      - { label: Get access, href: /contact/ }
      - { label: Read the docs, href: /docs/ }
    visual: result

  - type: problems
    eyebrow: What makes address screening hard
    title: Three problems we hear most
    items:
      - problem: Everything looks "linked", so the result is useless
        detail: If you only ask whether two addresses connect, any active address hits something risky a few hops out.
        solution: |
          - A hop counts only if funds **arrived before they moved on**. Paths where money left before it arrived are dropped
          - Distant hops need more: 5% / 10% / 15% / 20% of the funds must be risky at hops 2 / 3 / 4 / 5
          - Exchange counterparties are exempt by default, so other exchanges' users never drag this address in
        proof: Excluded paths are listed too, with the reason they were excluded.
      - problem: You checked one chain, and the problem was on another
        detail: An EVM address is the same wallet on every EVM chain. A clean result on Ethereum says nothing about the rest.
        solution: |
          - **One call, every chain**: DART finds every chain and token where the address has activity and screens each one
          - The worst result goes on top, so you see at once which chain carries the risk
          - Turn on all-chain labels and labels from other EVM chains count too
        proof: About 226,000 Arbitrum addresses carry no label on Arbitrum but are high-risk on another chain.
      - problem: You have a score, but can't say why
        solution: |
          - Every hit lists its rule, direction, hop, amount, share and points
          - Highlighted hits are listed on their own, never diluted by the score
          - Incomplete data is flagged on the result, never silently passed
        proof: Each snapshot keeps the parameters, ruleset and evidence, ready for a review or an examiner.

  - type: steps
    eyebrow: What DART checks
    title: Three kinds of hit, checked at once
    lead: Risk can come from the address itself or from the money it has touched. DART checks both inbound (where money came from) and outbound (where it went), weighted differently.
    items:
      - { label: Own label, title: The address itself is labeled, text: "For example, it is on a sanctions list, frozen by a stablecoin issuer, or belongs to a hacker or a mixer. Severe categories score 100 and are blocked by default." }
      - { label: Direct contact, title: It dealt with a risky address directly, text: "It received from or sent to a risky address within one hop. That is a hit from 10 USD up, whatever its share, then scored by amount and share." }
      - { label: Indirect exposure, title: Risky funds a few hops away, text: "Funds passed through other addresses on the way. They count only if the timing holds and the share clears that hop's bar. We suggest 3 hops in and 1 out for everyday screening." }

  - type: split
    eyebrow: API
    title: One request, <em>every chain</em>
    text: Send just the address. DART finds every chain and token where it has activity, screens each one and puts the worst result on top. Chains with no activity are skipped and not counted.
    points:
      - Limit the chains with `chains`
      - Screen USDT and USDC on one chain together with `tokens`
      - Use `"mode":"async"` for deep traces of very active addresses
    ctas:
      - { label: API reference, href: "https://width.info/api-reference", style: ghost }
    visual: code
    code:
      title: POST /api/v3/screen/kya/multi
      body: |
        curl -X POST https://api.width.live/api/v3/screen/kya/multi \
          -H "X-Api-Key: $DART_API_KEY" \
          -H "Content-Type: application/json" \
          -d '{
            "address": "0x8a…c21e",
            "tokens": ["usdt", "usdc"]
          }'

        # → data.lanes[]: one result per chain and token
        # → data.score / data.risk: the worst lane, on top

  - type: faq
    eyebrow: FAQ
    title: Address screening questions
    items:
      - q: What is the difference between KYA and KYT?
        a: KYA assesses an address as a whole, for onboarding, whitelisting or before you accept funds. KYT checks one specific deposit or withdrawal, where that money came from or where it is going. Both run on the same data and engine, and teams often use them together.
      - q: Which chains and tokens are covered?
        a: USDT and USDC on Tron and the major EVM chains. The live list comes from `GET /api/v3/chains`, and new chains are available as soon as they are added.
      - q: How long does a screening take?
        a: A label-only check usually returns within a second. A fully traced screening takes 0.61 s at the median, and 90% finish within 5 s. For very active addresses traced deep, async mode keeps your flow moving.
      - q: Will an address be flagged just for dealing with an exchange?
        a: No. Exchange counterparties are exempt by default. A path stops at an ordinary exchange, so other users of that exchange never drag this address in. Sanctioned or high-risk exchanges are never exempt.
      - q: Can we change the thresholds?
        a: Yes. Verdict bands, points per rule and the share threshold for each hop all follow your risk appetite. Built-in rulesets are read-only, so copy one and edit the copy.

  - type: cta
    eyebrow: See it on your own data
    title: Run a batch of addresses <em>side by side</em>
    text: Nothing to switch off. Send us a batch of addresses (anonymized is fine). We return each result with its risk path and explain every difference from your current tool.
    ctas:
      - { label: Get access, href: /contact/ }
      - { label: Transaction screening (KYT), href: /products/kyt/ }
---
