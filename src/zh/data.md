---
layout: layouts/page.njk
permalink: /zh/data/
title: 数据中心：稳定币冻结、安全事件、制裁动作
description: Width 基于自建链上数据的公开榜单：稳定币发行方冻结、黑客与漏洞事件资金去向、制裁与执法动作。每个榜单附方法说明，只用公开、可溯源的数据。
breadcrumb:
  - { label: 数据中心 }
sections:
  - type: hero
    compact: true
    eyebrow: WIDTH DATA · 数据中心
    title: 链上发生了什么，<em>每周都有数</em>
    lead: 我们每天处理的稳定币流水里，有哪些地址被冻结、哪些事件的资金正在移动、哪些新名单刚刚生效。这里把能公开的部分做成榜单，持续更新。
    ctas:
      - { label: 订阅更新, href: /contact/ }
      - { label: 交易所资金流向, href: "https://width.info/exchange-flows", style: ghost }

  - type: boards
    items: [freeze, incidents, sanctions]

  - type: cards
    id: method
    tone: alt
    eyebrow: 方法说明
    title: 我们怎么做这些榜单
    columns: 2
    items:
      - { title: 只用公开、可溯源的数据, text: 榜单只使用事件级、实体级的公开数据，每个数字都能追到链上交易或官方公告。 }
      - { title: 写清口径, text: 每个榜单都说明统计范围、时间口径和更新频率；金额按冻结或事件发生时的数值计算，可能随后续处置变动。 }
      - { title: 不给个人地址下定性, text: 不公开具体的风险地址，也不对单个地址做「诈骗」「洗钱」之类的判断。 }
      - { title: 多方说法并列, text: 事件归因只写官方确认的说法；各方说法不一致时全部列出，不替任何一方下结论。 }

  - type: cta
    title: 需要榜单数据或嵌入？
    text: 媒体、研究机构和渠道伙伴可以申请榜单数据和嵌入，引用时请注明「数据来源：Width」。
    ctas:
      - { label: 联系我们, href: /contact/ }
      - { label: 合作伙伴, href: /partners/, style: ghost }
---
