---
title: 常见问题
description: 按主题整理的客户高频问题：结果怎么读、为什么和其他工具不一样、跳数和时序、跨链、规则与调优、接入、速度、费用与账号。没找到答案，联系我们，我们会补进来。
section: faq
order: 1
updated: 2026-11-25
---

<div class="callout tip"><b class="t">先搜一下</b>左上角的搜索框可以搜到每一个问题和每一篇文档里的小标题。这里没有的问题，请<a href="/zh/contact/?type=other">联系我们</a>，附上地址或交易哈希、你用的参数和看到的结果。</div>

## 结果怎么读

<details><summary>结果里该看哪个字段来做决定？</summary>

看 `score.score`（0–100 分）和 `score.verdict`（accept / review / edd / block），再看 `highlightedHits`（重点关注命中）。命中的原因和证据在 `hits`：每条命中有规则、对手方、跳数、方向、金额和完整路径。见 [怎么读结果：分数 + 重点关注](/zh/docs/reading-results/)。

</details>

<details><summary><code>riskScore</code> 和 <code>score.score</code> 有什么区别？</summary>

`riskScore` 是按命中的最高严重度换算的固定数字（严重 90、高 80、中 60、低 10，没有命中为 0），用于和其他系统的风险等级字段对接。`score.score` 是按资金占比算出的分数，决定处置档位。**做处置决策请用 `score.score` 和 `score.verdict`。** 见 [结果字段速查](/zh/docs/api-fields/)。

</details>

<details><summary>怎么告诉我的用户「为什么这个地址有风险」？</summary>

用 `hits` 里的信息：风险类别（`category`）、对手方在第几跳（`hops`）、方向（`pathFlow`）、金额（`exposureAmount`）。例如「该地址两跳之前的资金来源中，有约 18% 与制裁相关」。不要直接展示对手方地址，也不要对个人下结论。控制台的快照页有和 API 返回一一对应的 JSON 视图，方便对照。

</details>

<details><summary>结果是 0 分、通过，但没有地址总览，是真的干净还是数据没读到？</summary>

看 `dataStatus`：`complete: true` 表示数据完整；`complete: false` 表示部分数据没读到，干净的结论只能算暂定，建议重新筛查或人工复核。`volume: no_activity` 表示这个地址在这条链、这个币种上没有转账。见 [数据完整性与快照](/zh/docs/data-status/)。

</details>

<details><summary>为什么 0 分也显示「需复核」？</summary>

你用的评分规则集档位从 0 开始就是「复核」。复制评分规则集，把 0 分放进「通过」档即可。见 [调优：降误报、调档位](/zh/docs/tuning/)。

</details>

<details><summary>重点关注（★）会让分数变高吗？</summary>

不会。★ 只影响展示：重点关注的命中会单独列出、排在最前，但不改分数、不改处置档位。建议你的政策写明「有重点关注命中至少进入复核」。

</details>

## 为什么和其他工具结果不一样

<details><summary>另一款工具说这个地址有风险，DART 说通过，以哪个为准？</summary>

先把设置对齐再比较。最常见的差异来源：

1. **时序**：DART 默认排除时间上不成立的路径（钱比风险事件还早到）。关掉强制时序重新筛一次，如果风险路径出现了，差异就来自时序。见 [为什么按时间顺序追资金](/zh/docs/time-order/)。
2. **远距离门槛**：DART 对 2–5 跳的关联有递增的资金占比门槛，远处的弱关联不会命中。有的工具对各跳一视同仁。
3. **交易所豁免**：DART 默认不让交易所其他用户的风险牵连你。
4. **跳数、最小金额、时间窗口**不同。
5. **标签不同**：制裁名单、发行方冻结、公开黑客事件，各家基本一致；差异主要来自各家自己的情报。

如果你的风控要求更严，可以调高分值或降低门槛，DART 可以复现更严格的口径。我们也很欢迎你提供一批历史地址并行测试，我们逐条给出差异说明。

</details>

<details><summary>某个地址明明有问题，DART 里没有标签，怎么办？</summary>

