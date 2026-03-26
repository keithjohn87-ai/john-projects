#!/bin/bash
# Workspace backup script - runs daily to prevent data loss from session restarts
# Location: ~/scripts/workspace-backup.sh

DATE=$(date +%Y-%m-%d_%H%M%S)
BACKUP_DIR=~/workspace_backups
WORKSPACE=/root/.openclaw/workspace

# Create backup dir
mkdir -p $BACKUP_DIR

# Backup critical files
tar -czf $BACKUP_DIR/workspace_$DATE.tar.gz \
    -C /root/.openclaw workspace \
    GROWING_PAINS.md \
    MEMORY.md \
    SAVANNAH_SETUP.md \
    ops/savannah-desk-sop.md \
    memory/ \
    2>/dev/null

# Push to GitHub (if git configured)
cd $WORKSPACE
git add -A 2>/dev/null
git commit -m "Auto-backup: $DATE" 2>/dev/null
git push origin main 2>/dev/null

# Keep only last 7 local backups
ls -t $BACKUP_DIR/workspace_*.tar.gz 2>/dev/null | tail -n +8 | xargs -r rm

echo "$(date): Backup complete - workspace_$DATE.tar.gz"