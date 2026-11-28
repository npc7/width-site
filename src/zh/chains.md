---
layout: layouts/page.njk
permalink: /zh/chains/
title: 支持的链与稳定币
fullTitle: 支持的链与稳定币：Tron 与 EVM 链上的 USDT、USDC · Width DART
description: DART 目前能筛查的链和稳定币，覆盖 Tron、以太坊、BSC、Arbitrum、Base 等。贴一个地址，自动识别它有流水的所有链并一次筛完；USDT0 和 Circle CCTP 跨链在目标链上续追。
breadcrumb:
  - { label: 平台总览, href: /platform/ }
  - { label: 支持的链 }
sections:
  - type: hero
    compact: true
    eyebrow: 支持的链
    title: 贴一个地址，<em>所有链一次筛完</em>
    lead: DART 筛查 Tron 和 EVM 链上的稳定币。贴一个地址，DART 自动找出它在哪些链、哪些币种上有流水，一次调用全部筛完。
    ctas:
      - { label: 开通账号, href: /contact/ }
      - { label: 地址筛查 KYA, href: /products/kya/ }
    visual: orbit

  - type: table
    eyebrow: 覆盖范围
    title: 现在能筛的<em>链和稳定币</em>
    head: [链, 稳定币, 地址类型]
    rows:
      - [Tron, USDT, "Tron（T 开头）"]
      - [Ethereum, "USDT、USDC", "EVM（0x 开头）"]
      - [BSC, "USDT、USDC", "EVM（0x 开头）"]
      - [Arbitrum, "USDT、USDC", "EVM（0x 开头）"]
      - [Polygon, "USDT、USDC", "EVM（0x 开头）"]
      - [Hyperliquid, "USDT、USDC", "EVM（0x 开头）"]
      - [Morph, "USDT、USDC", "EVM（0x 开头）"]
      - [Base, USDC, "EVM（0x 开头）"]
      - [Arc, USDC, "EVM（0x 开头）"]
      - [Plasma, USDT, "EVM（0x 开头）"]
      - [Robinhood, USDG, "EVM（0x 开头）"]
    note: "截至 2026 年 11 月 28 日。实时列表以接口 `GET /api/v3/chains` 返回为准，新增的链一上线就会出现在接口返回里。"

  - type: cards
    tone: alt
    eyebrow: 多条链，同一个钱包
    title: 一个地址，<em>哪条链都不漏</em>
    columns: 3
    items:
      - tag: 全链 KYA
        title: 一次调用，所有链
        text: "`POST /api/v3/screen/kya/multi` 自动找出这个地址有流水的链和币种，逐个筛查。"
        points:
          - 风险高的链排在前面
          - 每条链、每个币种单独存快照
        href: /products/kya/
        link: 地址筛查
      - tag: all_chain_labels
        title: 其他 EVM 链的标签也算数
        text: "同一个 0x 地址在所有 EVM 链上是同一个钱包，但资金和标签按链存放。打开 `all_chain_labels`，其他 EVM 链上的标签也参与判定。"
        points:
          - Arbitrum 上约 22.6 万个地址本链没有标签、在其他链上是高风险
          - 从其他链带来的标签会写明来自哪条链
        href: /docs/cross-chain/
        link: EVM 多链与跨链
      - tag: 资金追踪
        title: 跨桥、过兑换不断线
        text: "USDT0 和 USDC（Circle CCTP）跨链后，资金追踪在目标链上接着追。"
        points:
          - CCTP 覆盖 Ethereum、Arbitrum、Base、Polygon、Arc
          - DEX 兑换在同一笔交易内解析
        href: /products/investigations/
        link: 资金追踪与调查

  - type: split
    eyebrow: 不覆盖的资产
    title: 其他资产，<em>继续用现有工具</em>
    text: DART 只做稳定币。BTC、Solana 和其他非稳定币资产不支持，这部分请继续用你现在的工具，USDT 和 USDC 交给 DART 并行筛查。
    points:
      - 做链选择器前，先用 `GET /api/v3/chains` 读实时列表
      - 用返回里的地址类型校验用户输入
    ctas:
      - { label: 开发者与 API, href: /developers/, style: ghost }

  - type: faq
    eyebrow: FAQ
    title: 关于支持的链，常被问到的
    items:
      - q: 怎么拿到实时的链列表？
        a: 调用 `GET /api/v3/chains`。它返回每条链、可筛的币种、默认币种和地址类型（`evm` 或 `tron`）。控制台的链选择器读的也是这个列表，新增链不用改代码。
      - q: 我需要先知道地址在哪条链上吗？
        a: 不需要。贴上地址，全链 KYA 会自动找出它有流水的链和币种，全部筛完。
      - q: EVM 地址为什么建议打开 all_chain_labels？
        a: 标签按链存放。一个地址在某条 EVM 链上被标为高风险，在另一条链上可能没有任何标签。打开 `all_chain_labels`，其他 EVM 链上的标签也参与判定。
      - q: 支持 BTC 或 Solana 吗？
        a: 不支持。DART 覆盖上表列出的链上的稳定币。BTC、Solana 和其他资产请继续用你现在的工具。

  - type: cta
    eyebrow: 给公链和稳定币团队
    title: 聊聊<em>上线首日</em>的筛查支持
    text: 如果你在筹备一条稳定币公链或一个新的稳定币，欢迎和我们聊聊上线当天的筛查支持，一起看看你的交易所、钱包和支付合作方需要什么。
    ctas:
      - { label: 联系我们, href: /contact/ }
      - { label: EVM 多链与跨链, href: /docs/cross-chain/ }
---
