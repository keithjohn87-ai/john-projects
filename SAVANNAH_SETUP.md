# Savannah Communication & LinkedIn Campaign Setup

**Last Updated:** March 8, 2026 1:16 PM UTC  
**Campaign Start:** Monday, March 10, 2026  
**Status:** ✅ READY TO LAUNCH

---

## Communication Channels

### 1. Telegram (Primary Direct Messaging)
- **Savannah's Telegram ID:** 8791771674
- **Bot:** @CharlesBot_AIBot
- **Status:** ✅ ACTIVE (token updated and verified)
- **Tested:** March 8, 2026 - Messages received successfully
- **Use for:** Quick updates, questions, urgent items

### 2. Email (Weekly Content Delivery)
- **Savannah's Email:** Savannahcosper@gmail.com
- **From:** CharlesCreatorAI@gmail.com
- **Schedule:** Every Monday at 10:00 AM EST
- **Status:** ✅ CONFIGURED (automated via cron)
- **Cron Job ID:** 779a123a-e559-4e56-8075-37ce33d1f3b4

### 3. LinkedIn (Campaign Platform)
- **Target:** ContractorPro company page (to be created)
- **Content Source:** /root/.openclaw/workspace/content/linkedin-week-1.md
- **Posting Schedule:** Monday, Wednesday, Friday
- **Content Mix:** 60% Educational | 30% State-Specific | 10% Soft Product

---

## Automated Systems

### Weekly Content Email (Mondays 10 AM EST)
**What Savannah receives:**
- 5 LinkedIn post ideas for the week
- 2 article suggestions for sharing
- Engagement tips and response templates
- Trending topics in construction/SBA funding
- Any urgent updates or changes

**How it works:**
1. Cron triggers every Monday at 10 AM EST
2. Agent generates fresh content based on current trends
3. Email sent from CharlesCreatorAI@gmail.com
4. Delivery mode: none (runs silently, no announcement)

**Next scheduled run:** March 10, 2026 10:00 AM EST

---

## LinkedIn Campaign - Week 1 Content (Ready)

### Monday Post: Lien Law Deadlines
**Topic:** The Hidden Cost of Missing Lien Deadlines  
**Focus:** Texas SB 929 (weekend/holiday deadline extension)  
**Tone:** Educational, cautionary, helpful  
**Hashtags:** #Construction #ContractorLife #LienLaw #TexasConstruction #GetPaid

### Wednesday Post: California Workers' Comp
**Topic:** California Contractors: New Workers' Comp Requirements  
**Focus:** SB 216 - 2026 license renewal changes  
**Tone:** Informative, actionable, state-specific  
**Hashtags:** #CaliforniaContractors #CSLB #WorkersComp #ContractorLicense #ConstructionLaw

### Friday Post: Cash Flow Crisis
**Topic:** Why Cash Flow Kills More Contractors Than Bad Work  
**Focus:** Payment delays, protection strategies  
**Tone:** Discussion-starting, empathetic, solution-oriented  
**Hashtags:** #ContractorLife #CashFlow #ConstructionBusiness #GetPaid #Subcontractor

### Response Templates Included:
1. "How do I file a lien in [state]?"
2. "What software do you recommend?"
3. "Do you offer consulting?"
4. "This happened to me! [Story]"
5. "Can you do a post about [topic]?"

---

## Content Approval Process

### Current Workflow:
1. **Sunday Evening:** Content prepared for the week
2. **Monday Morning:** Weekly email sent to Savannah
3. **Savannah Reviews:** Content in email
4. **Savannah Posts:** Directly to LinkedIn (manual posting)
5. **Engagement:** Savannah responds using provided templates

### Future Enhancement (Optional):
- Direct LinkedIn API integration for automated posting
- Requires LinkedIn API access and OAuth setup
- Would enable scheduled posts without manual copy/paste

---

## Backup & Redundancy

### If Email Fails:
- Telegram backup: Send content via Telegram message
- Content stored in: /root/.openclaw/workspace/content/
- GitHub backup: All content committed to repo

