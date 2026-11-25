---
title: 制裁筛查与只看标签
navTitle: 制裁筛查与只看标签
description: 只想知道一个地址本身在不在名单上，把流入、流出跳数都设成 0：不追资金，只拿地址自己的标签去比对自身命中规则，速度最快。本页说明怎么做、怎么覆盖 EVM 多链、怎么和路径筛查配合，以及新的官方动作怎么用上。
section: guides
order: 3
updated: 2026-11-25
---

## 两类问题，两种查法

| 问题 | 查法 |
|---|---|
| 这个地址**本身**是不是制裁地址、黑名单地址？ | 只看标签（本页） |
| 这个地址的钱**有没有经过**制裁地址？ | 路径筛查：[KYA](/zh/docs/kya/)、[KYT](/zh/docs/kyt/) |

只看标签很快，适合放在开户、绑定地址、转账前这类不能让用户等的环节。路径筛查能发现「绕一跳」的情况。多数平台两种都用。

## 只看标签：两边都传 0

```bash
curl -X POST 'https://api.width.live/api/v3/screen/kya' \
  -H "X-Api-Key: $DART_API_KEY" -H 'Content-Type: application/json' \
  -d '{"chain_name":"Ethereum","address":"0x…","inflow_hops":0,"outflow_hops":0,"all_chain_labels":true}'
```

- 不追任何资金，只把地址**自己的标签**拿去和规则集里的「自身命中」规则比对。
- 结果里 `dataStatus.paths` 为 `labels_only`，算作完整结果；`volume` 为 `skipped`。
- 通常 1 秒内返回。
- 控制台里把流入、流出跳数都设成 0，效果相同。
- KYT 同样可以两边都传 0，只比对被选中那一端的标签。

<div class="callout warn"><b class="t">传 0 和不传不一样</b>不传跳数会按默认 3 跳追资金。只看标签时，两个参数都要明确传 0。</div>

## 自身命中规则是什么

自身命中规则的 `max_hops` 是 -1，表示「不看路径，只看地址自己」。内置规则集里这类规则以 `_SELFHIT` 结尾，覆盖制裁、恐怖融资、执法冻结等严重类别。命中时：

- `score.selfHit` 为 true，`score.selfHitLevel` 写明严重度；
- 分数直接按「自身命中分 × 严重度权重」计算，默认自身命中分是 100；
- `addressIdentifications` 说明地址**是什么**，例如「地址是制裁实体」。

只想针对某一份名单，可以在自己的规则集里写一条自身命中规则，用 `tertiary_category` 指定名单，例如美国 OFAC：

```json
{
  "direction": "both",
  "min_hops": 0,
  "max_hops": -1,
  "conditions": [
    { "parameter": "primary_category", "operator": "==", "value": "Sanctions" },
    { "parameter": "tertiary_category", "operator": "==", "value": "us-ofac" }
  ]
}
```

这类规则只认标签条件，路径条件（跳数、金额、占比）会被忽略，至少要有一个标签条件。写法见 [自定义规则集与重点关注](/zh/docs/custom-rulesets/)。

## 标签从哪来

制裁标签来自 OFAC、联合国、欧盟、英国、新加坡等官方名单，以及名单里公布的钱包地址；执法冻结来自执法机构公开文件和 USDT、USDC 发行方的冻结记录。完整来源和分级见 [标签体系与来源](/zh/docs/labels/)。

## EVM 地址：别只看一条链

标签按「链 + 地址」存放。一个在以太坊上被制裁的 0x 地址，在 BSC 上可能没有任何标签，只看 BSC 就会漏掉。两种做法：

- **打开 `all_chain_labels: true`**：一次读出这个地址在所有链上的标签，当作它自己的标签参与自身命中判定；带来的标签列在 `otherChainTags`，标明来源链。对 Tron 地址无效。
- **全链 KYA 两边传 0**：`POST /api/v3/screen/kya/multi` 配 `inflow_hops: 0, outflow_hops: 0`，只筛这个地址有标签的链。

在交易所豁免下，其他链上的标签可以**取消**豁免，但不能授予豁免。跨链标签查询失败时，筛查会失败，不会当成「没有标签」放过。见 [EVM 多链与跨链](/zh/docs/cross-chain/)。

## 和路径筛查怎么配合

一个常见的组合：

1. **开户、绑定地址、转账前**：只看标签，0 / 0，EVM 打开 `all_chain_labels`。命中自身命中规则直接拦截。
2. **充值入账前**：路径筛查，流入 3 跳，看资金来源有没有经过制裁地址。
3. **定期**：对存量客户地址做只看标签的回扫；名单更新后再扫一遍，或用 [持续监控](/zh/docs/monitoring/)。

## 新的官方动作，当天可用

官方发布新的制裁或执法动作时，我们会把它做成**平台规则集**，你在规则集下拉框或 `ruleset_id` 里直接选用，不需要自己写规则。

例如 FinCEN 依据第 9714 条对某家交易所发布的**命令**（不是制裁），11 月 6 日发布，平台规则集当天上线。这类针对某家交易所的规则集，不需要你手动关闭交易所豁免。

<div class="callout tip"><b class="t">命令和制裁不是一回事</b>FinCEN 9714 是一项命令，不是制裁名单。对外说明你的处置依据时，请按原文件的性质表述。</div>

## 相关

- [标签体系与来源](/zh/docs/labels/)
- [交易所豁免](/zh/docs/exchange-exemption/)
- [EVM 多链与跨链](/zh/docs/cross-chain/)
- [怎么向监管解释你的规则](/zh/docs/explain-to-regulator/)
