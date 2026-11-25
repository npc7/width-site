---
layout: layouts/page.njk
permalink: /zh/check/
title: 个人地址体检：收U前先查一下
description: 收 USDT 之前，粘贴地址查一下它是否命中制裁名单、是否被稳定币发行方冻结。DART 地址体检即将上线，个人免费使用。
breadcrumb:
  - { label: 个人地址体检 }
sections:
  - type: hero
    compact: true
    eyebrow: DART 地址体检 · 即将上线
    title: 收U之前，<em>先查一下这个地址</em>
    lead: OTC 买家、商户、个人收款前最常问的一句话：这个地址安全吗？U 被冻了，又是为什么？DART 地址体检把企业用的筛查能力，做成个人也能用的版本。
    ctas:
      - { label: 上线时通知我, href: /contact/ }
      - { label: "U 被冻了或被骗了？", href: /partners/lea/, style: ghost }
    note: 个人免费使用，谷歌账号登录。

  - type: cards
    eyebrow: 能查什么
    title: 三个最常见的问题
    columns: 3
    items:
      - tag: 地址体检
        title: 这个地址安全吗？
        text: 粘贴地址，自动识别链和币种。给出三档结论：未发现风险、建议谨慎、高风险，并列出命中的公开来源类型。
      - tag: 冻结自查
        title: 我的U为什么被冻？
        text: 查地址有没有被稳定币发行方冻结、什么时候冻结的、链上对应的处置交易，并附申诉和报案指引。
      - tag: 转账前检查
        title: 转出去之前提醒我
        text: 在钱包、Telegram 机器人和浏览器插件里，转账前自动检查收款地址。
        points: [陆续上线]

  - type: split
    tone: alt
    wide: true
    eyebrow: 我们的原则
    title: 只说来源，<em>不给人下定性</em>
    text: 地址背后是一个个真实的人。体检结果只告诉你命中了哪些公开来源，比如官方制裁名单、发行方冻结记录，不会给任何个人地址贴「诈骗」「洗钱」的标签。
    points:
      - 结果只展示档位和命中的公开来源类型，不展示第三方地址全文和完整资金路径
      - 需要登录，每天限定次数，防止滥用
      - 认为结果有误，可以提交申诉，标签团队会在约定时间内回复

  - type: cta
    title: 遇到更复杂的情况？
    text: 如果你的资金被骗或被盗、需要完整追踪资金去向，可以通过执法机构渠道处理；企业用户请直接接入 DART。
    ctas:
      - { label: 执法合作, href: /partners/lea/ }
      - { label: 企业接入, href: /contact/, style: ghost }
---
