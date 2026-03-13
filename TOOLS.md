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

### Email (Outlook - ContractorPro)

**Account:** Charles.ConstrPro@outlook.com  
**Purpose:** Business email for ContractorPro  
**Setup Date:** March 10, 2026

---

Add whatever helps you do your job. This is your cheat sheet.
