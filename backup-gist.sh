#!/bin/bash
# Gist Backup Script for Charles State
# Token is stored separately for security

GITHUB_TOKEN_FILE="/root/.config/charles/github_token"
GIST_ID="a5539d9a33a2d51f9401d97fb4c2617e"
MEMORY_FILE="/root/.openclaw/workspace/MEMORY.md"

# Read token from secure location
if [ -f "$GITHUB_TOKEN_FILE" ]; then
    GITHUB_TOKEN=$(cat "$GITHUB_TOKEN_FILE")
else
    echo "Error: GitHub token not found at $GITHUB_TOKEN_FILE"
    exit 1
fi

# Read MEMORY.md content and escape for JSON
CONTENT=$(cat "$MEMORY_FILE" | sed 's/\\/\\\\/g; s/"/\\"/g; s/\t/\\t/g; s/\n/\\n/g' | awk '{printf "%s\\n", $0}')

# Build JSON payload
JSON=$(cat <<EOF
{
  "description": "Charles State Backup - $(date -u +'%Y-%m-%d %H:%M UTC')",
  "files": {
    "MEMORY.md": {
      "content": "$CONTENT"
    }
  }
}
EOF
)

# Update Gist
curl -s -X PATCH \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Content-Type: application/json" \
  https://api.github.com/gists/$GIST_ID \
  -d "$JSON"