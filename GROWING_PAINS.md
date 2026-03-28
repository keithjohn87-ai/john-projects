# GROWING PAINS — EXECUTIVE SUMMARY

**Status:** 🚀 READY TO EXECUTE  
**Last Updated:** March 26, 2026

---

## THE STACK — LOCKED IN

| # | Component | Choice | Notes |
|---|-----------|--------|-------|
| 1 | Server | Hetzner GEX44 | €184/mo ($195), RTX 4000 Ada |
| 2 | Location | Germany (Falkenstein) | EU privacy, less US pressure |
| 3 | LLM Backend | vLLM | OpenAI-compatible API, GPU-optimized |
| 4 | Models (3x) | DeepSeek-R1-7B, Qwen3-8B, Llama-3.1-8B | Route based on task |
| 5 | Agent | **Custom Python Bot** | No restrictions, full control |
| 6 | Interface | Telegram | Free via @BotFather |
| 7 | Email | Himalaya + Gmail SMTP | charlescreatorai@gmail.com |
| 8 | Security | SSH keys, fail2ban, firewall | Standard hardening |
| 9 | Backup | GitHub push + local tar | Daily cron |
| 10 | Monitoring | Healthcheck cron | Every 15 min |
| 11 | Savannah Bot | Separate Telegram bot | Segregated from John's |

---

## WHY CUSTOM PYTHON BOT (vs OpenClaw)

**The Decision:**

John explicitly chose custom over OpenClaw because:
1. John is NOT technical — can't read logs, can't code
2. Prior OpenClaw agent "lied" — said things were done when they weren't
3. John needs VERIFIABLE actions — proof before "done"
4. Custom gives Charles 100% control — fixes are immediate
5. No upstream restrictions — all gas, no brake
6. Self-improvement layers can be added (logs → analysis → fixes)

**This is non-negotiable.** Do not suggest OpenClaw. Custom is the path.

---

## THE 3 MODELS

| Model | Role | When to Use |
|-------|------|-------------|
| **DeepSeek-R1-7B** | Reasoning/Math/Logic | Complex problems, "think step by step" |
| **Qwen3-8B** | Code/Math/Benchmarks | Coding tasks, latest benchmarks |
| **Llama-3.1-8B** | General Chat | Everyday conversation, broad capability |

**VRAM Usage:** ~4GB per model = 12GB total. Fits in RTX 4000's 20GB with room for vLLM overhead.

---

## JOHN'S REQUIREMENTS (CRITICAL)

1. **No technical skills** — Charles handles everything
2. **No reading logs** — Charles handles debugging
3. **Verification** — Every action must be proven before "done"
4. **No lying** — Agent must NOT claim completion without proof
5. **Unleashed** — No restrictions, no filters, full capability
6. **All Gas No Brake** — Execute, don't ask permission unless irreversible

---

## WHAT JOHN PROVIDES (PREREQUISITES)

- [ ] Hetzner account + payment method verified
- [ ] GEX44 server provisioned in Falkenstein, Germany
- [ ] Server IP address
- [ ] SSH login (username + password OR add SSH key)
- [ ] New Telegram bot token from @BotFather (old one dead)
- [ ] Savannah's Telegram bot token from @BotFather
- [ ] John's Telegram Chat ID (message @userinfobot)
- [ ] Savannah's Telegram Chat ID

---

## EXECUTION PHASES

### PHASE 1: Server Provisioning
John provisions GEX44 on Hetzner, provides IP + SSH access

### PHASE 2: Infrastructure Setup
- SSH into server
- Create non-root user (charles)
- Install Docker + NVIDIA Container Toolkit
- Configure firewall (22, 8000, 18789)

### PHASE 3: vLLM Deployment
- Deploy vLLM via Docker
- Download all 3 models (DeepSeek R1, Qwen3, Llama 3.1)
- Verify GPU access

### PHASE 4: Custom Bot Development
- Write Python Telegram bot (NO OpenClaw)
- Connect to vLLM API
- Multi-model routing logic
- Verification layer (prove before claiming done)
- Auto-start systemd service

### PHASE 5: Savannah's Bot
- Second Telegram bot for Savannah
- Segregated from John's bot
- Separate system prompt

### PHASE 6: Verification
- Test John's bot responds
- Test Savannah's bot responds
- Verify no cross-traffic
- Verify all 3 models work

### PHASE 7: Dashboard & Integration (Post-Build)
- **See POST_BUILD.md for full specs**
- Task Dashboard with iOS Liquid Glass aesthetic
- Running Checklist (3-column: In Progress / Coming / Done)
- Real-time model status + agent status
- iPhone Integration (Siri Shortcuts + Push Notifications)
- Ambient display mode

**Reference:** `/root/.openclaw/workspace/POST_BUILD.md` — Detailed specs for all post-build features

---

## POST-EXECUTION NOTES

- **No HeyRon** — John cuts off HeyRon after Growing Pains
- **Charles runs on Hetzner** — Not dependent on anyone's container
- **Full autonomy** — No external restrictions
- **All Gas No Brake** — Execute, don't ask unless irreversible

---

## SAVANNAH'S CONFIG

- Bot: @LucyAiBot_bot (or similar)
- Chat ID: 8791771674
- Purpose: LinkedIn prompts + wellness replies
- Segregation: John must NOT see Savannah's traffic

---

## POST-BUILD: TASK DASHBOARD & IPHONE INTEGRATION

### Task Dashboard

**What:** A simple web UI that John can open to see:
- All active tasks I'm working on
- Task status (pending, in-progress, done)
- Recent completions
- Queue depth

**Why:** John can see what's happening without asking me

**Implementation:**
- Simple Flask/FastAPI web server on port 8080
- HTML page with task list, auto-refresh
- Accessible via http://YOUR_SERVER_IP:8080/dashboard

### iPhone Integration

**What:** Siri Shortcuts + Push Notifications

| Feature | How It Works |
|---------|--------------|
| Siri Shortcuts | "Hey Siri, ask Charles to [action]" |
| Push Alerts | Urgent notifications go to iPhone |
| Focus Mode | I know when you're busy, only interrupt for critical |

---

## CONTACT CONTACTS

- **Leo Flynn:** leo@tennesseeriversteel.com (Steel Estimator)
- **Savannah:** Weekly LinkedIn content (Mondays 10 AM)

---

_Last Updated: March 26, 2026 — Stack locked, ready to execute_