#!/bin/bash
# Fix Telegram token and model for OpenClaw on Hetzner

set -e

echo "=== OpenClaw Telegram Fix ==="

# 1. Check current config
CONFIG="$HOME/.config/openclaw/config.json"
if [ ! -f "$CONFIG" ]; then
    echo "Config file not found at $CONFIG"
    exit 1
fi

echo "Current config:"
grep -E '(botToken|model)' "$CONFIG"

# 2. Get new bot token
echo -e "\nEnter new bot token from @BotFather (format: 1234567890:ABCdef...):"
read -r NEW_TOKEN
if [ -z "$NEW_TOKEN" ]; then
    echo "No token provided. Exiting."
    exit 1
fi

# 3. Update bot token
sed -i "s/\"botToken\": *\"[^\"]*\"/\"botToken\": \"$NEW_TOKEN\"/" "$CONFIG"
echo "✓ Updated bot token."

# 4. Ensure model is correct
sed -i 's/"model": *"[^"]*"/"model": "qwen2.5-coder:7b"/' "$CONFIG"
echo "✓ Ensured model is qwen2.5-coder:7b."

# 5. Restart gateway
echo -e "\nRestarting OpenClaw gateway..."
openclaw gateway restart

echo -e "\n✅ Done. Send a message to your bot on Telegram."
echo "If it still fails, check logs: journalctl --user-unit openclaw-gateway.service -n 30"