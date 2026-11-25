---
layout: layouts/page.njk
permalink: /zh/products/kyt/
title: 交易筛查 KYT
fullTitle: 稳定币 KYT 交易筛查｜充值来源、提现去向 · Width DART
description: DART 稳定币 KYT：每一笔 USDT / USDC 充值查资金从哪来，每一笔提现查要打到哪去。按时间顺序逐跳追踪，充提分开规则集，结果附命中路径和快照。
breadcrumb:
  - { label: 平台, href: /platform/ }
  - { label: 交易筛查 KYT }
sections:
  - type: hero
    compact: true
    eyebrow: KYT · 交易筛查
    title: 这笔充值从哪来，<br><em>这笔提现到哪去？</em>
    lead: 交易所、支付公司、托管机构每天的充提，都要在入账和放款前过一遍。DART 针对具体的一笔转账追资金来源和去向，充值、提现用各自的规则集，给出分数、处置建议和完整依据。
    ctas:
      - { label: 免费接入, href: /contact/ }
      - { label: 看产品手册, href: "https://width.info/docs" }
    note: 接入 DART，免费用到 2028 年 12 月 31 日
    visual: scores

  - type: problems
    eyebrow: 交易筛查要解决的问题
    title: 充提筛查，卡在哪
    items:
      - problem: 用户充值进来的钱，可能来自被冻结或被盗资金
        detail: 一旦入账，后续冻结、追索可能落到你和你的用户头上。
        solution: |
          - **充值（流入）**：从这笔转账往上游追，查资金是否来自制裁、发行方冻结、黑客、诈骗、混币等来源
          - 只计算转出前已经到账的钱，时间上倒着流的路径直接排除
          - 按风险资金占比计分，入账前就能决定放行、复核还是拦截
        proof: 生产环境每天 30–40 万次 API 调用，覆盖交易所、钱包、托管、U 卡。
      - problem: 用户提现到风险地址，平台担责任
        solution: |
          - **提现（流出）**：查收款地址本身和它的下游，是否打向制裁、恐怖融资、诈骗等地址
          - 充值、提现分开用 KYT-IN、KYT-OUT 规则集，两个方向的口径各自可调
          - 也可以一次同时查来源和去向，结果合并返回
        proof: 新的官方动作做成内置规则集：FinCEN 9714 命令 11 月 6 日发布，DART 当天上线。
      - problem: 一笔交易里有多笔转账，不知道该查哪一笔
        detail: 合约调用、批量转账里常常带着好几笔代币转移。
        solution: |
          - 先列出交易里的全部代币转账，按事件顺序排好
          - 用 event_index（或发送方、接收方地址）指定其中一笔，结果只针对这一笔
        proof: 列转账的接口不计费，只有真正筛查的那一笔计费。

  - type: steps
    eyebrow: 怎么接
    title: 放在充提流程的哪里
    items:
      - { label: 充值, title: 链上确认后、入账前, text: 用 KYT-IN 规则集查这笔充值的资金来源，通过的自动入账，复核和加强尽调的进人工队列。 }
      - { label: 提现, title: 用户提交后、签名放款前, text: 用 KYT-OUT 规则集查收款地址和去向，高风险直接拦下，不让钱出去。 }
      - { label: 处置, title: 四档分流, text: "0–19 通过、20–49 复核、50–79 加强尽调、80–100 拦截，阈值按你的风险偏好调。" }
      - { label: 留痕, title: 自动存快照, text: 每次筛查的请求参数和完整结果存为不可篡改的快照，审计和监管检查时调出。 }

  - type: cards
    eyebrow: 能力一览
    title: 交易筛查都包含什么
    columns: 3
    items:
      - { title: 方向感知, text: 充值看上游来源，提现看下游去向，两个方向的规则和权重分开设置。 }
      - { title: 时间顺序, text: 每一跳先到账、后转出才算关联，倒着流的路径不计入，误报少。 }
      - { title: 占比门槛, text: "跳数越远门槛越高，默认第 2 / 3 / 4 / 5 跳风险资金占比达 5% / 10% / 15% / 20% 才计入。" }
      - { title: 交易所豁免, text: 路径追到其他交易所就停止，不因别家交易所的用户被牵连；强合规场景可关闭。 }
      - { title: 跨链续追, text: USDC 支持通过 Circle CCTP 跨链续追，换链转移也能接上。 }
      - { title: 批量回扫, text: CSV 批量导入存量交易，一次性重新筛查，适合上线初期和规则调整后。 }

  - type: faq
    eyebrow: 常见问题
    title: 关于交易筛查
    items:
      - q: 充值和提现为什么要用不同的规则集？
        a: 两个方向关心的问题不一样。充值关心钱是不是来自问题资金，提现关心钱会不会打给风险对象。DART 内置 KYT-IN 和 KYT-OUT 两套规则集，口径和权重可以分别调整。
      - q: 筛查会不会拖慢入账和放款？
        a: 制裁类检查 1 秒内返回，多数筛查在 1 分钟内完成。交易非常活跃的地址追得深时可以走异步模式，先返回任务 ID，结果出来再处理。
      - q: 一笔交易里有好几笔代币转账怎么办？
        a: 先调用列转账接口拿到这笔交易里的全部代币转账，再用 event_index 指定要筛查的那一笔。列转账不计费。
      - q: 能追跨链转过来的钱吗？
        a: USDC 支持通过 Circle CCTP 跨链续追。资金从一条链转到另一条链时，路径可以接上。
      - q: 已经有一套 KYT 了，可以先试试吗？
        a: 可以。不用停掉现有系统，给我们一批历史交易，我们逐条给结果和命中路径，并附与现有工具的差异对比。接入 DART，免费用到 2028 年 12 月 31 日。

  - type: cta
    eyebrow: 免费接入
    title: 拿一批历史交易，<em>并行跑一次</em>
    text: 不改现有流程，只看结果。哪边更准，你自己判断。
    points:
      - 逐条给出结果和命中路径，附**与现有工具的差异对比**
      - 接入 DART，免费用到 **2028 年 12 月 31 日**
    ctas:
      - { label: 免费接入, href: /contact/ }
      - { label: 看交易所方案, href: /solutions/exchanges/ }
---
