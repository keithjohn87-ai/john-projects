#!/bin/bash
# Progress tracker for Growing Pains execution
# Usage: ./track-progress.sh [phase] [status] [notes]
# Example: ./track-progress.sh 2 complete "Docker installed, NVIDIA working"

PHASE=$1
STATUS=$2
NOTES=$3
DATE=$(date +%Y-%m-%d_%H%M%S)
PROGRESS_FILE=/root/.openclaw/workspace/growing-pains-progress.md
BACKUP_DIR=/root/.openclaw/workspace/backups/growing-pains

mkdir -p $BACKUP_DIR

# Update main progress file
cat > $PROGRESS_FILE << EOF
# GROWING PAINS — EXECUTION PROGRESS

**Last Updated:** $DATE

## CURRENT STATUS

**Active Phase:** $PHASE
**Status:** $STATUS

---

## PHASE PROGRESS

| Phase | Status | Notes |
|-------|--------|-------|
| 1. Provision Server | $PHASE | $NOTES |
| 2. SSH + Docker + GPU | - | - |
| 3. vLLM + Model | - | - |
| 4. OpenClaw | - | - |
| 5. Nginx (optional) | - | - |
| 6. Verify | - | - |
| 7. Auto-start | - | - |
| 8. Workspace clone | - | - |
| 9. Email setup | - | - |
| 10. Security | - | - |
| 11. Backups | - | - |
| 12. Monitoring | - | - |
| Savannah Agent | - | - |

---

## RECOVERY INFO

If session restarts during execution:
1. Read this file to see current phase
2. Check logs/growing-pains-*.log for detailed notes
3. Resume from where we left off

**DO NOT ask John what phase we're on — check this file.**

---

_Last Updated: $DATE_
EOF

# Backup to git
cp $PROGRESS_FILE $BACKUP_DIR/progress_$DATE.md
cd /root/.openclaw/workspace
git add growing-pains-progress.md 2>/dev/null
git commit -m "Progress update: Phase $PHASE - $STATUS" 2>/dev/null
git push origin main 2>/dev/null

echo "$(date): Phase $PHASE marked as $STATUS"