---
layout: layouts/page.njk
permalink: /zh/developers/
title: 开发者：KYT / KYA API、MCP、OpenAPI
description: DART 的 REST API、MCP 接入、OpenAPI 3.1、llms.txt 和 Agent Skill。一个 API Key，几行代码完成地址筛查和交易筛查，也能用 API 管理规则集。
breadcrumb:
  - { label: 开发者 }
sections:
  - type: hero
    compact: true
    eyebrow: 开发者
    title: 一个 API Key，<em>几行代码接入</em>
    lead: 地址筛查、交易筛查、读取快照、管理规则集，全部走同一套 REST API。AI 助手可以通过 MCP 直接调用同样的能力。
    ctas:
      - { label: API 文档, href: "https://width.info/api-reference" }
      - { label: 申请 API Key, href: /contact/, style: ghost }
    visual: code
    code:
      title: curl · KYA
      body: |
        curl -X POST https://api.width.live/api/v3/screen/kya \
          -H "X-Api-Key: $DART_API_KEY" \
          -H "Content-Type: application/json" \
          -d '{
            "chain_name": "Tron",
            "address": "T…",
            "token": "usdt",
            "inflow_hops": 3,
            "outflow_hops": 1
          }'

  - type: steps
    eyebrow: 快速开始
    title: 四步跑通第一次筛查
    items:
      - { label: 第 1 步, title: 拿到 API Key, text: 在控制台创建 API Key，放在请求头 X-Api-Key 里。 }
      - { label: 第 2 步, title: 筛一个地址, text: "POST /api/v3/screen/kya，默认同步返回结果；加 \"mode\": \"async\" 返回任务 ID。" }
      - { label: 第 3 步, title: 读结果, text: 看 score.verdict 和 hits，每条命中都带规则、跳数、金额和占比；快照可以随时用 ID 调出。 }
      - { label: 第 4 步, title: 按你的口径调, text: 复制内置规则集，改条件和分值，筛查时传 ruleset_id 和 scoring_ruleset_id。 }

  - type: table
    tone: alt
    eyebrow: 常用接口
    title: 常用接口
    head: [接口, 用途]
    rows:
      - ["`POST /api/v3/screen/kya`", 地址筛查（KYA）]
      - ["`POST /api/v3/screen/kya/multi`", 一个地址一次筛完所有有流水的链和币种]
      - ["`POST /api/v3/screen/kyt`", 交易筛查（KYT），按充值、提现方向判断]
      - ["`POST /api/v3/transaction-transfers`", 列出一笔交易里的所有代币转账，用于选择 KYT 的 event_index]
      - ["`GET /api/v3/screen/result/{jobId}`", 查询异步任务结果]
      - ["`GET /api/v3/snapshots/{snapshotId}`", 调出一次筛查的快照]
      - ["`GET /api/v3/chains`", 支持的链和币种，实时读取]
      - ["`POST /api/v3/rulesets/*`", 规则集和规则的增删改查、复制]
    note: 生产环境 `https://api.width.live`，测试环境 `https://test-api.width.live`（独立数据库，规则集 ID 与生产不同）。

  - type: cards
    eyebrow: 资源
    title: 文档和工具
    columns: 3
    items:
      - { tag: 文档, title: API 文档, text: 每个接口的参数、返回和示例，浏览器里直接调用。, href: "https://width.info/api-reference" }
      - { tag: 手册, title: 产品手册, text: 两套规则集、评分公式、控制台操作，配截图讲清楚。, href: "https://width.info/docs" }
      - { tag: OpenAPI, title: OpenAPI 3.1, text: 所有接口的 schema，用来生成 SDK 或工具定义。, href: "https://width.info/openapi.json" }
      - { tag: llms.txt, title: llms.txt, text: 给大模型读的接口说明，单文件完整版见 llms-full.txt。, href: "https://width.info/llms.txt" }
      - { tag: Skill, title: Agent Skill, text: 现成的 Skill 文件，放进 AI 助手就能用。, href: "https://width.info/agent/SKILL.md" }
      - { tag: 开源, title: AMLClaw, text: 基于 DART API 的开源合规工作台：筛查、地址和交易监控、证据报告。, href: "https://github.com/amlclaw/amlclaw.com" }

  - type: cta
    title: 拿一个 API Key 试试
    text: 接入 DART，免费用到 2028 年 12 月 31 日。工程师在群里直接支持对接。
    ctas:
      - { label: 申请 API Key, href: /contact/ }
      - { label: API 文档, href: "https://width.info/api-reference", style: ghost }
---
