---
layout: layouts/page.njk
permalink: /zh/solutions/custody/
title: 托管与 WaaS 的 KYA / KYT 筛查
description: 托管机构、WaaS 和 MPC 钱包服务商统一接入 DART，为每个企业客户的充提做 KYA / KYT 筛查，下游客户开箱即有稳定币风控，MPC 归集场景有现成接入指南。
breadcrumb:
  - { label: 解决方案, href: /solutions/ }
  - { label: 托管与 WaaS }
sections:
  - type: hero
    compact: true
    eyebrow: 解决方案 · 托管与 WaaS
    title: 下游企业客户<em>开箱即有 KYA / KYT</em>
    lead: 你服务的每一家企业都需要充提筛查，但不是每一家都有能力自己采购和维护。由你统一接入 DART，筛查成为钱包基础设施的一部分。
    ctas:
      - { label: 免费接入, href: "/contact/?type=custody" }
      - { label: 看产品手册, href: "https://width.info/docs" }
    note: 接入 DART，免费用到 2028 年 12 月 31 日
    visual: result

  - type: problems
    eyebrow: 托管业务的难题
    title: 托管和 WaaS 服务商常见的问题
    items:
      - problem: 客户都要合规，却各自采购、各自对接
        detail: 每家企业客户单独接一套 KYT，成本高、周期长，小客户往往干脆不做。
        solution: |
          - **你统一接入一次**，为旗下每个企业钱包的充提自动筛查
          - 下游客户开箱即有 KYA / KYT，不用各自采购
        proof: 某钱包与托管基础设施服务商工作日每天筛查 1.7–1.8 万次。
      - problem: 不同客户，风险偏好不同
        detail: 支付客户、交易平台、项目方对风险的容忍度完全不一样，一套规则满足不了所有人。
        solution: |
          - **规则集按客户分开**：复制内置规则集，按客户的口径配置阈值和规则
          - 筛查时传入对应客户的规则集，结果和快照按客户留存
        proof: 内置规则集只读，自定义规则集独立保存，可以说明任意时点用的是哪套规则。
      - problem: MPC 归集时，问题资金混进了主钱包
        detail: 充值地址的资金归集到主钱包后，问题资金就和正常资金混在一起，很难再拆开。
        solution: |
          - **归集前先筛**：对充值交易做流入方向筛查，命中的地址暂停归集
          - 按时间顺序向上游追，只计算转出前已经到账的钱
        proof: MPC 托管归集与 KYT 接入有现成指南，接入时我们一起梳理流程。

  - type: steps
    tone: alt
    eyebrow: DART 在你的流程里
    title: 充值、归集、提现，三处把关
    items:
      - { label: 充值, title: 客户钱包收到资金, text: 子地址收到 USDT / USDC，拿到交易哈希。 }
      - { label: KYT-IN, title: 归集前筛来源, text: 按客户的规则集筛资金来源，命中的地址暂停归集，交给客户处置。 }
      - { label: 归集, title: 干净资金进主钱包, text: 通过的资金正常归集，结果和快照按客户留存。 }
      - { label: 提现, title: 筛目标地址, text: 客户发起提现时，对目标地址做 KYA 或 KYT-OUT 筛查。 }

  - type: cases
    eyebrow: 案例
    title: 已经在用 DART 的托管服务商
    columns: 2
    items:
      - tag: 托管 · WaaS
        metric: 1.7–1.8 万次
        metricLabel: 工作日每天
        title: 某钱包与托管基础设施服务商
        text: 为旗下企业钱包的每笔充提做筛查，下游企业开箱即有 KYA / KYT，不用各自采购。
      - tag: 指南
        title: MPC 托管归集与 KYT 接入
        text: 用 MPC 托管自建归集的团队，可以照着指南把 KYT 放进归集流程。
    note: 案例均匿名展示。数据来自 DART 生产环境，截至 2026 年 11 月。

  - type: faq
    eyebrow: 常见问题
    title: 托管服务商常问的问题
    items:
      - q: 能不能为每个下游客户单独配置规则？
        a: 能。复制内置规则集为每个客户配置一套，筛查时传入对应的规则集，结果和快照按客户分开留存。
      - q: 归集流程里应该在哪一步筛查？
        a: 建议在充值到账、归集之前筛查资金来源，命中的地址暂停归集，交给客户处置，避免问题资金混进主钱包。接入时我们一起梳理流程。
      - q: 存量地址怎么处理？
        a: 用 CSV 批量导入，一次性重新筛查存量地址，之后再切换到实时筛查。
      - q: 量大会不会影响速度？
        a: 制裁筛查 1 秒内返回；同步调用直接给结果，大批量和深度追踪可以用异步模式，返回任务 ID 再查询，不阻塞充提。
      - q: 控制台和 API 能一起用吗？
        a: 能。控制台、REST API、MCP 和 CSV 批量共用同一个账号、同一份额度和同一批快照。

  - type: cta
    eyebrow: 免费接入
    title: 和你现在的工具<em>并行跑一次</em>
    text: 不用停掉现有系统。给我们一批客户的历史充提地址，脱敏也可以，差异逐条说明原因。
    points:
      - 我们逐条给出结果和命中路径，并附**与现有工具的差异对比**
      - 稳定币交给 DART，其他资产照旧
      - 接入 DART，免费用到 **2028 年 12 月 31 日**
    ctas:
      - { label: 免费接入, href: "/contact/?type=custody" }
      - { label: 预约演示, href: "/contact/?type=custody" }
---
