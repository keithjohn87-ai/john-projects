# Telegram Bot Downtime Alert

**Status:** CRITICAL - Bot Unresponsive
**Detected:** 2026-03-08 12:21 PM UTC
**Duration:** >10 minutes (first failure at 12:16 UTC)

## Issue Details

The Telegram bot (@CharlesBot_AIBot) is experiencing an authentication failure:
- **Error:** 401 Unauthorized
- **Cause:** Telegram API token appears to be invalid or revoked
- **Impact:** Bot cannot receive or send messages

## Log Evidence

```
[2026-03-08T12:16:12.218Z] telegram deleteWebhook failed: Call to 'deleteWebhook' failed! (401: Unauthorized)
[2026-03-08T12:16:12.219Z] [default] auto-restart attempt 8/10 in 300s
[2026-03-08T12:21:12.334Z] [default] starting provider
[2026-03-08T12:21:12.494Z] telegram deleteWebhook failed: Call to 'deleteWebhook' failed! (401: Unauthorized)
[2026-03-08T12:21:12.496Z] [default] auto-restart attempt 1/10 in 5s
```

## Recommended Actions

1. **Verify Bot Token:** Check if the Telegram bot token in `~/.openclaw/openclaw.json` is still valid
2. **Regenerate Token:** If needed, use @BotFather on Telegram to regenerate the bot token
3. **Update Config:** Update the token in the OpenClaw configuration
4. **Restart Gateway:** Run `openclaw gateway restart` to apply changes

## Alert Recipients

- Keith.john87@gmail.com (configured alert recipient)

---
*This alert was generated automatically by the telegram-health-monitor cron job.*
