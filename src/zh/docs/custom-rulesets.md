---
title: 自定义规则集与重点关注
navTitle: 自定义规则集与重点关注
description: 复制内置规则集，在副本上新增、修改规则，给需要盯住的规则打 ★，必要时用 highlight_tags 限定到具体实体。本页列出全部条件参数和运算符、写规则的经验，以及三个可以直接改用的例子。
section: guides
order: 4
updated: 2026-11-25
---

## 第一步：复制，不要直接改

内置规则集（AML KYA Default、KYT-IN、KYT-OUT、资金占比评分）对所有人可见、**只读**，直接修改返回 HTTP 403。正确做法：

1. 复制内置规则集，得到一个属于你的副本；
2. 在副本上新增、修改、删除规则；
3. 筛查时传副本的 id（`ruleset_id`，KYT 用 `in_ruleset_id` / `out_ruleset_id`）。

**控制台**：左侧「规则集」入口有 KYA、KYT-IN、KYT-OUT、评分四张卡片，点规则条数可以看全部规则。复制后在副本里编辑。

**API**：

```bash
# 找到内置规则集的 id
curl -X POST 'https://api.width.live/api/v3/rulesets/list' \
  -H "X-Api-Key: $DART_API_KEY" -H 'Content-Type: application/json' \
  -d '{"ruleset_type":"kya"}'

# 复制
curl -X POST 'https://api.width.live/api/v3/rulesets/clone' \
  -H "X-Api-Key: $DART_API_KEY" -H 'Content-Type: application/json' \
  -d '{"source_ruleset_id": <内置 id>, "name": "我们的 KYA 规则集"}'
```

<div class="callout warn"><b class="t">测试和生产的 id 不同</b>两个环境是两个数据库。在测试环境复制好的规则集，到生产环境要重新复制、重新改，并把生产的 id 写进配置。另外，筛查只能用你自己的规则集或内置、平台规则集，传别人账号的 id 会被拒绝（HTTP 400，不计费）。</div>

## 第二步：新增或修改规则

```bash
curl -X POST 'https://api.width.live/api/v3/rulesets/rule/create' \
  -H "X-Api-Key: $DART_API_KEY" -H 'Content-Type: application/json' \
  -d '{
    "ruleset_id": <你的 id>,
    "rule_code": "MY_MIXER_EXPOSURE_H2",
    "name": "两跳内混币器资金 ≥ 10%",
    "category": "Obfuscation",
    "risk_level": "high",
    "action": "review",
    "direction": "inbound",
    "min_hops": 2,
    "max_hops": 2,
    "conditions": [
      {"parameter":"secondary_category","operator":"==","value":"Mixers"},
      {"parameter":"risk_rate","operator":">=","value":10}
    ]
  }'
```

- 必填：`rule_code`（规则集内唯一，重复返回 409）、`name`、`risk_level`、`action`、至少一个条件。
- `direction` 默认 both；`max_hops` 为 -1 时是自身命中规则，只看地址自己的标签。
- 新规则从下一次使用这套规则集的筛查起生效。
- 修改用 `rule/update`，只传要改的字段；传了 `conditions` 会**整体替换**原来的条件列表。删除用 `rule/delete`，历史快照里的命中不受影响。删除整个规则集后，仍传它 id 的筛查会退回内置默认规则集，记得同步改掉你系统里的配置。

字段含义见 [两套规则集，三种规则形态](/zh/docs/rulesets/)。

## 条件参数

每个条件是 `{parameter, operator, value}`，一条规则的**所有**条件都满足才命中。

| 参数 | 测什么 | 类型 | 说明 |
|---|---|---|---|
| `primary_category` | 标签 | 文本 | 大类，例如 Sanctions、Cybercrime。区分大小写 |
| `secondary_category` | 标签 | 文本 | 子类，例如 Mixers、Phishing。区分大小写 |
| `tertiary_category` | 标签 | 文本 | 实体，制裁标签是所在名单，例如 us-ofac、huionepay。不区分大小写 |
| `quaternary_category` | 标签 | 文本 | 地址类型，例如 htx-hotwallet，常为空。不区分大小写 |
| `risk_level` | 标签 | 文本 | 数据源给标签的风险等级：low / medium / high / critical（小写）。不是规则自己的严重度 |
| `risk_score` | 标签 | 数字 | 标签最高风险等级换算成数字：critical 90、high 70、medium 50、low 20，无标签为 0 |
| `hops` | 路径 | 数字 | 路径长度，1 为直接对手方 |
| `inflow_hops` / `outflow_hops` | 路径 | 数字 | 路径长度，只在流入 / 流出路径上检查 |
| `amount` | 路径 | 数字 | 路径上最小的一笔转账，即最多可能走完全程的风险资金，结果里叫 `exposureAmount` |
| `inflow_total_amount` / `outflow_total_amount` | 路径 | 数字 | 和 `amount` 同一个数，只在流入 / 流出路径上检查。名字里有 total，但不是总额 |
| `risk_rate` | 路径 | 数字 | 最小一笔 ÷ 最后一笔，百分比，10 表示 10%。结果里叫 `riskRatePct`。见 [资金占比与门槛](/zh/docs/fund-share/) |
| `direction` | 路径 | 文本 | inbound / outbound。通常直接用规则自己的 `direction` 字段 |
| `chain_name` | 路径 | 文本 | 路径所在的链，必须**小写**，例如 tron、ethereum、bsc |

