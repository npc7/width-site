---
layout: layouts/page.njk
permalink: /zh/products/sanctions/
title: 制裁筛查
fullTitle: 加密货币制裁筛查 API｜OFAC 等官方名单 1 秒内返回 · Width DART
description: DART 制裁筛查：自建制裁库覆盖 OFAC、联合国、欧盟、英国等官方名单，实体、个人、公司和链上地址 1 秒内返回。新的官方动作第一时间做成内置规则集。
breadcrumb:
  - { label: 平台, href: /platform/ }
  - { label: 制裁筛查 }
sections:
  - type: hero
    compact: true
    eyebrow: 制裁筛查
    title: 对方在不在制裁名单上，<br><em>1 秒内给答案</em>
    lead: 制裁是合规的底线，也是最不能等的检查。DART 用自建的制裁库查地址、实体、个人和公司，1 秒内返回；官方有新动作，我们第一时间做成内置规则集，你直接选用：FinCEN 9714 命令发布当天就上线了。
    ctas:
      - { label: 免费接入, href: /contact/ }
      - { label: 看产品手册, href: "https://width.info/docs" }
    note: 接入 DART，免费用到 2028 年 12 月 31 日
    stats:
      - { value: "< 1", unit: 秒, label: 制裁筛查返回 }
      - { value: 当天, unit: 上线, label: FinCEN 9714 命令发布当天上线规则集 }
      - { value: "2", unit: 亿, label: 已标注地址，制裁、冻结、黑客等标签持续更新 }
      - { value: "11", unit: 条链, label: USDT、USDC 全覆盖 }

  - type: problems
    eyebrow: 制裁筛查要解决的问题
    title: 制裁这件事，不能慢、不能漏、不能乱
    items:
      - problem: 名单一更新，自己的系统就落后
        detail: 官方名单和执法命令更新越来越频繁，靠人工维护规则来不及。
        solution: |
          - 自建制裁库，覆盖 **OFAC、联合国、欧盟、英国**等官方来源，持续更新
          - 新的官方动作由我们做成**内置规则集**，客户在控制台或 API 里直接选用
        proof: FinCEN 9714 命令 11 月 6 日发布，DART 当天就上线了对应的内置规则集。
      - problem: 制裁检查拖慢开户和转账
        solution: |
          - 制裁类检查 **1 秒内返回**，放在转账前、开户时都不影响体验
          - 地址自己在名单上，按自身命中规则直接给出拦截建议
        proof: 生产环境每天 30–40 万次 API 调用。
      - problem: 只查地址本身，绕一跳就漏了
        detail: 资金常常先经过中间地址，再进入你的平台。
        solution: |
          - 同时看直接往来和多跳暴露，按资金的时间顺序和占比判断
          - 制裁等强合规场景可以关闭交易所豁免，路径追到交易所也继续算
        proof: 每条命中都列出路径、跳数、金额和占比。

  - type: cards
    tone: alt
    eyebrow: 覆盖范围
    title: 查得到什么
    columns: 4
    items:
      - { tag: 来源, title: 官方名单, text: "OFAC、联合国、欧盟、英国等官方制裁和执法名单。" }
      - { tag: 对象, title: 实体与个人, text: 被制裁的实体、个人和公司，可以按名称检索。 }
      - { tag: 链上, title: 关联地址, text: 名单中列出的链上地址，以及我们归属到这些实体的地址。 }
      - { tag: 动作, title: 执法命令, text: "例如 FinCEN 9714 命令，这类官方动作做成内置规则集。" }

  - type: split
    tone: alt
    eyebrow: 规则集
    title: 新动作，直接选用
    text: 每个官方动作对应一个内置规则集，规则全部公开可读。内置规则集只读，想按自己的口径改，复制一份再改条件和分值。每次筛查用的是哪套规则，快照里都有记录。
    points:
      - 制裁类命中按**严重**级别计分，自身命中默认直接拦截
      - 规则集按法域区分，可以只启用和你业务相关的
      - 名单更新后，筛查结果留存的规则版本清清楚楚
    ctas:
      - { label: 了解规则集与评分, href: /products/rulesets/, style: ghost }
    visual: scores

  - type: faq
    eyebrow: 常见问题
    title: 关于制裁筛查
    items:
      - q: 制裁库覆盖哪些名单？
        a: 覆盖 OFAC、联合国、欧盟、英国等官方制裁来源，包括实体、个人、公司和链上地址，持续更新。
      - q: 官方发布新动作后，多久能用上？
        a: 我们会把新的官方动作做成内置规则集。以 FinCEN 9714 命令为例，11 月 6 日发布，DART 当天上线，客户直接在规则集里选用。
      - q: 制裁筛查有多快？
        a: 制裁类检查 1 秒内返回，适合放在转账前和开户时。
      - q: 对方没在名单上，但和名单地址有往来，查得出来吗？
        a: 查得出来。DART 同时看直接往来和多跳暴露，按资金的时间顺序和风险资金占比判断，结果里列出完整路径。制裁场景可以关闭交易所豁免，让路径在交易所处也继续计算。
      - q: 可以只做制裁筛查，不做完整的 KYT 吗？
        a: 可以。只启用制裁相关的规则集，或者只看地址自身标签，按你的合规要求配置。

  - type: cta
    eyebrow: 免费接入
    title: 先拿存量地址<em>回扫一遍</em>
    text: 给我们一批地址，脱敏也可以，我们逐条给出结果和命中路径。
    points:
      - 附**与现有工具的差异对比**，每条差异说明原因
      - 接入 DART，免费用到 **2028 年 12 月 31 日**
    ctas:
      - { label: 免费接入, href: /contact/ }
      - { label: 看数据中心的制裁动作榜, href: "/data/#sanctions" }
---