把地址、链和你掌握的依据发给我们。核实后会补录标签，并检查同一实体的其他地址。交易所的新热钱包和充值地址我们也在持续自动发现、补录。

</details>

<details><summary>某个系统地址（例如预编译合约地址）显示被冻结，是误报吗？</summary>

不是。稳定币发行方会把一些特殊地址加入黑名单，防止用户误转。这类地址带的是发行方冻结标签，按规则处理即可。

</details>

## 跳数、时序、交易所豁免

<details><summary>默认追几跳？传 0 和不传有什么区别？</summary>

控制台默认流入 3 跳、流出 1 跳；API 不传时两个方向都按 3 跳。传 0 表示这个方向不追；两边都传 0 表示只看地址自己的标签。见 [跳数怎么设计、怎么设](/zh/docs/hops/)。

</details>

<details><summary>我只想查一个方向，怎么传？</summary>

把另一个方向明确传成 0，例如只看来源：`inflow_hops: 3, outflow_hops: 0`。不传会按默认 3 跳处理。

</details>

<details><summary>可以关掉时序吗？</summary>

可以，`force_time_sequence: false`。建议只在调查或对比测试时关闭；日常充提筛查保持开启。

</details>

<details><summary>交易所豁免是做什么的？什么时候要关？</summary>

普通交易所地址直接返回 0 分，路径追到交易所就停下，避免交易所的其他用户牵连你。被制裁或带其他高风险标签的交易所不豁免。日常保持开启；要盯某一家被点名的交易所，用平台规则集或 ★ 规则，不要关豁免。见 [交易所豁免](/zh/docs/exchange-exemption/)。

</details>

## 链、币种与跨链

<details><summary>支持哪些链和币种？支持 BTC、Solana 吗？</summary>

DART 专做稳定币 USDT 和 USDC。支持的链以 `GET /api/v3/chains` 实时返回为准，控制台的链选择器读的是同一个列表。目前不支持 BTC 等原生币。新链上线会写进 [更新日志](/zh/docs/changelog/)。

</details>

<details><summary>同一个 EVM 地址，以太坊上拦截，BSC 上通过，为什么？</summary>

标签按链存放：这个地址的风险标签可能只记在以太坊上。筛 EVM 地址时打开 `all_chain_labels`，其他链上的标签也会参与判定；或者用全链 KYA 一次看所有链。见 [EVM 多链与跨链](/zh/docs/cross-chain/)。

</details>

<details><summary>资金追踪能跨桥吗？</summary>

USDC 的 CCTP 跨链可以按官方编号配对后续追。其他跨链桥、DEX、借贷和收益协议作为公共资金池，追到这里停下，节点上会标出它是什么。见 [资金追踪与调查](/zh/docs/tracing/)。

</details>

## 规则、评分与调优

<details><summary>内置规则集改不了，怎么改？</summary>

内置规则集只读。先复制一份，在副本上改，筛查时传副本的 id。也可以让 AI 助手通过 MCP 帮你复制和修改。见 [自定义规则集与重点关注](/zh/docs/custom-rulesets/)。

</details>

<details><summary>能不能「两跳内碰到某个实体就标出来」？</summary>

能。写一条按实体（`tertiary_category`）匹配的规则，跳数 1–2，打上 ★。实体名不区分大小写。见 [自定义规则集与重点关注](/zh/docs/custom-rulesets/)。

</details>

<details><summary>改了规则想看效果，要重新筛查吗？</summary>

不用。在控制台结果页用原任务重新判定，不重新追资金，不算一次新筛查，前后结果并排对比。见 [调优](/zh/docs/tuning/)。

</details>

<details><summary>有没有推荐的规则和阈值？</summary>

内置规则集就是推荐的起点。按业务的推荐参数见场景方案：[交易所](/zh/docs/playbook-exchanges/)、[钱包](/zh/docs/playbook-wallets/)、[支付与 U 卡](/zh/docs/playbook-payments/)、[托管](/zh/docs/playbook-custody/)。阈值最终要按你的风险评估确定并写成文件，见 [怎么向监管解释你的规则](/zh/docs/explain-to-regulator/)。

