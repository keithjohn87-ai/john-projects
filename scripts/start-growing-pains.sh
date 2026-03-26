#!/bin/bash
# Start Growing Pains execution mode
# Usage: ./start-growing-pains.sh

STATE_FILE=/root/.openclaw/workspace/.growing-pains-state
PROGRESS=/root/.openclaw/workspace/growing-pains-progress.md
DATE=$(date +%Y-%m-%d_%H%M%S)

echo "active" > $STATE_FILE

# Update progress file
sed -i "s/\*\*Last Updated:\*\* Not started/\*\*Last Updated:\*\* $DATE/" $PROGRESS
sed -i "s/\*\*Status:\*\* Waiting for John to provision/\*\*Status:\*\* 🚀 EXECUTION IN PROGRESS — FOCUS MODE/" $PROGRESS

echo "🚀 Growing Pains execution mode activated at $DATE"
echo "⚠️  FOCUS MODE: Nothing else happens until complete."
echo "Auto-save every 15 minutes enabled."