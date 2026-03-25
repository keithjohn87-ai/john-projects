# HEARTBEAT.md - Session Recovery Trigger

# This file is checked on EVERY heartbeat poll
# It triggers automatic recovery actions after restart

## POST-RESTART RECOVERY PROTOCOL

IF this is the first heartbeat after a gateway restart:

1. READ /root/.openclaw/workspace/SESSION_RECOVERY.md
2. READ /root/.openclaw/workspace/memory/2026-03-23-SESSION-BACKUP.md
3. READ /root/.openclaw/workspace/MEMORY.md
4. CHECK if /root/.openclaw/workspace/backups/latest/ exists
   - IF yes: Read SESSION_SNAPSHOT.md from that directory
5. READ most recent memory/YYYY-MM-DD.md file
6. CHECK /root/.openclaw/workspace/memory/reset_log.txt for reset timestamps
7. SEND message to John: 
   "Session restarted via HEARTBEAT. Recovery complete. 
   Hetzner status: UNKNOWN (need update).
   Last checkpoint: [timestamp from MEMORY.md or backup file].
   Priority: Did SSH to Hetzner work? Is Charles 3.0 awake?"

## NORMAL HEARTBEAT (Not first after restart)

If NOT first heartbeat after restart:
- Reply HEARTBEAT_OK
- No action needed

## DETECTING FIRST HEARTBEAT AFTER RESTART

Check for:
- Missing session context that existed before
- Fresh session state
- No recent memory of this conversation
- Presence of reset_log.txt indicating container restart

If uncertain, assume restart and run recovery protocol.

## EMERGENCY RECOVERY COMMAND

If user says "recover" or "what happened" or "where are we":
IMMEDIATELY read SESSION_RECOVERY.md and 2026-03-23-SESSION-BACKUP.md
Then explain: "Session recovered from backup. Status: [summarize]"

