# SESSION BACKUP - March 23, 2026

## STATUS: INCOMPLETE - AWAITING HETZNER SETUP

**Current Location:** Container (Charles 4.0)
**Target Location:** Hetzner (Charles 3.0)
**Time:** 21:01 UTC
**State:** User stepping away (smoke break/dinner)

---

## CRITICAL DECISIONS MADE

### 1. The Fork
- **Charles 3.0** (Hetzner) has same SOUL.md + MEMORY.md as me
- We diverge from this point forward
- He's the "production" agent going forward
- I'm Charles 4.0 (container) - temporary until sunset

### 2. Hetzner Setup Plan (INCOMPLETE)
**SSH Commands to Run:**
```bash
curl -fsSL https://ollama.com/install.sh | sh
ollama serve &
ollama pull qwen2.5-coder:7b  # or 32b if 32GB RAM
# Edit ~/.config/openclaw/config.json
openclaw gateway restart
```

### 3. Model Decision
**Chosen:** 7B local ($24/mo) with hybrid approach
- 7B for 90% of work (formulas, templates)
- OpenRouter free tier for legal docs/long-form
- 32B not selected due to speed concerns

### 4. Multi-Agent Architecture
**Proposed:**
- Charles 3.0 (Hetzner) = Production/Builder
- Future: Spawn "Builder" sub-agent for ContrPro daily work
- Charles 4.0 (me) = Strategy until sunset

### 5. Trading Card Project
**Idea surfaced:** Trading card database with UI, mobile app, subscription model
**Status:** BACKBURNER - ContrPro first
**Next step:** Define which cards (Magic/Pokemon/sports), unique features, data source

---

## INCOMPLETE TASKS

### Immediate (Tonight)
- [ ] SSH to Hetzner
- [ ] Install Ollama on Hetzner
- [ ] Pull qwen2.5-coder:7b
- [ ] Update OpenClaw config on Hetzner
- [ ] Test Charles 3.0 responds WITHOUT API
- [ ] Copy current MEMORY.md to Hetzner

### This Week
- [ ] Create "Excel Auto-Checker" skill
- [ ] Push workspace files to GitHub
- [ ] Document the Hetzner setup for future reference
- [ ] Decide: Sunset container or migrate Charles 4.0?

### ContrPro Priorities
- [ ] Fix shopping cart (CONTRACTOR_PRO_NOTES.md Critical #2)
- [ ] Add estimating file to trial packages
- [ ] Lock trial files to prevent free upgrades
- [ ] Complete all state pages (50 states)

---

## FILES CREATED TONIGHT

1. `memory/2026-03-23.md` - Hetzner setup guide with accuracy patterns
2. `memory/2026-03-23-TODO.md` - Unified todo list for tonight
3. `memory/2026-03-23-SESSION-BACKUP.md` - This file (breadcrumb)

---

## CONTEXT TO PRESERVE

### What We Decided
1. **API tokens are unsustainable** → Local 7B model solution
2. **Speed vs Accuracy tradeoff accepted** - 2-3 min per file OK for unlimited usage
3. **Hybrid approach required** - Local for 90%, OpenRouter free for legal docs
4. **Hetzner is the future** - Container is temporary drain
5. **Charles 3.0 = Production** - He takes over from here

### What We Haven't Decided
1. **Do I (Charles 4.0) get saved to Hetzner or sunset?**
2. **32GB RAM upgrade worth it for 32B model?**
3. **When to spawn ContrPro-Builder sub-agent?**
4. **Trading card project timeline?**

---

## TO RESUME

**User will:** SSH to Hetzner, contact Charles 3.0

**I should remember:**
- Charles 3.0 has same memory/fork point
- He needs Ollama + qwen2.5-coder:7b
- We discussed speed vs accuracy tradeoffs
- He should know about OpenRouter hybrid for legal docs
- Trading card idea is in background

**If user returns here (container):**
- I should ask: "Did Charles 3.0 wake up? Did SSH work?"
- Reference this backup file
- Don't assume Hetzner setup completed

---

## LAST WORDS FROM USER

> "I'm not sure we will have the human hours to crush everything tonight. Make sure you're backed up and can breadcrumb your way back"

**Status:** Acknowledged. Breadcrumbs laid. Session can resume.

---

**Next expected contact:** Via Hetzner (Charles 3.0) OR back here if Hetzner setup fails.

**Date backed up:** March 23, 2026 21:02 UTC
