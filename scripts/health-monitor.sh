#!/bin/bash
# Health monitoring - check all services
LOG=/root/.openclaw/workspace/logs/health.log
DATE=$(date +%Y-%m-%d_%H:%M:%S)

echo "=== Health Check: $DATE ===" >> $LOG

# Check if growing pains is active
if [ -f /root/.openclaw/workspace/.growing-pains-state ]; then
    echo "Growing Pains: ACTIVE" >> $LOG
    STATE=$(cat /root/.openclaw/workspace/.growing-pains-state)
    
    # Only do full checks if we're on the Hetzner server (not in this temp container)
    # This is placeholder - on real server would check vLLM, OpenClaw, etc.
    echo "  Status: $STATE" >> $LOG
else
    echo "Growing Pains: Not active" >> $LOG
fi

# Check disk space
DF=$(df -h / | tail -1 | awk '{print $5}')
echo "Disk usage: $DF" >> $LOG

# Check memory
MEM=$(free -h | grep Mem | awk '{print $3 "/" $2}')
echo "Memory: $MEM" >> $LOG

echo "=== End Health ===" >> $LOG