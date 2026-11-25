---
layout: layouts/page.njk
permalink: /products/kya/
title: Address screening (KYA)
fullTitle: Crypto address risk screening for USDT & USDC | DART KYA · Width
description: Screen any USDT or USDC address across every chain it lives on. DART checks its own labels, direct and multi-hop exposure in time order, and returns a 0–100 score with a verdict.
breadcrumb:
  - { label: Platform, href: /platform/ }
  - { label: Address screening (KYA) }
sections:
  - type: hero
    compact: true
    eyebrow: KYA · Address screening
    title: Is This Address <em>Safe to Deal With?</em>
    lead: Before you onboard a customer, accept a payment or whitelist a withdrawal address, look it up. DART checks who the address is, who it deals with directly, and where its money came from hop by hop, then turns that into a 0–100 score and a clear next step.
    ctas:
      - { label: Get Free Access, href: /contact/ }
      - { label: Read the Docs, href: "https://width.info/docs" }
    note: Free until 31 December 2028
    visual: result

  - type: problems
    eyebrow: What address screening has to get right
    title: Why Screening One Address Is Harder Than It Looks
    items:
      - problem: Everything Comes Back "Linked to Risk"
        detail: Follow any busy address far enough and you will touch a risky one. A yes/no link tells you nothing.
        solution: |
          - A hop only counts if the funds **arrived before they left**. Paths that run backwards in time are dropped
          - The further away, the higher the bar: by default risky funds must make up 5% / 10% / 15% / 20% of the flow at hops 2 / 3 / 4 / 5
          - Exchange counterparties are exempt by default
        proof: A payment company ran the same address through another tool and DART. The other tool said "medium-low risk, review". DART scored it 0. Broken down transfer by transfer, the risky funds could not have reached it in time.
      - problem: You Checked One Chain, the Trouble Was on Another
        detail: An EVM address is the same wallet on every EVM chain. Clean on Ethereum says nothing about the rest.
        solution: |
          - **All chains in one call**: DART finds every chain and token where the address has stablecoin activity and screens each one
          - The worst result comes back on top, so you see at once where the risk sits
          - Or narrow it to specific chains, or screen USDT and USDC on one chain together
        proof: 11 chains covered. Chains with no activity are skipped and not charged.
      - problem: You Have a Score but Can't Say Why
        solution: |
          - Every hit is listed: rule, direction, hop, amount, share of funds, points added
          - Excluded paths show their reason too: backwards in time, share too small, exchange exemption
          - Every screening is saved as an immutable snapshot
        proof: Pull the snapshot when a reviewer or regulator asks how a decision was made.

  - type: steps
    eyebrow: How it works
    title: Three Ways an Address Can Be Hit, Checked in One Pass
    lead: Risk can sit on the address itself or on the money that passed through it. DART looks at both inflow (where funds came from) and outflow (where they went), with separate weights for each direction.
    items:
      - { label: Self-hit, title: The Address Carries a Risk Label, text: "It is on a sanctions list, frozen by a stablecoin issuer, or belongs to a hacker or mixer. A self-hit scores 100 by default and is a block." }
      - { label: Direct exposure, title: It Dealt with a Risky Address in One Hop, text: "It received from, or sent to, a risky address directly. Scored by amount and share of funds." }
      - { label: Layered exposure, title: Enough Risky Funds Survive Several Hops, text: "Funds passed through intermediaries, in valid time order, and still clear that hop's threshold. Hops are configurable; we suggest 3 inbound and 1 outbound for daily screening." }

  - type: split
    eyebrow: API
    title: One Request, Every Chain
    text: Send just the address. DART finds every chain and token where it has stablecoin activity, screens each lane and puts the worst result on top. Most addresses come back within a minute.
    points:
      - Limit the chains with `chains`
      - Screen USDT and USDC together with `tokens`
      - Go async with `"mode":"async"`
    ctas:
      - { label: API Reference, href: "https://width.info/api-reference", style: ghost }
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
    title: Address Screening Questions
    items:
      - q: What is the difference between KYA and KYT?
        a: KYA looks at an address as a whole, which suits onboarding, whitelisting and checks before you accept funds. KYT looks at one specific deposit or withdrawal and asks where that money came from or where it is going. Both run on the same data and rules engine and are often used together.
      - q: Which chains and tokens are supported?
        a: DART focuses on USDT and USDC and currently covers 11 chains. The live list is available from the API, and new chains become available automatically.
      - q: How long does a screening take?
        a: Sanctions checks return in under a second. Most full address screenings come back within a minute; very active addresses traced deep take longer, and async mode keeps your flow moving while they run.
      - q: Will an address be flagged just because it used an exchange?
        a: No. Exchange counterparties are exempt by default, so a path stops at the exchange instead of blaming your user for what other customers of that exchange did. You can switch this off for strict sanctions screening.
      - q: Can I change the thresholds?
        a: Yes. Verdict bands, rule points and per-hop thresholds can all be tuned to your risk appetite. Built-in rulesets are read-only; clone one and edit the copy.
      - q: How do I get started?
        a: Contact us to open an account. Console, API and MCP all use the same account, and DART is free until 31 December 2028.

  - type: cta
    eyebrow: Free access
    title: Run Your Past Addresses <em>Side by Side</em>
    text: Keep your current system running. Send us a batch of addresses, anonymized is fine, and we return a result and risk path for each one.
    points:
      - Includes a **diff against your current tool**, with the reason for every difference
      - Free until **31 December 2028**
    ctas:
      - { label: Get Free Access, href: /contact/ }
      - { label: Transaction Screening (KYT), href: /products/kyt/ }
---
