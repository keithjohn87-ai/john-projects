#!/bin/bash
# ContractorPro Quick Deploy Script
# Usage: ./deploy.sh "commit message"

set -e

MESSAGE=${1:-"Update site"}
echo "🚀 Deploying ContractorPro..."

git add -A
git commit -m "$MESSAGE" || echo "No changes to commit"
git push origin master

echo "✅ Changes pushed to GitHub"
echo "⏳ Deploying to contrpro.com (takes ~30 seconds)..."

# Wait for deployment
sleep 5

# Verify deployment
STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://contrpro.com)
if [ "$STATUS" = "200" ]; then
    echo "✅ Site is live at https://contrpro.com"
else
    echo "⚠️  Site returned HTTP $STATUS"
fi