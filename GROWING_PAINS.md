# GROWING PAINS — EXECUTIVE SUMMARY

**Total Setup Time:** ~5-6 hours (one-time)  
**Monthly Cost:** $195 (ALL INCLUSIVE)
**Status:** ✅ READY TO EXECUTE

---

## PREREQUISITES (Before You Start)

- [ ] Hetzner account with payment method verified
- [ ] Telegram account (for BotFather)
- [ ] Domain name (optional, for SSL/HTTPS)
- [ ] GitHub account (for workspace backup)

---

## THE STACK

| Component | What It Is |
|-----------|------------|
| **Server** | Hetzner GEX44 ($195/mo) |
| **LLM Backend** | vLLM (GPU-optimized) |
| **Model** | Qwen2.5-14B |
| **Agent** | OpenClaw |
| **Interface** | Telegram |

---

## COST BREAKDOWN

| Item | Monthly Cost |
|------|--------------|
| Hetzner GEX44 (GPU) | ~€184 ($195) |
| **Total** | **$195/month** |

Note: GEX44 includes dedicated RTX GPU. If you don't need GPU locally, you could skip vLLM and use OpenAI API instead (pay-per-use), reducing cost to ~$5/mo for a basic VPS.

---

## STEP-BY-STEP

### PHASE 1: Provision Server (~30 min)

1. Log into https://www.hetzner.com
2. Go to **Dedicated Servers** → **Matrix GPU**
3. Select **GEX44** (~€184/mo)
4. Deploy in **Ashburn, VA** (closest to US East Coast) or Falkenstein
5. Get the IP address

**⚠️ IMPORTANT: Save the IP address immediately** — you'll need it for all subsequent steps.

---

### PHASE 2: SSH & Docker (~30 min)

SSH in:
```bash
ssh root@YOUR_SERVER_IP
```

