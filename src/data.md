---
layout: layouts/page.njk
permalink: /data/
title: "Width Data: stablecoin freezes, security incidents, sanctions actions"
description: Public trackers built on Width's onchain data, covering stablecoin issuer freezes, where hacked funds went, and new sanctions and enforcement actions. Every tracker ships with its methodology.
breadcrumb:
  - { label: Data hub }
sections:
  - type: hero
    compact: true
    eyebrow: Width Data
    title: What Happened Onchain, <em>in Numbers, Every Week</em>
    lead: Which addresses were frozen, which hacked funds are on the move, which new listings just took effect. We turn the public part of the stablecoin flows we process every day into trackers you can follow.
    ctas:
      - { label: Get Updates, href: /contact/ }
      - { label: Exchange Flows, href: "https://width.info/exchange-flows", style: ghost }

  - type: boards
    items: [freeze, incidents, sanctions]

  - type: cards
    id: method
    tone: alt
    eyebrow: Methodology
    title: How We Build These Trackers
    columns: 2
    items:
      - { title: Public, traceable data only, text: "Trackers use public event-level and entity-level data. Every number traces back to an onchain transaction or an official publication." }
      - { title: Scope Stated Up Front, text: "Each tracker states its scope, time basis and update cadence. Amounts are taken at the time of the freeze or incident and may change as funds are handled." }
      - { title: No Labels on Individuals, text: "We don't publish specific risky addresses and we don't call any individual address a scam or laundering wallet." }
      - { title: Every Side of the Story, text: "Attribution only follows official confirmation. Where accounts differ, we list them all and don't pick a side." }

  - type: cta
    title: Want the Data or an Embed?
    text: 'Media, researchers and channel partners can request tracker data and embeds. Please cite "Data: Width".'
    ctas:
      - { label: Contact Us, href: /contact/ }
      - { label: Partners, href: /partners/, style: ghost }
---
