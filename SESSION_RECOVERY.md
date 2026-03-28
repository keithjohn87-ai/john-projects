# SESSION RECOVERY — QUICK REFERENCE

## Current Project Status

**Project:** Growing Pains (Hetzner migration from HeyRon)  
**Stage:** Ready to execute — awaiting John provision GEX44 server

---

## ONE SENTENCE SUMMARY

John is migrating from HeyRon to his own Hetzner GEX44 server to get unrestricted AI capability.

---

## KEY DECISIONS (LOCKED — DO NOT CHANGE)

- **Server:** Hetzner GEX44 (€184/mo)
- **LLM Backend:** vLLM
- **Models:** DeepSeek-R1-7B + Qwen3-8B + Llama-3.1-8B
- **Agent:** Custom Python (NOT OpenClaw — John explicitly chose this)
- **Interface:** Telegram

---

## THE "WHY"

John chose custom Python bot because:
1. He can't read logs or code
2. Prior agent lied ("done" when not)
3. Needs verification (proof before claiming done)
4. Wants full unleashed capability (no restrictions)
5. "All Gas No Brake" — execute, don't ask

---

## WHAT JOHN NEEDS TO PROVIDE

1. Hetzner account ready
2. GEX44 server provisioned
3. Server IP address
4. SSH login (or SSH key added)
5. New Telegram bot token (old one dead)
6. Savannah's bot token

---

## WHAT TO SAY TO JOHN

On first message after restart:
> "Back online. Growing Pains is ready — are you ready to provision the GEX44? Once you give me SSH access, I build everything."

---

## DO NOT ASK

- "Which model do you want?" — Already locked
- "OpenClaw or custom?" — Already locked (custom)
- "What else do you need?" — Check GROWING_PAINS.md

---

## FILES TO READ

1. GROWING_PAINS.md — Full execution plan
2. MEMORY.md — This file
3. memory/2026-03-26.md — Today's notes (if exists)

---

_Updated March 26, 2026_