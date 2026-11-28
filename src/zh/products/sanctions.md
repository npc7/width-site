---
layout: layouts/page.njk
permalink: /zh/products/sanctions/
title: 制裁筛查
fullTitle: 加密货币制裁筛查｜1 秒内返回，执法命令当天跟进 · Width DART
description: DART 制裁筛查：用自建的制裁库查地址、实体、个人和公司，覆盖 OFAC、联合国、欧盟、英国等官方来源，1 秒内返回。地址自身命中默认直接拦截，一跳内直接往来超过 10 美元就命中。
breadcrumb:
  - { label: 平台, href: /platform/ }
  - { label: 制裁筛查 }
sections:
  - type: hero
    compact: true
    eyebrow: 制裁筛查
    title: 对方在不在制裁名单上，<br><em>1 秒内给答案</em>
    lead: 制裁命中是硬性拦截，所以检查必须快、名单必须新。DART 用自建的制裁库查地址、实体、个人和公司，1 秒内返回；执法机构发布新命令，我们当天做成内置规则集，你直接选用。
    ctas:
      - { label: 开通账号, href: /contact/ }
      - { label: 看文档, href: /zh/docs/sanctions/ }
    stats:
      - { value: "< 1", unit: 秒, label: 只看标签的制裁检查返回 }
      - { value: 当天, unit: 上线, label: FinCEN 9714 命令发布当天上线规则集 }
      - { value: "10", unit: 美元, label: 一跳内碰到制裁，超过这个金额就命中，不看占比 }
      - { value: "100", unit: 分, label: 地址自身在制裁名单上，默认直接拦截 }

  - type: problems
    eyebrow: 制裁这件事
    title: 要快、要新、<em>不能漏</em>
    items:
      - problem: 名单一更新，自己的系统就落后
        detail: 官方名单和执法命令更新越来越频繁，靠人工维护规则来不及。
        solution: |
          - 自建制裁库，覆盖 **OFAC、联合国、欧盟、英国**等官方来源，持续更新
          - 新的制裁和执法命令由我们做成**内置规则集**，在控制台或 API 里直接选用
        proof: FinCEN 9714 命令 11 月 6 日发布，DART 当天上线了对应的规则集。
      - problem: 制裁检查拖慢开户和转账
        solution: |
          - 只看标签的制裁检查 **1 秒内返回**，放在转账前、开户时都不影响体验
          - 地址自己在名单上，按自身命中规则直接给出拦截建议
        proof: 需要追资金的完整筛查中位也只要 0.61 秒。
      - problem: 只查地址本身，绕一跳就漏了
        detail: 资金常常先经过中间地址，再进入你的平台。
        solution: |
          - 一跳内和制裁地址直接往来，**超过 10 美元就命中**，不看占比
          - 隔几跳的关联按资金的时间顺序和占比判断
          - 被制裁的交易所**不享受交易所豁免**，路径照样计算
        proof: 每条命中都列出路径、跳数、金额和占比。

  - type: cards
    tone: alt
    eyebrow: 覆盖范围
    title: 查得到什么
    columns: 4
    items:
      - { tag: 来源, title: 官方名单, text: "OFAC、联合国、欧盟、英国等官方制裁和执法名单。" }
      - { tag: 对象, title: 实体与个人, text: 被制裁的实体、个人和公司，可以按名称检索。 }
      - { tag: 链上, title: 关联地址, text: 名单中列出的链上地址，以及情报团队核实后归属到这些实体的地址。 }
      - { tag: 命令, title: 执法命令, text: "例如 FinCEN 9714 命令，这类执法命令做成内置规则集。" }

  - type: split
    tone: alt
    eyebrow: 规则集
    title: 新命令，<em>直接选用</em>
    text: 每个执法命令对应一个内置规则集，规则全部公开可读。内置规则集只读，想按自己的口径改，复制一份再改条件和分值。每次筛查用的是哪套规则，快照里都有记录。
    points:
      - 制裁类命中按**严重**级别计分，自身命中默认直接拦截
      - 只启用和你业务相关的规则集
      - 要盯某家被点名的机构，可以给规则打上**重点关注（★）**，命中时单独列出
    ctas:
      - { label: 了解规则集与评分, href: /products/rulesets/, style: ghost }
    visual: scores

  - type: faq
    eyebrow: 常见问题
    title: 关于制裁筛查
    items:
      - q: 制裁库覆盖哪些名单？
        a: 覆盖 OFAC、联合国、欧盟、英国等官方制裁来源，包括实体、个人、公司和链上地址，持续更新。
      - q: 执法机构发布新命令后，多久能用上？
        a: 我们会把新命令做成内置规则集。以 FinCEN 9714 命令为例，11 月 6 日发布，DART 当天上线，客户直接在规则集里选用。
      - q: 对方没在名单上，但和名单地址有往来，查得出来吗？
        a: 查得出来。一跳内直接往来超过 10 美元就命中；隔几跳的关联按资金的时间顺序和风险资金占比判断，结果里列出完整路径。
      - q: 交易所豁免会不会把被制裁的交易所也放过？
        a: 不会。豁免只针对普通交易所，被制裁或带其他高风险标签的交易所不豁免，路径照样计算。
      - q: 可以只做制裁筛查，不做完整的 KYT 吗？
        a: 可以。只启用制裁相关的规则集，或者两边都设 0 跳、只看地址自身标签。

  - type: cta
    eyebrow: 先试再说
    title: 先拿存量地址<em>回扫一遍</em>
    text: 给我们一批地址，脱敏也可以，我们逐条给出结果和命中路径，和现有工具的差异逐条说明。
    ctas:
      - { label: 开通账号, href: /contact/ }
      - { label: 看数据中心的制裁动作榜, href: "/data/#sanctions" }
---
