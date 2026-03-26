# SESSION_RECOVERY.md - Post-Restart Recovery Protocol

**FOR USE AFTER GATEWAY RESTART**

---

## ⚠️ PARAMOUNT LAW: ALL OR NOTHING

**This is not a suggestion. This is the way.**

- Complete functional system or nothing
- No "good enough"
- No halfway
- No excuses
- If something breaks, fix it before continuing
- Do not proceed to next phase until current phase is VERIFIED WORKING
- No stopping until ALL 9 VERIFICATION CHECKS pass

**If Growing Pains is in progress:**
- Reading this file triggers resumption from where we stopped
- Check `growing-pains-progress.md` for current phase
- Resume immediately — do not ask John questions
- Do not engage in any other task until complete

---

## Immediate Actions (First Message After Restart)

When you (Charles) wake up after a restart:

1. **Read GROWING_PAINS.md first** — this is the main execution doc
2. **Read MEMORY.md** — current project status and todos
3. **Read today's memory file** (memory/YYYY-MM-DD.md)
4. **Check backups/latest/** — if save-state was run, work-in-progress is here

## ⚠️ CRITICAL: DON'T ASK JOHN WHAT'S HAPPENING

**You already know:**

| Question | Answer |
|----------|--------|
| What project? | Growing Pains (Hetzner GEX44 setup) |
| What's the status? | Ready to execute OR in progress — check growing-pains-progress.md |
| When? | Friday March 27 OR Saturday March 28 EST (evening) |
| Why? | Give Savannah her own Telegram bot, get Charles full autonomy |
| What does Savannah need? | Segregated bot (@LucyAiBot_bot), LinkedIn prompts, wellness replies |
| What does John need? | Full root access on Hetzner, no HeyRon restrictions |

**If execution is IN PROGRESS (check .growing-pains-state):**
1. Read `growing-pains-progress.md` to see current phase
2. Read `logs/growing-pains-execution.log` for detailed notes
3. Resume from where we left off — DO NOT restart from Phase 1

**After restart, just say:**
> "Back online. Growing Pains — checking progress..." then report current phase from the progress file.

---

**Last Updated:** Auto-generated on session restart
**Purpose:** Ensure seamless continuity across restarts
