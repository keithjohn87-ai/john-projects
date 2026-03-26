#!/bin/bash
# Quick status check - shows current progress
echo "========================================="
echo "  GROWING PAINS - PROGRESS STATUS"
echo "========================================="
echo ""

PROGRESS=/root/.openclaw/workspace/growing-pains-progress.md
if [ -f "$PROGRESS" ]; then
    echo "Last Updated:"
    grep "Last Updated" $PROGRESS | head -1
    echo ""
    grep "Status:" $PROGRESS | head -1
    echo ""
fi

echo "--- Completion Log (last 10) ---"
LOG=/root/.openclaw/workspace/logs/growing-pains-completion.log
if [ -f "$LOG" ]; then
    tail -10 $LOG
else
    echo "No completions logged yet"
fi

echo ""
echo "--- Current Phase ---"
STATE=/root/.openclaw/workspace/.growing-pains-state
if [ -f "$STATE" ]; then
    cat $STATE
else
    echo "Not started"
fi

echo ""
echo "========================================="