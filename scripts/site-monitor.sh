#!/bin/bash
# ContractorPro Site Monitor
# Runs every 5 minutes via cron

SITE_URL="https://contrpro.com"
EMAIL_ALERT="keithjohn87@gmail.com"
LOG_FILE="/root/.openclaw/workspace/logs/site-monitor.log"
STATUS_FILE="/root/.openclaw/workspace/logs/site-status.json"

# Create log directory if needed
mkdir -p /root/.openclaw/workspace/logs

# Check site
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$SITE_URL")
RESPONSE_TIME=$(curl -s -o /dev/null -w "%{time_total}" "$SITE_URL")
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

# Update status file
echo "{\"timestamp\":\"$TIMESTAMP\",\"status\":$HTTP_CODE,\"response_time\":$RESPONSE_TIME,\"url\":\"$SITE_URL\"}" > "$STATUS_FILE"

# Log result
echo "[$TIMESTAMP] Status: $HTTP_CODE, Response: ${RESPONSE_TIME}s" >> "$LOG_FILE"

# Check if down
if [ "$HTTP_CODE" != "200" ]; then
    # Check if we already sent alert (prevent spam)
    LAST_ALERT=$(cat /root/.openclaw/workspace/logs/last-alert.txt 2>/dev/null || echo "0")
    CURRENT_TIME=$(date +%s)
    TIME_DIFF=$((CURRENT_TIME - LAST_ALERT))
    
    # Only alert if it's been > 10 minutes
    if [ $TIME_DIFF -gt 600 ]; then
        # Send email alert
        python3 << EOF
import smtplib
import ssl
from email.mime.text import MIMEText
import json

with open('/root/.openclaw/workspace/.auth-profiles.json') as f:
    auth = json.load(f)

gmail = auth['gmail']

msg = MIMEText(f"ALERT: ContractorPro site is DOWN!\n\nURL: $SITE_URL\nHTTP Status: $HTTP_CODE\nTime: $TIMESTAMP\n\nPlease investigate immediately.")
msg['Subject'] = 'URGENT: contrpro.com is DOWN'
msg['From'] = gmail['email']
msg['To'] = '$EMAIL_ALERT'

context = ssl.create_default_context()
with smtplib.SMTP(gmail['smtp_host'], gmail['smtp_port']) as server:
    server.starttls(context=context)
    server.login(gmail['email'], gmail['app_password'].replace(' ', ''))
    server.send_message(msg)
EOF
        
        # Record alert time
        echo "$CURRENT_TIME" > /root/.openclaw/workspace/logs/last-alert.txt
        echo "[$TIMESTAMP] ALERT SENT - Site down: $HTTP_CODE" >> "$LOG_FILE"
    fi
fi