**⚠️ CRITICAL: Create non-root user FIRST (don't run everything as root)**

```bash
# Create user for OpenClaw
useradd -m -s /bin/bash charles
passwd charles  # Set password
usermod -aG sudo charles
mkdir -p /home/charles
chown -R charles:charles /home/charles
```

**Login as charles for rest of setup:**
```bash
su - charles
cd ~
```

**⚠️ CRITICAL: Install NVIDIA Container Toolkit first (for GPU access)**

```bash
# Add NVIDIA repository
distribution=$(. /etc/os-release;echo $ID$VERSION_ID)
curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey | gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg
curl -fsSL https://nvidia.github.io/libnvidia-container/$distribution/nvidia-container-toolkit.list | \
  sed 's|deb https|deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https|' | \
  tee /etc/apt/sources.list.d/nvidia-container-toolkit.list

apt update
apt install -y nvidia-container-toolkit
nvidia-ctk runtime configure --runtime=docker
systemctl restart docker
```

Verify NVIDIA Docker works:
```bash
docker run --rm --gpus all nvidia/cuda:12.1.0-base-ubuntu22.04 nvidia-smi
```

Install Docker (if not already installed):
```bash
apt update && apt install -y ca-certificates curl gnupg lsb-release
mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list
apt update && apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
systemctl enable --now docker
```

**Set up firewall (recommended):**
```bash
apt install -y ufw
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp   # SSH
ufw allow 8000/tcp # vLLM API
ufw allow 18789/tcp # OpenClaw
ufw enable
```

Verify GPU:
```bash
nvidia-smi
```

---

### PHASE 3: vLLM + Model (~1 hour)

**⚠️ NOTE: First run downloads ~8GB model. Wait 10-20 min.**

Create docker-compose.yml:
```bash
mkdir -p /opt/vllm && cd /opt/vllm
cat > docker-compose.yml << 'EOF'
version: "3.9"

services:
  vllm:
    image: vllm/vllm-openai:latest
    container_name: vllm
    restart: unless-stopped
    ports:
      - "8000:8000"
    environment:
      - GPU_MEMORY_UTILIZATION=0.90
    volumes:
      - vllm-data:/root/.cache/vllm
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]
    command: >
      --model Qwen/Qwen2.5-14B-Instruct
      --tensor-parallel-size 1
      --gpu-memory-utilization 0.90
      --max-model-len 8192

volumes:
  vllm-data:
EOF
```

**Alternative (lighter model, faster start):**
```bash
# Use Qwen2.5-7B if 14B too slow
--model Qwen/Qwen2.5-7B-Instruct
```

Start vLLM (will download model ~8GB on first run):
```bash
cd /opt/vllm && docker compose up -d
```

**Wait 10-20 minutes** for model to download and load.

Test:
```bash
curl http://localhost:8000/v1/models
```

---

### PHASE 4: OpenClaw (~1 hour)

Install OpenClaw:
```bash
mkdir -p ~/bin
curl -L https://github.com/openclaw/openclaw/releases/latest/download/openclaw-linux-amd64 -o ~/bin/openclaw
chmod +x ~/bin/openclaw
echo 'export PATH="$PATH:~/bin"' >> ~/.bashrc
source ~/.bashrc
openclaw --version
```

Create config:
```bash
mkdir -p ~/.config/openclaw
cat > ~/.config/openclaw/config.json << 'EOF'
{
  "llm": {
    "provider": "openai",
    "model": "qwen/Qwen2.5-14B-Instruct-GGUF",
    "baseURL": "http://localhost:8000/v1",
    "apiKey": "dummy"
  },
  "telegram": {
    "enabled": true,
    "botToken": "YOUR_TELEGRAM_TOKEN_HERE",
    "dmPolicy": "open"
  }
}
```

Get Telegram token:
1. Message @BotFather on Telegram
2. `/newbot` → follow prompts
3. Copy the token → replace `YOUR_TELEGRAM_TOKEN_HERE`

Start OpenClaw:
```bash
openclaw gateway start
```

Test Telegram — message your bot.

---

### PHASE 5: Nginx / Web Hosting (~1 hour)

Install:
```bash
apt install -y nginx certbot python3-certbot-nginx
```

Create site:
```bash
mkdir -p /var/www/contrpro
cat > /etc/nginx/sites-available/contrpro << 'EOF'
server {
    listen 80;
    server_name YOUR_DOMAIN.com www.YOUR_DOMAIN.com;
    root /var/www/contrpro;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
EOF
ln -s /etc/nginx/sites-available/contrpro /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

Get SSL (optional):
```bash
certbot --nginx -d YOUR_DOMAIN.com -d www.YOUR_DOMAIN.com
```

---

### PHASE 6: Verify Everything (~30 min)

```bash
# Check vLLM
curl http://localhost:8000/v1/models

# Check OpenClaw
openclaw status

# Check Telegram
# Message your bot → should respond
```

---

### PHASE 7: Auto-Start on Boot

Make sure services restart after server reboot:

```bash
# Enable Docker service
sudo systemctl enable docker

# Enable docker-compose services (vLLM)
cd /opt/vllm
docker compose up -d
docker compose ls

# For OpenClaw - create systemd service (recommended)
sudo cat > /etc/systemd/system/openclaw.service << 'EOF'
[Unit]
Description=OpenClaw Gateway
After=network.target

[Service]
Type=simple
User=charles
WorkingDirectory=/home/charles
ExecStart=/home/charles/bin/openclaw gateway start
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable openclaw
sudo systemctl start openclaw
```

**Verify:**
```bash
sudo systemctl status openclaw
```

---

### PHASE 8: Clone Workspace from GitHub

```bash
# As your user (not root)
cd ~
git clone https://github.com/keithjohn87-ai/john-projects.git workspace
cd workspace

# Verify files
ls -la
```

---

### PHASE 9: Email Setup (Optional)

Install Himalaya for email:
```bash
# Download latest release
curl -sL https://github.com/soywod/himalaya/releases/latest/download/himalaya-linux-amd64.tar.gz | tar xz
sudo mv himalaya /usr/local/bin/

# Configure
mkdir -p ~/.config/himalaya
nano ~/.config/himalaya/config.toml
```

---

### PHASE 10: Security Hardening (Recommended)

```bash
# Install fail2ban
apt install -y fail2ban

# Create SSH key (on your local machine)
ssh-keygen -t ed25519 -C "your@email.com"

# Add public key to server
mkdir -p ~/.ssh
chmod 700 ~/.ssh
echo "YOUR_PUBLIC_KEY" > ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys

# Disable root SSH and password login
nano /etc/ssh/sshd_config
# PermitRootLogin no
# PasswordAuthentication no
systemctl restart sshd
```

---

### PHASE 11: Backup Strategy

```bash
# Create backup script
mkdir -p ~/backups
cat > ~/backups/backup.sh << 'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
tar -czf ~/backups/openclaw_$DATE.tar.gz \
  ~/.config/openclaw \
  ~/workspace \
  ~/.config/himalaya 2>/dev/null
# Keep only last 7 backups
ls -t ~/backups/openclaw_*.tar.gz | tail -n +8 | xargs -r rm
EOF
chmod +x ~/backups/backup.sh

# Add to cron (daily at 3am)
crontab -e
# 0 3 * * * ~/backups/backup.sh
```

---

### PHASE 12: Health Monitoring

```bash
cat > ~/healthcheck.sh << 'EOF'
#!/bin/bash
LOG=~/health.log

# Check vLLM
if curl -s http://localhost:8000/v1/models > /dev/null 2>&1; then
  echo "$(date): ✓ vLLM OK" >> $LOG
else
  echo "$(date): ✗ vLLM DOWN" >> $LOG
fi

# Check OpenClaw
if openclaw gateway status 2>/dev/null | grep -q "running"; then
  echo "$(date): ✓ OpenClaw OK" >> $LOG
else
  echo "$(date): ✗ OpenClaw DOWN" >> $LOG
fi
EOF
chmod +x ~/healthcheck.sh

# Check every 15 minutes
crontab -e
# */15 * * * * ~/healthcheck.sh
```

---

### UPDATE PROCEDURE

**Update OpenClaw:**
```bash
sudo npm install -g openclaw
openclaw --version
```

**Update vLLM:**
```bash
cd /opt/vllm
docker compose down
docker pull vllm/vllm-openai:latest
docker compose up -d
```

**Update System:**
```bash
apt update && apt upgrade -y
```

---

### TROUBLESHOOTING

**vLLM Won't Start / GPU Not Available:**
```bash
nvidia-smi
docker run --rm --gpus all nvidia/cuda:12.1.0-base-ubuntu22.04 nvidia-smi
systemctl restart docker
```

**Telegram Bot Not Responding:**
```bash
openclaw gateway logs
curl "https://api.telegram.org/botYOUR_TOKEN/getMe"
```

**No Response from LLM:**
```bash
curl http://localhost:8000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{"model": "qwen/Qwen2.5-14B-Instruct-GGUF", "messages": [{"role": "user", "content": "hi"}]}'
```
Ensure baseURL is `http://localhost:8000/v1` (not https)

---

## TIME SUMMARY

| Phase | Time |
|-------|------|
| 1. Provision Server | 30 min |
| 2. SSH + Docker + GPU | 30 min |
| 3. vLLM + Model | 1 hour |
| 4. OpenClaw | 1 hour |
| 5. Nginx (optional) | 1 hour |
| 6. Verify | 30 min |
| 7-12. Extras (backup, security, etc) | 30 min |
| **TOTAL** | **~5-6 hours** |

---

## FULL CHECKLIST

- [ ] Prereqs: Hetzner account, Telegram, domain (optional)
- [ ] Server provisioned (GEX44)
- [ ] SSH access working
- [ ] NVIDIA Container Toolkit installed
- [ ] Docker + nvidia-docker working
- [ ] Firewall configured (ports 22, 8000, 18789)
- [ ] vLLM running + model loaded
- [ ] OpenClaw installed and running
- [ ] Telegram bot responding
- [ ] Workspace cloned from GitHub
- [ ] Email configured (optional)
- [ ] SSH key + fail2ban (security)
- [ ] Backups scheduled
- [ ] Health monitoring set up
- [ ] Auto-start on reboot configured
- [ ] Savannah bot created + segregated
- [ ] (Optional) Nginx + SSL

---

## COPY-PASTE COMMANDS

### Full Docker Install
```bash
apt update && apt install -y ca-certificates curl gnupg lsb-release
mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list
apt update && apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
systemctl enable --now docker
```

### vLLM Setup
```bash
mkdir -p /opt/vllm && cd /opt/vllm
cat > docker-compose.yml << 'EOF'
version: "3.9"
services:
  vllm:
    image: vllm/vllm-openai:latest
    container_name: vllm
    restart: unless-stopped
    ports:
      - "8000:8000"
    environment:
      - GPU_MEMORY_UTILIZATION=0.90
    volumes:
      - vllm-data:/root/.cache/vllm
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]
    command: >
      --model Qwen/Qwen2.5-14B-Instruct
      --tensor-parallel-size 1
      --gpu-memory-utilization 0.90
      --max-model-len 8192
volumes:
  vllm-data:
EOF
docker compose up -d
```

### OpenClaw Install + Config
```bash
mkdir -p ~/bin ~/.config/openclaw
curl -L https://github.com/openclaw/openclaw/releases/latest/download/openclaw-linux-amd64 -o ~/bin/openclaw
chmod +x ~/bin/openclaw
echo 'export PATH="$PATH:~/bin"' >> ~/.bashrc && source ~/.bashrc
cat > ~/.config/openclaw/config.json << 'EOF'
{
  "llm": {
    "provider": "openai",
    "model": "qwen/Qwen2.5-14B-Instruct-GGUF",
    "baseURL": "http://localhost:8000/v1",
    "apiKey": "dummy"
  },
  "telegram": {
    "enabled": true,
    "botToken": "YOUR_TELEGRAM_TOKEN_HERE",
    "dmPolicy": "open"
  }
}
EOF
openclaw gateway start
```

---

## ADD-ON: SAVANNAH'S AGENT (Growing Pains Extension)

**Mission:** Give Savannah her own Telegram bot, separate from Charles, so John doesn't see her traffic

---

### What Savannah Needs

| Component | Details |
|-----------|---------|
| **Telegram Bot** | @LucyAiBot_bot (or new bot) |
| **Purpose** | LinkedIn prompts + wellness replies |
| **Savannah's Chat ID** | 8791771674 |
| **Config** | Segregated from main Charles bot |

---

### Step 1: Create Savannah's Bot

1. Message @BotFather on Telegram
2. `/newbot` → name it (e.g., "Savannah Desk")
3. Get the token
4. Save token to: `~/workspace/secrets/savannah_bot_token.txt`

---

### Step 2: Configure OpenClaw for Dual Bots

Edit `~/.config/openclaw/config.json`:

```json
{
  "agents": {
    "main": {
      "telegram": {
        "enabled": true,
        "botToken": "YOUR_MAIN_BOT_TOKEN",
        "allowedChats": ["YOUR_CHAT_ID"]
      }
    },
    "savannah": {
      "telegram": {
        "enabled": true,
        "botToken": "SAVANNAH_BOT_TOKEN",
        "allowedChats": ["8791771674"],
        "label": "Savannah Desk"
      }
    }
  }
}
```

---

### Step 3: Savannah Desk SOP

**Mission:**
- Provide Savannah copy/paste LinkedIn prompts (ContrPro focus)
- Wellness responses on demand
- Each prompt: headline, body, CTA, hashtags (≤7), keyword list
- Always sign "Savannah Desk"

**Cadence:**
- LinkedIn prompts: Monday/Wednesday/Friday (deliver in advance)
- Wellness responses: answer within 15 minutes

**Workflow:**
1. Pull priorities from `logs/current-agent-setup-2026-03-21.md`
2. Draft prompts in `content/savannah-linkedin-prompts-YYYY-MM-DD.md`
3. Send via Telegram signed "Savannah Desk"
4. Log message ID and notify John

**Escalation:**
- If Savannah asks for work outside wellness/LinkedIn → route to John

---

### Step 4: Verify Segregation

- John only sees main Charles bot traffic
- Savannah's messages go to @LucyAiBot_bot only
- No cross-traffic between bots

---

## FINAL CHECKLIST

- [ ] Server provisioned (GEX44)
- [ ] Docker + NVIDIA Container Toolkit
- [ ] vLLM running + model loaded
- [ ] OpenClaw running
- [ ] Charles bot responding
- [ ] Firewall configured
- [ ] Backups + monitoring
- [ ] Auto-start on reboot
- [ ] Workspace cloned
- [ ] Savannah bot created + segregated
- [ ] (Optional) Nginx + SSL

**ALL CHECKS MUST PASS - Run verification before declaring done.**

---

## 9 VERIFICATION CHECKS (RUN THESE AT THE END)

Execute this to verify everything works:

```bash
# 1. vLLM responding
curl http://localhost:8000/v1/models

# 2. OpenClaw running
openclaw status

# 3. John's bot responds (message @CharlesBot_AIBot)

# 4. Savannah's bot responds (message Savannah's bot)

# 5. Verify John's bot ignores Savannah (check John's Telegram - no Savannah traffic)

# 6. Savannah gets prompts (ask for LinkedIn prompt)

# 7. Check auto-start
sudo systemctl status openclaw

# 8. Check backup ran
tail -5 ~/workspace_backups/*.tar.gz 2>/dev/null | head

# 9. Traffic segregated - each bot only responds to own user
```

**ALL 9 MUST PASS.**

---

### QUICK VERIFY SCRIPT

```bash
cat > ~/verify-growing-pains.sh << 'EOF'
#!/bin/bash
echo "=== Growing Pains Quick Verify ==="
echo -n "1. vLLM: "
curl -s http://localhost:8000/v1/models >/dev/null 2>&1 && echo "✓ OK" || echo "✗ FAIL"
echo -n "2. OpenClaw: "
openclaw gateway status 2>/dev/null | grep -q running && echo "✓ OK" || echo "✗ FAIL"
echo -n "3. Docker: "
docker ps --format "{{.Names}}" | grep -q vllm && echo "✓ OK" || echo "✗ FAIL"
echo -n "4. Auto-start: "
sudo systemctl is-enabled openclaw 2>/dev/null | grep -q enabled && echo "✓ OK" || echo "✗ FAIL"
echo "=== End Verify ==="
EOF
chmod +x ~/verify-growing-pains.sh
```

Run with: `~/verify-growing-pains.sh`

---

_Last Updated: March 26, 2026_

---

## 📅 EXECUTION SCHEDULED

**Target Date:** Friday, March 27, 2026 OR Saturday, March 28, 2026  
**Time:** Evening EST (after work)  
**Estimated Duration:** 5-6 hours

---

## PRE-FLIGHT CHECK (Do This Before Starting)

- [ ] Confirm Hetzner account ready with payment method
- [ ] Have Telegram app open (for BotFather)
- [ ] Have GitHub credentials handy
- [ ] Server IP: _____________ (fill in after provisioning)
- [ ] SSH password/key: _____________ (fill in)
- [ ] Telegram bot token for Charles: 8622191614:AAHGx0C-27nKPhYCmdKL57AsHM_K2JylBkY (verify works before using)
- [ ] Savannah's Telegram bot token: _____________ (create via BotFather @LucyAiBot_bot)
- [ ] John's Telegram Chat ID: _____________ (get via @userinfobot)

### ⚠️ PRE-FLIGHT VERIFICATION (Do this NOW before Friday)

1. **Test Charles bot token:**
   - Send message to @CharlesBot_AIBot
   - If no response, token is invalid — get new from @BotFather

2. **Create Savannah's bot NOW:**
   - Message @BotFather → /newbot → "Savannah Desk"
   - Get token and save to `secrets/savannah_bot_token.txt` locally
   - Give token to me before execution

3. **Get John's Chat ID:**
   - Message @userinfobot on Telegram
   - Save Chat ID for config

---

## EQUIPMENT NEEDED

- [ ] Laptop with terminal/SSH client
- [ ] Second screen (helpful but not required)
- [ ] Stable internet connection
- [ ] 5-6 hours uninterrupted

---

## DOING THE WORK

**Who does what:**
1. **John** provisions server on Hetzner Cloud Console
2. **John** gives Charles the IP + SSH access
3. **Charles** executes Phases 2-12 autonomously

---

## SUCCESS CRITERIA

After execution, verify:
- [ ] `curl http://localhost:8000/v1/models` returns model info
- [ ] Telegram message to @YourBot responds
- [ ] `openclaw status` shows gateway running
- [ ] `~/workspace` contains all files from GitHub
- [ ] Savannah can message her bot and get LinkedIn prompts
- [ ] John does NOT see Savannah's bot traffic

---

## IF STUCK

- Check TROUBLESHOOTING section above
- Check health log: `~/health.log`
- Check OpenClaw logs: `openclaw gateway logs`
- Docker logs: `docker logs vllm`

---

## ⚠️ CRITICAL VERIFICATION STEPS (BEFORE EXECUTION)

### Do This NOW (before Friday):

1. **Verify Charles bot token works:**
   ```bash
   curl "https://api.telegram.org/bot8622191614:AAHGx0C-27nKPhYCmdKL57AsHM_K2JylBkY/getMe"
   ```
   - If returns error: token invalid → get new from @BotFather

2. **Create Savannah's bot NOW:**
   - Open Telegram → @BotFather
   - `/newbot` → "Savannah Desk" (or @LucyAiBot_bot)
   - Copy token → give to me BEFORE execution
   - Test: `curl "https://api.telegram.org/botTOKEN/getMe"`

3. **Get John's Chat ID:**
   - Message @userinfobot
   - Save Chat ID for allowedChats config

4. **Clone workspace to server:**
   - Ensure john-projects repo has all latest files before we start
   - We need EMERGENCY_LAUNCH.md, THE_FULCRUM.md, etc. on the server

---

## HUMAN-REQUIRED ITEMS (FLAG)

| Item | Who Does | Deadline |
|------|----------|----------|
| Provision Hetzner GEX44 server | John | Before we start |
| Verify/create Charles bot token | John | Before we start |
| Create Savannah's bot via BotFather | John | Before we start |
| Give me Savannah's bot token | John | Before we start |
| Get John's Chat ID | John | Before we start |
| Provide server IP + SSH access | John | When starting |

---

## AUTO-SAVE & RECOVERY

When execution starts:
- 15-min auto-save to growing-pains-progress.md
- Hourly GitHub push
- On restart: read progress file → resume where left off

No human catch-up needed.

---
