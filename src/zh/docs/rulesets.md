---
title: 两套规则集，三种规则形态
description: 路径匹配规则集决定「什么算违规」，评分规则集决定「有多严重、怎么处置」。内置 72 条规则由自身命中、直接暴露、分层暴露三种形态组成。
section: concepts
order: 5
updated: 2026-11-25
---

## 两套规则集，各管一件事

每次筛查用两套规则集：

| | 路径匹配规则集 | 评分规则集 |
|---|---|---|
| 回答 | 这条路径违规吗？违反哪条？ | 整体有多严重？该怎么处置？ |
| 类型 | `kya`（地址）、`kyt_in`（交易来源侧）、`kyt_out`（交易去向侧） | `scoring` |
| 输入 | 资金流图 + 每个节点的标签 | 上一步的命中列表 + 地址链上总流量 |
| 输出 | 命中列表：规则、严重度、跳数、金额、路径 | 0–100 分 + 处置档位 |
| 内容 | 72 条规则，每条是一组条件 | 一张贡献矩阵、严重度权重、档位阈值 |
| 请求参数 | `ruleset_id`（KYT 可分别传 `in_ruleset_id`、`out_ruleset_id`） | `scoring_ruleset_id` |

<div class="callout tip"><b class="t">关键区别</b>路径匹配规则集只回答「是 / 否」，不产生分数。分数完全由评分规则集决定。所以同一批命中，换一套评分规则集，分数和处置就会变，而命中列表不变。</div>

## 内置规则集

| 名称 | 类型 | 说明 |
|---|---|---|
| AML KYA Default v1.3 | kya | 地址筛查，追流入和流出两侧 |
| AML KYT-IN Default | kyt_in | 交易的付款方：这笔钱从哪来 |
| AML KYT-OUT Default | kyt_out | 交易的收款方：这笔钱去哪了 |
| 资金占比评分 Default | scoring | 贡献矩阵 + 四档处置 |

内置规则集对所有人可见、**只读**。要修改，先复制一份，在副本上改，筛查时传副本的 id。传 0 表示用内置默认。另外还有按官方动作发布的平台规则集，例如 FinCEN 9714 命令发布当天上线的规则集，可以直接选用。

<div class="callout warn"><b class="t">只能用自己的或平台的规则集</b>筛查时传别人账号的规则集 id 会被拒绝（HTTP 400，不计费）。测试环境和生产环境是两个数据库，同一套规则集在两边的 id 不同。</div>

## 三种规则形态

72 条内置规则由三种形态组成。理解这三种，就理解了整套规则集：

| 形态 | 代码后缀 | 跳数 | 含义 |
|---|---|---|---|
| 自身命中 | `_SELFHIT` | 只看地址本身（`max_hops = -1`） | 被筛查的地址自己带有这类风险标签。最强信号，直接按自身命中计分 |
| 直接暴露 | `_EXPOSURE` | 1 跳 | 直接对手方带有这类标签，且金额超过门槛 |
| 分层暴露 | `_EXPOSURE_H2` … `_H5` | 2 到 5 跳 | 间接关联。跳得越远，要求的风险资金占比越高（5% / 10% / 15% / 20%） |

## 九类风险

| 风险类别 | 规则数 | 典型严重度 |
|---|---|---|
| 高风险实体（High-Risk Entities） | 16 | 高 |
| 网络犯罪（Cybercrime） | 12 | 高 |
| 混淆服务（Obfuscation） | 8 | 高 |
| 制裁（Sanctions） | 6 | 严重 |
| 恐怖融资（Terrorism Financing） | 6 | 严重 |
| 执法冻结（Public Freezing Action） | 6 | 严重 |
| 非法市场（Illicit Markets） | 6 | 严重 |
| 其他金融犯罪（Other Financial Crimes） | 6 | 严重 |
| 博彩（Gambling） | 6 | 中 |

每类的具体标签见 [标签体系与来源](/zh/docs/labels/)。

## 一条规则由什么组成

| 字段 | 说明 |
|---|---|
| `rule_code` | 规则编号，命中后原样出现在结果和快照里 |
| `risk_level` | 严重度：low / medium / high / critical，决定评分时的权重 |
| `action` | 建议处置：alert / review / edd / block / allow |
| `direction` | 生效方向：inbound / outbound / both |
| `min_hops` / `max_hops` | 适用的路径长度；`max_hops = -1` 表示只看地址自己的标签 |
| `conditions` | 一组条件，必须**全部**满足才命中 |
| `is_highlighted` / `highlight_tags` | 是否作为重点关注（★），以及只对哪些实体生效 |

一条 2 跳分层暴露规则的结构（条件取自内置规则，规则编号以控制台显示为准）：

```json
{
  "rule_code": "…_EXPOSURE_H2",
  "direction": "both",
  "min_hops": 2,
  "max_hops": 2,
  "conditions": [
    { "parameter": "primary_category", "operator": "==", "value": "Sanctions" },
    { "parameter": "amount", "operator": ">", "value": 10 },
    { "parameter": "risk_rate", "operator": ">=", "value": 5 }
  ]
}
```

所有可用的条件参数和写法见 [自定义规则集与重点关注](/zh/docs/custom-rulesets/)。

## KYA 和 KYT 用哪套

- **KYA**（筛地址）：用 `kya` 规则集，流入和流出两侧都追。
- **KYT**（筛交易）：
  - `screen_direction = in`：筛付款方，用 `kyt_in`，回答「这笔钱从哪来」。
  - `screen_direction = out`：筛收款方，用 `kyt_out`，回答「这笔钱去哪了」。
  - `screen_direction = both`：两边分别筛，再合并，取较高的风险等级。

三套路径匹配规则集的规则内容同构，区别只在适用对象。
