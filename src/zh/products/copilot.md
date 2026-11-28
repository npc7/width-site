---
layout: layouts/page.njk
permalink: /zh/products/copilot/
title: DART Copilot AI 助手
fullTitle: DART Copilot｜在 AI 助手里做链上风险筛查（MCP） · Width
description: DART Copilot 把 USDT / USDC 风险筛查带进 Claude Code、Cursor、Codex 等支持 MCP 的 AI 工具。19 个工具覆盖地址筛查、交易筛查、读取结果和管理规则集；分数始终由 DART 规则引擎计算，由你的团队拍板。
breadcrumb:
  - { label: 平台, href: /platform/ }
  - { label: DART Copilot }
sections:
  - type: hero
    compact: true
    eyebrow: DART Copilot · AI 助手
    title: AI 跑腿，<br><em>合规官签字</em>
    lead: 「帮我查一下这个地址能不能收」「这笔充值为什么被判复核」「把第 3 跳的门槛调到 15%」。Copilot 就在你团队已经在用的 AI 工具里，通过 MCP 直接筛查、读结果、改规则集，和控制台、API 用同一个账号、同一批快照。
    ctas:
      - { label: 申请 API Key, href: /contact/ }
      - { label: 开发者文档, href: /developers/ }
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
    eyebrow: 合规团队的时间花在哪
    title: 跑腿的活，<em>交给 Copilot</em>
    items:
      - problem: 复核一单要翻好几个页面
        solution: |
          - Copilot 读取筛查结果和快照，用一段话解释命中路径、跳数、占比和加分
          - 复核员只需要判断，不用自己拼信息
        proof: 结果里的每一分都对应一条规则，Copilot 的解释有据可查。
      - problem: 改规则要懂条件语法
        solution: |
          - 用自然语言描述口径，Copilot 帮你复制内置规则集、写条件、调分值
          - 规则集和规则的增删改查都有对应工具
        proof: 内置规则集只读，Copilot 只能改你自己的副本。
      - problem: 想把风控嵌进自己的 AI 产品
        solution: |
          - 钱包助手、客服机器人、交易 Agent 都可以在转账前调用筛查
          - 标准 MCP 协议，换模型、换框架都不用重写
        proof: 已有 AI 机器人基于 DART 提供地址查询。

  - type: split
    tone: alt
    eyebrow: 为什么信得过
    title: 模型负责解释，<em>引擎负责打分</em>
    text: DART 的分数从来不由大模型来算。Copilot 发起的每一次筛查，都走 DART 的规则引擎和你看得见的规则集，和在控制台、API 里筛完全一样。同样的输入，得到同样的结果。
    points:
      - 每个工具对应同名的 HTTP 接口，返回的数据一致
      - 每次筛查都存成快照，原样留存参数、规则集和证据，任何一个分数都能复核、复现
      - 结论以快照为准，不以 AI 的复述为准
      - Copilot 负责建议和执行，处置（通过、复核、加强尽调、拦截）由人来定
    visual: result

  - type: steps
    eyebrow: 怎么用
    title: 从一个问题，<em>到一个决定</em>
    items:
      - { label: 问, title: 用大白话提问, text: 「用 DART 查一下这个 Tron 地址，流入 3 跳、流出 1 跳，告诉我能不能收。」 }
      - { label: 跑, title: Copilot 调用 DART, text: 它选对工具，例如 `screen_address` 或 `screen_address_all_chains`，由 DART 的引擎完成筛查。 }
      - { label: 讲, title: 读证据、讲清楚, text: 读取结果和快照，解释分数背后的路径、跳数、占比和加分。 }
      - { label: 签, title: 合规官拍板, text: 复核员看过证据，决定怎么处置。Copilot 只负责跑腿，不替你做决定。 }

  - type: split
    reverse: true
    eyebrow: 规则集
    title: 改一条规则，<em>马上看差别</em>
    text: 说出你想怎么改，Copilot 复制内置规则集、写好条件，提交前先把完整规则给你看。改完用原任务约 1 秒重新判定，不重新追资金，前后结果并排对比。
    points:
      - 复制一份规则集专门给 Copilot 改，确认效果后再同步到正式规则集
      - 内置规则集只读，正式默认口径不会被动到
      - 正式筛查用哪个规则集 id，由你的系统决定，不交给模型
    ctas:
      - { label: 规则集与评分, href: /products/rulesets/, style: ghost }
    visual: code
    code:
      title: 对 Copilot 说
      body: |
        > 复制内置 KYA 规则集，
          命名为「测试 v1」。

        > 在「测试 v1」里加一条规则：
          两跳内混币器资金占比 ≥ 10% 时复核。
          先给我看规则内容，我确认后再创建。

        > 把「测试 v1」里所有制裁类规则
          标为重点关注（★）。

  - type: table
    tone: alt
    eyebrow: 19 个工具
    title: Copilot 能做的事
    head: [分组, 工具, 用途]
    rows:
      - [筛查, "`screen_address`、`screen_address_all_chains`、`screen_transaction`", 地址筛查、全链筛查、交易筛查]
      - [辅助, "`list_chains`、`list_transfers`", 支持的链和币种；列出一笔交易里的代币转账]
      - [结果, "`get_screen_result`、`get_snapshot`", 读取异步结果和历史快照]
      - [规则集, "`list_rulesets`、`get_ruleset`、`create_ruleset`、`update_ruleset`、`delete_ruleset`、`clone_ruleset`", 查看、新建、复制、修改规则集]
      - [规则, "`list_rules`、`get_rule`、`create_rule`、`update_rule`、`delete_rule`、`highlight_rules`", 查看和编辑规则、标记重点规则]
    note: 每个工具对应同名的 HTTP 接口，返回的数据结构一致。

  - type: cards
    eyebrow: 给 AI 读的
    title: 你的 AI 助手<em>读得懂</em>
    columns: 4
    items:
      - { tag: llms.txt, title: llms.txt, text: 给大模型读的接口说明，单文件完整版见 llms-full.txt。, href: "https://width.info/llms.txt" }
      - { tag: OpenAPI, title: OpenAPI 3.1, text: 所有接口的 schema，用来生成客户端或工具定义。, href: "https://width.info/openapi.json" }
      - { tag: Skill, title: Agent Skill, text: 现成的 Skill 文件，放进 AI 助手就能用。, href: "https://width.info/agent/SKILL.md" }
      - { tag: 开源, title: AMLClaw, text: 基于 DART API 的开源合规工作台：筛查，以及地址和交易监控。, href: "https://github.com/amlclaw/amlclaw.com" }

  - type: faq
    eyebrow: 常见问题
    title: 关于 Copilot
    items:
      - q: 支持哪些 AI 工具？
        a: 支持 MCP 协议的都可以，例如 Claude Code、Cursor、Codex 等。把上面的配置加进去，填上 API Key 就能用。问一句「DART 支持哪些链」，能返回结果就说明接通了。
      - q: 分数是大模型算的吗？
        a: 不是。分数由 DART 的规则引擎按你选的规则集计算。Copilot 负责调用引擎、读结果、做解释，处置由人来定。
      - q: MCP 和 API 有什么区别？
        a: 能力一样，每个 MCP 工具对应一个同名的 HTTP 接口。MCP 适合 AI 助手直接调用，API 适合系统集成。两者共用一个账号、同一份额度和同一批快照。
      - q: Copilot 会不会误改规则？
        a: 内置规则集只读，Copilot 只能修改你自己复制出来的规则集。让它提交前先列出完整改动，你确认后再执行。每次筛查用的是哪一版规则，快照里都有记录。
      - q: 筛查结果怎么让 Copilot 解释给用户？
        a: 结果里列明了命中的规则、路径、跳数、金额、占比和加分，Copilot 可以据此用自然语言解释。建议对外展示时只说命中了哪类公开来源，不给个人地址下定性。

  - type: cta
    eyebrow: 先试再说
    title: 拿一个 API Key，<em>接上就能用</em>
    text: 控制台、API、Copilot 用同一个账号。
    points:
      - 工程师直接在群里支持
    ctas:
      - { label: 开通账号, href: /contact/ }
      - { label: 开发者文档, href: /developers/ }
---
