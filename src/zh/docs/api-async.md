---
title: 同步还是异步
navTitle: 同步还是异步
description: 同步直接拿结果，适合只查标签、浅跳数；异步立刻拿到 job_id 再轮询，适合深跳数、活跃地址和大批量。轮询至少隔 2 秒，FAILED 是终态、不计费，要重新提交。
section: api
order: 2
updated: 2026-11-25
---

## 怎么选

| | 同步（默认） | 异步（`mode: async`） |
|---|---|---|
| 返回 | 完整结果 | 立刻返回 `job_id`，之后轮询 |
| 适合 | 只查标签（0 / 0 跳）、浅跳数、需要马上给用户答复 | 深跳数、交易非常活跃的地址、批量、高并发 |
| 等待 | 连接一直开着，直到结果出来 | 不占连接 |
| 限流 | 占用每个接口 300 个并发名额 | 提交很快；结果轮询不限流 |

经验上：两边都是 0 跳，通常 1 秒内返回；浅跳数的大多数地址几百毫秒到几秒；深跳数或很活跃的地址可能要更久。**拿不准就用异步。**

## 异步的完整流程

### 1. 提交

在 KYA、KYT、全链 KYA 的请求里加 `"mode": "async"`：

```json
POST https://api.width.live/api/v3/screen/kya
X-Api-Key: YOUR_KEY

{ "chain_name": "Tron", "address": "T…", "inflow_hops": 3, "outflow_hops": 1, "mode": "async" }
```

```json
{ "code": 0, "msg": "success", "data": { "job_id": 1000004821, "type": "kya", "status": "PENDING" } }
```

全链 KYA 返回的 `type` 是 `kya_multi`。

### 2. 轮询

```bash
curl 'https://api.width.live/api/v3/screen/result/1000004821?type=kya' -H 'X-Api-Key: $DART_API_KEY'
```

- `type` 可以是 `kya`、`kyt`、`kya_multi`。不传也可以，系统按任务自动识别；查询参数改变不了任务的结果，结果只取决于提交时的参数。
- **至少隔 2 秒轮询一次**。提交后系统立刻开始计算，轮询只是读取状态，不会让它算得更快，也不会多计费。

### 3. 看状态

| 状态 | 含义 | 你要做什么 |
|---|---|---|
| `PENDING` | 已排队 | 继续轮询 |
| `PROCESSING` | 计算中 | 继续轮询 |
| `COMPLETE` | 完成，`result` 是完整结果，`snapshot_id` 是快照编号 | 读结果，存快照编号 |
| `FAILED` | 上游调查失败，`error` 写明原因。**终态，不计费** | 停止轮询，重新提交一个新任务 |

`COMPLETE` 的任务之后再查，始终返回同一份结果。`FAILED` 的任务不会再变，继续轮询没有意义。

### 伪代码

```python
import time

def screen_async(payload):
    job = post("/api/v3/screen/kya", {**payload, "mode": "async"})["data"]
    job_id = job["job_id"]
    deadline = time.time() + 600             # 你自己的总等待上限
    while time.time() < deadline:
        time.sleep(2)                        # 至少隔 2 秒
        data = get(f"/api/v3/screen/result/{job_id}?type=kya")["data"]
        if data["status"] == "COMPLETE":
            save_snapshot_id(data["snapshot_id"])
            return data["result"]
        if data["status"] == "FAILED":
            log(data.get("error"))
            return resubmit_later(payload)   # 重新提交新任务，不要继续轮询
    return None                              # 超过上限：保留 job_id，稍后再查
```

## 同步超时了怎么办

同步请求等太久会返回 HTTP 500，`data` 里带一个 `job_id`。**去轮询这个 `job_id`，不要重新提交**：重新提交会生成一个新任务，再计一次费。

同步请求的调查失败时，会立刻返回 HTTP 500，`data.status` 为 `FAILED`，同样不计费，重新提交即可。

## 任务 id 和重复提交

- **每次调用都有自己的 `job_id`**，即使是同一个地址、同一组参数。一个 `job_id` 只返回创建它的那次调用的结果。
- `job_id` 不存在或属于别的账号，返回 404。
- **相同参数的再次提交会复用之前的调查结果**：用完全相同的参数再筛同一个对象，会直接用近期那次调查的资金图，所以可能看不到这之后的新转账。
- **`force_run: true`**：强制重新读取链上数据，不复用。它的开销是一次完整调查，所以只在确实需要时打开，例如刚发生了新转账，或者新的官方动作出来后做回看。

## 快照编号

| 方式 | 字段 |
|---|---|
| 同步 | `data.snapshotId` |
| 异步（`COMPLETE` 时） | `data.snapshot_id` |

用 `GET /api/v3/snapshots/{snapshotId}` 随时读回当时的参数和结果。建议把它存进你的订单或工单记录。见 [数据完整性与快照](/zh/docs/data-status/)。

## 常见问题

<details><summary>一个任务被我轮询了很多次，会多计费吗？</summary>

不会。计算只在提交时跑一次，轮询只读状态。但请保持至少 2 秒的间隔，任务 <code>FAILED</code> 后就停止轮询。

</details>

<details><summary>全链 KYA 用同步还是异步？</summary>

全链 KYA 会同时筛多个通道，同步要等所有通道都完成，建议用异步。同步等太久也会返回带 <code>job_id</code> 的 500，按上面的方式轮询。

</details>

## 相关

- [认证、环境与错误](/zh/docs/api-basics/)
- [结果字段速查](/zh/docs/api-fields/)
- [跳数怎么设计、怎么设](/zh/docs/hops/)
- [完整 API 参考](https://width.info/api-reference)
