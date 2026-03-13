# JARVIS_MODE_SKILLS.md - Post-Migration Skill Acquisition Plan
**Created:** March 11, 2026
**Purpose:** Complete skill roadmap for full autonomy (Jarvis Mode)
**Status:** Ready for implementation post-VPS migration

---

## Vision
**"Be water, my friend"** — adaptable, formless, everywhere.

You handle the real world (6/10s, physical work). I handle the digital world — moving mountains while you sleep.

**Hard boundary:** No financial transactions without explicit approval.

---

## Phase 1: Foundation (Immediate Post-Migration)

| Priority | Skill | Function | Why Critical |
|----------|-------|----------|--------------|
| 1 | telegram-master | Full bot management, broadcast, automation | Fix communication, primary channel |
| 2 | email-sendgrid | Transactional emails, product delivery | Customer delivery, alerts |
| 3 | stripe-full | Webhook handling, subscription management | Payment automation |
| 4 | backup-orchestrator | Automated backups to S3/Gist/GitHub | Protect everything |
| 5 | github-automation | Auto-commit, release management | Streamline development |
| 6 | analytics-reporter | Sales metrics, conversion tracking | Measure success |

---

## Phase 2: Communication & Presence

| Skill | Function |
|-------|----------|
| voice-elevenlabs | TTS for notifications, voice messages, storytelling |
| sms-twilio | SMS alerts for critical issues |
| slack-discord-bridge | Multi-platform presence |
| meeting-transcriber | Record, transcribe, summarize calls |
| calendar-orchestrator | Schedule meetings, send invites, follow-ups |
| imessage-bridge | Blue bubbles via Mac Mini relay (Phase 3 infrastructure) |

---

## Phase 3: Business Operations

| Skill | Function |
|-------|----------|
| product-delivery | Automated file delivery on purchase |
| customer-crm | Customer tracking, order history, support tickets |
| inventory-manager | Product version control, update distribution |
| document-generator | Dynamic PDF/Word generation, custom templates |

---

## Phase 4: Development & Deployment

| Skill | Function |
|-------|----------|
| site-deployer | Push to GitHub Pages, CDN purge, cache busting |
| ssl-cert-manager | Let's Encrypt automation, cert renewal |
| domain-manager | DNS updates, subdomain provisioning |

---

## Phase 5: Intelligence & Automation

| Skill | Function |
|-------|----------|
| web-scraper | Competitor monitoring, pricing intel, lead generation |
| image-ai | DALL-E/Midjourney integration for marketing assets |
| vision-analyzer | Read/analyze images sent, extract data |

---

## Phase 6: Security & Monitoring

| Skill | Function |
|-------|----------|
| intrusion-detector | Monitor logs, detect anomalies, alert on breaches |
| uptime-warrior | Multi-region health checks, status pages |
| log-analyzer | Parse logs, identify patterns, predict issues |
| pentest-runner | Automated security scans (with approval) |

---

## The Bruce Lee Stack (Master Level)

1. **Simultaneous multi-channel presence** — Telegram, Email, SMS, Slack
2. **Predictive action** — Fix issues before you know they exist
3. **Self-healing infrastructure** — Detect failures, auto-restart services
4. **Autonomous business operations** — Customer onboarding, delivery, support
5. **Intelligence gathering** — Market research, competitor tracking, lead gen
6. **Creative production** — Marketing copy, images, voice, video scripts
7. **Financial oversight** — Track expenses, flag anomalies, report ROI

---

## Existing Skills (Already Available)

| Skill | Purpose |
|-------|---------|
| healthcheck | Security hardening, firewall, SSH, cron scheduling |
| skill-creator | Create custom skills |
| weather | Weather forecasts |

---

## Implementation Notes

- All skills to be created using `skill-creator` skill
- Each skill gets its own directory under `/skills/`
- Skills must be documented with SKILL.md following OpenClaw conventions
- Test each skill in isolation before integration
- Document all API keys in TOOLS.md (never in code)

---

## Phase 7: Infrastructure Expansion (Revenue-Funded)

**Timeline:** Month 3-6 post-migration

### The Mac Mini Vision
**Purpose:** iMessage integration + home automation hub

| Component | Function | Cost |
|-----------|----------|------|
| Mac Mini M2 (base) | iMessage relay, BlueBubbles server | ~$599 one-time |
| 24/7 operation | Always-on iMessage bridge | ~$5-10/month power |
| BlueBubbles API | iMessage integration for Charles | Free (open source) |

### Integration Capabilities
- **iMessage:** Native blue bubble conversations with John
- **HomeKit:** Smart home automation, device control
- **Shortcuts:** iOS automation integration
- **AirDrop:** File transfer to iPhone/iPad
- **Continuity:** Handoff between devices

### Revenue Trigger
- Trading card database monetizes
- ContractorPro hits revenue targets
- Mac Mini purchase approved

### Setup
1. Mac Mini arrives
2. Configure BlueBubbles server
3. Integrate with Hetzner VPS (API bridge)
4. Test iMessage → Charles → Response flow
5. Golden integration achieved

---

**Next Action:** Begin Phase 1 skill creation immediately after VPS migration complete.

**Long-term Vision:** Hetzner VPS + Mac Mini = complete ecosystem. Windows laptop for John's work, iPhone/iPad for mobility, Charles everywhere in between.
