---
title: AI 助手（MCP）
description: DART 通过 MCP 把筛查、读结果、管理规则集的能力开放给 AI 助手。本页说明接入地址和认证、配置示例、19 个工具、常用的提问方式，以及让 AI 改规则前该设的护栏。
section: guides
order: 8
updated: 2026-11-25
---

## 是什么

MCP（Model Context Protocol）是 AI 助手调用外部工具的标准协议。接上 DART 的 MCP 之后，你可以在 Claude、Cursor 等支持 MCP 的 AI 助手里直接说：「帮我查一下这个地址能不能收」「这笔充值为什么被判复核」，AI 会调用筛查、读取结果，再用自然语言解释给你。

MCP 和 API 能力一致：每个 MCP 工具对应一个同名的 HTTP 接口，返回的就是接口响应里的 `data`。两者共用一个账号、同一份额度和同一批快照。

## 接入地址和认证

| 项目 | 值 |
|---|---|
| 地址 | `https://api.width.live/mcp`（备用 `https://api.trustin.bond/mcp`） |
| 传输方式 | Streamable HTTP |
| 认证 | 请求头 `Authorization: Bearer <你的 API Key>`，也可以用 `X-Api-Key` |

API Key 在控制台「账户 › API 密钥」创建。备用地址只在主地址连不上时使用。

## 配置示例

支持远程 MCP 的客户端（例如 Cursor），在 `mcp.json` 里加入：

```json
{
  "mcpServers": {
    "width-dart": {
      "url": "https://api.width.live/mcp",
      "headers": {
        "Authorization": "Bearer <你的 API Key>"
      }
    }
  }
}
```

Claude Code 可以用命令行添加：

```bash
claude mcp add --transport http width-dart https://api.width.live/mcp \
  --header "Authorization: Bearer <你的 API Key>"
```

各客户端配置文件的位置和写法略有不同，以客户端自己的说明为准。配好后，问 AI「DART 支持哪些链」，它调用 `list_chains` 返回结果，就说明接通了。

## 19 个工具

| 分组 | 工具 | 用途 |
|---|---|---|
| 筛查 | `screen_address` | 地址筛查（KYA） |
| | `screen_address_all_chains` | 一个地址在所有链、多个币种上筛查 |
| | `screen_transaction` | 交易筛查（KYT） |
| 辅助 | `list_chains` | 支持的链和币种 |
| | `list_transfers` | 列出一笔交易里的代币转账，用来选 `event_index` |
| 结果 | `get_screen_result` | 读取异步任务的结果 |
| | `get_snapshot` | 按快照编号读回历史筛查 |
| 规则集 | `list_rulesets`、`get_ruleset` | 查看规则集 |
| | `create_ruleset`、`clone_ruleset` | 新建、复制规则集 |
| | `update_ruleset`、`delete_ruleset` | 修改、删除规则集 |
| 规则 | `list_rules`、`get_rule` | 查看规则 |
| | `create_rule`、`update_rule`、`delete_rule` | 新增、修改、删除规则 |
| | `highlight_rules` | 批量设置重点关注（★） |

参数和返回字段与对应的 HTTP 接口一致，见 [地址筛查 KYA](/zh/docs/kya/)、[交易筛查 KYT](/zh/docs/kyt/)、[自定义规则集与重点关注](/zh/docs/custom-rulesets/)。

## 可以这样问

**筛查和解释**

- 「用 DART 查一下 Tron 地址 T…，流入 3 跳、流出 1 跳，告诉我能不能收。」
- 「这个 0x… 地址在所有链上都查一遍，哪条链最差？」
- 「读一下快照 1038029，用三句话解释为什么判了复核。」
- 「这笔交易 0x… 里有几笔 USDT 转账？筛第 2 笔的来源。」

**规则**

- 「列出内置 KYA 规则集里所有制裁类规则。」
- 「复制内置 KYA 规则集，命名为『测试 v1』。」
- 「在『测试 v1』里加一条规则：两跳内混币器资金占比 ≥ 10% 时复核。先给我看规则内容，我确认后再创建。」
- 「把『测试 v1』里所有制裁类规则标为重点关注。」

## 护栏建议

<div class="callout warn"><b class="t">改规则前先看一眼</b>规则直接决定处置结论。让 AI 创建、修改、删除规则或规则集之前，请它先列出要提交的完整内容，你确认后再执行。删除不会改写历史快照；但规则集删除后，仍传它 id 的筛查会退回内置默认规则集。</div>

- **内置规则集只读**：AI 只能改你自己复制出来的规则集，改不了内置的。
- **给 AI 一份专用副本**：复制一份规则集专门让 AI 改，确认效果后，再把改动同步到正式使用的规则集。正式筛查传哪个 id，由你的系统决定，不交给 AI。
- **筛查会消耗额度**：每次筛查都按次计费，全链筛查按实际筛查的链和币种计费。批量筛查前，先和 AI 说清楚范围。
- **深跳数用异步**：让 AI 提交异步任务再读结果，并且不要让它高频轮询；任务 `FAILED` 时重新提交，不要一直轮询。
- **保管好 API Key**：它等同于账号权限，不要写进会被共享的配置文件或代码仓库。
- **对外展示要克制**：让 AI 向终端用户解释结果时，只说命中了哪类公开来源，不对具体个人下定性。
- **留档照旧**：AI 跑的每次筛查同样存成快照。重要结论以快照为准，不以 AI 的复述为准。

## 给 AI 读的文档

| 文件 | 地址 | 用途 |
|---|---|---|
| llms.txt | https://width.info/llms.txt | 接口索引 |
| llms-full.txt | https://width.info/llms-full.txt | 单文件完整接口说明 |
| OpenAPI 3.1 | https://width.info/openapi.json | 生成客户端、导入调试工具 |
| Agent Skill | https://width.info/agent/SKILL.md | 现成的 Skill 文件，放进 AI 助手就能用 |

## 相关

- [5 分钟上手：API](/zh/docs/quickstart-api/)
- [自定义规则集与重点关注](/zh/docs/custom-rulesets/)
- [怎么读结果：分数 + 重点关注](/zh/docs/reading-results/)
