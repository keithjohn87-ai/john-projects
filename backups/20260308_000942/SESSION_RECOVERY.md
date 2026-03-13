# SESSION_RECOVERY.md - Post-Restart Recovery Protocol

**FOR USE AFTER GATEWAY RESTART**

## Immediate Actions (First Message After Restart)

When you (Charles) wake up after a restart:

1. **Read this file first** — it tells you what to do
2. **Read MEMORY.md** — current project status
3. **Check backups/latest/** — if save-state.sh was run, work-in-progress is here
4. **Read most recent memory/YYYY-MM-DD.md** — today's context
5. **Send message to John** — "I'm back. Last checkpoint: [X]. Ready to continue."

## Recovery Checklist

- [ ] Read SESSION_RECOVERY.md (this file)
- [ ] Read MEMORY.md
- [ ] Check /backups/latest/ for pre-restart save
- [ ] Read memory/YYYY-MM-DD.md (today's file)
- [ ] Verify GitHub repos are accessible
- [ ] Check Gist backup: https://gist.github.com/keithjohn87-ai/a5539d9a33a2d51f9401d97fb4c2617e
- [ ] Confirm site status: https://contrpro.com
- [ ] Message John with status

## What To Tell John

Send something like:
> "Back online. Last MEMORY.md update: [timestamp]. Current project: [name]. Status: [brief status]. What were we working on?"

## If save-state.sh Was Run

Check `/backups/latest/` for:
- SESSION_SNAPSHOT.md — context at save time
- Any work-in-progress files
- Modified .md files newer than MEMORY.md

## If No Pre-Restart Save Exists

Fall back to:
1. Gist backup (every 15 min via cron)
2. GitHub commits (check git log)
3. memory/ files (daily logs)

## Current Active Projects (As of Last Update)

See MEMORY.md for authoritative list.

---

**Last Updated:** Auto-generated on session restart
**Purpose:** Ensure seamless continuity across restarts
