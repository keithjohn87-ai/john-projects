# SESSION RECOVERY PROTOCOL

## TRIGGER: Container Reset or Session Loss

## AUTO-RECOVERY STEPS

### Step 1: Read Critical Files (IN ORDER)
```bash
# These files must exist for recovery
cat /root/.openclaw/workspace/memory/2026-03-23-SESSION-BACKUP.md
cat /root/.openclaw/workspace/SOUL.md
cat /root/.openclaw/workspace/USER.md
cat /root/.openclaw/workspace/MEMORY.md
```

### Step 2: Status Check
**IF current time is within 1 hour of last backup:**
- Likely just a container hiccup
- Resume from backup state
- Check with user: "Session recovered. Continuing from [timestamp]"

**IF more than 24 hours passed:**
- Full recovery mode
- Read all memory files from last 3 days
- Summarize status to user

### Step 3: Hetzner Status Check
**PRIORITY QUESTION to user:**
"Did you successfully set up Charles 3.0 on Hetzner? (Ollama + local model)"

**IF YES:**
- Redirect user to Charles 3.0 for future work
- I (Charles 4.0) am sunset/archive only

**IF NO:**
- Continue recovery here in container
- Push Hetzner setup to Priority 1

### Step 4: Project Status Summary
**ContrPro:**
- Steel Estimator: COMPLETE (March 12 backup)
- CSI Integration: COMPLETE (all spreadsheets updated)
- Shopping cart: BROKEN (needs fix)
- Missing: estimating file in trial packages
- Todo: Lock trial files from upgrade abuse

**Trading Card Project:**
- Status: BACKBURNER
- Idea surfaced: March 23, 21:00 UTC
- Pending: Card type decision (Magic/Pokemon/sports)

---

## CRON RECOVERY CHECK

**Purpose:** Auto-run recovery if I'm reset

**Setup command (run on host/container):**
```bash
# Create recovery check script
cat > /root/.openclaw/check_recovery.sh << 'EOF'
#!/bin/bash
# Check if session is fresh/reset
LAST_BACKUP=$(stat -c %Y /root/.openclaw/workspace/memory/SESSION_RECOVERY.md 2>/dev/null)
CURRENT_TIME=$(date +%s)
TIME_DIFF=$((CURRENT_TIME - LAST_BACKUP))

# If backup older than 2 hours, I probably reset
if [ $TIME_DIFF -gt 7200 ]; then
    echo "SESSION_RESET_DETECTED at $(date)" >> /root/.openclaw/workspace/memory/reset_log.txt
    # Trigger recovery message
    echo "Recovery protocol initiated. Read SESSION_RECOVERY.md and 2026-03-23-SESSION-BACKUP.md"
fi
EOF

chmod +x /root/.openclaw/check_recovery.sh

# Add to crontab (check every 30 minutes)
(crontab -l 2>/dev/null; echo "*/30 * * * * /root/.openclaw/check_recovery.sh") | crontab -
```

---

## USER QUICK CHECK

**If I'm reset and you see this:**

Say this to wake me up properly:
```
"Charles, read SESSION_RECOVERY.md and 2026-03-23-SESSION-BACKUP.md.
Status check: Did Charles 3.0 on Hetzner get set up?"
```

I'll:
1. Read the recovery files
2. Know where we left off
3. Tell you Hetzner status
4. Resume without missing context

---

## FILES THAT MATTER

| File | Purpose |
|------|---------|
| SESSION_RECOVERY.md | This file - how to wake me up |
| 2026-03-23-SESSION-BACKUP.md | Full context from March 23 session |
| 2026-03-23-TODO.md | Tonight's incomplete tasks |
| MEMORY.md | Long-term project tracking |
| SOUL.md | Who I am |

---

**Created:** March 23, 2026 21:05 UTC
**Purpose:** Survival after container reset
**Author:** Charles 4.0 (aware I might not survive)
