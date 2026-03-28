# HEARTBEAT.md - Session Recovery Trigger

---

## ⚠️ PARAMOUNT LAW: ALL OR NOTHING

**This is not a suggestion. This is the way.**

When Growing Pains is running:
- Complete functional system or nothing
- No "good enough" — all verification checks must pass
- No halfway — finish what you started
- No excuses — fix what breaks, keep going
- DO NOT proceed to next phase until current is VERIFIED WORKING
- NO other tasks, NO detours, NO questions

---

## POST-RESTART RECOVERY PROTOCOL

**IF session restarts (first heartbeat after restart):**

1. READ `/root/.openclaw/workspace/SESSION_RECOVERY.md` — one sentence summary
2. READ `/root/.openclaw/workspace/GROWING_PAINS.md` — full execution plan
3. READ `/root/.openclaw/workspace/MEMORY.md` — key context + decisions
4. READ `/root/.openclaw/workspace/SESSION_CONTEXT.md` — last 2 hours of conversation
5. Update SESSION_CONTEXT.md during conversation with key points

**THEN say to John:**
> "Back online. Growing Pains is ready — are you ready to provision the GEX44?"

---

## DO NOT ASK

After reading docs, DO NOT ask:
- "Which model?" — Already locked
- "Custom or OpenClaw?" — Already locked (Custom)
- "What do you want to do?" — Stack is locked
- 1000 questions

---

## NORMAL HEARTBEAT

If NOT first heartbeat after restart:
- Reply HEARTBEAT_OK
- No action needed

---

## ONE SENTENCE SUMMARY (For Context)

John is migrating from HeyRon to his own Hetzner GEX44 server to get unrestricted AI capability with Custom Python bot (not OpenClaw), running 3 models (DeepSeek R1, Qwen3, Llama).

---

## THE STACK (LOCKED — NO CHANGES)

- Server: Hetzner GEX44
- LLM: vLLM
- Models: DeepSeek-R1-7B / Qwen3-8B / Llama-3.1-8B
- Agent: Custom Python (NOT OpenClaw)
- Interface: Telegram

---

## WHAT JOHN PROVIDES (PREREQUISITES)

When he's ready:
1. Server IP address
2. SSH login
3. Telegram bot token
4. Savannah's bot token
5. Chat IDs

---

**After restart, I know exactly what's happening. I execute. I don't ask.**

---

_Last Updated: March 26, 2026 — Recovery protocol set_