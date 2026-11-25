---
layout: layouts/page.njk
permalink: /zh/products/agents/
title: AI 助手（MCP）
fullTitle: DART MCP｜让 AI 助手直接做链上风险筛查 · Width
description: DART 开放 MCP 接入，19 个工具覆盖地址筛查、交易筛查、读取结果和管理规则集。Claude Code、Cursor、Codex 等 AI 助手接上就能查 USDT / USDC 地址风险。
breadcrumb:
  - { label: 平台, href: /platform/ }
  - { label: AI 助手（MCP） }
sections:
  - type: hero
    compact: true
    eyebrow: AI 助手
    title: 一句话，<br><em>让 AI 帮你查地址</em>
    lead: 「帮我查一下这个地址能不能收」「这笔充值为什么被判复核」「把第 3 跳的门槛调到 15%」。DART 开放 MCP，AI 助手直接调用筛查、读结果、改规则，和控制台、API 用同一个账号、同一批快照。
    ctas:
      - { label: 免费拿 API Key, href: /contact/ }
      - { label: 开发者文档, href: /developers/ }
    note: 接入 DART，免费用到 2028 年 12 月 31 日
    visual: code
    code:
      title: mcp.json
      body: |
        {
          "mcpServers": {
            "width-dart": {
              "url": "https://api.width.live/mcp",
              "headers": {
                "Authorization": "Bearer <你的 API Key>"
              }
            }
          }
        }

  - type: problems
    eyebrow: 为什么要接 AI
    title: 合规团队的时间，花在了哪里
    items:
      - problem: 复核一单要翻好几个页面
        solution: |
          - 让 AI 读取筛查结果和快照，用一段话解释命中路径、跳数、占比和加分
          - 复核员只需要判断，不用自己拼信息
        proof: 结果里的每一分都对应一条规则，AI 的解释有据可查。
      - problem: 改规则要懂条件语法
        solution: |
          - 用自然语言描述口径，AI 帮你复制内置规则集、写条件、调分值
          - 规则集和规则的增删改查都有对应工具
        proof: 内置规则集只读，AI 只能改你自己的副本。
      - problem: 想把风控嵌进自己的 AI 产品
        solution: |
          - 钱包助手、客服机器人、交易 Agent 都可以在转账前调用筛查
          - 标准 MCP 协议，换模型、换框架都不用重写
        proof: 已有 AI 机器人基于 DART 提供地址查询。

  - type: table
    tone: alt
    eyebrow: 19 个工具
    title: AI 能做的事
    head: [分组, 工具, 用途]
    rows:
      - [筛查, "`screen_address`、`screen_address_all_chains`、`screen_transaction`", 地址筛查、全链筛查、交易筛查]
      - [辅助, "`list_chains`、`list_transfers`", 支持的链和币种；列出一笔交易里的代币转账]
      - [结果, "`get_screen_result`、`get_snapshot`", 读取异步结果和历史快照]
      - [规则集, "`list_rulesets`、`get_ruleset`、`create_ruleset`、`update_ruleset`、`delete_ruleset`、`clone_ruleset`", 查看、新建、复制、修改规则集]
      - [规则, "`list_rules`、`get_rule`、`create_rule`、`update_rule`、`delete_rule`、`highlight_rules`", 查看和编辑规则、标记重点规则]
    note: 每个工具对应同名的 HTTP 接口，返回的数据结构一致。

  - type: faq
    eyebrow: 常见问题
    title: 关于 MCP 接入
    items:
      - q: 支持哪些 AI 工具？
        a: 支持 MCP 协议的都可以，例如 Claude Code、Cursor、Codex 等。把上面的配置加进去，填上 API Key 就能用。
      - q: MCP 和 API 有什么区别？
        a: 能力一样，每个 MCP 工具对应一个同名的 HTTP 接口。MCP 适合 AI 助手直接调用，API 适合系统集成。两者共用一个账号、同一份额度和同一批快照。
      - q: AI 会不会误改规则？
        a: 内置规则集只读，AI 只能修改你自己复制出来的规则集。每次筛查用的是哪一版规则，快照里都有记录。
      - q: 筛查结果怎么让 AI 解释给用户？
        a: 结果里列明了命中的规则、路径、跳数、金额、占比和加分，AI 可以据此用自然语言解释。建议对外展示时只说命中了哪类公开来源，不给个人地址下定性。

  - type: cta
    eyebrow: 免费接入
    title: 拿一个 API Key，<em>接上就能用</em>
    text: 控制台、API、MCP 用同一个账号。
    points:
      - 接入 DART，免费用到 **2028 年 12 月 31 日**
      - 工程师直接在群里支持
    ctas:
      - { label: 免费接入, href: /contact/ }
      - { label: 开发者文档, href: /developers/ }
---
