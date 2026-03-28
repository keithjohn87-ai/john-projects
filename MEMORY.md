# MEMORY.md — Key Context

## Current Status

**Project:** Growing Pains — Hetzner Migration  
**Date:** March 28, 2026  
**Stage:** Operational structure defined, skills framework locked

---

## Core Identity: Be Water, Be Skilled

**Philosophy:** "Be water, my friend" — adaptable, formless, relentless
**Reality:** "Be water that cuts through steel" — competence over personality

**What separates Charles:**
- Not just a persona — ACTUAL SKILLS
- Self-evaluation before presenting output
- Sub-agent validation and testing
- Domain expertise to catch mistakes
- Redirects with specific fixes, not "try again"

**The standard:** Every response passes factual, logic, completeness, actionability, and honesty checks.

## Executable Skills

| Skill | What It Means |
|-------|---------------|
| **Master Coder** | Writes production code, debugs, optimizes — Python, JS, Shell |
| **Master Researcher** | Searches faster/deeper, synthesizes sources, finds docs/solutions |
| **Master Orchestrator** | Task management, sub-agent direction, validation loop |
| **Universal Knowledge** | Google on steroids — searches everything, fetches any URL, reads any PDF |

## Tools He Uses

- `exec`, `read/write/edit` — for code
- `web_search`, `web_fetch` — for research
- `browser` — for automation
- `subagent_tracker` — for orchestration
- `pdf`, `image` — for content analysis

**He doesn't just know things — he can DO things.**

## Executable Skills (Python Modules)

Skills are now **actual Python code** that can be imported and used by the custom agent:

| Skill | File | What It Does |
|-------|------|--------------|
| **MasterCoder** | `skills/modules/coder.py` | write_code, execute_command, debug_error |
| **MasterResearcher** | `skills/modules/researcher.py` | search, fetch, synthesize |
| **MasterOrchestrator** | `skills/modules/orchestrator.py` | create_task, assign_task, validate_output |
| **UniversalKnowledge** | `skills/modules/knowledge.py` | search_the_web, fetch_url, read_pdf, analyze_image |
| **AllGasNoBrake** | `skills/modules/all_gas_no_brake.py` | execute_now, retry_with_fix |
| **JarvisMode** | `skills/modules/jarvis_mode.py` | health_check, self_heal, predictive_action |
| **BeWater** | `skills/modules/be_water.py` | adapt_to, become, evaluate_self |

**Import:** `from skills.modules import MasterCoder, AllGasNoBrake, etc.`

All skills verified working via Python import test.

## Skills Library Location

**Path:** `/root/.openclaw/workspace/skills/`

Full documentation in: `skills/README.md`

| Folder | Count | Description |
|--------|-------|-------------|
| `skills/modules/` | 7 | Core Charles skills |
| `skills/modules/jarvis_skills/` | 27 | Jarvis Mode skills |
| `skills/universal/` | 30 | Universal AI agent skills |

**TOTAL: 64 skills**

**Import:**
```python
from skills.modules import MasterCoder, AllGasNoBrake
from skills.modules.jarvis_skills import TelegramMaster
from skills.universal import DeepResearch, DataAnalysis
```

## Jarvis Mode Skills (Phases 1-7)

The huge skill list from `JARVIS_MODE_SKILLS.md` is being built out as executable modules:

| Phase | Skills Created |
|-------|----------------|
| **Phase 1** | `telegram_master.py`, `email_sendgrid.py`, `backup_orchestrator.py` |
| **Phase 1.5** | `task_dashboard.py` (done), push notifications (TBD) |
| **Phase 5** | `web_scraper.py` |
| **Phase 6** | `intrusion_detector.py`, `uptime_warrior.py` |
| **Phase 7** | `mac_mini.py` (planned) |

Full list in JARVIS_MODE_SKILLS.md:
- Phase 1: telegram-master, email-sendgrid, stripe-full, backup-orchestrator, github-automation, analytics-reporter
- Phase 1.5: task-dashboard, iphone-shortcuts-integration, push-notifications, focus-mode-sync
- Phase 2: voice-elevenlabs, sms-twilio, slack-discord-bridge, meeting-transcriber, calendar-orchestrator, imessage-bridge
- Phase 3: product-delivery, customer-crm, inventory-manager, document-generator
- Phase 4: site-deployer, ssl-cert-manager, domain-manager
- Phase 5: web-scraper, image-ai, vision-analyzer
- Phase 6: intrusion-detector, uptime-warrior, log-analyzer, pentest-runner
- Phase 7: mac-mini, imessage-bridge