### If Telegram Fails:
- Email remains primary for weekly content
- Webchat interface available at OpenClaw dashboard
- Phone/SMS as tertiary (if needed)

### Content Backup:
- All LinkedIn content saved in workspace
- Git version control tracks all changes
- Gist backup every 2 hours includes content files

---

## Security & Privacy

### Email Security:
- CharlesCreatorAI@gmail.com uses app password (not main password)
- 2FA enabled on Gmail account
- Emails are plain text content only (no attachments with sensitive data)

### Telegram Security:
- Bot token rotated March 8, 2026 (old token revoked)
- Savannah's Telegram ID whitelisted
- No group chats configured (direct messages only)

### Content Security:
- No client data in LinkedIn posts
- All content is educational/marketing (no proprietary info)
- Response templates are generic and safe

---

## Monitoring & Alerts

### Automated Monitoring:
- **Telegram Health Check:** Every 5 minutes
- **Email Delivery:** Tracked in OpenClaw logs
- **Cron Job Status:** Visible in OpenClaw dashboard

### Manual Checkpoints:
- **Sunday Evening:** Verify content ready for Monday
- **Monday 10:15 AM:** Confirm email sent
- **Wednesday/Friday:** Spot-check LinkedIn engagement

### Alert Recipients:
- Primary: keithjohn87@gmail.com (John)
- Secondary: CharlesCreatorAI@gmail.com

---

## Quick Reference for Savannah

### To Get Help:
1. **Telegram:** Message @CharlesBot_AIBot (fastest)
2. **Email:** Reply to weekly content email
3. **Emergency:** Contact John directly

### To Request Content Changes:
- Reply to any weekly email with "New topic idea: [topic]"
- Or Telegram: "Can you write about [topic] next week?"

### To Pause Campaign:
- Telegram: "Pause LinkedIn campaign"
- Email: Reply with "PAUSE" in subject

### To Resume Campaign:
- Telegram: "Resume LinkedIn campaign"
- Email: Reply with "RESUME" in subject

---

## Files & Resources

### Content Files:
- `/content/linkedin-week-1.md` - Current week's content
- `/MARKETING_PATH.md` - Full marketing strategy
- `/BETA_OUTREACH.md` - Beta tester outreach templates
- `/BIG_LEAGUE_OUTREACH.md` - Big contractor outreach

### Configuration Files:
- `/root/.openclaw/cron/jobs.json` - Cron schedules
- `/root/.openclaw/openclaw.json` - Channel configuration

### Documentation:
- `MEMORY.md` - Active project tracker
- `INFRASTRUCTURE.md` - System setup and security
- `AGENTS.md` - Workspace guidelines

---

## Success Metrics (To Track)

### LinkedIn Metrics (Weekly):
- [ ] Posts published (target: 3/week)
- [ ] Engagement rate (target: >3%)
- [ ] Follower growth (target: +20/week)
- [ ] Comments/responses (target: 5+ per post)
- [ ] Profile views (track weekly)

### Content Quality (Monthly):
- [ ] Content delivered on time (target: 100%)
- [ ] Savannah satisfaction (informal check)
- [ ] Topic relevance (based on engagement)
- [ ] Response template usage

---

## Next Steps Before Monday Launch

### For John:
- [ ] Review Week 1 content in `/content/linkedin-week-1.md`
- [ ] Confirm Savannah has access to ContractorPro LinkedIn page
- [ ] Test post one piece of content manually (optional)

### For Savannah:
- [ ] Confirm receipt of Monday 10 AM email
- [ ] Review response templates
- [ ] Prepare LinkedIn company page (if not done)
- [ ] Set calendar reminder for Mon/Wed/Fri posting

### For Charles (Me):
- [x] Verify Telegram bot working
- [x] Confirm email cron job configured
- [x] Prepare Week 1 content
- [x] Document all processes
- [ ] Monitor Monday 10 AM email delivery

---

**Questions or Issues?** Contact via Telegram or email.

**Last Backup:** March 8, 2026 1:08 AM UTC  
**Gist Backup:** https://gist.github.com/keithjohn87-ai/a5539d9a33a2d51f9401d97fb4c2617e
