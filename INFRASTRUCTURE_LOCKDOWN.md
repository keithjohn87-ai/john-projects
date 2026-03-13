# INFRASTRUCTURE_LOCKDOWN.md - Telegram Access Control Implementation

**Created:** March 8, 2026 1:20 PM UTC  
**Purpose:** Lock down Telegram to authorized users only (John & Savannah)  
**Risk Level:** MEDIUM (requires gateway restart)

---

## Current State (INSECURE)

```json
"telegram": {
  "enabled": true,
  "dmPolicy": "open",        // ⚠️ ALLOWS ANYONE TO MESSAGE
  "botToken": "8622191614:AAHXs3HLNmVDdp0McUvXQLZ-htFv6dgVxEI",
  "allowFrom": ["*"],        // ⚠️ WILDCARD - NO RESTRICTIONS
  "groupPolicy": "allowlist",
  "streaming": "partial"
}
```

**Problem:** Anyone who finds @CharlesBot_AIBot can send messages and potentially extract information or execute commands.

---

## Target State (SECURE)

```json
"telegram": {
  "enabled": true,
  "dmPolicy": "allowlist",   // ✅ ONLY ALLOWLISTED IDs
  "botToken": "8622191614:AAHXs3HLNmVDdp0McUvXQLZ-htFv6dgVxEI",
  "allowFrom": [
    "8455750177",            // ✅ John Keith
    "8791771674"             // ✅ Savannah Keith
  ],
  "groupPolicy": "deny",     // ✅ NO GROUP CHATS
  "streaming": "partial"
}
```

**Result:** Only John (8455750177) and Savannah (8791771674) can communicate with the bot.

---

## Implementation Commands

### Step 1: Create Backup

```bash
# Backup current configuration
cp /root/.openclaw/openclaw.json /root/.openclaw/openclaw.json.backup-$(date +%Y%m%d-%H%M%S)

# Verify backup created
ls -lh /root/.openclaw/openclaw.json.backup-*
```

**Expected output:**
```
-rw------- 1 root root 1.2K Mar  8 13:20 /root/.openclaw/openclaw.json.backup-20260308-132045
```

---

### Step 2: Apply Security Patch

**Option A: Using sed (One-liner)**

```bash
# Change dmPolicy from "open" to "allowlist"
sed -i 's/"dmPolicy": "open"/"dmPolicy": "allowlist"/g' /root/.openclaw/openclaw.json

# Replace allowFrom wildcard with specific IDs
sed -i 's/"allowFrom": \["\*"\]/"allowFrom": ["8455750177", "8791771674"]/g' /root/.openclaw/openclaw.json

# Change groupPolicy to "deny" (optional but recommended)
sed -i 's/"groupPolicy": "allowlist"/"groupPolicy": "deny"/g' /root/.openclaw/openclaw.json
```

**Option B: Using Python (Safer, validates JSON)**

```bash
python3 << 'EOF'
import json

# Read current config
with open('/root/.openclaw/openclaw.json', 'r') as f:
    config = json.load(f)

# Apply security changes
config['channels']['telegram']['dmPolicy'] = 'allowlist'
config['channels']['telegram']['allowFrom'] = ['8455750177', '8791771674']
config['channels']['telegram']['groupPolicy'] = 'deny'

# Write updated config
with open('/root/.openclaw/openclaw.json', 'w') as f:
    json.dump(config, f, indent=2)

print("✅ Security configuration applied successfully")
EOF
```

---

### Step 3: Verify Configuration

```bash
# Check JSON is valid
python3 -m json.tool /root/.openclaw/openclaw.json > /dev/null && echo "✅ Valid JSON" || echo "❌ Invalid JSON"

# Verify changes applied
grep -A5 '"telegram"' /root/.openclaw/openclaw.json
```

**Expected output:**
```json
"telegram": {
  "enabled": true,
  "dmPolicy": "allowlist",
  "botToken": "8622191614:AAHXs3HLNmVDdp0McUvXQLZ-htFv6dgVxEI",
  "allowFrom": [
    "8455750177",
    "8791771674"
  ],
  "groupPolicy": "deny",
  "streaming": "partial"
}
```

---

### Step 4: Restart Gateway

```bash
# Restart OpenClaw gateway to apply changes
openclaw gateway restart

# Wait 10 seconds for restart
sleep 10

# Check gateway status
openclaw gateway status
```

