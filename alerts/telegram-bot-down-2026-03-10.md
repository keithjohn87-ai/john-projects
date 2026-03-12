# Telegram Bot Alert Log

## Alert: Telegram Bot Down
**Timestamp:** 2026-03-10 18:06 UTC (Tuesday, March 10th, 2026 — 6:06 PM UTC)

### Issue Summary
The Telegram bot (@CharlesBot_AIBot) is **UNRESPONSIVE** due to an invalid API token.

### Error Details
- **Error Code:** 401 Unauthorized
- **API Response:** `{"ok":false,"error_code":401,"description":"Unauthorized"}`
- **Bot Token:** `8622191614:AAHXs3HLNmVDdp0McUvXQLZ-htFv6dgVxEI`

### Root Cause
The Telegram bot token has been invalidated. This typically occurs when:
1. The bot token was regenerated via @BotFather
2. The bot was deleted from Telegram
3. Telegram revoked the token for security reasons

### Impact
- Messages cannot be sent via Telegram channel
- Delivery queue has 85+ pending messages
- Cron health check jobs are running but cannot deliver notifications

### Action Required
1. Open Telegram and message @BotFather
2. Use `/mybots` to see your bots
3. Select @CharlesBot_AIBot
4. Choose "API Token" → "Revoke current token" or generate new token
5. Copy the new token
6. Update the configuration file: `/root/.openclaw/openclaw.json`
7. Replace the `botToken` value under `channels.telegram`
8. Restart OpenClaw gateway if necessary

### Failed Notification Attempts
- Email to keith.john87@gmail.com failed (Gmail credentials also invalid)
- Alert logged to this file instead

---
Logged by: Charles (AI Assistant)
