---
title: "The Binance hot-wallet hack: where roughly $6.3 billion went, and what compliance teams should do now"
slug: binance-hack-2026-brief
description: In the early hours of 30 October 2026, 11 Binance hot wallets across 8 chains were drained at once. Binance estimates about $6.3 billion stolen, with about $3 billion frozen on-chain. A timeline and fund trail built from official announcements and public on-chain transactions, plus what exchanges, wallets, card issuers and payment firms should check now.
date: 2026-10-30
category: incidents
author: Width DART team
cover: /assets/uploads/blog/binance-hack-brief.webp
coverAlt: "DART incident brief (Chinese): key figures, fund flow, timeline and attack method for the Binance hot-wallet hack"
tags: [DART Brief, incident review, exchange hacks, EIP-7702, KYT, fund tracing]
---

**DART Brief · Incident review**

From 04:04 Beijing time (UTC+8) on 30 October 2026, 11 Binance hot wallets on 8 chains were drained at the same time. Binance estimates that about $6.3 billion was stolen, and puts the amount already frozen on-chain at about $3 billion. The investigation is ongoing. Every figure below is as of 30 October and may change.

## What happened

| Key figure | Value | Source |
|---|---|---|
| Assets stolen | About $6.3 billion | Binance estimate |
| Frozen on-chain | About $3 billion | Binance figure |
| Scope | 8 chains, 11 hot wallets | Public on-chain transactions |
| Speed | About $6.07 billion moved out in the first 55 minutes | Public on-chain transactions |

- **Binance's response:** it suspended all deposits and withdrawals at 08:30 Beijing time. Binance says its SAFU fund and company funds will cover the full loss.
- **Attribution:** widely attributed to North Korea's Lazarus Group. This has not been officially confirmed.

## Timeline (Beijing time, UTC+8)

| Time | Event |
|---|---|
| 28 October | The attacker draws start-up funds from Tornado Cash |
| 23:59 (before the attack) | A sweeper contract is deployed and test-run |
| 30 October, 04:04 | **The attack begins** with a first transfer out of an XRP hot wallet |
| 04:20 | One transaction submits 50 EIP-7702 authorizations; one takes effect |
| 04:24 | An Ethereum hot wallet is swept in one go: **about $2.5 billion** |
| 04:41 | About $820 million in USDC moves out |
| 05:01 | Tether and Circle begin freezing the stablecoins involved |
| 05:44 | The authorization is still live; a second sweep takes about $200 million in USDT |
| 08:30 | Binance suspends all deposits and withdrawals |

The issuers started freezing 57 minutes after the attack began. By then, about $6.07 billion had already left.

## How the attack worked: two accounts

There are two accounts so far. We list both and don't take a side.

- **Binance's preliminary investigation:** a DevOps engineer's computer was compromised. The attacker used it to get into service containers and submit unauthorized withdrawals. Binance says it found no evidence of a private-key leak.
- **On-chain security researchers:** the attacker used an EIP-7702 delegation to point an Ethereum hot wallet's code at the sweeper contract. Once active, the delegation stays bound to the address, and rotating keys behind the scenes doesn't remove it. That's why a second sweep followed 80 minutes after the first, at 05:44.

The two accounts don't contradict each other. One describes how the attacker got in; the other, how the money was moved. Binance's later announcements will settle it.

## How the funds moved

This is the state of funds visible in public on-chain transactions as of 07:50 Beijing time on 30 October, valued at prices when they moved: about $6.28 billion in total. We don't publish addresses. The attacker's side appears as "the attacker address cluster".

**Step 1: from Binance hot wallets to the attacker address cluster (US$ millions, rounded)**

| Chain | Amount moved |
|---|---|
| Ethereum | 3,740 |
| Bitcoin | 1,470 |
| Tron | 630 |
| XRP | 300 |
| Solana | 100 |
| Arbitrum, Avalanche, Optimism | 60 |

**Step 2: where the money is now**

| Status | Amount | Notes |
|---|---|---|
| Frozen | About $2.80 billion | Includes about $1.77 billion by Tether and $820 million by Circle |
| Still movable | About $3.27 billion | Native assets such as BTC, ETH, XRP and TRX |
| Sold or other | About $210 million | Includes amounts sold before blacklisting took effect |

The on-chain snapshot (about $2.8 billion frozen) and Binance's figure (about $3 billion) cover different times and scopes. We show both.

## Three takeaways

1. **Freezes only rescue stablecoins.** More than half the stolen funds are native assets that no issuer can freeze. Tracing and downstream blocking are the only levers left.
2. **EIP-7702 authorizations are a new privileged operation.** Know the moment a hot wallet's code delegation changes. After a compromise, clear the delegation first, then rotate keys.
3. **Stolen funds flow downstream.** The roughly $3.27 billion still movable will be swapped and cashed out somewhere. Exchanges, wallets, card issuers and payment firms should watch deposit sources closely for the next few weeks.

## What compliance teams should do now

**1. Re-screen stablecoin deposits since 30 October.** Native assets are likely to be swapped into USDT or USDC before moving on. Run your USDT and USDC deposits from this period back through the deposit ruleset in [DART stablecoin KYT](/products/kyt/):

- DART's label store includes hack labels. Verified addresses linked to the incident are added and updated as the investigation develops.
- Direct contact with a hack-labeled address, one hop away, hits once it exceeds $10. No share threshold applies.
- Further out, a hit counts by default only when tainted funds make up at least 5%, 10%, 15% or 20% of the flow at hops 2, 3, 4 or 5. Hop depth is configurable. An address that brushed against a trace of stolen funds isn't blocked wholesale.

**2. Mark hack rules as highlights (★).** Hits on a ★ rule are listed on their own, so a high score elsewhere can't bury them. Your policy can require "any highlight goes to review at least". For the next few weeks, the extra look is worth it.

**3. Leave ordinary Binance users alone.** Tracing stops at regular exchanges. A user who withdraws from Binance and deposits with you isn't caught up in Binance's loss. What you want to stop is money that flowed from the attacker address cluster.

**4. When a deposit looks suspicious, trace the full trail.** In [DART investigations](/products/investigations/), put up to 500 transactions into one case and trace them downstream together. Addresses where several transactions converge come first. Current balances are read straight from the chain: unlabeled addresses are freeze leads, and exchanges can be sent freeze requests. Every query is saved as a snapshot, so the basis for your review or report is always on file.

**5. If you run hot wallets, check their code delegations.** This one isn't about DART, but it matters just as much. Check whether any hot-wallet address has an active EIP-7702 delegation. Alert on delegation changes in real time. Put "clear delegations, then rotate keys" into your incident playbook.

## Sources

- Binance official announcements: estimated amounts stolen and frozen, preliminary findings, suspension of deposits and withdrawals, loss coverage
- Tether and Circle issuer announcements: stablecoin freezes
- Public on-chain transactions: amounts by chain, fund status, timeline, EIP-7702 authorizations
- Public reporting: attribution, and on-chain security researchers' analysis of the attack method

Figures as of 30 October 2026; on-chain fund status as of 07:50 Beijing time on 30 October. The investigation is ongoing and amounts may change.

---

Want to know whether any deposits since 30 October touch these funds? [Talk to us](/contact/) and run your historical deposit data through DART side by side.
