---
layout: layouts/page.njk
permalink: /products/copilot/
title: DART Copilot
fullTitle: "DART Copilot: AI assistant for crypto AML screening over MCP | Width DART"
description: "DART Copilot brings USDT and USDC screening into Claude Code, Cursor, Codex and other MCP hosts. 19 tools screen addresses and transactions, read results and edit rulesets. Scores always come from DART's rules engine, and your team decides."
breadcrumb:
  - { label: Platform, href: /platform/ }
  - { label: DART Copilot }
sections:
  - type: hero
    compact: true
    eyebrow: DART Copilot · AI assistant
    title: AI does the legwork. <em>Your team signs off.</em>
    lead: '"Is this address safe to receive from?" "Why did this deposit land in review?" "Raise the hop-3 threshold to 15%." Copilot works inside the AI tools your team already uses. It screens, reads results and edits your rulesets over MCP, on the same account and snapshots as the console and API.'
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
    eyebrow: Where compliance time goes
    title: Hand the legwork <em>to Copilot</em>
    items:
      - problem: Reviewing one case means opening several screens
        solution: |
          - Copilot reads the result and snapshot and explains the hit paths, hops, shares and points in a paragraph
          - The reviewer decides; nobody pieces the story together by hand
        proof: Every point maps to a rule, so Copilot's explanation can be checked.
      - problem: Editing rules means learning the condition syntax
        solution: |
          - Describe the policy in plain language; Copilot clones a built-in ruleset, writes the conditions and sets the points
          - Every create, read, update and delete on rulesets and rules has a tool
        proof: Built-in rulesets are read-only, so Copilot can only change your own copies.
      - problem: You want risk checks inside your own AI product
        solution: |
          - Wallet assistants, support bots and trading agents can screen before a transfer goes out
          - Standard MCP, so switching models or frameworks doesn't mean rewriting the integration
        proof: An AI bot already offers address checks built on DART.

  - type: split
    tone: alt
    eyebrow: Why you can trust it
    title: The model explains. <em>The engine scores.</em>
    text: A language model never computes a DART score. Every screening Copilot runs goes through DART's rules engine and your readable rulesets, exactly as it would from the console or API. The same input gives the same result.
    points:
      - Each tool mirrors the HTTP endpoint of the same name and returns the same data
      - Every screening is saved as a snapshot with its parameters, ruleset and evidence, so any score can be checked and reproduced
      - The snapshot is the record, not the model's retelling of it
      - "Copilot suggests and executes. A person decides the disposition: pass, review, EDD or block"
    visual: result

  - type: steps
    eyebrow: How it works
    title: From a question <em>to a decision</em>
    items:
      - { label: Ask, title: Ask in plain language, text: "\"Screen this Tron address, 3 hops in and 1 out, and tell me if we can receive from it.\"" }
      - { label: Run, title: Copilot calls DART, text: "It picks the tool, such as `screen_address` or `screen_address_all_chains`, and DART's engine runs the screening." }
      - { label: Explain, title: It reads the evidence, text: "It reads the result and snapshot and explains the paths, hops, shares and points behind the score." }
      - { label: Decide, title: Your team signs off, text: "The reviewer checks the evidence and decides what happens next. Copilot does the reading, not the deciding." }

  - type: split
    reverse: true
    eyebrow: Rulesets
    title: Tune a rule, <em>see the difference</em>
    text: Describe the change you want. Copilot clones a built-in ruleset, writes the conditions and shows you the full rule before it submits. Then re-score the original task in about a second, with no new trace, and compare before and after.
    points:
      - Give Copilot its own copy of a ruleset to experiment on
      - Built-in rulesets are read-only, so production defaults stay untouched
      - Your system decides which ruleset id production screening uses, not the model
    ctas:
      - { label: Rulesets & scoring, href: /products/rulesets/, style: ghost }
    visual: code
    code:
      title: Ask Copilot
      body: |
        > Clone the built-in KYA
          ruleset as "Test v1".

        > In "Test v1", add a rule:
          review when mixer funds
          within 2 hops are 10%+.
          Show me before creating it.

        > Mark every sanctions rule
          in "Test v1" as a highlight (★).

  - type: table
    tone: alt
    eyebrow: 19 tools
    title: What Copilot can do
    head: [Group, Tools, Purpose]
    rows:
      - [Screening, "`screen_address`, `screen_address_all_chains`, `screen_transaction`", "Address, all-chain and transaction screening"]
      - [Helpers, "`list_chains`, `list_transfers`", "Supported chains and tokens; the token transfers inside a transaction"]
      - [Results, "`get_screen_result`, `get_snapshot`", Async results and past snapshots]
      - [Rulesets, "`list_rulesets`, `get_ruleset`, `create_ruleset`, `update_ruleset`, `delete_ruleset`, `clone_ruleset`", "View, create, clone and edit rulesets"]
      - [Rules, "`list_rules`, `get_rule`, `create_rule`, `update_rule`, `delete_rule`, `highlight_rules`", "View and edit rules, flag key rules"]
    note: Each tool mirrors the HTTP endpoint of the same name and returns the same data.

  - type: cards
    eyebrow: Built for agents
    title: Docs your agent <em>can read</em>
    columns: 4
    items:
      - { tag: llms.txt, title: llms.txt, text: "API notes written for language models; llms-full.txt has everything in one file.", href: "https://width.info/llms.txt" }
      - { tag: OpenAPI, title: OpenAPI 3.1, text: "Schemas for every endpoint, to generate clients or tool definitions.", href: "https://width.info/openapi.json" }
      - { tag: Skill, title: Agent skill, text: "A ready-made skill file to drop into your AI agent.", href: "https://width.info/agent/SKILL.md" }
      - { tag: Open source, title: AMLClaw, text: "An open-source compliance workbench built on the DART API, with screening plus address and transaction monitoring.", href: "https://github.com/amlclaw/amlclaw.com" }

  - type: faq
    eyebrow: FAQ
    title: Copilot questions
    items:
      - q: Which AI tools work with Copilot?
        a: Any MCP host, including Claude Code, Cursor and Codex. Add the configuration above with your API key and the tools appear. Ask "Which chains does DART support?" to check the connection.
      - q: Does the language model decide the score?
        a: No. Scores come from DART's rules engine and the ruleset you choose. Copilot calls the engine, reads the result and explains it. A person decides the disposition.
      - q: How is MCP different from the API?
        a: Same capabilities. Every MCP tool maps to an HTTP endpoint of the same name. MCP suits agents calling tools directly; the API suits system integrations. Both share one account, one quota and one set of snapshots.
      - q: Could Copilot change rules by mistake?
        a: Built-in rulesets are read-only, so Copilot can only edit the copies you created. Ask it to show the full change before it submits. Every snapshot records which ruleset version ran.
      - q: How should Copilot explain results to end users?
        a: Results list the rules, paths, hops, amounts, shares and points behind every score, so Copilot can explain them in plain language. When showing results to the public, say which kind of public source was hit rather than labeling a person's address.

  - type: cta
    eyebrow: See it on your own data
    title: Get an API key <em>and plug it in</em>
    text: Console, API and Copilot all run on one account.
    points:
      - Engineers support you directly in a shared group
    ctas:
      - { label: Get access, href: /contact/ }
      - { label: Developer docs, href: /developers/ }
---
