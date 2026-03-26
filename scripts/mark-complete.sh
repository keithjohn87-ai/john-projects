#!/bin/bash
# Track Growing Pains completion - call with phase/task name
# Usage: ./mark-complete.sh "Phase 2 complete" "Docker + NVIDIA working"

TASK="$1"
NOTES="$2"
DATE=$(date +%Y-%m-%d_%H%M%S)
PROGRESS=/root/.openclaw/workspace/growing-pains-progress.md
LOG=/root/.openclaw/workspace/logs/growing-pains-completion.log

mkdir -p /root/.openclaw/workspace/logs

# Log the completion
echo "[$DATE] ✅ $TASK - $NOTES" >> $LOG

# Update progress markdown with timestamp
echo "✅ $TASK - $NOTES (completed $DATE)" >> /tmp/gp_pending.txt

# Update GROWING_PAINS.md checkboxes if matching
if [[ "$TASK" == *"Phase 1"* ]] || [[ "$TASK" == *"Server"* ]]; then
    sed -i 's/- \[ \] Server provisioned/- [x] Server provisioned/' $PROGRESS
fi
if [[ "$TASK" == *"Phase 2"* ]] || [[ "$TASK" == *"Docker"* ]]; then
    sed -i 's/- \[ \] Docker + NVIDIA/- [x] Docker + NVIDIA/' $PROGRESS
fi
if [[ "$TASK" == *"Phase 3"* ]] || [[ "$TASK" == *"vLLM"* ]]; then
    sed -i 's/- \[ \] vLLM running/- [x] vLLM running/' $PROGRESS
fi
if [[ "$TASK" == *"Phase 4"* ]] || [[ "$TASK" == *"OpenClaw"* ]]; then
    sed -i 's/- \[ \] OpenClaw running/- [x] OpenClaw running/' $PROGRESS
fi
if [[ "$TASK" == *"Savannah"* ]] || [[ "$TASK" == *"bot"* ]]; then
    sed -i 's/- \[ \] Savannah bot/- [x] Savannah bot/' $PROGRESS
fi

# Push to GitHub
cd /root/.openclaw/workspace
git add growing-pains-progress.md logs/growing-pains-completion.log 2>/dev/null
git commit -m "Complete: $TASK" 2>/dev/null
git push origin master 2>/dev/null

echo "[$DATE] ✅ Marked complete: $TASK"