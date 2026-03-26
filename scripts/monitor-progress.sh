#!/bin/bash
# Monitor completion log and update progress file
# Runs every 5 minutes to sync completion log → progress file

LOG=/root/.openclaw/workspace/logs/growing-pains-completion.log
PROGRESS=/root/.openclaw/workspace/growing-pains-progress.md

if [ ! -f "$LOG" ]; then
    exit 0
fi

# Read last completion and update accordingly
LAST=$(tail -1 $LOG 2>/dev/null)

if [[ "$LAST" == *"Phase 1"* ]] || [[ "$LAST" == *"Server"* ]]; then
    sed -i 's/- \[ \] Server provisioned/- [x] Server provisioned/' $PROGRESS 2>/dev/null
fi
if [[ "$LAST" == *"Docker"* ]] || [[ "$LAST" == *"Phase 2"* ]]; then
    sed -i 's/- \[ \] Docker + NVIDIA/- [x] Docker + NVIDIA/' $PROGRESS 2>/dev/null
fi
if [[ "$LAST" == *"vLLM"* ]] || [[ "$LAST" == *"Phase 3"* ]]; then
    sed -i 's/- \[ \] vLLM running/- [x] vLLM running/' $PROGRESS 2>/dev/null
fi
if [[ "$LAST" == *"OpenClaw"* ]] || [[ "$LAST" == *"Phase 4"* ]]; then
    sed -i 's/- \[ \] OpenClaw running/- [x] OpenClaw running/' $PROGRESS 2>/dev/null
fi
if [[ "$LAST" == *"bot responding"* ]] || [[ "$LAST" == *"Charles bot"* ]]; then
    sed -i 's/- \[ \] Charles bot responding/- [x] Charles bot responding/' $PROGRESS 2>/dev/null
fi
if [[ "$LAST" == *"Savannah"* ]]; then
    sed -i 's/- \[ \] Savannah bot/- [x] Savannah bot/' $PROGRESS 2>/dev/null
fi
if [[ "$LAST" == *"Firewall"* ]]; then
    sed -i 's/- \[ \] Firewall configured/- [x] Firewall configured/' $PROGRESS 2>/dev/null
fi
if [[ "$LAST" == *"Backup"* ]] || [[ "$LAST" == *"monitoring"* ]]; then
    sed -i 's/- \[ \] Backups + monitoring/- [x] Backups + monitoring/' $PROGRESS 2>/dev/null
fi
if [[ "$LAST" == *"Auto-start"* ]] || [[ "$LAST" == *"reboot"* ]]; then
    sed -i 's/- \[ \] Auto-start/- [x] Auto-start/' $PROGRESS 2>/dev/null
fi
if [[ "$LAST" == *"Workspace"* ]] || [[ "$LAST" == *"clone"* ]]; then
    sed -i 's/- \[ \] Workspace cloned/- [x] Workspace cloned/' $PROGRESS 2>/dev/null
fi
if [[ "$LAST" == *"Traffic"* ]] || [[ "$LAST" == *"segregated"* ]]; then
    sed -i 's/- \[ \] Traffic segregated/- [x] Traffic segregated/' $PROGRESS 2>/dev/null
fi

# If progress was updated, push to GitHub
cd /root/.openclaw/workspace
git add GROWING_PAINS.md growing-pains-progress.md 2>/dev/null
git commit -m "Progress auto-update: $LAST" 2>/dev/null
git push origin master 2>/dev/null

echo "$(date): Monitored completions - synced to progress file"