---
title: 交易筛查 KYT
description: 针对一笔交易里的一笔转账，查付款方的资金来源、收款方的资金去向，或两边一起查。本页说明方向、两侧规则集、多转账交易怎么选、双向结果怎么合并，以及数据不完整时怎么处理。
section: guides
order: 2
updated: 2026-11-25
---

## 什么时候用

KYT（Know Your Transaction）针对**一笔具体的转账**：

- **充值入账前**：这笔钱从哪来，来源干净吗？
- **提现放款后留档、或事后复核**：这笔钱打给了谁，去向干净吗？
- **可疑交易复核**：两边一起看。

<div class="callout tip"><b class="t">放款前还没有交易哈希</b>KYT 需要交易哈希。提现签名放款之前，交易还不存在，这时用 <a href="/zh/docs/kya/">KYA</a> 筛收款地址；放款上链后，可以再用 KYT 留一份针对这笔转账的快照。</div>

## 方向：in、out、both

参数 `screen_direction` 决定筛哪一端：

| 取值 | 筛谁 | 回答 | 默认规则集 |
|---|---|---|---|
| `in` | 付款方（来源地址） | 这笔钱从哪来 | KYT-IN 内置规则集 |
| `out` | 收款方（去向地址） | 这笔钱去哪了 | KYT-OUT 内置规则集 |
| `both`（默认） | 两端分别筛，再合并 | 两个问题都要 | 各侧各用自己的 |

只有被选中的那一端会被追踪。例如 `screen_direction: in` 配 `inflow_hops: 3, outflow_hops: 0`，只追付款方的钱从哪来，不会顺带调查收款方。

## 两侧用不同的规则集

| 参数 | 用于 | 传 0 时 |
|---|---|---|
| `in_ruleset_id` | 来源侧（`in` 和 `both`） | 退回 `ruleset_id`，再退回 KYT-IN 内置 |
| `out_ruleset_id` | 去向侧（`out` 和 `both`） | 退回 `ruleset_id`，再退回 KYT-OUT 内置 |
| `ruleset_id` | 没有单独指定的那一侧 | 各侧内置默认 |
| `scoring_ruleset_id` | 评分 | 你自己的评分规则集，没有则用内置默认 |

所以 `both` 可以两侧各用一套规则集，例如来源侧更严、去向侧只看直接对手方。其余参数（跳数、最小金额、时序、交易所豁免、`all_chain_labels`、`auto_monitor`、`mode`）和 [KYA](/zh/docs/kya/) 相同，跳数作用在被选中的每一端上。

## 一笔交易里有多笔转账

批量付款、DEX 路由、合约调用，一笔交易常常移动好几次代币。**一次 KYT 只筛其中一笔转账。**

1. 先用 `POST /api/v3/transaction-transfers` 列出这笔交易里的代币转账（按事件顺序，不计费）：

```bash
curl -X POST 'https://api.width.live/api/v3/transaction-transfers' \
  -H "X-Api-Key: $DART_API_KEY" -H 'Content-Type: application/json' \
  -d '{"chain_name":"Ethereum","tx_id":"0x…"}'
```

2. 用 `event_index` 指定要筛的那一笔：EVM 链上是 logIndex，Tron 上是交易内的日志位置，0 是有效值。也可以用 `from_address` / `to_address` 按发送方、接收方来选。

3. 核对响应里的 `transfer`（这次筛的是哪一笔）、`transferSelection`（`explicit` 表示你指定的，`default` 表示默认选的）和 `transferCount`。

不指定时筛第一笔，之后对同一笔交易的未指定请求也总是筛同一笔，所以重复请求得到一致的结果。指定的条件匹配不到、或匹配到多笔时，返回 HTTP 400，并在 `data.transfers` 里列出这笔交易的全部转账。

列转账接口查不到交易返回 404；上游查询失败返回 502，可以重试；刚上链、索引还没跟上的交易会直接从节点读取（`source: node`）。

## 双向结果怎么合并

`screen_direction: both` 时，两端各自筛完再合并：

| 字段 | 说明 |
|---|---|
| `score` | 两侧中**较高**的那个分数 |
| `inScore` / `outScore` | 来源侧、去向侧各自的分数 |
| `risk` | 合并后取较高的风险等级 |
| `fromTags` / `toTags` | 两端各自的标签（单向筛查时是 `subjectTags`） |
| `inHighlightSummary` / `outHighlightSummary` | 两侧各自的重点关注统计（单向时是 `highlightSummary`） |
| `highlightedHits` | 两侧的重点关注命中拼在一起；看 `pathNodes` 经过哪一端来区分 |
| `inRulesetId` / `outRulesetId` | 两侧实际用的规则集（此时 `rulesetId` 为 0） |
| `inScoreOverview` / `outScoreOverview` | 两端各自的链上流量 |
| `alerts[]` | 告警列表：严重度、类别、直接或间接、金额、规则编号、方向、跳数 |

## 数据不完整时

`both` 时还有 `inDataStatus`、`outDataStatus`。顶层 `dataStatus` 取两侧中**较不完整**的那个。

如果某一侧 `paths` 是 `failed`，说明这一侧没读到，结果只覆盖另一侧，`complete` 为 false。此时干净的结论只能算暂定：重新筛查，或转人工复核。见 [数据完整性与快照](/zh/docs/data-status/)。

## 推荐设置

| 场景 | 方向 | 流入 / 流出 |
|---|---|---|
| 充值入账前 | `in` | 3 / 0 |
| 提现上链后留档 | `out` | 0 或 1 / 1 |
| 可疑交易复核 | `both` | 3 / 1 |

## 相关

- [地址筛查 KYA](/zh/docs/kya/)
- [两套规则集，三种规则形态](/zh/docs/rulesets/)
- [持续监控](/zh/docs/monitoring/)
- [上线前检查清单](/zh/docs/go-live-checklist/)
