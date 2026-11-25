---
title: 5 分钟上手：API
navTitle: 5 分钟上手：API
description: 在「账户 › API 密钥」创建密钥，用 X-Api-Key 请求头发出第一个 KYA 筛查；再改成异步模式，轮询结果；最后读懂分数、处置、重点关注、数据完整性和快照编号。
section: start
order: 3
updated: 2026-11-25
---

## 第一步：拿到 API Key

登录 width.info 控制台，进入 **「账户 › API 密钥」** 创建密钥。「账户 › API 参考」可以在页面上直接调试所有接口。

每个请求都要带上密钥，推荐放在请求头里：

```text
X-Api-Key: <你的 API Key>
```

也可以用查询参数 `?apikey=<key>`，但它容易出现在日志里，不推荐。不带密钥的请求返回 HTTP 401。

## 第二步：选环境

| 环境 | 地址 | 说明 |
|---|---|---|
| 生产 | `https://api.width.live` | 备用域名 `https://api.trustin.bond` |
| 测试 | `https://test-api.width.live` | 备用域名 `https://test-api.trustin.bond`。独立数据库，规则集 id 和生产不同 |

联调先用测试环境。上线时记得把规则集 id 换成生产环境里的。

## 第三步：发出第一个同步筛查

```bash
curl -X POST 'https://api.width.live/api/v3/screen/kya' \
  -H "X-Api-Key: $DART_API_KEY" \
  -H 'Content-Type: application/json' \
  -d '{
    "chain_name": "Tron",
    "address": "T…",
    "token": "usdt",
    "inflow_hops": 3,
    "outflow_hops": 1
  }'
```

- `chain_name`、`token` 不区分大小写，Tron、tron、TRON 都可以。支持的链以 `GET /api/v3/chains` 为准。
- 跳数不传时两边都按 3 跳；建议显式传入。0 表示这个方向不追。
- `ruleset_id`、`scoring_ruleset_id` 不传或传 0，用内置默认规则集。

响应（节选）：

```json
{
  "code": 0,
  "msg": "success",
  "data": {
    "address": "T…",
    "chain": "Tron",
    "score": {
      "score": 26.6,
      "verdict": "review",
      "selfHit": false
    },
    "dataStatus": { "complete": true, "paths": "complete", "volume": "ok" },
    "hits": [
      {
        "ruleCode": "KYA_SANCTION_EXPOSURE",
        "riskLevel": "critical",
        "action": "block",
        "pathFlow": "inflow",
        "hops": 2,
        "opponentAddress": "T…",
        "exposureAmount": 115776,
        "riskRatePct": 16.6,
        "highlighted": true
      }
    ],
    "highlightedHits": [ "… 与 hits 同结构，只含 ★ 规则的命中 …" ],
    "highlightSummary": { "rulesChecked": 3, "rulesHit": 1 },
    "risk": "critical",
    "riskScore": 90,
    "snapshotId": 1038029
  }
}
```

## 第四步：改成异步（推荐）

跳数深、地址交易活跃时，同步请求可能要等较久。大多数集成建议用异步：在请求里加 `"mode": "async"`。

```bash
curl -X POST 'https://api.width.live/api/v3/screen/kya' \
  -H "X-Api-Key: $DART_API_KEY" -H 'Content-Type: application/json' \
  -d '{"chain_name":"Tron","address":"T…","inflow_hops":3,"outflow_hops":1,"mode":"async"}'
```

```json
{ "code": 0, "msg": "success", "data": { "job_id": 1000004821, "type": "kya", "status": "PENDING" } }
```

然后轮询结果：

```bash
curl 'https://api.width.live/api/v3/screen/result/1000004821?type=kya' \
  -H "X-Api-Key: $DART_API_KEY"
```

| `status` | 含义 | 你该做什么 |
|---|---|---|
| `PENDING` / `PROCESSING` | 还在算 | 隔几秒再查，**不要快于每 2 秒一次** |
| `COMPLETE` | 完成，`result` 是完整结果，`snapshot_id` 是快照编号 | 读结果 |
| `FAILED` | 终态，上游调查失败，`error` 说明原因，**不计费** | 重新提交一个新任务，不要继续轮询 |

