---
layout: layouts/page.njk
bodyClass: home-v2
title: 稳定币链上风控与 KYT 筛查
fullTitle: Width DART｜稳定币链上风控、KYT 交易筛查、地址风险筛查
description: DART 专做 USDT / USDC 链上风控，按资金的时间顺序逐跳追踪，误报少、1 秒内返回、每一分都说得清。交易所、钱包、支付公司、托管机构都在用，接入即免费用到 2028 年 12 月 31 日。
sections:
  - type: ledger
    eyebrow: WIDTH DART · 稳定币链上风控
    title: 收U之前，<br><em>先看清这笔钱从哪来</em>
    lead: "DART 专做 USDT / USDC 链上风控，按资金的时间顺序逐跳追踪。问题资金挡在门外，正常用户不被误伤。"
    ctas:
      - { label: 免费接入, href: /contact/ }
    note: 接入即免费用到 2028 年 12 月 31 日 · 控制台、API、MCP 全部可用
    stats:
      - { value: "30", unit: 万+, label: 每天生产环境 API 调用次数 }
      - { value: "< 1", unit: 秒, label: 制裁筛查返回 }
      - { value: "2", unit: 亿, label: 已标注地址，制裁、冻结、黑客等标签持续更新 }
      - { value: 当天, unit: 上线, label: FinCEN 9714 命令发布当天，规则集上线 }

  - type: showcase
    id: how
    title: 每一分<em>都说得清</em>
    lead: "路径匹配规则集回答「算不算违规」，评分规则集回答「有多严重、怎么处置」。两套规则集都可以按你的口径改。"
    items:
      - { tag: 时间顺序, title: "只算先到账、后转出的钱", text: "每一跳都看时间，时间上倒着流的路径直接排除，误报从源头减少。" }
      - { tag: 资金占比, title: "跳得越远，门槛越高", text: "默认第 2 / 3 / 4 / 5 跳风险资金占比达 5% / 10% / 15% / 20% 才计入。" }
      - { tag: 证据留存, title: "监管问为什么，直接调出", text: "每一分对应一条规则，命中路径、跳数、金额全部列出，快照不可篡改。" }

  - type: cases
    tone: alt
    eyebrow: 在生产环境
    title: 已经在用 DART 的机构
    items:
      - icon: wallet
        tag: 钱包
        metric: 7 万次+
        metricLabel: 接入一周内的单日筛查量
        title: 某头部自托管钱包
        text: FinCEN 9714 命令发布当天，就能在充提中识别相关资金；跳数等参数按他们的风控要求单独配置。
      - icon: users
        tag: 社交 · 支付
        metric: 付费会员
        metricLabel: 安全能力变成收入
        title: 某 Web3 社交平台
        text: 把 DART 打包进付费会员增值服务：用户每一笔收款、提款都做完整检测，避免把U打给恐怖融资地址。
      - icon: lock
        tag: 托管 · WaaS
        metric: 1.7–1.8 万次
        metricLabel: 工作日每天
        title: 某钱包与托管基础设施服务商
        text: 为旗下企业钱包的每笔充提做筛查，下游企业开箱即有 KYA / KYT，不用各自采购。
    note: 案例均匿名展示。数据来自 DART 生产环境，截至 2026 年 11 月。

  - type: audiences
    id: who
    eyebrow: 按你的业务看
    title: 你是哪一类机构？先说你的问题
    lead: 同一套数据和引擎，按不同业务的风控节点给出不同的用法。
    items:
      - label: 交易所
        title: 充提都筛，不误报，也不被别家牵连
        text: 充值看资金从哪来，提现看要打到哪去。时间上流不过来的路径直接排除，合规团队只处理真正需要处理的单子。
        points:
          - "**充值来源按时间顺序判断**，只计算转出前已经到账的钱"
          - "**交易所对手方默认豁免**，不会因为别家交易所的其他用户碰过风险地址牵连到你"
          - "**新规当天上线**：FinCEN 9714 命令发布当天，内置规则集就能选用"
          - 每笔结果附命中路径和快照，监管检查时直接调出
        href: /solutions/exchanges/
        link: 看交易所方案
      - label: 钱包
        title: 转账前提醒，收款后预警
        text: 钱包用户手里主要是 USDT / USDC。在转账和收款两个节点给用户一句准确的提示，就是钱包能给用户最直接的保护。
        points:
          - "**转账前查收款地址**：提示制裁、恐怖融资、诈骗地址，避免把U打错人"
          - "**收款后查资金来源**：收到被冻结、黑客或诈骗资金时及时提醒，减少被连带冻结"
          - "**安全能力可以收费**：已有平台把 DART 打包进付费会员"
          - 某头部自托管钱包接入一周内，单日筛查量就到了 7 万次以上
        href: /solutions/wallets/
        link: 看钱包方案
      - label: 支付与U卡
        title: 不让问题资金进入卡组织和法币通道
        text: 充卡、入金、商户收款前先筛资金来源。银行和卡组织问起来，每一笔都有依据。
        points:
          - "**入金前筛查**：资金来源涉及制裁、冻结、黑客、诈骗时分档处置"
          - "**四档处置而不是一刀切**：通过、复核、加强尽调、拦截，阈值按你的风险偏好调"
          - "**规则集可以按合作银行、卡组织的要求单独配置**"
          - 每次筛查存为不可篡改的快照，对账和审计直接调出
        href: /solutions/payments/
        link: 看支付方案
      - label: 托管与 WaaS
        title: 下游企业客户开箱即有 KYA / KYT
        text: 你服务的每一家企业都需要充提筛查。由你统一接入 DART，客户不用各自采购。
        points:
          - "**每个企业钱包的充提自动筛查**，结果按客户分开"
          - "**MPC 托管归集场景**有现成接入指南"
          - 某钱包与托管基础设施服务商工作日每天筛查 1.7–1.8 万次
          - 控制台、API、CSV 批量共用一个账号
        href: /solutions/custody/
        link: 看托管方案
      - label: 执法机构
        title: 把一笔笔转账串成完整的资金链
        text: 从一个地址出发，跨跳、跨链追资金去向，导出可以直接用于案件的追踪报告。
        points:
          - "**资金追踪**：逐跳展开上下游，USDC 支持 CCTP 跨链续追"
          - "**案件协助**：重点案件由我们的分析师出追踪报告，配合冻结时提供证据包"
          - "**链上追踪实训**：给调查员的培训课程"
          - 身份核实后开通，每次查询都留痕
        href: /partners/lea/
        link: 看执法合作
      - label: 个人
        title: 收U之前，先查一下这个地址
        text: OTC 买家、商户、个人收款前最常问的一句话：这个地址安全吗？U 被冻了，又是为什么？
        points:
          - "**地址体检**：粘贴地址，自动识别链和币种，给出三档结论"
          - "**冻结自查**：地址有没有被稳定币发行方冻结、什么时候冻结的"
          - 只说命中了哪些公开来源，不给个人地址下定性
        href: /check/
        link: 了解个人地址体检

  - type: news
    title: 新闻与亮点
    lead: DART 的最新动态、产品更新和行业观察。
    placeholder: true
    items:
      - { tag: 新闻, title: 新闻标题占位一, text: 一句话摘要占位，上线前替换为真实内容。 }
      - { tag: 产品更新, title: 新闻标题占位二, text: 一句话摘要占位，上线前替换为真实内容。 }
      - { tag: 亮点, title: 新闻标题占位三, text: 一句话摘要占位，上线前替换为真实内容。 }

  - type: cta
    eyebrow: 免费接入
    title: 和你现在的工具<em>并行跑一次</em>
    text: 不用停掉现有系统。给我们一批历史地址，脱敏也可以，结果好不好你自己判断。
    points:
      - 我们逐条给出结果和命中路径，并附**与现有工具的差异对比**
      - 稳定币交给 DART，其他资产照旧
      - 接入即免费用到 **2028 年 12 月 31 日**，工程师直接在群里支持
    ctas:
      - { label: 免费接入, href: /contact/ }
      - { label: 看产品手册, href: "https://width.info/docs" }
---
