---
layout: layouts/page.njk
permalink: /zh/trust/
title: 信任中心
fullTitle: 信任中心：认证、可审计的规则与证据留存 · Width DART
description: DART 已通过 ISO/IEC 27001、27701、42001 认证，SOC 2 Type II 正在进行。每一个分数都由 72 条读得懂的规则算出，不由大模型生成；每次筛查都存为快照，随时可以调出审计。
breadcrumb:
  - { label: 信任中心 }
sections:
  - type: hero
    compact: true
    eyebrow: 信任中心
    title: 每个结论都来自<em>可审计的规则</em>
    lead: DART 的分数由你读得懂的规则算出来，不是黑盒，也不是大模型。同样的输入、同样的规则集，得到同样的结果。每次筛查都存为快照，事后可以重跑、可以审计。
    ctas:
      - { label: 索取证书, href: /contact/ }
      - { label: 规则集与评分, href: /products/rulesets/ }

  - type: cards
    eyebrow: 认证
    title: 信息安全、隐私、AI <em>都有认证</em>
    columns: 4
    items:
      - { tag: 已获得, title: ISO/IEC 27001, text: 信息安全管理体系。 }
      - { tag: 已获得, title: ISO/IEC 27701, text: 隐私信息管理体系。 }
      - { tag: 已获得, title: ISO/IEC 42001, text: 人工智能管理体系。 }
      - { tag: 进行中, title: SOC 2 Type II, text: 审计正在进行。 }
    ctas:
      - { label: 索取证书和安全问卷, href: /contact/ }

  - type: table
    tone: alt
    eyebrow: 分数怎么来的
    title: 每一分都<em>对得上一条规则</em>
    head: [你可以核对什么, DART 怎么做]
    rows:
      - ["**规则读得懂**", "每个分数都由 72 条规则算出，分 9 大类。每个条件、门槛、分值都能看到"]
      - ["**结果可重复**", "同样的输入、同样的规则集，得到同样的结果。已保存的任务约 1 秒重新判定，前后对比"]
      - ["**每一分有依据**", "每一分都对应一条规则、一条路径，写明跳数、金额和占比"]
      - ["**被排除的也写明**", "没算进来的路径也列出来，并写明原因，例如时序不成立（钱还没到，就先转出了）"]
      - ["**改动有记录**", "内置规则集只读，复制一份才能改。每份快照都记下当时用的是哪个规则集"]

  - type: split
    eyebrow: AI 与决定
    title: AI 帮忙，规则算分，<em>人来决定</em>
    text: DART Copilot（通过 MCP 接入的 AI 助手）可以发起筛查、解释结果、帮你改规则集。但分数始终由规则引擎计算，从不由大模型生成。怎么处置，由你团队里的人决定。
    points:
      - AI 的解释都能对回结果里的规则、路径和金额
      - 内置规则集只读，AI 只能改你自己的副本
      - 控制台、API、MCP 同一个账号、同一批快照
    ctas:
      - { label: 了解 DART Copilot, href: /products/copilot/, style: ghost }

  - type: cards
    tone: alt
    eyebrow: 证据与数据完整性
    title: 证据留得住，<em>数据缺了会说</em>
    columns: 3
    items:
      - { tag: 快照, title: 每次筛查都留档, text: "快照记下当时的请求参数、规则集和完整结果。之后改规则，旧快照不变。按快照编号随时通过 API 读回。" }
      - { tag: dataStatus, title: 数据没读全会标明, text: "数据没能完整读到时，结果里的 `dataStatus` 会写明，不会默默判通过。" }
      - { tag: 环境, title: 独立的测试环境, text: "测试环境 `https://test-api.width.live`，数据库独立；生产环境 `https://api.width.live`。" }

  - type: cards
    eyebrow: 数据原则
    title: 只说来源，<em>不给人定性</em>
    columns: 3
    items:
      - { title: 不公开风险地址, text: 我们不公开具体的风险地址，也不给任何个人地址贴「诈骗」「洗钱」的标签。, href: /about/, link: 关于 Width }
      - { title: 只列来源，不下判断, text: 个人地址体检只告诉你命中了哪些公开来源，比如官方制裁名单。, href: /check/, link: 个人地址体检 }
      - { title: 核实身份，全程留痕, text: 执法机构身份核实后才开通调查员账号，每一次查询都有记录。, href: /partners/lea/, link: 执法合作 }

  - type: faq
    eyebrow: FAQ
    title: 关于信任，常被问到的
    items:
      - q: AI 能改我的分数吗？
        a: 不能。每个分数都由规则引擎计算。DART Copilot 可以发起筛查、解释结果、帮你改自己的规则集副本，但分数从不由它生成。怎么处置，由人决定。
      - q: 规则集更新了，过去的结果会变吗？
        a: 不会。每份快照都原样留着当时的参数、规则集和结果。重新筛查的结果可能因为新转账、新标签而不同，所以建议把快照编号存进你的案件记录。
      - q: 同一个地址重跑一次，结果一样吗？
        a: 同样的输入、同样的规则集，结果一样。你也可以拿已保存的任务换一个规则集重新判定，前后对比。
      - q: 能把证书发给我们吗？
        a: 可以。ISO/IEC 27001、27701、42001 证书按需提供，安全问卷也可以按需填写。SOC 2 Type II 正在进行。
      - q: 怎么测试才不影响生产？
        a: 用测试环境 `https://test-api.width.live`。它的数据库是独立的，规则集 ID 和快照都和生产不同。

  - type: cta
    eyebrow: 供应商评估
    title: 拿我们的<em>证书和安全问卷</em>
    text: 把你的安全问卷或尽调清单发给我们，新加坡、香港团队会回复你需要的证书和答复。
    ctas:
      - { label: 索取资料, href: /contact/ }
      - { label: 平台总览, href: /platform/ }
---
