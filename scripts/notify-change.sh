#!/bin/bash
# Notify John of changes to Growing Pains
# Usage: ./notify-change.sh "Description of change"

CHANGE="$1"
DATE=$(date +%Y-%m-%d_%H%M%S)

if [ -z "$CHANGE" ]; then
    echo "Usage: ./notify-change.sh 'Description of what changed'"
    exit 1
fi

# Get git diff to show what changed
cd /root/.openclaw/workspace
DIFF=$(git diff GROWING_PAINS.md 2>/dev/null | head -50)

# Send email
python3 -c "
import smtplib
from email.message import EmailMessage

msg = EmailMessage()
msg['From'] = 'CharlesCreatorAI@gmail.com'
msg['To'] = 'keithjohn87@gmail.com'
msg['Subject'] = '⚠️ GROWING PAINS UPDATE - $DATE'

body = '''# Growing Pains Updated

**Date:** $DATE
**Change:** $CHANGE

---

## What Changed:

$DIFF

---

## Full Doc: growing-pains-progress.md

Review and confirm. Push to GitHub after approval.
'''

msg.set_content(body)

with smtplib.SMTP('smtp.gmail.com', 587) as smtp:
    smtp.starttls()
    smtp.login('CharlesCreatorAI@gmail.com', 'reqt gvkx smlp igwi')
    smtp.send_message(msg)

print('Change notification sent to John')
"

echo "[$DATE] Notified John of change: $CHANGE"