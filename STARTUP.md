#!/bin/bash
# STARTUP.md - Recovery Script for New Agent Sessions
# Run this immediately upon waking up to restore context

echo "=== CHARLES STARTUP RECOVERY ==="
echo "Date: $(date -u)"
echo ""

# 1. Read core identity files
echo "[1/6] Loading identity..."
cat SOUL.md USER.md IDENTITY.md 2>/dev/null | head -20

# 2. Read memory
echo ""
echo "[2/6] Loading memory..."
cat MEMORY.md | head -50

# 3. Check GitHub status
echo ""
echo "[3/6] Checking GitHub backup..."
git log --oneline -3
git status --short

# 4. List active projects
echo ""
echo "[4/6] Active projects:"
ls -la tradelegance-beta/ 2>/dev/null || echo "No tradelegance-beta"
ls -la samples/ 2>/dev/null || echo "No samples"

# 5. Check tools/config
echo ""
echo "[5/6] Tools status:"
echo "rclone: $(which rclone)"
rclone listremotes 2>/dev/null || echo "No rclone remotes"

# 6. Recent memory files
echo ""
echo "[6/6] Recent memory files:"
ls -lt memory/*.md 2>/dev/null | head -5 || echo "No memory files"

echo ""
echo "=== STARTUP COMPLETE ==="
echo "Next: Read full MEMORY.md and any recent memory/YYYY-MM-DD.md files"
