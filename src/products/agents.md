---
layout: layouts/page.njk
permalink: /products/agents/
title: AI agents (MCP)
fullTitle: DART MCP server for AI agents | Crypto AML screening tools · Width
description: Connect any AI agent to DART over MCP. 19 tools cover address and transaction screening, results and rulesets, so Claude Code, Cursor, Codex and other agents can check USDT and USDC risk.
breadcrumb:
  - { label: Platform, href: /platform/ }
  - { label: AI agents (MCP) }
sections:
  - type: hero
    compact: true
    eyebrow: For AI agents · MCP
    title: Ask your AI agent <em>to check the address</em>
    lead: '"Is this address safe to receive from?" "Why did this deposit land in review?" "Raise the hop-3 threshold to 15%." DART speaks MCP, so your agent can screen, read results and edit rules directly, on the same account and snapshots as the console and API.'
    ctas:
      - { label: Get an API key, href: /contact/ }
      - { label: Developer docs, href: /developers/ }
    visual: code
    code:
      title: mcp.json
      body: |
        {
          "mcpServers": {
            "width-dart": {
              "url": "https://api.width.live/mcp",
              "headers": {
                "Authorization": "Bearer <YOUR_API_KEY>"
              }
            }
          }
        }

  - type: problems
    eyebrow: Why connect an agent
    title: Where compliance time goes today
    items:
      - problem: Reviewing one case means opening several screens
        solution: |
          - Your agent reads the result and snapshot and explains the hit paths, hops, shares and points in a paragraph
          - The reviewer decides; nobody pieces the story together by hand
        proof: Every point maps to a rule, so the agent's explanation can be checked.
      - problem: Editing rules means learning the condition syntax
        solution: |
          - Describe the policy in plain language; the agent clones a built-in ruleset, writes the conditions and sets the points
          - Every create, read, update and delete on rulesets and rules has a tool
        proof: Built-in rulesets are read-only, so the agent can only change your own copies.
      - problem: You want risk checks inside your own AI product
        solution: |
          - Wallet assistants, support bots and trading agents can screen before a transfer goes out
          - Standard MCP, so switching models or frameworks doesn't mean rewriting the integration
        proof: An AI bot already offers address checks built on DART.

  - type: table
    tone: alt
    eyebrow: 19 tools
    title: What an agent can do
    head: [Group, Tools, Purpose]
    rows:
      - [Screening, "`screen_address`, `screen_address_all_chains`, `screen_transaction`", "Address, all-chain and transaction screening"]
      - [Helpers, "`list_chains`, `list_transfers`", "Supported chains and tokens; the token transfers inside a transaction"]
      - [Results, "`get_screen_result`, `get_snapshot`", Async results and past snapshots]
      - [Rulesets, "`list_rulesets`, `get_ruleset`, `create_ruleset`, `update_ruleset`, `delete_ruleset`, `clone_ruleset`", "View, create, clone and edit rulesets"]
      - [Rules, "`list_rules`, `get_rule`, `create_rule`, `update_rule`, `delete_rule`, `highlight_rules`", "View and edit rules, flag key rules"]
    note: Each tool mirrors the HTTP endpoint of the same name and returns the same data.

  - type: faq
    eyebrow: FAQ
    title: MCP questions
    items:
      - q: Which AI tools work with DART?
        a: Any MCP client, including Claude Code, Cursor and Codex. Add the configuration above with your API key and the tools appear.
      - q: How is MCP different from the API?
        a: Same capabilities. Every MCP tool maps to an HTTP endpoint of the same name. MCP suits agents calling tools directly; the API suits system integrations. Both share one account, one quota and one set of snapshots.
      - q: Could an agent change rules by mistake?
        a: Built-in rulesets are read-only, so an agent can only edit the copies you created. Every snapshot records which ruleset version ran.
      - q: How should an agent explain results to end users?
        a: Results list the rules, paths, hops, amounts, shares and points behind every score, so an agent can explain them in plain language. When showing results to the public, say which kind of public source was hit rather than labelling a person's address.

  - type: cta
    eyebrow: See it on your own data
    title: Get an API key <em>and plug it in</em>
    text: Console, API and MCP all run on one account.
    points:
      - Engineers support you directly in a shared group
    ctas:
      - { label: Get access, href: /contact/ }
      - { label: Developer docs, href: /developers/ }
---
