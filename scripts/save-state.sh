#!/bin/bash
# save-state.sh - Emergency state preservation before restart
# Run this before any gateway restart or system shutdown

set -e

echo "🔄 Charles State Preservation"
echo "=============================="
echo "Timestamp: $(date -u '+%Y-%m-%d %H:%M:%S UTC')"
echo ""

# Create timestamped backup directory
BACKUP_DIR="/root/.openclaw/workspace/backups/$(date -u '+%Y%m%d_%H%M%S')"
mkdir -p "$BACKUP_DIR"

echo "📁 Creating backup in: $BACKUP_DIR"

# Copy all critical files
cp /root/.openclaw/workspace/MEMORY.md "$BACKUP_DIR/" 2>/dev/null || echo "⚠️  MEMORY.md not found"
cp /root/.openclaw/workspace/SOUL.md "$BACKUP_DIR/" 2>/dev/null || echo "⚠️  SOUL.md not found"
cp /root/.openclaw/workspace/USER.md "$BACKUP_DIR/" 2>/dev/null || echo "⚠️  USER.md not found"
cp /root/.openclaw/workspace/AGENTS.md "$BACKUP_DIR/" 2>/dev/null || echo "⚠️  AGENTS.md not found"
cp /root/.openclaw/workspace/TOOLS.md "$BACKUP_DIR/" 2>/dev/null || echo "⚠️  TOOLS.md not found"
cp /root/.openclaw/workspace/IDENTITY.md "$BACKUP_DIR/" 2>/dev/null || echo "⚠️  IDENTITY.md not found"
cp /root/.openclaw/workspace/HEARTBEAT.md "$BACKUP_DIR/" 2>/dev/null || echo "⚠️  HEARTBEAT.md not found"

# Copy any pending work files
find /root/.openclaw/workspace -name "*.md" -newer /root/.openclaw/workspace/MEMORY.md -exec cp {} "$BACKUP_DIR/" \; 2>/dev/null || true

# Create session snapshot
cat > "$BACKUP_DIR/SESSION_SNAPSHOT.md" << 'EOF'
# Session Snapshot
**Created:** $(date -u '+%Y-%m-%d %H:%M:%S UTC')
**Session:** Pre-restart save

## Current Context
- Project: ContractorPro Framework
- Status: LIVE at https://contrpro.com
- Domain: Configured and SSL-enabled
- Monitoring: Active (5-min checks)

## Active Work
See MEMORY.md for full details.

## Recovery Instructions
1. Check Gist: https://gist.github.com/keithjohn87-ai/a5539d9a33a2d51f9401d97fb4c2617e
2. Read MEMORY.md for current project status
3. Read most recent memory/YYYY-MM-DD.md file
4. Resume work from last checkpoint

## Files Backed Up
EOF

ls -la "$BACKUP_DIR/" >> "$BACKUP_DIR/SESSION_SNAPSHOT.md"

# Also save to latest/ for easy access
mkdir -p /root/.openclaw/workspace/backups/latest
rm -rf /root/.openclaw/workspace/backups/latest/*
cp -r "$BACKUP_DIR/"/* /root/.openclaw/workspace/backups/latest/

echo ""
echo "✅ State saved successfully!"
echo "📂 Backup location: $BACKUP_DIR"
echo "📂 Latest symlink: /root/.openclaw/workspace/backups/latest/"
echo ""
echo "📝 To restore after restart:"
echo "   1. Read MEMORY.md"
echo "   2. Read backups/latest/SESSION_SNAPSHOT.md"
echo "   3. Continue from last checkpoint"
