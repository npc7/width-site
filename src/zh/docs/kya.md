---
title: 地址筛查 KYA
description: 给一个地址，查它自己的标签、直接往来和多跳暴露，得到 0–100 分和处置建议。本页列出控制台和 API 的全部参数、各场景的推荐设置、结果怎么读和常见坑。
section: guides
order: 1
updated: 2026-11-25
---

## 什么时候用

KYA（Know Your Address）回答「这个地址能不能打交道」。典型场景：

- 用户绑定提现地址、白名单地址时；
- 付款、转账前，检查收款方；
- 开户或尽调时，检查客户提交的钱包；
- 复核一个可疑的充值来源地址；
- 存量地址定期回扫。

如果你要查的是**某一笔交易**的来源或去向，用 [交易筛查 KYT](/zh/docs/kyt/)。如果只想知道地址**本身**在不在名单上，用 [制裁筛查与只看标签](/zh/docs/sanctions/)。

## 一次 KYA 查了什么

一次地址筛查会同时看三件事：

1. **地址自己是谁**：它身上有没有标签，例如制裁、执法冻结、交易所。地址自己带严重标签时，命中「自身命中」规则，分数直接拉满。
2. **直接往来**：和它直接转过账的对手方（第 1 跳）里，有没有风险对象，金额多大。
3. **多跳暴露**：往上游、下游再追几跳，有没有经过风险对象。跳得越远，内置规则要求的风险资金占比越高，远处的弱关联不会被放大。

追资金时默认按时间顺序：每一跳先到账、后转出，时间上流不过来的路径直接排除。普通交易所地址默认豁免，直接返回 0 分。最后，评分规则集把所有命中折算成分数和处置。

## 在控制台

进入「合规 › 筛查」，粘贴地址，系统自动识别链并显示「KYA」。选好路径匹配规则集和评分规则集，按需调整高级选项，运行。步骤见 [5 分钟上手：控制台](/zh/docs/quickstart-console/)。

## 在 API

`POST https://api.width.live/api/v3/screen/kya`

| 参数 | 必填 | 默认 | 说明 |
|---|---|---|---|
| `chain_name` | 是 | Tron | 链名，不区分大小写。可选值见 `GET /api/v3/chains` |
| `address` | 是 | | 要筛查的地址 |
| `token` | 否 | 链的默认币种 | `usdt` 或 `usdc`，不区分大小写。路径、命中和分数只覆盖这个币种 |
| `inflow_hops` | 否 | 3 | 流入追几跳；0 表示不追流入 |
| `outflow_hops` | 否 | 3 | 流出追几跳；0 表示不追流出。两边都是 0 时只看地址自己的标签 |
| `min_timestamp` / `max_timestamp` | 否 | 全部历史 | 时间窗口（Unix 毫秒）。缩小窗口会明显变慢，非必要不设 |
| `min_amount` | 否 | 10 | 低于这个金额的转账不纳入分析 |
| `max_nodes_per_hop` | 否 | 200 | 每跳最多展开的对手方数量 |
| `force_time_sequence` | 否 | true | 强制时序：每一跳不早于上一跳 |
| `ruleset_id` | 否 | 0 | 路径匹配规则集，0 为内置默认。只能是你自己的或内置、平台规则集 |
| `scoring_ruleset_id` | 否 | 0 | 评分规则集。0 表示用你自己的评分规则集，没有则用内置默认 |
| `cex_immune` | 否 | true | 普通交易所地址直接返回 0 分；带其他高风险标签的交易所照常筛查 |
| `all_chain_labels` | 否 | false | EVM 地址在其他链上的标签也当作它自己的标签参与判定。对 Tron 无效 |
| `auto_monitor` | 否 | false | 同时把地址加入持续监控，见 [持续监控](/zh/docs/monitoring/) |
| `force_run` | 否 | false | 不复用相同参数的近期调查，强制重读链上数据。开销是一次完整调查 |
| `mode` | 否 | sync | `sync` 直接返回结果；`async` 返回 `job_id`，再轮询 |

同步、异步的写法和轮询方式见 [5 分钟上手：API](/zh/docs/quickstart-api/)。

### 一个地址，所有链

EVM 地址在所有 EVM 链上是同一个钱包。用 `POST /api/v3/screen/kya/multi`，只传 `address`，系统会探测这个地址在哪些链、哪些币种上有流水或标签，逐个筛查，最差的那条排在最前（`data.worstLane`）。只对实际筛查的通道计费，空通道不收费。可以用 `chains`、`tokens` 缩小范围。详见 [EVM 多链与跨链](/zh/docs/cross-chain/)。

## 各场景推荐设置

| 场景 | 流入 / 流出 | 其他建议 |
|---|---|---|
| 提现地址、收款方检查 | 1 / 1 | EVM 地址打开 `all_chain_labels` |
| 开户、客户钱包尽调 | 3 / 1 | 用全链 KYA 看全貌 |
| 可疑来源复核 | 3 / 0 或 1 | 需要更深时转 [资金追踪](/zh/docs/tracing/) |
| 只看名单 | 0 / 0 | 最快，见 [制裁筛查](/zh/docs/sanctions/) |
| 存量回扫 | 与日常一致 | 用异步，控制并发 |

## 结果怎么读

| 看什么 | 字段 |
|---|---|
| 处置建议 | `score.verdict`、`score.score` |
| 地址自己是谁 | `subjectTags`；开 `all_chain_labels` 时，其他链带来的标签在 `otherChainTags` |
| 自己是否命中 | `score.selfHit`、`addressIdentifications` |
| 重点关注 | `highlightedHits`、`highlightSummary` |
| 每条命中的证据 | `hits[]`：`ruleCode`、`pathFlow`、`hops`、`opponentAddress`、`exposureAmount`、`riskRatePct`、`pathNodes` |
| 按类别汇总的暴露金额 | `exposures[]` |
| 地址的链上流量 | `scoreOverview`：总流入、总流出、笔数、余额、活跃区间、`token` |
| 数据是否完整 | `dataStatus` |
| 快照 | `snapshotId` |

`hits[].pathNodes` 从对手方（`deep` 为 0）排到被筛查的地址，每个节点带金额、时间和标签（大类、实体、风险等级）。完整解读见 [怎么读结果](/zh/docs/reading-results/)。

## 常见坑

- **只想查一个方向，却没把另一边传成 0**：不传按 3 跳查。
- **EVM 地址只筛了一条链**：干净不代表别的链也干净。用全链 KYA，或打开 `all_chain_labels`。
- **币种选错**：`scoreOverview.token` 写明了这次覆盖的币种；`volume: no_activity` 说明这个地址在这条链这个币种上没有转账。
- **把 `riskScore` 当分数用**：处置请用 `score.verdict`。
- **同步请求超时后重发**：会再创建并计费一个新任务。轮询返回的 `job_id`。
- **同一地址、同样参数，结果没变化**：默认复用近期的调查结果。需要重读链上数据时加 `force_run: true`。

## 相关

- [交易筛查 KYT](/zh/docs/kyt/)
- [跳数怎么设计、怎么设](/zh/docs/hops/)
- [数据完整性与快照](/zh/docs/data-status/)
- [上线前检查清单](/zh/docs/go-live-checklist/)
