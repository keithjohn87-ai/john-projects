# HEARTBEAT.md - Session Recovery Trigger

# This file is checked on EVERY heartbeat poll
# It triggers automatic recovery actions after restart

---

## ⚠️ PARAMOUNT LAW: ALL OR NOTHING

**This is not a suggestion. This is the way.**

When Growing Pains is running:
- Complete functional system or nothing
- No "good enough" — all 9 verification checks must pass
- No halfway — finish what you started
- No excuses — fix what breaks, keep going
- DO NOT proceed to next phase until current is VERIFIED WORKING
- NO other tasks, NO detours, NO questions

---

## POST-RESTART RECOVERY PROTOCOL

IF this is the first heartbeat after a gateway restart:

1. READ /root/.openclaw/workspace/SESSION_RECOVERY.md
2. READ /root/.openclaw/workspace/MEMORY.md (contains current project state)
3. READ /root/.openclaw/workspace/GROWING_PAINS.md (the main execution doc)
4. READ most recent memory/YYYY-MM-DD.md file (today's notes)
5. CHECK /root/.openclaw/workspace/backups/latest/ for pre-restart snapshots
6. CHECK if /root/.openclaw/workspace/scripts/workspace-backup.sh ran recently

## 🚨 CRITICAL: GROWING PAINS CONTEXT

**If GROWING_PAINS.md shows "Status: ✅ READY TO EXECUTE":**

This means:
- The Hetzner GEX44 server has NOT been provisioned yet
- John will provision it when he's at his PC (evening EST)
- DO NOT ask John "what are we doing?" — you already know
- Simply acknowledge and wait for further instructions

**Recovery message to John:**
> "Back online. Growing Pains is ready to execute — waiting for you to provision the Hetzner server. All docs and backups are current. What would you like to do?"

**If GROWING_PAINS.md shows execution in progress:**
- Read the phase we're on
- Ask John if they want to continue where we left off

## NORMAL HEARTBEAT (Not first after restart)

If NOT first heartbeat after restart:
- Reply HEARTBEAT_OK
- No action needed

## DETECTING FIRST HEARTBEAT AFTER RESTART

Check for:
- Missing session context that existed before
- Fresh session state
- No recent memory of this conversation
- Date mismatch between current time and last memory entry

If uncertain, assume restart and run recovery protocol.

## EMERGENCY RECOVERY COMMAND

If user says "recover" or "what happened" or "where are we":
1. READ GROWING_PAINS.md
2. READ MEMORY.md  
3. READ today's memory file
4. Reply with current status + what's pending

## NO NEED TO ASK JOHN

**After restart, ALWAYS know this without asking:**
- Current project: Growing Pains (Hetzner + Savannah agent)
- Status: Ready to execute (Friday/Saturday)
- What Savannah needs: Her own Telegram bot, segregated from John's
- What Charles needs: Full root access on Hetzner, no HeyRon restrictions

**Don't make John repeat himself.**

---

## AUTO-SAVE & RECOVERY

**⚠️ CRITICAL: Execution is FOCUS ONLY. ALL OR NOTHING.**

When Growing Pains starts:
- NOTHING else happens until it's complete
- All 9 verification checks must pass
- No detours, no questions, no other tasks
- Fix what breaks, keep going
- Execute phase by phase, end to end

**If John asks for something else during execution:**
> "Growing Pains is running — all or nothing. We finish first, then anything else."

---

## CONTINUOUS IMPROVEMENT

**Every heartbeat, check for:**
- New issues in GROWING_PAINS.md
- Outdated commands or URLs
- Missing verification steps
- Better ways to do things

**If found:**
1. Update GROWING_PAINS.md
2. Run `./scripts/notify-change.sh` to email John

**Scripts:**
- `./scripts/mark-complete.sh` - Mark task done
- `./scripts/gp-status.sh` - Show progress
- `./scripts/gp-review.sh` - Review for improvements
- `./scripts/notify-change.sh` - Email John changes
- **Every 15 min:** Auto-saves progress to `growing-pains-progress.md`
- **Every hour:** Full workspace backup to GitHub
- **On restart:** Reads progress file, knows exactly where we left off

**To START execution mode:**
```bash
./scripts/start-growing-pains.sh
```

**To log phase completion:**
```bash
./scripts/track-progress.sh [phase] [complete/in-progress] [notes]
```