提交后系统立即开始计算，轮询只是读状态，不会重复计算，也不会多扣额度。KYT 任务把 `type` 换成 `kyt`。

<div class="callout warn"><b class="t">同步超时不要重发</b>同步请求超时会返回 HTTP 500，<code>data</code> 里带一个 <code>job_id</code>。请轮询这个 <code>job_id</code> 拿结果；重新提交会创建并计费一个新任务。</div>

## 第五步：读懂结果

| 字段 | 回答什么 |
|---|---|
| `data.score.score` | 0–100 分，衡量风险资金的比例和远近 |
| `data.score.verdict` | 处置建议：`accept` 通过、`review` 复核、`edd` 加强尽调、`block` 拦截 |
| `data.highlightedHits` | ★ 重点关注的命中，已排好序，直接展示 |
| `data.hits` | 全部命中和路径证据：对手方、跳数、金额、占比 |
| `data.dataStatus` | 数据是否读全。`complete: false` 时，干净的结论只能算暂定 |
| `data.snapshotId` | 快照编号（异步结果里叫 `snapshot_id`），存进你的系统 |

<div class="callout tip"><b class="t">处置请用 score.verdict</b><code>riskScore</code> 是按最高命中严重度换算的数字（严重 90、高 80、中 60、低 10，没有命中为 0），用来和其他系统的风险等级对接，不是资金占比分数。</div>

推荐的决策方式：先按 `verdict` 定档位，再看 `highlightedHits` 兜底，有 ★ 命中就至少进入复核。详见 [怎么读结果](/zh/docs/reading-results/)。

## 第六步：接进你的业务流程

拿到结果之后，通常这样处理：

1. **通过**：自动放行，把快照编号记在订单或用户记录上。
2. **复核、加强尽调**：推进人工队列。复核员按快照编号调出这次结果（`GET /api/v3/snapshots/{snapshotId}`），看命中路径再做判断。
3. **拦截**：不入账或不放款，按你的政策决定是否冻结、上报。
4. **数据不完整**（`dataStatus.complete` 为 false）且结果是通过：不要直接放行，稍后重新筛查或转人工。

建议先用测试环境跑通这四条分支，再切到生产。上线前按 [上线前检查清单](/zh/docs/go-live-checklist/) 逐项核对，尤其是跳数、规则集 id 和超时重试的处理。

## 常见问题

<details><summary>同步和异步，结果一样吗？</summary>

一样。异步结果的 <code>result</code> 和同步响应的 <code>data</code> 是同一个结构，只是快照编号的字段名不同：同步是 <code>snapshotId</code>，异步是 <code>snapshot_id</code>。

</details>

<details><summary>轮询会不会多扣额度？</summary>

不会。每个任务只计算一次，轮询只是读状态。失败（<code>FAILED</code>）的任务不计费。

</details>

<details><summary>主域名请求超时了，能不能换备用域名再发一次？</summary>

不要。超时的请求可能已经在跑，换域名重发会让同一次筛查跑两次、计费两次。备用域名只在主域名连不上（域名解析不了、连接被拒）时使用。

</details>

## 常见错误码

| HTTP | 含义 |
|---|---|
| 400 | 参数不对，`msg` 会写明哪个字段；传了别人账号或不存在的规则集 id 也是 400，不计费 |
| 401 | 没带密钥或密钥无效 |
| 404 | id 不存在或不属于你 |
| 429 | 同时在跑的筛查太多，退避后重试，或改用异步 |

## 下一步

- [上线前检查清单](/zh/docs/go-live-checklist/)
- [地址筛查 KYA](/zh/docs/kya/)、[交易筛查 KYT](/zh/docs/kyt/)
- [数据完整性与快照](/zh/docs/data-status/)
- [AI 助手（MCP）](/zh/docs/mcp/)