各级标签的取值见 [标签体系与来源](/zh/docs/labels/)。

## 运算符

| 运算符 | 含义 | 值 | 也接受 |
|---|---|---|---|
| `==` | 等于 | 文本或数字 | `=`、eq、equals、is |
| `!=` | 不等于 | 文本或数字 | `<>`、ne、not、not_equals |
| `IN` | 等于列表中任意一个 | JSON 数组 | |
| `NOT_IN` | 不等于列表中任何一个 | JSON 数组 | not in、nin |
| `CONTAINS` | 包含子串 | 文本 | like |
| `>` `<` `>=` `<=` | 大小比较 | 数字 | gt、lt、gte / ge、lte / le |

## 写规则的经验

- **「A 或 B」用 `IN`**，或者拆成两条规则。条件之间永远是「且」。
- **`IN`、`NOT_IN` 必须传数组**，传一个字符串永远不会匹配。
- **运算符和类型不匹配不会报错，但永远不命中**：例如对文本用 `>`，对数字用 `IN`。
- **大小写**：大类、子类、`risk_level`、`direction` 严格匹配；实体、地址类型不区分大小写；`chain_name` 必须小写，写成 Tron 永远不会匹配。
- **标签条件测的是路径远端的对手方**：流入路径测来源，流出路径测去向，不测中间地址。
- **一个地址可以有多个标签**，每个标签条件只要有一个标签满足就算通过，两个条件可能由不同标签分别满足。所以 `!=`、`NOT_IN` 只要有一个标签不同就通过，**不等于「所有标签都不是」**。没有标签的对手方，任何类别和 `risk_level` 条件都不通过，`!=`、`NOT_IN` 也一样。
- **`inflow_*` 只在流入路径上检查，`outflow_*` 只在流出路径上检查**，另一侧会跳过（既不算通过也不算失败）。所有条件都被跳过的规则不会命中。
- 写入时会校验：缺参数或值、未知参数、未知运算符返回 400，错误信息指明是第几个条件。

## 重点关注（★）

给规则打 ★ 后，它的命中会单独列在 `highlightedHits`，排在最前，并计入 `highlightSummary`。★ **只影响展示，不改分数、不改处置**。

用 `highlight_tags` 可以把 ★ 限定到具体实体：非空时，只有对手方标签（四级分类任意一级）包含其中某个值（不区分大小写）的命中才算重点关注；为空则这条规则的所有命中都算。

```bash
curl -X POST 'https://api.width.live/api/v3/rulesets/rule/highlight' \
  -H "X-Api-Key: $DART_API_KEY" -H 'Content-Type: application/json' \
  -d '{"ruleset_id": <你的 id>, "rule_ids": [3077, 3078], "is_highlighted": true, "highlight_tags": ["Huione"]}'
```

不传 `highlight_tags` 保留每条规则原来的范围；传 `[]` 清空，恢复为不限定。取消 ★ 时 `highlight_tags` 会被保留。新建或修改规则时，也可以直接传 `is_highlighted` 和 `highlight_tags`。

## 三个例子

**三跳内接触某个实体**（实体名不区分大小写，按需调整跳数范围）：

```json
{"direction":"both","min_hops":1,"max_hops":3,
 "conditions":[{"parameter":"tertiary_category","operator":"IN","value":["huionepay","xinbi"]}]}
```

**两跳外的混币器，且占到达资金 ≥ 10%**：

```json
{"direction":"inbound","min_hops":2,"max_hops":2,
 "conditions":[{"parameter":"secondary_category","operator":"==","value":"Mixers"},
               {"parameter":"risk_rate","operator":">=","value":10}]}
```

**三跳内的网络犯罪资金超过 1,000 U**：

```json
{"direction":"inbound","min_hops":1,"max_hops":3,
 "conditions":[{"parameter":"secondary_category","operator":"IN","value":["Hacker/Thief","Ransomware","Phishing","Pig Butchering"]},
               {"parameter":"amount","operator":">","value":1000}]}
```

`amount` 是路径上最小的一笔，所以这 1,000 U 都可能来自源头。

## 相关

- [调优：降误报、调档位](/zh/docs/tuning/)
- [怎么读结果：分数 + 重点关注](/zh/docs/reading-results/)
- [AI 助手（MCP）](/zh/docs/mcp/)：用自然语言改规则
- [怎么向监管解释你的规则](/zh/docs/explain-to-regulator/)
