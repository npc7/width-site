---
title: 结果字段速查
navTitle: 结果字段速查
description: KYA 结果里每组字段是做什么的：分数对象、重点关注、命中和路径证据、暴露汇总、地址标签、地址总览、数据完整性、快照编号；KYT 和全链 KYA 多了哪些字段。特别说明 riskScore 和 score.score 的区别。
section: api
order: 3
updated: 2026-11-25
---

这一页按用途分组列出最常用的字段。每个字段的完整说明和示例，见 [完整 API 参考](https://width.info/api-reference)，可以在页面上直接调试。

## 先分清两个「分数」

<div class="callout warn"><b class="t">做处置决策，请用 score.score 和 score.verdict</b>结果里有两个看起来都像分数的字段，含义完全不同。</div>

| | `score.score` | `riskScore` |
|---|---|---|
| 是什么 | 资金占比分数，0–100 | 按最高命中严重度换算的数字 |
| 怎么来 | 评分规则集按「方向 × 跳数 × 严重度 × 资金占比」累加，封顶 100；自身命中时按自身命中分计 | 一一对应 `risk`：critical 90、high 80、medium 60、low 10；没有任何命中为 0 |
| 决定处置吗 | **是**，`score.verdict` 由它分档 | 否 |
| 用来做什么 | 通过 / 复核 / 加强尽调 / 拦截 | 和其他系统的风险等级对接 |

`risk` 为 low 时：`riskScore` 是 0 表示没有命中；是 10 表示命中了低严重度规则。

另外，规则条件里也有一个 `risk_score` 参数，它是**标签**的风险等级换算（critical 90、high 70、medium 50、low 20，没有标签为 0），和结果里的 `riskScore` 换算方式不同，不要混用。

## 分数对象 score

| 字段 | 说明 |
|---|---|
| `score.score` | 0–100；拿不到分母时为 null |
| `score.verdict` | accept / review / edd / block，默认按 0–19 / 20–49 / 50–79 / 80–100 分档 |
| `score.selfHit` / `score.selfHitLevel` | 是否走了自身命中计分，以及严重度 |
| `score.components[]` | 每一格的明细：方向、跳数分段、严重度、基础分、权重、金额、占比、得分 |
| `score.r1` / `r2` / `rOut` | 直接流入、间接流入、流出的风险资金占比（0–1） |
| `score.totalIn` / `totalOut` | 当分母用的链上总流量 |
| `score.hitPaths` / `riskyEdges` | 命中路径数、去重后的风险边数 |

算法见 [评分矩阵与四档处置](/zh/docs/scoring/)。

## 重点关注

| 字段 | 说明 |
|---|---|
| `highlightedHits` | 所有 `highlighted = true` 的命中，已按严重度、规则顺序、跳数排好，直接展示 |
| `highlightSummary.rulesChecked` | 这次检查了几条 ★ 规则；为 0 或没有这个字段，表示规则集里没有 ★ 规则 |
| `highlightSummary.rulesHit` | 有几条 ★ 规则产生了重点关注命中 |

★ 只影响展示，不改分数和处置。

## 命中和路径证据 hits[]

| 字段 | 说明 |
|---|---|
| `ruleCode` / `ruleName` / `category` | 命中的规则 |
| `riskLevel` / `action` | 规则的严重度和建议动作 |
| `pathFlow` | inflow 或 outflow |
| `hops` | 风险对手方离被筛地址几跳 |
| `opponentAddress` | 路径另一端的风险对手方 |
| `exposureAmount` | 能走完整条路径的风险资金，即路径上最小的一笔 |
| `riskRatePct` | `exposureAmount` ÷ 路径最后一笔，百分比 |
| `riskRateGated` | 规则本身带 `risk_rate` 条件时为 true，只有这时才需要展示占比 |
| `riskRateCapped` | 原始占比超过 100% 时为 true，说明路径数据不一致 |
| `highlighted` / `highlightTags` | 是否 ★，以及匹配上的 `highlight_tags` |
| `pathNodes[]` | 证据链，从对手方（`deep` 0）到被筛地址。每个节点有 `address`、`amount`（流入这个节点的金额）、`deep`、`last_closed_timestamp`、`tags[]` |

`pathNodes` 内的字段是下划线写法：`tags[]` 里是 `primary_category`、`tertiary_category`、`risk_level`。

## 汇总

| 字段 | 说明 |
|---|---|
| `risk` / `riskScore` / `riskReason` | 最高严重度、换算数字、一句话原因 |
| `rulesTriggered` | 命中的规则编号列表 |
| `rulesetId` | 这次用的路径匹配规则集 |
| `totalPaths` / `hitPaths` | 分析的路径数、命中的路径数 |
| `exposures[]` | 按类别和方向汇总的暴露金额：`category`、`direction`、`value` |
| `inflowRiskAmount` / `inflowRiskRate` | 流入侧风险金额和比例（0–1） |
| `outflowRiskAmount` / `outflowRiskRate` | 流出侧风险金额和比例（0–1） |
| `addressIdentifications[]` | 地址自身是什么，来自自身命中（例如地址本身被制裁） |

## 地址标签

| 字段 | 说明 |
|---|---|
| `subjectTags[]` | 被筛地址自己的标签：`primaryCategory`、`tertiaryCategory`、`riskLevel`。没有标签时不返回 |
| `otherChainTags[]` | 仅 `all_chain_labels` 打开时：从其他链带来的标签，每条带 `chain`。这些标签也已包含在 `subjectTags` 里 |

## 地址总览 scoreOverview

分母从这里来。

| 字段 | 说明 |
|---|---|
| `token` | 这份结果覆盖的币种，用它确认筛的是 USDT 还是 USDC |
| `inTotal` / `outTotal` | 总流入、总流出 |
| `inCount` / `outCount` | 转入、转出笔数 |
| `balance` | 当前余额 |
| `firstTs` / `lastTs` | 首次、最近一次转账时间（毫秒） |
| `truncated` | 流量达到上游分页上限时为 true，此时占比偏保守 |

总流量查询失败时不返回 `scoreOverview`，原因看 `dataStatus.volume`。

## 数据完整性和快照

| 字段 | 说明 |
|---|---|
| `dataStatus.complete` | false 表示部分数据没读到，干净的结论只能算暂定 |
| `dataStatus.paths` | complete / labels_only / cex_exempt / failed |
| `dataStatus.volume` | ok / no_activity / unavailable / skipped |
| `snapshotId` | 同步结果的快照编号；异步结果在外层的 `snapshot_id` |

取值含义见 [数据完整性与快照](/zh/docs/data-status/)。

## KYT 多了什么

KYT 结果和 KYA 大体相同，另外有：

| 字段 | 说明 |
|---|---|
| `transaction` | 交易哈希 |
| `transfer` | 这次筛的那一笔转账：`eventIndex`、`eventUid`、`token`、`from`、`to`、`amount`、`rawAmount` |
| `transferSelection` | explicit（你指定的）或 default（没指定，取第一笔） |
| `transferCount` / `transfers[]` | 这笔交易里这个币种的转账数和清单。大于 1 时，请确认 `transfer` 是你要的那一笔 |
| `alerts[]` | 告警列表：`alertLevel`、`category`、`exposureType`（DIRECT 或 INDIRECT）、`alertAmount`、`direction`、`hops` 等 |

`screen_direction = both` 时，两侧分开给：

| 字段 | 说明 |
|---|---|
| `score` | 两侧中较高的一侧 |
| `inScore` / `outScore` | 付款方、收款方各自的分数 |
| `inScoreOverview` / `outScoreOverview` | 两侧的地址总览，`address` 告诉你哪一侧是谁 |
| `inDataStatus` / `outDataStatus` | 两侧的数据完整性；`dataStatus` 取较不完整的一侧 |
| `fromTags` / `toTags` | 两侧地址自己的标签（`subjectTags` 此时不返回） |
| `fromOtherChainTags` / `toOtherChainTags` | 两侧从其他链带来的标签 |
| `inHighlightSummary` / `outHighlightSummary` | 两侧的重点关注统计 |
| `inRulesetId` / `outRulesetId` | 两侧用的规则集；`rulesetId` 此时为 0 |

`highlightedHits` 在双向时把两侧拼在一起，按命中路径经过的是哪个端点区分。

## 全链 KYA 多了什么

| 字段 | 说明 |
|---|---|
| `score` / `risk` / `riskScore` | 取最差的那个通道 |
| `worstLane` | 最差通道的 `chain`、`token`、`snapshotId` |
| `lanes[]` | 每个通道：`status`（COMPLETE / FAILED / SKIPPED）、`reason`、流量、`snapshotId`、`result`（该通道完整的 KYA 结果） |
| `lanesProbed` / `lanesScreened` / `lanesFailed` | 探测、筛查、失败的通道数 |
| `charged` | 计费的通道数，跳过的通道不计费 |

## 相关

- [怎么读结果：分数 + 重点关注](/zh/docs/reading-results/)
- [资金占比、分母与门槛](/zh/docs/fund-share/)
- [同步还是异步](/zh/docs/api-async/)
- [完整 API 参考（可在线调试）](https://width.info/api-reference)
