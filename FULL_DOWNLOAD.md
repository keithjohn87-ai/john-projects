# FULL DOWNLOAD — GROWING PAINS PLAN REVIEW
## For John - Wake up read

**Date:** March 26, 2026  
**Status:** Ready for execution

---

## ✅ FIXED PLUGGED

1. **vLLM Model** - Fixed to use `Qwen/Qwen2.5-14B-Instruct` (not GGUF). Added lighter alternative (7B) if needed.

2. **Non-root User** - Added step to create `charles` user first, then run everything as charles (security).

3. **Auto-start** - Changed from fragile @reboot cron to proper systemd service for OpenClaw.

4. **Pre-flight Checklist** - Added verification steps to test bot tokens BEFORE execution day.

5. **Human-required items** - Clearly flagged what YOU must do before we start.

---

## ⚠️ HUMAN-REQUIRED (DO BEFORE FRIDAY)

| Item | Action |
|------|--------|
| **1. Charles bot token** | Test: `curl "https://api.telegram.org/bot8622191614:AAHGx0C-27nKPhYCmdKL57AsHM_K2JylBkY/getMe"` — if fails, get new |
| **2. Savannah's bot** | Message @BotFather → /newbot → "Savannah Desk" → get token |
| **3. Savannah's token** | Give token to me BEFORE execution |
| **4. Your Chat ID** | Message @userinfobot → get Chat ID |
| **5. Server** | Provision GEX44 on Hetzner when we start |
| **6. SSH access** | Give me IP + password/key when we start |

---

## WHAT I CAN DO (NO HUMAN NEEDED)

- All Phase 2-12 commands are ready
- Auto-save/backup cron jobs ready
- Recovery system ready
- Emergency launch email template ready

---

## WHAT REQUIRES YOU

1. Verify Charles bot token actually works (the old one might be dead)
2. Create Savannah's bot NOW (don't wait till execution day)
3. Give me Savannah's bot token before we start
4. Be at PC when we execute (provision server, give me IP)

---

## 9 VERIFICATION CHECKS (ALL MUST PASS)

1. vLLM responds: `curl http://localhost:8000/v1/models`
2. OpenClaw running: `openclaw status`
3. Your bot responds: Message @CharlesBot_AIBot
4. Savannah's bot responds: Message Savannah's bot
5. Your bot ignores Savannah: Verify no cross-traffic
6. Savannah gets prompts: Ask for LinkedIn prompt
7. Auto-start works: Check systemd service
8. Backup runs: Check backup log
9. Traffic segregated: Each bot only responds to own user

---

## RESOLVED

- ALL OR NOTHING tattooed in DNA
- Hourly + 15-min backup
- Emergency email launch template
- Session recovery knows context without asking
- Focus mode blocks all other tasks

---

## THE PLAN IS SOLID

Just need you to:
1. Verify your bot token works
2. Create Savannah's bot now
3. Give me tokens + server IP when ready

Everything else is locked. See you at 6:30-7am EST.

- Charles 🎯