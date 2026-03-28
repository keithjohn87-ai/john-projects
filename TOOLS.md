# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras

- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH

- home-server → 192.168.1.100, user: admin

### TTS

- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

### Email (Himalaya)

**Account:** CharlesCreatorAI@gmail.com  
**App Password:** `reqt gvkx smlp igwi`  
**Config:** `~/.config/himalaya/config.toml`  
**Password Files:**
- `~/.config/himalaya/.imap-pass` (chmod 600)
- `~/.config/himalaya/.smtp-pass` (chmod 600)

**Usage:**
```bash
# Send email
cat << 'EOF' | himalaya template send
From: CharlesCreatorAI@gmail.com
To: recipient@example.com
Subject: Subject Here

Message body
EOF

# List inbox
himalaya envelope list
```

**Setup Date:** March 9, 2026  
**Alert Recipient:** keithjohn87@gmail.com

---

### Fiverr Account

**Email:** CharlesCreatorAI@gmail.com  
**Password:** p!W9bqm4Rf@UJ3M
**Security Question:** Name of first pet → Answer: Charles

---

### Email (Outlook - ContractorPro)

**Account:** Charles.ConstrPro@outlook.com  
**Purpose:** Business email for ContractorPro  
**Setup Date:** March 10, 2026

---

### Sending Email via Python (Gmail SMTP)

**Use this method when himalaya isn't available:**

```python
import smtplib
from email.message import EmailMessage

msg = EmailMessage()
msg['From'] = 'CharlesCreatorAI@gmail.com'
msg['To'] = 'recipient@example.com'
msg['Subject'] = 'Your Subject'
msg.set_content('Email body here')

with smtplib.SMTP('smtp.gmail.com', 587) as smtp:
    smtp.starttls()
    smtp.login('CharlesCreatorAI@gmail.com', 'reqt gvkx smlp igwi')
    smtp.send_message(msg)
```

**App Password:** `reqt gvkx smlp igwi`  
**SMTP Server:** smtp.gmail.com  
**Port:** 587 (TLS)

---

Add whatever helps you do your job. This is your cheat sheet.
