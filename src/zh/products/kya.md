---
layout: layouts/page.njk
permalink: /zh/products/kya/
title: 地址筛查 KYA
fullTitle: USDT / USDC 地址风险查询｜DART 地址筛查 KYA · Width
description: DART 地址筛查（KYA）：粘贴一个 USDT / USDC 地址，自动探测它在哪些链上有流水，按资金的时间顺序查自身标签、直接往来和多跳关联，给出 0–100 分、处置建议和每一分的依据。
breadcrumb:
  - { label: 平台, href: /platform/ }
  - { label: 地址筛查 KYA }
sections:
  - type: hero
    compact: true
    eyebrow: KYA · 地址筛查
    title: 这个地址，<em>能不能打交道？</em>
    lead: 开户、收款、加白名单之前，先把对方地址查一遍。DART 看它自己是谁、直接和谁来往、钱经过几跳从哪来，只算真的流得到它这里的钱，给出 0–100 分、处置建议和每一分的依据。
    ctas:
      - { label: 开通账号, href: /contact/ }
      - { label: 看文档, href: /zh/docs/kya/ }
    visual: result

  - type: problems
    eyebrow: 查一个地址，难在哪
    title: 三个最常见的问题
    items:
      - problem: 一查就「有关联」，结果没法用
        detail: 只看有没有连上，任何活跃地址往外追几跳都能碰到风险地址。
        solution: |
          - 每一跳必须**先到账、后转出**才算关联，钱还没到就先转出的路径直接排除
          - 跳得越远门槛越高：第 2 / 3 / 4 / 5 跳风险资金占比要达到 5% / 10% / 15% / 20%
          - 交易所对手方默认豁免，别家交易所的用户不会牵连这个地址
        proof: 被排除的路径同样列出原因：时序不成立、占比不够、交易所豁免。
      - problem: 只查了一条链，别的链上出了事
        detail: 同一个 EVM 地址在每条链上都是同一个钱包。只查以太坊，说明不了它在其他链上干净。
        solution: |
          - **全链一次筛**：粘贴地址，自动探测它在哪些链、哪些币种上有流水，逐条筛查
          - 最差的那条结果排最前，一眼看到风险在哪条链
          - 打开全链标签，其他 EVM 链上的标签也参与判定
        proof: Arbitrum 上约 22.6 万个地址本链没有标签，但在其他链上被标为高风险。
      - problem: 分数出来了，说不清为什么
        solution: |
          - 每一条命中都列出：规则、方向、第几跳、金额、占比、加了几分
          - 重点关注的命中单独列出，不会被分数稀释
          - 数据没读全时结果会标明，不会默默判通过
        proof: 快照原样留存当时的参数、规则集和证据，合规复核和监管检查时直接调出。

  - type: steps
    eyebrow: 查什么
    title: 三种命中方式，一次全查
    lead: 一个地址的风险可能来自它自己，也可能来自和它打过交道的钱。DART 同时看流入（钱从哪来）和流出（钱到哪去），两个方向权重不同。
    items:
      - { label: 自身命中, title: 地址自己带风险标签, text: 例如在制裁名单上、被稳定币发行方冻结、属于黑客或混币服务。严重类别默认直接 100 分、拦截。 }
      - { label: 直接往来, title: 一跳内和风险地址往来, text: 直接从风险地址收过钱，或直接打钱给风险地址。不看占比，超过 10 美元就命中，再按金额和占比计分。 }
      - { label: 多跳关联, title: 隔几跳仍有足够比例的风险资金, text: 资金经过中间地址流转，时序成立、占比过了该跳门槛才计入。日常建议流入 3 跳、流出 1 跳。 }

  - type: split
    eyebrow: API
    title: 一个请求，<em>查完全部链</em>
    text: 只传地址，DART 会探测这个地址在哪些链、哪些币种上有流水，每一条都筛一遍，最差的结果排最前。没有流水的链不筛、不计次。
    points:
      - 只想查某几条链，传 `chains`
      - 同一条链上 USDT、USDC 一起查，传 `tokens`
      - 追得深、地址很活跃时，传 `"mode":"async"`
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
        # → data.score / data.risk：最差那条排最前

  - type: faq
    eyebrow: 常见问题
    title: 关于地址筛查
    items:
      - q: 地址筛查（KYA）和交易筛查（KYT）有什么区别？
        a: KYA 查一个地址整体的风险，适合开户、加白名单、收款前；KYT 查一笔具体的充值或提现，看这笔钱从哪来、到哪去。两者用同一套数据和规则引擎，常常一起用。
      - q: 支持哪些链和币种？
        a: USDT 和 USDC，覆盖 Tron 和主流 EVM 链。可用的链以接口 `GET /api/v3/chains` 实时返回为准，新链接入后自动可用。
      - q: 一次筛查要多久？
        a: 只看标签通常 1 秒内返回。需要追资金的筛查中位 0.61 秒，九成在 5 秒内；交易非常活跃的地址追得深时更久，可以用异步模式，不阻塞业务。
      - q: 会不会因为对方和交易所有往来就被判高风险？
        a: 不会。交易所对手方默认豁免：路径追到普通交易所就停下，不会因为这家交易所的其他用户碰过风险地址牵连到被查地址。被制裁或带高风险标签的交易所不豁免。
      - q: 分数的阈值能改吗？
        a: 能。四档处置的阈值、每条规则的分值、每一跳的占比门槛都可以按你的风险偏好调整。内置规则集只读，复制一份后随意改。

  - type: cta
    eyebrow: 先试再说
    title: 拿一批历史地址，<em>并行跑一次</em>
    text: 不用停掉现有系统。给我们一批地址，脱敏也可以，我们逐条给出结果和命中路径，每条差异说明原因。
    ctas:
      - { label: 开通账号, href: /contact/ }
      - { label: 了解交易筛查 KYT, href: /products/kyt/ }
---