**Expected output:**
```
Gateway: running
Telegram: connected
...
```

---

### Step 5: Test Both Authorized Users

**Test from John's phone (8455750177):**
1. Send message to @CharlesBot_AIBot: "Test after lockdown"
2. Should receive immediate response

**Test from Savannah's phone (8791771674):**
1. Send message to @CharlesBot_AIBot: "Test after lockdown"
2. Should receive immediate response

**Both tests should pass.**

---

### Step 6: Verify Unauthorized Access Blocked (Optional)

If you have a third Telegram account:
1. Send message to @CharlesBot_AIBot
2. Should receive NO response (message silently dropped)
3. Check OpenClaw logs to confirm blocking

---

## Rollback Procedure

If something goes wrong, restore from backup:

```bash
# Stop gateway
openclaw gateway stop

# Restore backup
cp /root/.openclaw/openclaw.json.backup-20260308-132045 /root/.openclaw/openclaw.json

# Restart gateway
openclaw gateway start

# Verify
openclaw gateway status
```

---

## Post-Implementation Checklist

- [ ] Backup created successfully
- [ ] Configuration updated (dmPolicy = allowlist)
- [ ] Authorized IDs added (John: 8455750177, Savannah: 8791771674)
- [ ] JSON validated (no syntax errors)
- [ ] Gateway restarted successfully
- [ ] John can send/receive messages
- [ ] Savannah can send/receive messages
- [ ] (Optional) Unauthorized user test completed
- [ ] Backup file preserved (don't delete)
- [ ] ACCESS_CONTROL.md updated with implementation date

---

## Troubleshooting

### Issue: Gateway won't start after changes
**Cause:** JSON syntax error
**Fix:** 
```bash
# Restore from backup
cp /root/.openclaw/openclaw.json.backup-* /root/.openclaw/openclaw.json
openclaw gateway restart
```

### Issue: John can't message bot
**Cause:** Wrong Telegram ID
**Fix:** Verify ID with @userinfobot on Telegram

### Issue: Savannah can't message bot
**Cause:** Wrong Telegram ID
**Fix:** Verify ID with @userinfobot on Telegram

### Issue: Bot not responding to anyone
**Cause:** Token issue or gateway problem
**Fix:** Check logs: `tail -f /tmp/openclaw/openclaw-*.log`

---

## Security Notes

### What This Blocks:
- ✅ Random users finding and messaging @CharlesBot_AIBot
- ✅ Social engineering attempts via Telegram
- ✅ Unauthorized command execution
- ✅ Information extraction attempts
- ✅ Group chat invitations (if groupPolicy = deny)

### What This Doesn't Block:
- ❌ Webchat access (separate channel, different controls)
- ❌ Compromised authorized accounts (use incident response)
- ❌ Physical access to server (infrastructure security)

### Additional Recommendations:
1. **Enable 2FA** on Telegram accounts for John and Savannah
2. **Monitor logs** weekly for blocked attempts
3. **Review authorized list** monthly
4. **Consider time-based restrictions** (business hours only)
5. **Implement rate limiting** (prevent spam even from authorized users)

---

## Verification Commands Summary

```bash
# Quick verification script
echo "=== Checking Configuration ==="
grep '"dmPolicy"' /root/.openclaw/openclaw.json
grep '"allowFrom"' /root/.openclaw/openclaw.json
grep '"groupPolicy"' /root/.openclaw/openclaw.json

echo "=== Checking Gateway Status ==="
openclaw gateway status | grep -E "(Gateway|Telegram)"

echo "=== Recent Logs ==="
tail -5 /tmp/openclaw/openclaw-$(date +%Y-%m-%d).log

echo "=== Backup Files ==="
ls -lh /root/.openclaw/openclaw.json.backup-* 2>/dev/null || echo "No backups found"
```

---

## Contact for Issues

If lockdown fails or causes problems:
1. **Immediate:** Restore from backup (see Rollback Procedure)
2. **Support:** Contact OpenClaw admin or infrastructure team
3. **Documentation:** Refer to ACCESS_CONTROL.md for policies

---

**Implementation Date:** _______________  
**Implemented By:** _______________  
**Tested By:** John & Savannah  
**Status:** ⬜ Pending | ⬜ In Progress | ⬜ Complete

---

*This document is classified RESTRICTED. For authorized personnel only.*