</details>

## 接入与开发

<details><summary>同步还是异步？轮询多快合适？</summary>

追得深、地址很活跃时用异步。异步提交后立刻开始计算，轮询只是读状态，建议间隔不低于 2 秒。见 [同步还是异步](/zh/docs/api-async/)。

</details>

<details><summary>任务一直不完成、或者返回 FAILED 怎么办？</summary>

`FAILED` 是终态，不计费，`error` 字段说明原因。请重新提交一个新任务，不要继续轮询同一个任务。

</details>

<details><summary>一笔交易里有多笔转账，KYT 筛的是哪一笔？</summary>

用 `POST /api/v3/transaction-transfers` 列出这笔交易里的所有代币转账，再在 KYT 请求里用 `event_index` 指定要筛哪一笔。见 [交易筛查 KYT](/zh/docs/kyt/)。

</details>

<details><summary>地址输错了会怎样？</summary>

请在提交前在你这边校验地址格式（例如 Tron 地址的校验和）。格式正确但不存在的地址，在链上没有任何转账，结果会是 `volume: no_activity`。

</details>

<details><summary>遇到 429 怎么办？</summary>

每个接口同时进行中的请求有上限，超出后会排队，等不到就返回 429。请退避后重试，高并发场景用异步模式（轮询结果不受这个限制）。见 [认证、环境与错误](/zh/docs/api-basics/)。

</details>

<details><summary>主域名连不上，可以用备用域名吗？</summary>

可以，`api.trustin.bond` 是同一个服务、同一套数据和 API Key。但**只在主域名完全连不上时**（域名解析失败、连接被拒绝）才切换；已经收到响应或超时的请求不要再发到备用域名，否则可能重复执行、重复计费。

</details>

<details><summary>测试环境和生产环境有什么区别？</summary>

两个独立的数据库：同一套规则集在两边的 id 不同，需要分别配置。建议上线前在测试环境把流程跑通。见 [上线前检查清单](/zh/docs/go-live-checklist/)。

</details>

## 速度

<details><summary>一次筛查要多久？</summary>

只看标签（两边 0 跳）通常在 1 秒内返回。需要追资金的筛查，多数地址在几百毫秒到几秒之间；交易非常活跃的地址、跳数很深时会更久，建议用异步。

</details>

<details><summary>转账前检查要求很快，怎么设置？</summary>

转账前一般只关心收款方本身和它的直接对手方：用只看标签（0 / 0）或流出 1 跳，速度最快。需要更深的来源分析，可以放在到账后异步做。见 [钱包：转账前和收款后提醒](/zh/docs/playbook-wallets/)。

</details>

## 批量、监控与报告

<details><summary>能不能批量筛查几千个存量地址？</summary>

能。控制台支持 CSV 批量导入；API 可以并发提交异步任务。对需要长期跟踪的地址，打开持续监控。见 [持续监控](/zh/docs/monitoring/)。

</details>

<details><summary>结果能交给监管或银行吗？</summary>

每次筛查都有不可篡改的快照，记录当时的参数、规则集和完整证据，可以作为你合规流程的留档。监管关注的是你的流程和判断，DART 的结果是其中的证据。见 [怎么向监管解释你的规则](/zh/docs/explain-to-regulator/)。需要特定格式的材料，请联系我们。

</details>

<details><summary>快照保存多久？数据存在哪里？</summary>

快照不可篡改，可随时按编号调出。保存期限、数据存放地等尽职调查信息，请联系我们获取正式说明。

</details>

## 费用与账号

<details><summary>怎么收费？</summary>

接入即免费用到 2028 年 12 月 31 日，控制台、API、MCP 都可以用。按筛查次数计用量：全链筛查只对有流水或标签的通道计数；`FAILED` 的任务不计；用原任务重新判定不计。

</details>

<details><summary>测试账号和正式账号可以分开吗？</summary>

可以，分别开通即可，每个账号用不同的邮箱。

</details>

<details><summary>登录不了怎么办？</summary>

确认邮箱填写无误、没有多余空格。还是不行，请在群里联系我们，我们会尽快处理。

</details>
