---
title: 标签体系与来源
description: 每个被标注的地址都有四级分类：大类、子类、实体、地址类型。风险标签来自官方制裁和执法动作、链上可验证的事实，以及 Width 情报团队对公开事件的采集和核实。
section: concepts
order: 8
updated: 2026-11-25
---

## 四级分类

| 层级 | 规则参数 | 例子 | 结果里能看到吗 |
|---|---|---|---|
| 一级：大类 | `primary_category` | Sanctions、Cybercrime、Exchanges & DeFi | 能 |
| 二级：子类 | `secondary_category` | Sanctioned Entity、Phishing、Mixers、CEX | 不显示，但规则可以用 |
| 三级：实体 | `tertiary_category` | US-OFAC、Huionepay、Tornado_cash、Htx | 能 |
| 四级：地址类型 | `quaternary_category` | htx-hotwallet、htx-deposit、us-ofac-sanctions | 不显示，但规则可以用 |

每个标签还有一个风险等级：critical / high / medium / low。一个地址可以同时有多个标签。

## 风险类别

| 大类 | 包括（子类） | 默认风险等级 |
|---|---|---|
| 制裁 Sanctions | 制裁实体、受限实体、受制裁管辖区 | 严重 |
| 恐怖融资 Terrorism Financing | 与恐怖组织相关的钱包 | 严重 |
| 执法冻结 Public Freezing Action | 执法机构冻结或扣押的地址 | 严重 |
| 非法市场 Illicit Markets | 人口贩卖、非法服务、儿童性虐待内容（CSAM） | 严重 |
| 其他金融犯罪 Other Financial Crimes | 涉嫌洗钱、逃税 | 严重 |
| 网络犯罪 Cybercrime | 被盗资金、勒索软件、钓鱼、庞氏骗局、杀猪盘、项目方跑路、蜜罐合约、虚假预售、黑灰产 | 高 |
| 混淆服务 Obfuscation | 混币器、隐私钱包、隐私代币、中心化跨链兑换、加密货币 ATM | 高 |
| 高风险实体 High-Risk Entities | 被制裁的交易所、反洗钱管控薄弱的交易所、高风险地区交易所、高风险 OTC | 高 |
| 博彩 Gambling | 线上赌场、体育博彩、无牌照博彩 | 中到高 |

## 中性类别

| 大类 | 包括 | 用途 |
|---|---|---|
| 交易所与 DeFi | 中心化交易所、DEX、DeFi 协议、借贷协议、跨链桥、NFT 市场 | 识别对手方；交易所默认豁免 |
| 其他实体 | 传统金融机构、支付机构、商户、托管服务 | 识别对手方 |

中性标签不计风险，用来告诉你对手方是谁。DART 已标注的 2 亿个地址里，九成以上是交易所地址。

## 风险标签从哪来

| 类别 | 来源 |
|---|---|
| 制裁 | OFAC、联合国、欧盟、英国、新加坡等官方制裁名单，以及名单里公布的钱包地址。新的官方动作当天跟进，例如 FinCEN 9714 命令 11 月 6 日发布，平台规则集当天上线 |
| 恐怖融资 | 各国官方公开的反恐冻结、扣押令 |
| 执法冻结 | 执法机构公开的文件；USDT、USDC 发行方的冻结记录（含冻结时间） |
| 非法市场、其他金融犯罪 | 执法通报、公开调查报告，以及对公开 Telegram 频道和机器人的持续监控 |
| 网络犯罪 | 安全事件按事件归集涉事地址（项目方公告、安全机构披露、被盗资金的链上追踪）；诈骗和钓鱼地址来自公开举报，经情报团队核实 |
| 混淆服务 | 这些服务公开的合约地址和存取款地址 |
| 高风险实体 | 监管机构的警示和执法信息，加上我们自己采集的交易所地址 |

## 怎么保证准确

- **能溯源**：公开来源的标签能追到原始发布；情报类标签都经过人工核实。
- **入库三道检查**：入库前独立预检，入库时抽样回查，入库后按链和实体分层复核。
- **能纠错**：每次标签修改都可以完整撤销，发现误标可以很快更正。
- **跨链一致**：EVM 地址在一条链上的标签，可以选择在其他 EVM 链上同样生效，见 [EVM 多链与跨链](/zh/docs/cross-chain/)。

<div class="callout tip"><b class="t">标签只说明「和哪类风险有关」</b>标签说明一个地址和哪类公开风险事实相关，不是对个人的定性。是否拦截，由你的规则集和处置档位决定。对某个标签有疑问，把地址发给我们，我们提供来源说明；确认误标会尽快更正。</div>

## 在规则里怎么用

- 按大类：`{"parameter":"primary_category","operator":"==","value":"Sanctions"}`
- 按子类：`{"parameter":"secondary_category","operator":"IN","value":["Mixers","Privacy Wallet"]}`
- 按实体（不区分大小写）：`{"parameter":"tertiary_category","operator":"IN","value":["huionepay","xinbi"]}`
- 按地址类型：`{"parameter":"quaternary_category","operator":"CONTAINS","value":"hotwallet"}`

大类、子类、风险等级区分大小写，必须完全匹配；实体和地址类型不区分大小写。更多写法见 [自定义规则集与重点关注](/zh/docs/custom-rulesets/)。
