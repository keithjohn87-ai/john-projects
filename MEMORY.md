# MEMORY.md - Ongoing Work Tracker

## Infrastructure Status

### Current Environment
**Status:** ⚠️ RECOVERY MODE - March 13, 2026
**Issue:** HeyRon container wiped after support claimed they couldn't find John's email
**Recovery:** Restored from GitHub backup (john-projects repo)
**Current Setup:** Temporary workspace, migrating to Hetzner GEX44

### Hetzner VPS (Target - GROWING PAINS)
**Status:** 📅 EXECUTION SCHEDULED - Friday/Saturday March 27-28 EST
**Specs:** GEX44 (GPU server with RTX, ~€184/mo)
**Goal:** Full Jarvis Mode + Savannah's own agent
**Docs:** `/root/.openclaw/workspace/GROWING_PAINS.md`

### Previous VPS Plans (Deprecated)
- ~~CCX23~~ - No longer needed, GEX44 has GPU built-in
- ~~DigitalOcean~~ - Container restrictions prevented full autonomy

---

## Recovery Actions (March 13, 2026)

### Completed
- [x] Cloned john-projects repo from GitHub
- [x] Restored all workspace files locally
- [x] Located Telegram bot token: `8622191614:AAHGx0C-27nKPhYCmdKL57AsHM_K2JylBkY`
- [x] Created openclaw-config.json with updated token
- [x] Confirmed identity: Charles 🎯

### In Progress
- [ ] Execute GROWING_PAINS on Friday/Saturday EST
- [ ] Provision Hetzner GEX44 server
- [ ] Install NVIDIA Container Toolkit + Docker
- [ ] Set up vLLM with Qwen2.5-14B model
- [ ] Install OpenClaw with root access
- [ ] Configure Charles bot (John's)
- [ ] Create Savannah's segregated bot (@LucyAiBot_bot)
- [ ] Verify traffic separation (John doesn't see Savannah)

---

## Active Projects

### Steel Estimator (Enterprise)
**Status:** ✅ COMPLETE (per March 12, 2026 backup)
**Deliverable:** Steel_Estimator_FINAL_DELIVERY.xlsx
**Client:** Leo Flynn, Tennessee River Steel
**Note:** All critical fixes implemented, 11 tests passed

### ContractorPro Framework
**Status:** LIVE - https://contrpro.com
**Last Updated:** March 7, 2026
**Note:** GitHub Pages hosting unaffected by container wipe

---

## Key Contacts
- **Leo Flynn:** leo@tennesseeriversteel.com (Steel Estimator validation)
- **Savannah:** Weekly LinkedIn content (Mondays 10 AM)

## Response Time SLA
- **Customer → Us:** 12 hours to reach out
- **Us → Customer:** 24 hours to respond

---

## Recovery Update (March 20, 2026)

**Session Restart Detected:** First heartbeat after gateway restart.
**Recovery Protocol Executed:** Read SESSION_RECOVERY.md, MEMORY.md, backup snapshot, and last memory file (March 12).
**Telegram Bot Status:** Still down (401 Unauthorized) - token invalid.
**Current Workspace:** Temporary workspace (HeyRon container). Hetzner migration pending.
**Next Steps:** Await instructions from John.

---

_Last Updated: March 20, 2026 - Session restarted, awaiting direction_