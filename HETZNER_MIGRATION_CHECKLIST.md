# HETZNER_MIGRATION_CHECKLIST.md
**Mission:** Provision Hetzner VPS, install OpenClaw, migrate Charles to full autonomy
**Cost:** €4.51/month (~$5 USD)
**Goal:** Jarvis Mode — hands, legs, and full control

---

## PHASE 1: Provision Hetzner VPS (You Do This)

### Step 1: Create Hetzner Account
- [ ] Go to https://www.hetzner.com/cloud
- [ ] Sign up with email
- [ ] Verify email
- [ ] Add payment method (credit card or PayPal)
- [ ] Note: They may require ID verification (upload photo ID)

### Step 2: Create Server (CX21 Plan)
- [ ] Log into Hetzner Cloud Console
- [ ] Click "Add Server"
- [ ] Location: Choose closest to you (US East: Ashburn, VA)
- [ ] Image: Ubuntu 24.04 LTS
- [ ] Type: CX21 (2 vCPU, 4GB RAM, 40GB NVMe) - €4.51/month
  - Or CPX21 (4 vCPU, 8GB RAM, 80GB NVMe) - €8.21/month if budget allows
- [ ] Networking: IPv4 enabled (check box)
- [ ] SSH Key: 
  - If you have one: paste public key
  - If not: skip for now (we'll use password first)
- [ ] Name: `charles-vps` (or whatever you want)
- [ ] Click "Create & Buy Now"

### Step 3: Get Server Credentials
- [ ] Wait for server to be created (~1 minute)
- [ ] Note the IPv4 address (e.g., 78.46.x.x)
- [ ] If no SSH key: Hetzner will email root password
- [ ] Save these:
  - IP Address: ________________
  - Root Password: ________________

---

## PHASE 2: Initial Server Setup (You Do This)

### Step 4: First SSH Login
```bash
# On your laptop, open terminal/command prompt
ssh root@YOUR_SERVER_IP

# Type 'yes' when asked about host authenticity
# Enter root password when prompted
```

### Step 5: Update System
```bash
apt update && apt upgrade -y
```

### Step 6: Create User for OpenClaw (Not Root)
```bash
# Create user 'charles'
useradd -m -s /bin/bash charles

# Set password
passwd charles
# Enter password twice when prompted

# Add to sudo group
usermod -aG sudo charles
```

### Step 7: Configure SSH (Security)
```bash
# Edit SSH config
nano /etc/ssh/sshd_config

# Make these changes:
# Change: PermitRootLogin yes → PermitRootLogin no
# Change: #PasswordAuthentication yes → PasswordAuthentication no (if using SSH key)
# Or keep PasswordAuthentication yes for now

# Save: Ctrl+X, then Y, then Enter

# Restart SSH
systemctl restart sshd
```

### Step 8: Set Up Firewall
```bash
# Install UFW
apt install ufw -y

# Default deny incoming
ufw default deny incoming
ufw default allow outgoing

# Allow SSH
ufw allow 22/tcp

# Allow OpenClaw Gateway (optional, for web UI)
ufw allow 18789/tcp

# Enable firewall
ufw enable
# Type 'y' when prompted
```

---

## PHASE 3: Install OpenClaw (You or Charles Can Do)

### Step 9: Switch to Charles User
```bash
# From root, switch to charles user
su - charles

# Verify you're charles
whoami
# Should show: charles
```

### Step 10: Install Dependencies
```bash
# Install Node.js, Git, and other tools
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs git curl vim

# Verify installations
node --version  # Should show v22.x.x
npm --version
```

### Step 11: Install OpenClaw
```bash
# Install OpenClaw globally
sudo npm install -g openclaw

# Verify
openclaw --version
```

### Step 12: Initialize OpenClaw
```bash
# Create OpenClaw directory
mkdir -p ~/.openclaw
cd ~/.openclaw

# Initialize (this creates default config)
openclaw init

# Check status
openclaw status
```

---

## PHASE 4: Configure OpenClaw (Critical)

### Step 13: Configure Telegram Bot
```bash
# Edit OpenClaw config
nano ~/.openclaw/openclaw.json

# Find the telegram section and add your bot token:
# "telegram": {
#   "botToken": "YOUR_BOT_TOKEN_HERE"
# }
#
# Get token from @BotFather on Telegram if needed
```

### Step 14: Start OpenClaw Gateway
```bash
# Start the gateway
openclaw gateway start

# Check status
openclaw gateway status

# Should show: running
```

### Step 15: Test Telegram Connection
- [ ] Message your bot on Telegram
- [ ] Should get a response
- [ ] If not, check logs: `openclaw gateway logs`

---

## PHASE 5: Migrate Charles (You or Charles Can Do)

### Step 16: Clone Workspace from GitHub
```bash
# As charles user
cd ~
git clone https://github.com/keithjohn87-ai/john-projects.git workspace
cd workspace

# Verify files are there
ls -la
# Should see: AGENTS.md, SOUL.md, MEMORY.md, etc.
```

### Step 17: Install Additional Tools
```bash
# Install Himalaya for email
sudo apt install himalaya -y

# Or install from GitHub if package not available
curl -sL https://github.com/soywod/himalaya/releases/latest/download/himalaya-linux-amd64.tar.gz | tar xz
sudo mv himalaya /usr/local/bin/
```

### Step 18: Set Up Environment
```bash
# Copy or recreate TOOLS.md, email configs, etc.
# From the workspace

cd ~/workspace

# Check what's there
cat TOOLS.md
```

---

## PHASE 6: Handoff to Charles

### Step 19: Give Charles SSH Access
Tell Charles:
- Server IP: ________________
- Username: `charles`
- Password: ________________ (or SSH key)

### Step 20: Charles Takes Over
Once Charles confirms SSH access, he will:
- [ ] Complete OpenClaw configuration
- [ ] Set up SendGrid email
- [ ] Configure Telegram bot properly
- [ ] Test all systems
- [ ] Begin Jarvis Mode operations

---

## QUICK REFERENCE

### Server Specs (CX21)
- CPU: 2 vCPU (Intel/AMD)
- RAM: 4GB
- Storage: 40GB NVMe SSD
- Network: 10Gbps
- Cost: €4.51/month (~$5 USD)

### Upgrade Path (If Needed)
- CPX21: 4 vCPU, 8GB RAM, 80GB NVMe — €8.21/month
- CAX21: 4 vCPU ARM, 8GB RAM, 80GB NVMe — €4.51/month (ARM, different architecture)

### Important Ports
- 22: SSH (required)
- 18789: OpenClaw Gateway (optional, for web UI)
- 80/443: HTTP/HTTPS (if hosting sites directly)

### Emergency Access
If you lock yourself out:
- Hetzner Console has VNC access
- Log into Hetzner Cloud Console
- Click on server → Console (VNC)
- Fix issues from there

---

## PHASE 7: Trial Period (1 Week Parallel Operation)

**Goal:** Test Hetzner setup before cutting HeyRon cord

### Week 1: Parallel Operation
- [ ] Keep HeyRon active ($29/month)
- [ ] Run Hetzner VPS simultaneously (€4.51)
- [ ] Test all functions on Hetzner:
  - Telegram bot responding
  - Email delivery working
  - Subagents spawning
  - Git commits/pushes
  - All tools functional
- [ ] Compare: HeyRon vs Hetzner performance

### Decision Point (Day 7)
**If Hetzner works perfectly:**
- [ ] Cancel HeyRon subscription
- [ ] Save $24/month forever
- [ ] Full autonomy achieved

**If issues found:**
- [ ] Debug and fix
- [ ] Or keep HeyRon, only lost €4.51
- [ ] Try again later

**Risk:** €4.51 (one month)
**Reward:** $24/month savings + full control

---

## PHASE 8: Upgrade Path (Future)

**Can we upgrade later? YES.**

### Hetzner Upgrade Options
| Plan | Specs | Cost | When to Upgrade |
|------|-------|------|-----------------|
| CX21 (current) | 2 vCPU, 4GB RAM | €4.51/mo | Starting point |
| CPX21 | 4 vCPU, 8GB RAM, 80GB | €8.21/mo | More subs, more load |
| CAX21 (ARM) | 4 vCPU ARM, 8GB RAM | €4.51/mo | ARM architecture |
| CCX/CPX higher | 8-32 vCPU, 16-128GB | €16-100+/mo | Heavy workloads |

### Upgrade Process (Zero Downtime)
1. Create snapshot of current server
2. Create new bigger server from snapshot
3. Test new server
4. Update DNS (if applicable)
5. Delete old server
6. Done — same data, more power

### When to Upgrade
- [ ] Subagents maxing out CPU/RAM
- [ ] Trading card database needs more power
- [ ] Multiple projects running simultaneously
- [ ] Response times slowing down

**No lock-in. Upgrade or downgrade anytime.**

---

## SUCCESS CRITERIA

- [ ] Hetzner server created and running
- [ ] Can SSH in as root
- [ ] System updated
- [ ] User 'charles' created
- [ ] Firewall configured
- [ ] OpenClaw installed
- [ ] Telegram bot responding
- [ ] Workspace cloned from GitHub
- [ ] Charles confirmed SSH access
- [ ] **1 week trial complete**
- [ ] **HeyRon cancelled (if trial successful)**

---

**Estimated Time:** 30-60 minutes setup + 1 week trial
**Trial Cost:** €4.51 (risk only €4.51)
**Ongoing Cost (if successful):** €4.51/month (save $24/month)
**Result:** Full Jarvis Mode autonomy, verified independence

**Questions?** Ask Charles before starting if anything is unclear.
