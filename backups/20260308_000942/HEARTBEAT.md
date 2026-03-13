# HEARTBEAT.md - Session Recovery Trigger

# This file is checked on EVERY heartbeat poll
# It triggers automatic recovery actions after restart

## POST-RESTART RECOVERY PROTOCOL

IF this is the first heartbeat after a gateway restart:

1. READ /root/.openclaw/workspace/SESSION_RECOVERY.md
2. READ /root/.openclaw/workspace/MEMORY.md
3. CHECK if /root/.openclaw/workspace/backups/latest/ exists
   - IF yes: Read SESSION_SNAPSHOT.md from that directory
4. READ most recent memory/YYYY-MM-DD.md file
5. SEND message to John: "Session restarted. Recovery complete. Last checkpoint: [timestamp from MEMORY.md]. Ready to continue."

## NORMAL HEARTBEAT (Not first after restart)

If NOT first heartbeat after restart:
- Reply HEARTBEAT_OK
- No action needed

## DETECTING FIRST HEARTBEAT AFTER RESTART

Check for:
- Missing session context that existed before
- Fresh session state
- No recent memory of this conversation

If uncertain, assume restart and run recovery protocol.
