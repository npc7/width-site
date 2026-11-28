---
layout: layouts/page.njk
permalink: /zh/products/intelligence/
title: DART Intel 情报数据
fullTitle: DART Intel｜USDT / USDC 地址标签与制裁数据 · Width
description: DART Intel 是每一个 DART 结论背后的数据层：2 亿已标注地址，九成以上是交易所地址，认得出 428 家交易所；自建制裁库，9 大类风险标签，按链存放，由情报团队核实。
breadcrumb:
  - { label: 平台, href: /platform/ }
  - { label: DART Intel 情报数据 }
sections:
  - type: hero
    compact: true
    eyebrow: DART Intel · 情报数据
    title: 每一个结论，<br><em>先认得清对手是谁</em>
    lead: 分数准不准，先看标签准不准。DART Intel 是筛查、追踪和 Copilot 共用的数据层：哪些对手方是交易所，哪些地址被制裁、被冻结，哪些和黑客、诈骗、混币有关，都从这里来。
    ctas:
      - { label: 开通账号, href: /contact/ }
      - { label: 标签从哪来, href: /zh/docs/labels/ }
    stats:
      - { value: "2", unit: 亿, label: 已标注地址 }
      - { value: 九成以上, label: 是交易所地址 }
      - { value: "428", unit: 家, label: 交易所的钱包认得出 }
      - { value: "9", unit: 大类, label: 风险标签，从制裁到博彩 }

  - type: problems
    eyebrow: 为什么数据层重要
    title: 标签不准，<em>结论就不准</em>
    items:
      - problem: 分不清对方是交易所还是风险地址
        detail: 稳定币的流水大多经过交易所。交易所钱包没标出来，任何活跃地址看上去都「有关联」。
        solution: |
          - **2 亿已标注地址，九成以上是交易所地址**
          - 认得出 **428 家交易所**的热钱包和充值地址，交易所对手方默认豁免
          - 被制裁或带高风险标签的交易所另有风险标签，不豁免
        proof: 交易所、DEX、跨链桥这类中性标签只用来告诉你对手方是谁，不计分。
      - problem: 官方名单变得比你的规则快
        detail: 制裁名单和执法命令更新频繁，靠人工维护规则跟不上。
        solution: |
          - 自建制裁库，覆盖 **OFAC、联合国、欧盟、英国**等官方来源
          - 收录实体、个人、公司，以及名单里公布的链上地址
          - 监管新规、执法命令做成**内置规则集**，直接选用，不用自己写规则
        proof: FinCEN 9714 命令 11 月 6 日发布，对应规则集当天上线。
      - problem: 一条链上的标签，换条链就看不见
        detail: 同一个 EVM 地址在每条 EVM 链上都是同一个钱包，但标签按「链 + 地址」存放。
        solution: |
          - 打开**全链标签**，其他 EVM 链上的标签也当作这个地址自己的标签参与判定
          - 其他链带来的标签可以取消交易所豁免，但不能授予豁免
          - 跨链标签查询失败时筛查会失败，不会当成「没有标签」放过
        proof: Arbitrum 上约 22.6 万个地址本链没有标签，但在其他链上被标为高风险。

  - type: table
    tone: alt
    eyebrow: 风险标签
    title: 9 大类风险，<em>各有默认等级</em>
    lead: 每个标签分四级：大类、子类、实体、地址类型，另带一个风险等级。一个地址可以同时有多个标签。
    head: [大类, 包括, 默认风险等级]
    rows:
      - [制裁, 制裁实体、受限实体、受制裁管辖区, 严重]
      - [恐怖融资, 与恐怖组织相关的钱包, 严重]
      - [执法冻结, 执法机构冻结或扣押的地址, 严重]
      - [非法市场, 人口贩卖、非法服务、儿童性虐待内容（CSAM）, 严重]
      - [其他金融犯罪, 涉嫌洗钱、逃税, 严重]
      - [网络犯罪, 被盗资金、勒索软件、钓鱼、庞氏骗局、杀猪盘、项目方跑路、蜜罐合约、虚假预售、黑灰产, 高]
      - [混淆服务, 混币器、隐私钱包、隐私代币、中心化跨链兑换、加密货币 ATM, 高]
      - [高风险实体, 被制裁的交易所、反洗钱管控薄弱或位于高风险地区的交易所、高风险 OTC, 高]
      - [博彩, 线上赌场、体育博彩、无牌照博彩, 中到高]
    note: 中性标签（交易所与 DeFi，以及传统金融机构、支付机构、商户、托管服务）不计风险，只用来识别对手方。规则可以按大类、子类、实体或地址类型来写。

  - type: cards
    eyebrow: 来源
    title: 风险标签<em>从哪来</em>
    columns: 2
    items:
      - tag: 官方名单
        title: 制裁与反恐名单
        text: OFAC、联合国、欧盟、英国、新加坡等官方制裁名单，以及名单里公布的钱包地址；各国官方公开的反恐冻结、扣押令。
      - tag: 发行方与执法
        title: 冻结与扣押
        text: USDT、USDC 发行方的冻结记录（含冻结时间）；执法机构公开的文件。
      - tag: 事件与举报
        title: 黑客、诈骗、钓鱼
        text: 安全事件按事件归集涉事地址，来自项目方公告、安全机构披露和被盗资金的链上追踪；诈骗和钓鱼地址来自公开举报，经情报团队核实。
      - tag: 服务与监管
        title: 混币服务与高风险实体
        text: 混淆服务公开的合约地址和存取款地址；监管机构的警示和执法信息，加上我们自己采集的交易所地址。

  - type: steps
    tone: alt
    eyebrow: 质量控制
    title: 一个标签，<em>怎么才能入库</em>
    items:
      - { label: 能溯源, title: 每个标签都有出处, text: 公开来源的标签能追到原始发布；情报类标签都经过人工核实。 }
      - { label: 三道检查, title: 入库前、中、后各查一次, text: 入库前独立预检，入库时抽样回查，入库后按链和实体分层复核。 }
      - { label: 能纠错, title: 发现误标，很快更正, text: 每次标签修改都可以完整撤销。对标签有疑问，我们提供来源说明；确认误标会尽快更正。 }

  - type: split
    eyebrow: 原则
    title: 标签说明风险，<em>不给人定性</em>
    text: 标签说明一个地址和哪类公开风险事实相关，不是对个人的定性。拦不拦，由你的规则集和处置档位决定。
    points:
      - 不公开具体的风险地址
      - 不给个人地址下定性
      - 公开榜单只用事件级、实体级的数据，每个数字都能追到链上交易或官方公告
    ctas:
      - { label: 数据中心, href: /data/, style: ghost }
      - { label: 标签体系与来源, href: /zh/docs/labels/, style: ghost }

  - type: cards
    eyebrow: 用在哪里
    title: 一个数据层，<em>撑起每个产品</em>
    columns: 3
    items:
      - { tag: DART Screen, title: 地址筛查 KYA, text: 自身命中、直接往来、多跳关联，在这个地址有流水的每条链上都查一遍。, href: /products/kya/ }
      - { tag: DART Screen, title: 制裁筛查, text: 只看标签，和制裁库比对，通常 1 秒内返回。, href: /products/sanctions/ }
      - { tag: DART Trace, title: 资金追踪与调查, text: 资金图上每个节点都显示标签和风险等级。, href: /products/investigations/ }

  - type: faq
    eyebrow: 常见问题
    title: 关于数据和标签
    items:
      - q: 只想知道地址本身在不在名单上，怎么查？
        a: 把流入、流出跳数都设成 0。DART 不追资金，只拿地址自己的标签和自身命中规则比对，通常 1 秒内返回。见 [制裁筛查](/zh/products/sanctions/)。
      - q: 同一个 EVM 地址，在每条链上的标签都一样吗？
        a: 标签按「链 + 地址」存放。打开 `all_chain_labels`，其他 EVM 链上的标签也当作这个地址自己的标签参与判定，并标明来源链。合约类标签不跨链，Tron 地址不适用。
      - q: 新的制裁和执法命令，怎么用到我的筛查里？
        a: 我们把它做成内置规则集，你在控制台下拉框里选，或者传 `ruleset_id`，不用自己写规则。内置规则集只读，要调整就复制一份再改。
      - q: 觉得某个标签标错了怎么办？
        a: 把地址发给我们。我们提供这个标签的来源说明，确认误标会尽快更正。每次标签修改都可以完整撤销。
      - q: 你们会公开风险地址清单吗？
        a: 不会。我们不公开具体的风险地址，也不给个人地址下定性。标签只在筛查里使用，结果说明命中的是哪类公开来源。

  - type: cta
    eyebrow: 先试再说
    title: 拿一批历史地址，<em>并行跑一次</em>
    text: 不用停掉现有系统。给我们一批地址，脱敏也可以，我们逐条给出结果和背后的标签，每条差异说明原因。
    ctas:
      - { label: 开通账号, href: /contact/ }
      - { label: 了解地址筛查 KYA, href: /products/kya/ }
---
