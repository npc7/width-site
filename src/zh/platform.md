---
layout: layouts/page.njk
permalink: /zh/platform/
title: DART 平台总览：数据、追踪、规则、评分
description: DART 是以稳定币为核心的链上风控引擎：2 亿已标注地址、按时间顺序的资金追踪、72 条公开规则、按资金占比的 0–100 评分。控制台、API、MCP 同一个账号。
breadcrumb:
  - { label: 平台总览 }
sections:
  - type: hero
    compact: true
    eyebrow: 平台总览
    title: 一套引擎，<em>从数据到处置</em>
    lead: DART 把链上数据、资金追踪、规则判断和评分放进同一套引擎。你提交一个地址或一笔交易，拿回一个分数、一个处置建议，以及每一分背后的依据。
    ctas:
      - { label: 免费接入, href: /contact/ }
      - { label: 看产品手册, href: "https://width.info/docs" }
    visual: result

  - type: steps
    eyebrow: 四层结构
    title: 每一层都是我们自己做的
    lead: 数据、标签、规则、评分都是自建的，所以能按你的口径改，也能说清每一个结论从哪来。
    items:
      - { label: 第 1 层, title: 链上数据层, text: 11 条链的 USDT / USDC 流水，近实时更新。 }
      - { label: 第 2 层, title: 地址标签, text: 2 亿已标注地址，九成以上是交易所地址；制裁、冻结、黑客等风险标签持续更新。 }
      - { label: 第 3 层, title: 时序资金追踪, text: 逐跳展开上下游，只保留时间上流得过来的路径。 }
      - { label: 第 4 层, title: 规则与评分, text: 路径匹配规则判断违规，评分规则集按资金占比给出 0–100 分和处置。 }

  - type: cards
    tone: alt
    eyebrow: 能力
    title: 按你要回答的问题选
    columns: 3
    items:
      - { tag: KYA, title: 地址筛查, text: 这个地址能不能打交道？自身命中、直接往来、多跳暴露一次看清。, href: /products/kya/ }
      - { tag: KYT, title: 交易筛查, text: 这笔充值从哪来，这笔提现打到哪去？按方向分别判断。, href: /products/kyt/ }
      - { tag: 制裁, title: 制裁筛查, text: 官方制裁名单上的实体、个人、公司和地址，1 秒内返回。, href: /products/sanctions/ }
      - { tag: 追踪, title: 资金追踪与调查, text: 跨跳、跨链追资金去向，导出追踪报告。, href: /products/investigations/ }
      - { tag: 规则, title: 规则集与评分, text: 72 条公开规则、可改的评分矩阵，把你的风险偏好写成规则。, href: /products/rulesets/ }
      - { tag: MCP, title: AI 助手, text: 19 个 MCP 工具，AI 助手直接查地址、看结果、改规则。, href: /products/agents/ }

  - type: split
    reverse: true
    tone: alt
    eyebrow: 处置
    title: 四档处置，<em>不是一刀切</em>
    text: 每次筛查给出 0–100 分和四档处置建议。合规团队按档位分流，真正需要人工处理的单子尽量少。阈值和每条规则的分值都可以按你的风险偏好调整。
    points:
      - 自身命中制裁等严重标签，直接 100 分、拦截
      - 流入、流出分开加权，跳数越远权重越低
      - 每次筛查保存为不可篡改的快照
    visual: scores

  - type: faq
    eyebrow: FAQ
    title: 常见问题
    items:
      - q: DART 支持哪些链和币种？
        a: DART 专注 USDT 和 USDC，目前覆盖 11 条链。粘贴一个地址会自动识别它在哪些链、哪些币种上有流水，一次筛完。BTC 等其他资产可以继续用你现有的工具，两边各管各的资产。
      - q: 追几跳？会不会很慢？
        a: 跳数可以按需配置，日常筛查建议流入 3 跳、流出 1 跳。制裁筛查 1 秒内返回；地址筛查多数在 1 分钟内返回，交易非常活跃的地址追得深时耗时更长，可以改用异步模式。
      - q: 规则能改吗？
        a: 能。内置规则集只读，复制一份后可以修改任意条件、阈值和分值。每个规则集独立保存，能说清某个时点用的是哪套规则。
      - q: 结果能给监管看吗？
        a: 每一分都对应一条规则，结果里列明命中路径、跳数、金额、占比和分值；每次筛查自动保存为不可篡改的快照，可以随时在控制台或通过 API 调出。
      - q: 收费吗？
        a: 接入 DART，免费用到 2028 年 12 月 31 日。控制台、API、MCP 全部可用，详见[价格](/zh/pricing/)。

  - type: cta
    title: 用你自己的数据<em>测一次</em>
    text: 给我们一批历史地址，其中包括你已确认有问题的和确认正常的。我们逐条给出结果、命中路径和差异说明。
    ctas:
      - { label: 免费接入, href: /contact/ }
      - { label: 预约演示, href: /contact/ }
---
