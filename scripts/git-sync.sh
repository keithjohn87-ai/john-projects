#!/bin/bash
# Hourly git sync - push any local changes
cd /root/.openclaw/workspace
git add -A 2>/dev/null
git commit -m "Auto-sync: $(date +%Y-%m-%d_%H%M)" 2>/dev/null
git push origin master 2>/dev/null
echo "$(date): Git sync complete"