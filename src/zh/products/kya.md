---
layout: layouts/page.njk
permalink: /zh/products/kya/
title: 地址筛查 KYA
fullTitle: USDT / USDC 地址风险查询｜DART 地址筛查 KYA · Width
description: DART 地址筛查（KYA）：粘贴一个 USDT / USDC 地址，自动识别所有有流水的链，按资金时间顺序查自身标签、直接往来和多跳暴露，给出 0–100 分和处置建议。
breadcrumb:
  - { label: 平台, href: /platform/ }
  - { label: 地址筛查 KYA }
sections:
  - type: hero
    compact: true
    eyebrow: KYA · 地址筛查
    title: 这个地址，<em>能不能打交道？</em>
    lead: 开户、收款、加白名单之前，先把对方地址查一遍。DART 看它自己是谁、直接和谁来往、钱经过几跳从哪来，再按资金的时间顺序和占比给出 0–100 分和处置建议。
    ctas:
      - { label: 免费接入, href: /contact/ }
      - { label: 看产品手册, href: "https://width.info/docs" }
    note: 接入 DART，免费用到 2028 年 12 月 31 日
    visual: result

  - type: problems
    eyebrow: 地址筛查要解决的问题
    title: 查一个地址，难在哪
    items:
      - problem: 一查就「有关联」，结果没法用
        detail: 只看有没有连上，任何活跃地址往外追几跳都能碰到风险地址。
        solution: |
          - 每一跳必须**先到账、后转出**才算关联，时间上倒着流的路径直接排除
          - 跳数越远门槛越高：默认第 2 / 3 / 4 / 5 跳风险资金占比达 5% / 10% / 15% / 20% 才计入
          - 交易所对手方默认豁免
        proof: 某支付公司实测：同一地址，另一款工具判「中低风险、需复核」，DART 判 0 分通过，逐笔拆开，风险资金在时间上流不过来。
      - problem: 只查了一条链，别的链上出了事
        detail: 同一个 EVM 地址在每条链上都是同一个钱包，只查 Ethereum 说明不了它在其他链上干净。
        solution: |
          - **全链一次筛**：粘贴地址，自动探测它在哪些链、哪些币种上有流水，逐条筛查
          - 最差的那条结果放在最上面，一眼看到风险在哪条链
          - 也可以只筛指定链，或同一条链上的 USDT 和 USDC 一起筛
        proof: 覆盖 11 条链；没有流水的链不筛、不计费。
      - problem: 分数出来了，说不清为什么
        solution: |
          - 结果里列出每一条命中：规则、方向、第几跳、金额、占比、加了几分
          - 被排除的路径同样写明原因（时间倒流、占比不够、交易所豁免）
          - 每次筛查存为不可篡改的快照，随时调出
        proof: 合规复核和监管检查时，直接拿快照说明依据。

  - type: steps
    eyebrow: 怎么查
    title: 三种命中方式，一次全查
    lead: 一个地址的风险可能来自它自己，也可能来自和它打过交道的钱。DART 同时看流入（钱从哪来）和流出（钱到哪去），两个方向权重不同。
    items:
      - { label: 自身命中, title: 地址自己带风险标签, text: 例如在制裁名单上、被稳定币发行方冻结、属于黑客或混币服务。命中即按自身命中规则处理，默认直接 100 分、拦截。 }
      - { label: 直接暴露, title: 一跳内和风险地址往来, text: 直接从风险地址收过钱，或直接打钱给风险地址，按金额和占比计分。 }
      - { label: 分层暴露, title: 多跳后仍有足够比例的风险资金, text: 资金经过中间地址流转，时间顺序成立、占比过了该跳门槛才计入。跳数可按需配置，日常建议流入 3 跳、流出 1 跳。 }

  - type: split
    eyebrow: API
    title: 一个请求，查完全部链
    text: 只传地址，DART 会探测这个地址在哪些链、哪些币种上有流水，每一条都筛一遍，最差的结果放在最上面。多数地址在 1 分钟内返回。
    points:
      - 只想查某几条链，传 `chains`
      - 同一条链上 USDT、USDC 一起查，传 `tokens`
      - 想异步处理，传 `"mode":"async"`
    ctas:
      - { label: 看 API 文档, href: "https://width.info/api-reference", style: ghost }
    visual: code
    code:
      title: POST /api/v3/screen/kya/multi
      body: |
        curl -X POST https://api.width.live/api/v3/screen/kya/multi \
          -H "X-Api-Key: $DART_API_KEY" \
          -H "Content-Type: application/json" \
          -d '{
            "address": "0x8a…c21e",
            "tokens": ["usdt", "usdc"]
          }'

        # → data.lanes[]：每条链、每个币种一条结果
        # → data.score / data.risk：最差那条放在最上面

  - type: faq
    eyebrow: 常见问题
    title: 关于地址筛查
    items:
      - q: 地址筛查（KYA）和交易筛查（KYT）有什么区别？
        a: KYA 查的是一个地址整体的风险，适合开户、加白名单、收款前；KYT 查的是一笔具体的充值或提现，看这笔钱从哪来、到哪去。两者用同一套数据和规则引擎，常常一起用。
      - q: 支持哪些链和币种？
        a: DART 专注 USDT 和 USDC，目前覆盖 11 条链。具体可用的链和币种可以通过 API 实时查询，新链接入后自动可用。
      - q: 一次筛查要多久？
        a: 制裁类检查 1 秒内返回。完整的地址筛查多数在 1 分钟内返回；交易非常活跃的地址追得深时耗时更长，可以改用异步模式，不阻塞业务。
      - q: 会不会因为对方和交易所有往来就被判高风险？
        a: 不会。交易所对手方默认豁免：路径追到交易所就停止，不会因为「这家交易所的其他用户碰过风险地址」牵连到被查地址。强合规场景可以关闭这个开关。
      - q: 分数的阈值能改吗？
        a: 能。四档处置的阈值、每条规则的分值、每一跳的占比门槛都可以按你的风险偏好调整。内置规则集只读，复制一份后随意改。
      - q: 怎么开始用？
        a: 联系我们开通账号，控制台、API、MCP 用同一个账号。接入 DART，免费用到 2028 年 12 月 31 日。

  - type: cta
    eyebrow: 免费接入
    title: 拿一批历史地址，<em>并行跑一次</em>
    text: 不用停掉现有系统。给我们一批地址，脱敏也可以，我们逐条给出结果和命中路径。
    points:
      - 附**与现有工具的差异对比**，每条差异说明原因
      - 接入 DART，免费用到 **2028 年 12 月 31 日**
    ctas:
      - { label: 免费接入, href: /contact/ }
      - { label: 了解交易筛查 KYT, href: /products/kyt/ }
---
