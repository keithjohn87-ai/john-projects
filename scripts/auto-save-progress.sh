#!/bin/bash
# Auto-save current state every 15 minutes during execution
# Only runs if execution is active

STATE_FILE=/root/.openclaw/workspace/.growing-pains-state
PROGRESS=/root/.openclaw/workspace/growing-pains-progress.md

if [ -f "$STATE_FILE" ]; then
    SOURCE="$1"
    NOTES="$2"
    DATE=$(date +%Y-%m-%d_%H%M%S)
    LOG_DIR=/root/.openclaw/workspace/logs
    mkdir -p $LOG_DIR
    
    # Append to execution log
    echo "[$DATE] $SOURCE: $NOTES" >> $LOG_DIR/growing-pains-execution.log
    
    # Quick git push
    cd /root/.openclaw/workspace
    git add growing-pains-progress.md logs/growing-pains-execution.log 2>/dev/null
    git commit -m "Auto-save: $SOURCE - $NOTES" 2>/dev/null
    git push origin main 2>/dev/null
fi