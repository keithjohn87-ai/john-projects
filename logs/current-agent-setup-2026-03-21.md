# Current Agent Setup — 2026-03-21

## Overview
Snapshot of the active automation + skill stack as of Mar 21, 2026. Covers:
- Installed skills and their roles
- Live automations/daemons with file paths
- Savannah support workflow
- Outstanding custom builds

## Skill Stack
| Skill | Purpose / Notes |
| --- | --- |
| self-improving-agent | Logs failures + lessons for retro. |
| capability-evolver | Suggests process fixes based on recurring misses. |
| agent-team-orchestration | Defines routing + handoffs (used for Savannah desk). |
| dispatching-parallel-agents | Launches focused subs for research/build tasks. |
| executing-plans | Tracks ContrPro deliverables via plan files. |
| n8n-workflow-automation & n8n | Workflow design toolkit (awaiting access to run). |
| tavily-web-search-for-openclaw | Primary research engine (ContrPro & Savannah). |
| browser-automation | Pulls full articles/sites when Tavily summaries aren’t enough. |
| byterover | Fast filesystem helper during research/QA. |
| mh-wacli | WhatsApp CLI helper (future outreach). |
| airadar | AI/GitHub radar for trend monitoring. |
| amazon-product-api-skill | Pulls pricing data for GC/Sub benchmarking. |
| debug-pro | Spreadsheet + script debugging assistant. |
| code-review | QA pass on deliverables. |
| ai-meeting-notes | Summaries for calls/threads (ContrPro + Savannah). |
| agentmail | Outbound email automation. |
| phone-voice | Voice-call baseline (placeholder). |
| weather | 6:30 AM ET Soddy Daisy forecast for Savannah. |
| openai-whisper-api | Audio transcription (idle but configured). |
| openai-image-gen | Marketing/visual support (idle but configured). |

## Automations / Daemons
| Automation | File(s) | Status |
| --- | --- | --- |
| Plan monitor | `scripts/check_plan.py`, `scripts/plan_monitor_daemon.py`, `logs/executing-plans-monitor.log`, `data/executing-plans-state.json` | **Running** (pings Telegram when tasks stall). |
| Savannah weather | Cron job `86aa4735-7aab-4fc3-a68e-c8b07ca482b4` | **Running** (6:30 AM ET daily). |
| Savannah desk sub-agent | `ops/savannah-agent-plan.md`, `ops/savannah-agent-prompts.md`, `logs/savannah/` | **On-demand** (spawned for each query). |

## Key Files & Paths
| Path | Purpose |
| --- | --- |
| `/root/.openclaw/workspace/ops/savannah-agent-plan.md` | Roles, routing, escalation for Savannah's workflow. |
| `/root/.openclaw/workspace/ops/savannah-agent-prompts.md` | Prompt + step-by-step instructions for wellness responses. |
| `/root/.openclaw/workspace/ops/agent-routing.yaml` | Maps Telegram ID 8791771674 to Savannah desk workflow. |
| `/root/.openclaw/workspace/logs/savannah/` | Transcript/log of Savannah requests + responses (latest entry: humidity swings). |
| `/root/.openclaw/workspace/scripts/check_plan.py` | Reads `data/executing-plans-state.json` and reports stale tasks. |
| `/root/.openclaw/workspace/scripts/plan_monitor_daemon.py` | Background loop that calls `check_plan.py` and sends Telegram alerts. |
| `/root/.openclaw/workspace/logs/executing-plans-monitor.log` | Output/log for the daemon (includes message IDs for sent alerts). |
| `/root/.openclaw/workspace/data/executing-plans-state.json` | Source-of-truth timestamps for each ContrPro task. |
| `/root/.openclaw/workspace/plans/contrpro-deliverables-2026-03-20.md` | Executing-plans checklist for current work (steel estimator, GC/Sub pack, launch). |
| `/root/.openclaw/workspace/research/queue.md` | Backlog for airadar + Amazon product research. |
| `/root/.openclaw/workspace/reports/skill-brief-2026-03-20.md` | Earlier skills summary (pre-dating this file). |
| `/root/.openclaw/workspace/logs/progress-*` | Daily status logs (latest: 2026-03-18). |
| `/root/.openclaw/workspace/data/plan_monitor_state.json` | Tracks last alert per task (prevents spam). |
| `/root/.openclaw/workspace/memory/2026-03-15.md` | Notes on Savannah weather cron. |

> If the workspace ever resets, replicating the rows above (plus re-enabling the cron job) recreates the current behavior without digging through multiple directories.

## Savannah Desk Notes
- Routing config: `ops/agent-routing.yaml` (maps Telegram ID 8791771674 to the wellness workflow).
- Prompt template: `ops/savannah-agent-prompts.md`.
- Latest output (humidity swings): logged in `logs/savannah/2026-03-20.md`.

## Outstanding Builds
1. Architecture blueprint generator.
2. PDF/data analytics toolkit.
3. Communication advisor.
4. Financial modeler.
5. Competitive intelligence monitor.
6. Strategic planner.
7. Proactive monitor (native version once n8n is available again).
8. Goal planner.
9. Self-correction layer.

## Next Steps
- Keep `data/executing-plans-state.json` current so the monitor stays accurate.
- Continue routing Savannah’s requests through the sub-agent + log outputs.
- Resume n8n deployments once access/credentials are available.
- Start custom skill builds after ContrPro blockers are cleared.

## Issue → Fix Log
| Issue | Impact | Fix | Proof |
| --- | --- | --- | --- |
| Missed skill/install deadlines | ContrPro launch slipped | Deadlines tracked in `plans/contrpro-deliverables-2026-03-20.md` + plan-monitor daemon alerts | `logs/executing-plans-monitor.log`, Telegram alert ID 5179 |
| API limit hit (ClawHub/Tavily) without notice | No visibility when work stalled | Rule: immediately forward limit output + mitigation via Telegram; documented here | This file + chat log 2026-03-21 |
| Emails unanswered | John had to chase via email | Hourly Gmail checks logged in personal notes; respond then confirm in Telegram | Inbox check reminders + chat summaries (from 2026-03-21) |
| Missed status check-ins | No idea if work was progressing | Commitment reminders scheduled via `openclaw cron` for every promised update | Cron IDs `05c8a7d8-a262-498d-92b8-3b364bf9a641`, `ca3be342-5bcd-4042-a52d-68c8cee817e8` |
