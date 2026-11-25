---
layout: layouts/page.njk
permalink: /zh/products/investigations/
title: 资金追踪与调查
fullTitle: 链上资金追踪与调查｜USDT / USDC 跨跳、跨链追踪 · Width DART
description: DART 资金追踪：从一个地址或一笔交易出发，逐跳展开上下游资金图，USDC 支持 CCTP 跨链续追，每个对手方都带标签。给合规调查员和执法机构用。
breadcrumb:
  - { label: 平台, href: /platform/ }
  - { label: 资金追踪与调查 }
sections:
  - type: hero
    compact: true
    eyebrow: 资金追踪
    title: 钱从哪来、到哪去，<br><em>一张图看清</em>
    lead: 可疑充值要复核、被盗资金要追、案件要出报告。DART 从一个地址或一笔交易出发，逐跳展开上下游，每个对手方都带标签，时间上流不过来的路径自动排除，跨链转移也能接上。
    ctas:
      - { label: 预约演示, href: /contact/ }
      - { label: 执法机构合作, href: /partners/lea/ }
    visual: flow

  - type: problems
    eyebrow: 调查要解决的问题
    title: 追资金，最费时间的是什么
    items:
      - problem: 一个地址往外展开，几跳之后就成了一团乱麻
        detail: 活跃地址每一跳都有成百上千个对手方，人工根本看不过来。
        solution: |
          - 只保留**时间顺序成立**的路径：每一跳先到账、后转出
          - 设定最小金额、每跳最多展开的节点数，先看主干
          - 路径追到交易所等已知实体就截断，不往下无效展开
        proof: 同一套引擎支撑生产环境每天 30–40 万次 API 调用。
      - problem: 不知道每个对手方是谁
        solution: |
          - 2 亿已标注地址，九成以上是交易所地址；另有制裁、发行方冻结、黑客、诈骗、混币等风险标签
          - 图上每个节点直接显示标签和风险级别
        proof: 标签由情报团队持续核实和更新。
      - problem: 资金换了一条链，线索就断了
        solution: |
          - USDC 支持通过 **Circle CCTP** 跨链续追，换链转移也能接上
          - 一个地址自动识别它在哪些链、哪些币种上有流水，一次查全
        proof: 覆盖 11 条链的 USDT、USDC。

  - type: steps
    tone: alt
    eyebrow: 怎么用
    title: 从一条线索到一份报告
    items:
      - { label: 起点, title: 输入地址或交易, text: 被盗地址、可疑充值、举报地址都可以作为起点，自动识别链和币种。 }
      - { label: 展开, title: 上下游逐跳追踪, text: 往上游看钱从哪来，往下游看钱去了哪，跳数按案件需要配置。 }
      - { label: 研判, title: 标签和占比说话, text: 每条路径列出跳数、金额、时间和风险资金占比，判断哪条是真正的资金链。 }
      - { label: 留证, title: 快照和报告, text: 每次查询存为不可篡改的快照；重点案件由我们的分析师出追踪报告。 }

  - type: cards
    eyebrow: 给谁用
    title: 两类调查场景
    columns: 2
    items:
      - tag: 合规团队
        title: 可疑交易复核
        text: 筛查结果进了复核或加强尽调队列，调查员打开资金图，看清楚这笔钱的来龙去脉，再决定放行还是上报。
        points:
          - 命中路径和筛查结果联动，不用另开工具
          - 复核依据随快照留存
      - tag: 执法机构
        title: 案件追踪与证据
        text: 从受害人地址或涉案地址出发追资金去向，配合交易所、发行方冻结时提供证据包。身份核实后开通调查员账号。
        points:
          - 重点案件由我们的分析师出追踪报告
          - 每次查询都留痕
        href: /partners/lea/
        link: 了解执法合作

  - type: faq
    eyebrow: 常见问题
    title: 关于资金追踪
    items:
      - q: 能追多少跳？
        a: 跳数可以按需配置。日常筛查建议流入 3 跳、流出 1 跳；调查场景可以追得更深，同时用最小金额和每跳节点数控制展开范围。
      - q: 为什么有些路径被排除了？
        a: DART 要求每一跳先到账、后转出，时间上倒着流的路径说明这笔钱不可能来自那个源头，所以排除。结果里会写明排除原因。
      - q: 支持跨链追踪吗？
        a: USDC 支持通过 Circle CCTP 跨链续追。资金从一条链转到另一条链时，路径可以接上。
      - q: 执法机构怎么申请使用？
        a: 通过执法合作页面提交申请，我们核实机构身份后开通调查员账号，合作方式单独沟通。
      - q: 查询记录会保存吗？
        a: 会。每次查询都存为不可篡改的快照，记录当时的参数和完整结果，随时可以调出。

  - type: cta
    eyebrow: 预约演示
    title: 带一条真实线索来，<em>我们一起追</em>
    text: 合规团队和执法机构都可以预约演示，我们用你的案例现场展开资金图。
    points:
      - 合规团队：接入 DART，免费用到 **2028 年 12 月 31 日**
      - 执法机构：核实机构身份后开通，合作方式单独沟通
    ctas:
      - { label: 预约演示, href: /contact/ }
      - { label: 执法机构合作, href: /partners/lea/ }
---
