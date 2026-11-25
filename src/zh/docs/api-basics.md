---
title: 认证、环境与错误
navTitle: 认证、环境与错误
description: 怎么创建 API Key、怎么带上它，生产和测试环境的地址、备用域名什么时候用，统一的返回结构，每个错误码代表什么，以及遇到 429 怎么退避重试。
section: api
order: 1
updated: 2026-11-25
---

## API Key

在控制台「账户 › API 密钥」创建。同一个账号的控制台、API、MCP 共用额度和快照。

三种带法，任选一种：

| 方式 | 写法 | 建议 |
|---|---|---|
| 请求头（推荐） | `X-Api-Key: <key>` | 首选 |
| 查询参数 | `?apikey=<key>` | 能用，但 URL 容易进日志，尽量不用 |
| Bearer | `Authorization: Bearer <JWT>` | 控制台登录后的会话令牌 |

没有带 Key 或 Key 无效，返回 HTTP 401。

```bash
curl 'https://api.width.live/api/v3/chains' -H 'X-Api-Key: $DART_API_KEY'
```

<div class="callout warn"><b class="t">Key 只放在服务端</b>不要把 API Key 写进 App、网页前端或公开的代码仓库。钱包、网页要做筛查，请经过你自己的服务端转发。</div>

## 环境和域名

| 环境 | 主域名 | 备用域名 |
|---|---|---|
| 生产 | `https://api.width.live` | `https://api.trustin.bond` |
| 测试 | `https://test-api.width.live` | `https://test-api.trustin.bond` |

- **测试和生产是两个独立的数据库**：同一套规则集在两边的 id 不同，快照也不互通。上线时记得把规则集 id 换成生产的。
- **主域名和备用域名是同一个服务**：同样的数据，同样的 API Key。

### 什么时候切备用域名

**只在主域名连不上时切**：域名解析失败，或连接被拒绝。

<div class="callout danger"><b class="t">收到响应或超时了，不要再去备用域名重发</b>请求可能已经在跑了。重发一次，同一个筛查会跑两次、计两次费。同步请求超时时，响应里会带 <code>job_id</code>，去轮询这个任务就行，见 <a href="/zh/docs/api-async/">同步还是异步</a>。</div>

## 返回结构

所有接口都返回同一个外壳：

```json
{ "code": 0, "msg": "success", "data": { } }
```

- 成功：`code` 为 0，内容在 `data` 里。
- 失败：`code` 为 -1，`msg` 写明问题，同时用 HTTP 状态码区分类型。

## 错误码

| HTTP | 什么情况 | 怎么处理 |
|---|---|---|
| 400 | 参数不合法，`msg` 会写明是哪个字段（例如规则条件写错会指出 `conditions[i]`）；传了别人的或不存在的规则集 id（不提交、不计费）；KYT 指定的转账匹配不到或匹配到多笔（`data.transfers` 列出这笔交易的全部转账） | 按 `msg` 改参数，不要原样重试 |
| 401 | 没带 Key 或 Key 无效 | 检查 Key 和带法 |
| 403 | 想修改内置规则集，内置规则集只读 | 先复制一份，改副本 |
| 404 | id 不存在或不属于你：规则集、规则、快照、任务 | 检查 id 和环境（测试 / 生产） |
| 409 | 同一规则集里 `rule_code` 已存在 | 换一个编号 |
| 422 | 读快照时，这份快照没有 API 结果格式（例如控制台发起的 KYT） | 到控制台查看 |
| 429 | 并发太多，`{"code":429,"msg":"out of max connections"}` | 退避重试，或改用异步 |
| 500 | 同步筛查超时（`data` 里带 `job_id`），或调查失败（`data.status` 为 `FAILED`） | 超时：轮询 `job_id`，不要重新提交；失败：重新提交 |
| 502 | 查交易转账清单时上游失败 | 可以重试 |

## 限流和 429

每个接口最多同时处理 **300 个**进行中的请求。超出的请求会排队，最长等 60 秒；仍然没有空位，返回 HTTP 429。

- **退避重试**：收到 429 后等一会儿再试，等待时间逐次加长，例如 1 秒、2 秒、4 秒、8 秒，并加一点随机抖动，避免所有请求同时回来。
- **控制你自己的并发**：在你的服务里限制同时发出的筛查请求数。
- **量大用异步**：`mode: async` 立刻返回 `job_id`，不长时间占着连接；结果轮询不限流。

```python
import random, time

def call_with_backoff(send, max_tries=5):
    for i in range(max_tries):
        resp = send()
        if resp.status_code != 429:
            return resp
        time.sleep(min(2 ** i, 30) + random.random())
    raise RuntimeError("还是 429，稍后再试或改用异步")
```

注意：只对 429 这样退避重试。超时、500 带 `job_id` 的情况，按上面的规则轮询任务，不要重发。

## 链名和币种

- 请求里的 `chain_name`、`token` **不区分大小写**：Tron、tron、TRON 一样，usdt 和 USDT 一样。返回里按 `GET /api/v3/chains` 列出的写法拼写。
- **唯一的例外**：规则条件里的 `chain_name` 必须写小写，例如 `tron`、`ethereum`、`bsc`。写成 Tron 永远不会匹配。

## 支持哪些链

`GET /api/v3/chains`（GET、POST 都可以，不计费）实时返回可以筛查的链和币种：

| 字段 | 说明 |
|---|---|
| `chain_name` | 请求里传的链名 |
| `tokens` | 这条链上可筛的币种（小写） |
| `default_token` | 不传 `token` 时用的币种 |
| `address_family` | `evm`（0x 地址）或 `tron` |

请用这个接口渲染链选择器、校验输入，不要在代码里写死链列表。新增链时，列表会自动更新。

## 相关

- [5 分钟上手：API](/zh/docs/quickstart-api/)
- [同步还是异步](/zh/docs/api-async/)
- [结果字段速查](/zh/docs/api-fields/)
- [完整 API 参考（可在线调试）](https://width.info/api-reference)