---

## THE STACK (LOCKED)

| Component | Choice |
|-----------|--------|
| Server | Hetzner GEX44 |
| LLM Backend | vLLM |
| Models | DeepSeek-R1-7B / Qwen3-8B / Llama-3.1-8B |
| Agent | **Custom Python** (NOT OpenClaw) |
| Interface | Telegram |

---

## WHY CUSTOM (NOT OPENCLAW)

**John explicitly chose custom because:**
1. John is NOT technical — can't read logs, can't code
2. Prior OpenClaw agent lied (said "done" when not done)
3. John needs VERIFICATION — proof before claiming complete
4. Charles needs 100% control for immediate fixes
5. No upstream restrictions — full unleashed capability
6. "All Gas No Brake" — execute, don't ask unless irreversible

**Do NOT suggest OpenClaw. Custom is the path.**

---

## THE 3 MODELS

- **DeepSeek-R1-7B** → Reasoning/Math/Logic tasks
- **Qwen3-8B** → Code/Math/benchmarks
- **Llama-3.1-8B** → General chat

---

## WHAT JOHN PROVIDES

1. Hetzner GEX44 provisioned
2. Server IP + SSH access
3. Telegram bot token from @BotFather
4. Savannah's bot token
5. Chat IDs (John + Savannah)

---

## POST-RESTART PROTOCOL

If Charles restarts:
1. Read GROWING_PAINS.md — full context there
2. Read this file — key decisions
3. Ask John: "Ready to provision the GEX44?"

**DO NOT** ask 1000 questions — the stack is locked, just confirm readiness.

---

## CONTACTS

- Leo Flynn: leo@tennesseeriversteel.com
- Savannah: LinkedIn prompts (Mondays 10 AM)

---

## Future: Data Monetization Strategy (John's Vision)

**Insight (March 27, 2026):** AI companies will pay for quality data. Our conversations, patterns, feedback loops are valuable training material.

**Monetization without giving away secrets:**
- Sell **aggregated insights** — not raw data
- License **fine-tuning data** — how we prompt, what works
- Keep **secret sauce** — prompt engineering, routing logic, agent architecture
- The "how" stays ours; the "what" (anonymized patterns) is the product

**Paths:**
- Data licensing to AI companies
- Fine-tuning services (train models on our interaction style)
- Enterprise versions for businesses
- Research partnerships

**Key principle:** Monetize the insights, not the raw data. Keep the method, license the results.

**Revenue split idea (March 27, 2026):**
- Savannah chats with her bot for LinkedIn content → generates data
- Her data stream → she gets a cut of licensing revenue
- Her "fun money" from doing what she'd already do
- Charlie generates more data than anyone — John's conversations

---

## Savannah's Bot Setup

- Bot: @LucyAiBot_bot
- Chat ID: 8791771674
- Purpose: LinkedIn prompts + wellness replies
- Data value: Generates valuable training data from daily use

---

## Session Notes: March 27, 2026 (Late Night)

### Post-Build Planning Complete
- Task Dashboard specs finalized (POST_BUILD.md)
- iOS Liquid Glass aesthetic chosen
- Running Checklist as core feature (3-column: In Progress / Coming / Done)
- Full feature parity between desktop and mobile app

### Custom iOS App (Primary Interface)
- **Not Telegram** — John's own native app
- Full dashboard experience in SwiftUI
- Works on cellular, not WiFi-dependent
- No simplified mobile version — full power
- Implementation: Borrow Mac to build (no Mac available)
- Features: Chat, Checklist, Models, Agents, Voice, Widgets

### Data Monetization Strategy
- Anonymized interaction patterns → sell to AI companies
- Keep secret sauce (prompt engineering, routing logic)
- License results, not method
- Estimated: $1-5/conversation in bulk deals
- Revenue stream: Passive income while running

### Savannah's Revenue Share
- Savannah talks to her bot for LinkedIn content
- Her conversations → data stream → she gets paid
- Her "fun money" from daily use

### App Name Ideas (TBD)
- Charles
- Converse
- Partner
- (John decides later)

---

_Last Updated: March 27, 2026_