# VPS Migration Plan: 24/7 Charles AI Assistant on DigitalOcean

## Executive Summary

This document outlines the complete requirements and migration strategy for moving Charles (the AI assistant) from the current host machine to a DigitalOcean VPS for continuous 24/7 operation. The migration enables autonomous heartbeat monitoring, website monitoring, background task management, and uninterrupted service.

### Key Findings
- **Recommended Droplet**: Basic 4GB RAM / 2 vCPU ($24/month) or 2GB RAM / 1 vCPU ($12/month) for lighter workloads
- **Node.js Requirement**: Version 22+ (critical for OpenClaw compatibility)
- **Estimated Setup Time**: 2-4 hours for complete migration
- **Monthly Operating Cost**: $12-24 for VPS + variable API costs ($5-50 depending on usage)

---

## 1. VPS Specifications Needed

### 1.1 Resource Requirements Analysis

Based on OpenClaw system requirements and real-world usage data:

| Resource | Minimum | Recommended | Notes |
|----------|---------|-------------|-------|
| **RAM** | 2 GB | 4 GB | Gateway can use 1.5-2GB during extended sessions |
| **CPU** | 1 vCPU | 2 vCPU | Bursty workloads; 2 vCPU for headroom |
| **Disk** | 25 GB SSD | 50 GB SSD | Workspace, logs, and model cache |
| **Bandwidth** | 500 GB/mo | 1 TB/mo | API calls, heartbeats, file transfers |

**Reference**: GitHub issue #13758 shows gateway reaching 1.9GB RSS after 13 hours of continuous operation.

### 1.2 DigitalOcean Droplet Recommendations

#### Option A: Budget-Conscious (Light Usage)
- **Plan**: Basic Droplets
- **Specs**: 2 GB RAM / 1 vCPU / 50 GB SSD / 2 TB transfer
- **Price**: $12/month ($0.01786/hr)
- **Best For**: Single agent, moderate API usage, basic monitoring

#### Option B: Recommended (Production Use)
- **Plan**: Basic Droplets
- **Specs**: 4 GB RAM / 2 vCPU / 80 GB SSD / 4 TB transfer
- **Price**: $24/month ($0.03571/hr)
- **Best For**: Multiple agents, heavy usage, local model experimentation

#### Option C: High-Performance (Local Models)
- **Plan**: General Purpose or CPU-Optimized
- **Specs**: 8 GB RAM / 2 vCPU / 100 GB SSD
- **Price**: $48-63/month
- **Best For**: Running Ollama/local LLMs alongside OpenClaw

### 1.3 Bandwidth Considerations

- **Basic Droplets include**: 500 GB - 4 TB outbound transfer (depending on tier)
- **API traffic**: ~1-5 MB per conversation (varies by model and length)
- **Heartbeat overhead**: Minimal (~KB per check)
- **Overage cost**: $0.01/GB (very reasonable)

---

## 2. Software Stack

### 2.1 Operating System

**Recommendation**: Ubuntu 24.04 LTS (Noble Numbat)
- Long-term support through 2029
- Best compatibility with Node.js 22+
- Extensive documentation and community support

**Alternative**: Debian 12 (Bookworm) - equally stable, slightly lighter

### 2.2 Node.js Installation

OpenClaw **requires Node.js 22 or newer**. Installation steps:

```bash
# Install Node.js 22 LTS via NodeSource
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version  # Should show v22.x.x
npm --version
```

### 2.3 OpenClaw Gateway Installation

```bash
# Install OpenClaw globally
npm install -g openclaw

# Verify installation
openclaw --version

# Install systemd daemon service
openclaw onboard --install-daemon

# Start gateway on standard port
openclaw gateway --port 18789 --verbose
```

### 2.4 Model Provider Setup

Configure API keys in `~/.openclaw/openclaw.json`:

```json
{
  "models": {
    "default": "anthropic/claude-sonnet-4",
    "providers": {
      "anthropic": {
        "apiKey": "${ANTHROPIC_API_KEY}",
        "models": ["claude-opus-4", "claude-sonnet-4", "claude-haiku-3"]
      },
      "openai": {
        "apiKey": "${OPENAI_API_KEY}",
        "models": ["gpt-4o", "gpt-4o-mini"]
      }
    }
  }
}
```

**Environment Variables** (recommended for security):
```bash
# Add to ~/.bashrc or ~/.profile
export ANTHROPIC_API_KEY="sk-ant-..."
export OPENAI_API_KEY="sk-..."
export TELEGRAM_BOT_TOKEN="..."
```

### 2.5 Process Management: PM2 vs Systemd

#### Recommended: PM2 + Systemd Integration

PM2 provides superior Node.js process management with automatic restarts, logging, and clustering:

```bash
# Install PM2 globally
sudo npm install -g pm2

# Create ecosystem file
cat > ~/ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'openclaw-gateway',
    script: '/usr/bin/openclaw',
    args: 'gateway --port 18789',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '3G',
    env: {
      NODE_ENV: 'production'
    },
    log_file: '~/.openclaw/logs/gateway.log',
    error_file: '~/.openclaw/logs/gateway-error.log',
    out_file: '~/.openclaw/logs/gateway-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
  }]
};
EOF

# Start with PM2
pm2 start ecosystem.config.js

# Generate systemd startup script
pm2 startup systemd
# (Run the command output by PM2)
pm2 save
```

#### Alternative: Native Systemd Service

For simpler setups without PM2:

```bash
# Create systemd service file
sudo tee /etc/systemd/system/openclaw-gateway.service << 'EOF'
[Unit]
Description=OpenClaw AI Gateway
After=network.target

[Service]
Type=simple
User=charles
WorkingDirectory=/home/charles/.openclaw
ExecStart=/usr/bin/openclaw gateway --port 18789
Restart=always
RestartSec=10
Environment=NODE_ENV=production
Environment=ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable openclaw-gateway
sudo systemctl start openclaw-gateway
```

---

## 3. Security Requirements

### 3.1 Firewall Configuration (UFW)

```bash
# Install and enable UFW
sudo apt-get install ufw
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Allow SSH (consider changing port later)
sudo ufw allow 22/tcp comment 'SSH'

# Allow OpenClaw gateway port (if exposing externally)
sudo ufw allow 18789/tcp comment 'OpenClaw Gateway'

# Rate limit SSH to prevent brute force
sudo ufw limit 22/tcp

# Enable firewall
sudo ufw enable

# Check status
sudo ufw status verbose
```

### 3.2 SSH Hardening

```bash
# Edit SSH configuration
sudo nano /etc/ssh/sshd_config

# Recommended changes:
# - Change default port (optional but recommended)
Port 2222
# - Disable root login
PermitRootLogin no
# - Use key authentication only
PasswordAuthentication no
PubkeyAuthentication yes
# - Limit users
AllowUsers charles
# - Reduce grace time
LoginGraceTime 30
# - Idle timeout
ClientAliveInterval 300
ClientAliveCountMax 2

# Restart SSH
sudo systemctl restart sshd
```

**Important**: Before disabling password auth, ensure SSH key is working:
```bash
# On local machine, copy key to server
ssh-copy-id -p 2222 charles@your-droplet-ip
```

### 3.3 SSL/TLS Setup (Optional but Recommended)

If exposing web interfaces or APIs:

```bash
# Install certbot for Let's Encrypt
sudo apt-get install certbot python3-certbot-nginx

# Obtain certificate (if using nginx)
sudo certbot --nginx -d your-domain.com

# Auto-renewal is configured automatically
```

### 3.4 API Key Management

**Best Practices**:
1. **Never commit keys to git** - Use environment variables
2. **Restrict key permissions** - Use read-only where possible
3. **Rotate keys regularly** - Set calendar reminders
4. **Monitor usage** - Set up billing alerts with providers
5. **Use separate keys per environment** - Dev/staging/prod

**Secure Storage**:
```bash
# Create restricted env file
mkdir -p ~/.openclaw/secrets
touch ~/.openclaw/secrets/api-keys.env
chmod 600 ~/.openclaw/secrets/api-keys.env

# Load in .bashrc
if [ -f ~/.openclaw/secrets/api-keys.env ]; then
    source ~/.openclaw/secrets/api-keys.env
fi
```

### 3.5 Fail2Ban (Intrusion Prevention)

```bash
# Install fail2ban
sudo apt-get install fail2ban

# Create custom jail
sudo tee /etc/fail2ban/jail.local << 'EOF'
[DEFAULT]
bantime = 1h
findtime = 10m
maxretry = 5

[sshd]
enabled = true
port = 2222
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
EOF

sudo systemctl restart fail2ban
```

---

## 4. Persistence & Monitoring

### 4.1 Git Repository Setup

```bash
# Initialize workspace as git repo
cd ~/.openclaw/workspace
git init

# Create .gitignore
cat > .gitignore << 'EOF'
# Secrets
*.env
secrets/
*.key
*.pem

# Logs
logs/
*.log

# Runtime data
node_modules/
.cache/

# Sensitive configs
openclaw.json.bak
EOF

# Initial commit
git add .
git commit -m "Initial workspace commit"

# Add remote (GitHub/GitLab private repo)
git remote add origin git@github.com:yourusername/charles-workspace.git
git branch -M main
git push -u origin main
```

### 4.2 Backup Strategy

#### Automated Daily Backups

```bash
# Create backup script
mkdir -p ~/.openclaw/scripts
cat > ~/.openclaw/scripts/backup.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/home/charles/backups"
WORKSPACE="/home/charles/.openclaw/workspace"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# Backup workspace (excluding secrets)
tar -czf "$BACKUP_DIR/workspace_$DATE.tar.gz" \
  --exclude='*.env' \
  --exclude='secrets/' \
  --exclude='logs/' \
  -C $(dirname $WORKSPACE) $(basename $WORKSPACE)

# Backup OpenClaw config
cp ~/.openclaw/openclaw.json "$BACKUP_DIR/openclaw_$DATE.json"

# Keep only last 7 backups
ls -t $BACKUP_DIR/workspace_*.tar.gz | tail -n +8 | xargs rm -f
ls -t $BACKUP_DIR/openclaw_*.json | tail -n +8 | xargs rm -f

echo "Backup completed: $DATE"
EOF

chmod +x ~/.openclaw/scripts/backup.sh

# Add to crontab (daily at 2 AM)
(crontab -l 2>/dev/null; echo "0 2 * * * /home/charles/.openclaw/scripts/backup.sh") | crontab -
```

#### Offsite Backup (Optional)

```bash
# Sync to S3/DigitalOcean Spaces
# Install s3cmd
sudo apt-get install s3cmd

# Configure s3cmd
s3cmd --configure

# Add to backup script
s3cmd sync /home/charles/backups/ s3://your-backup-bucket/charles-backups/
```

### 4.3 Log Rotation

```bash
# Install logrotate (usually pre-installed)
sudo apt-get install logrotate

# Create OpenClaw logrotate config
sudo tee /etc/logrotate.d/openclaw << 'EOF'
/home/charles/.openclaw/logs/*.log {
    daily
    rotate 7
    compress
    delaycompress
    missingok
    notifempty
    create 0640 charles charles
    sharedscripts
    postrotate
        pm2 reload openclaw-gateway > /dev/null 2>&1 || true
    endscript
}
EOF
```

### 4.4 Health Checks & Alerts

#### Simple Health Check Script

```bash
cat > ~/.openclaw/scripts/health-check.sh << 'EOF'
#!/bin/bash

# Check if OpenClaw gateway is running
if ! pgrep -f "openclaw gateway" > /dev/null; then
    echo "$(date): OpenClaw gateway is DOWN!" >> ~/.openclaw/logs/health.log
    # Restart via PM2
    pm2 restart openclaw-gateway
    # Send alert (configure as needed)
    # curl -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
    #   -d "chat_id=${ALERT_CHAT_ID}" \
    #   -d "text=🚨 Charles gateway restarted on $(hostname)"
fi

# Check disk space
DISK_USAGE=$(df -h / | awk 'NR==2 {print $5}' | sed 's/%//')
if [ "$DISK_USAGE" -gt 85 ]; then
    echo "$(date): Disk usage at ${DISK_USAGE}%!" >> ~/.openclaw/logs/health.log
fi

# Check memory
MEMORY_USAGE=$(free | grep Mem | awk '{printf "%.0f", $3/$2 * 100.0}')
if [ "$MEMORY_USAGE" -gt 90 ]; then
    echo "$(date): Memory usage at ${MEMORY_USAGE}%!" >> ~/.openclaw/logs/health.log
fi
EOF

chmod +x ~/.openclaw/scripts/health-check.sh

# Run every 5 minutes
(crontab -l 2>/dev/null; echo "*/5 * * * * /home/charles/.openclaw/scripts/health-check.sh") | crontab -
```

#### External Monitoring (UptimeRobot)

- Sign up at https://uptimerobot.com (free tier: 50 monitors)
- Create HTTP monitor for gateway health endpoint
- Set alert contacts (email, Telegram, etc.)

---

## 5. Migration Steps

### 5.1 Pre-Migration Checklist

- [ ] Export all API keys and credentials
- [ ] Document current workspace structure
- [ ] Note all active integrations (Telegram, Discord, etc.)
- [ ] Create full backup of current workspace
- [ ] Set up DigitalOcean account with billing
- [ ] Generate SSH key pair for VPS access

### 5.2 Step-by-Step Migration

#### Phase 1: VPS Provisioning (30 minutes)

1. **Create Droplet**
   - Log into DigitalOcean console
   - Create Basic Droplet: 4GB RAM / 2 vCPU / Ubuntu 24.04 LTS
   - Choose datacenter region (NYC3 or closest to you)
   - Add SSH key for authentication
   - Set hostname: `charles-ai`

2. **Initial Server Setup**
   ```bash
   # SSH into new droplet
   ssh root@your-droplet-ip
   
   # Create user
   adduser charles
   usermod -aG sudo charles
   
   # Copy SSH key
   mkdir -p /home/charles/.ssh
   cp ~/.ssh/authorized_keys /home/charles/.ssh/
   chown -R charles:charles /home/charles/.ssh
   
   # Switch to new user
   su - charles
   ```

#### Phase 2: Software Installation (45 minutes)

3. **System Updates & Dependencies**
   ```bash
   sudo apt-get update && sudo apt-get upgrade -y
   sudo apt-get install -y curl wget git vim ufw fail2ban
   ```

4. **Node.js Installation**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
   sudo apt-get install -y nodejs
   node --version  # Verify v22.x.x
   ```

5. **OpenClaw Installation**
   ```bash
   sudo npm install -g openclaw pm2
   openclaw --version
   openclaw onboard --install-daemon
   ```

#### Phase 3: Security Hardening (30 minutes)

6. **Configure Firewall**
   ```bash
   sudo ufw default deny incoming
   sudo ufw default allow outgoing
   sudo ufw allow 22/tcp
   sudo ufw allow 18789/tcp
   sudo ufw limit 22/tcp
   sudo ufw enable
   ```

7. **SSH Hardening**
   - Edit `/etc/ssh/sshd_config` (as root)
   - Change port, disable root login, enable key auth only
   - Restart SSH: `sudo systemctl restart sshd`

8. **Configure Fail2Ban**
   ```bash
   sudo systemctl enable fail2ban
   sudo systemctl start fail2ban
   ```

#### Phase 4: Workspace Migration (30 minutes)

9. **Transfer Workspace Files**
   ```bash
   # From current machine, transfer workspace
   rsync -avz --progress \
     ~/.openclaw/workspace/ \
     charles@your-droplet-ip:/home/charles/.openclaw/workspace/
   
   # Or use tar + scp
   tar -czf workspace-backup.tar.gz ~/.openclaw/workspace/
   scp workspace-backup.tar.gz charles@your-droplet-ip:~/
   ssh charles@your-droplet-ip "tar -xzf workspace-backup.tar.gz"
   ```

10. **Configure OpenClaw**
    ```bash
    # Copy config (or recreate)
    scp ~/.openclaw/openclaw.json charles@your-droplet-ip:~/.openclaw/
    
    # Set up environment variables
    nano ~/.openclaw/secrets/api-keys.env
    chmod 600 ~/.openclaw/secrets/api-keys.env
    ```

#### Phase 5: Service Configuration (20 minutes)

11. **PM2 Setup**
    ```bash
    # Create ecosystem file
    cat > ~/ecosystem.config.js << 'EOF'
    module.exports = {
      apps: [{
        name: 'openclaw-gateway',
        script: '/usr/bin/openclaw',
        args: 'gateway --port 18789',
        instances: 1,
        autorestart: true,
        max_memory_restart: '3G',
        env: { NODE_ENV: 'production' }
      }]
    };
    EOF
    
    # Start and save
    pm2 start ecosystem.config.js
    pm2 startup systemd
    pm2 save
    ```

12. **Set Up Backups & Monitoring**
    ```bash
    # Create backup script
    mkdir -p ~/.openclaw/scripts ~/.openclaw/logs
    # (Use scripts from Section 4)
    
    # Add to crontab
    crontab -e
    # Add: 0 2 * * * /home/charles/.openclaw/scripts/backup.sh
    # Add: */5 * * * * /home/charles/.openclaw/scripts/health-check.sh
    ```

#### Phase 6: Testing & Validation (30 minutes)

13. **Verify Installation**
    ```bash
    # Check gateway status
    pm2 status
    pm2 logs
    
    # Test API connectivity
    curl http://localhost:18789/health  # If health endpoint exists
    
    # Verify Telegram bot responds
    # Send test message to bot
    ```

14. **Update Telegram Webhook (if applicable)**
    - If using webhooks, update with new VPS IP/domain
    - Or switch to polling mode temporarily

15. **Update DNS (if using custom domain)**
    - Point domain to new droplet IP
    - Wait for propagation

### 5.3 Testing Checklist

- [ ] Gateway starts automatically on boot
- [ ] Telegram messages are received and processed
- [ ] Heartbeat system is functional
- [ ] All API integrations work (email, calendar, etc.)
- [ ] File persistence across restarts
- [ ] Backup script runs successfully
- [ ] Health checks are logging properly
- [ ] Firewall blocks unauthorized access
- [ ] SSH key authentication works
- [ ] Memory usage stays within limits (check after 24 hours)

### 5.4 Rollback Plan

If migration fails:

1. **Immediate Rollback** (< 5 minutes)
   ```bash
   # On VPS
   pm2 stop openclaw-gateway
   
   # On original host
   # Restart gateway locally
   openclaw gateway --port 18789
   ```

2. **Update Telegram Bot** (if needed)
   - Change webhook URL back to original host
   - Or restart local polling

3. **Data Recovery**
   - Workspace is preserved on both systems
   - Git repository has full history
   - Daily backups available

4. **Destroy Droplet** (if needed)
   - DigitalOcean charges prorated to the hour
   - Destroy droplet if migration fails to avoid charges

---

## 6. Cost Estimates

### 6.1 DigitalOcean Infrastructure Costs

| Component | Specs | Monthly Cost |
|-----------|-------|--------------|
| **Basic Droplet** (Recommended) | 4GB RAM / 2 vCPU / 80GB SSD | $24.00 |
| **Basic Droplet** (Budget) | 2GB RAM / 1 vCPU / 50GB SSD | $12.00 |
| **General Purpose** | 4GB RAM / 2 vCPU / 100GB SSD | $48.00 |
| **CPU-Optimized** | 4GB RAM / 2 vCPU / 50GB SSD | $42.00 |
| **Block Storage** (if needed) | Additional 100GB | $10.00 |
| **Backups** (optional) | 20% of droplet cost | $2.40-9.60 |

### 6.2 API Provider Costs (Variable)

| Provider | Model | Input/1M tokens | Output/1M tokens | Est. Monthly |
|----------|-------|-----------------|------------------|--------------|
| **Anthropic** | Claude 3.5 Sonnet | $3.00 | $15.00 | $10-40 |
| **Anthropic** | Claude 3.5 Haiku | $0.25 | $1.25 | $2-10 |
| **OpenAI** | GPT-4o | $2.50 | $10.00 | $10-30 |
| **OpenAI** | GPT-4o-mini | $0.15 | $0.60 | $1-5 |

**Estimated Total Monthly API Costs**: $5-50 (depending on usage)

### 6.3 Total Monthly Operating Costs

| Scenario | VPS | API (avg) | **Total** |
|----------|-----|-----------|-----------|
| **Minimal** (2GB, light usage) | $12 | $5 | **$17** |
| **Standard** (4GB, moderate) | $24 | $20 | **$44** |
| **Heavy** (4GB, heavy usage) | $24 | $50 | **$74** |
| **Premium** (8GB, local models) | $63 | $30 | **$93** |

---

## 7. Risk Mitigation

### 7.1 Identified Risks

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| **Gateway memory leak** | High | Medium | PM2 max_memory_restart, daily restarts |
| **API rate limiting** | Medium | Low | Fallback providers, request queuing |
| **VPS downtime** | High | Low | Monitoring alerts, automated restarts |
| **Data loss** | High | Low | Daily backups, git repository |
| **Security breach** | High | Low | UFW, fail2ban, SSH hardening, no root login |
| **Cost overruns** | Medium | Medium | API usage limits, billing alerts |
| **Migration failure** | Medium | Low | Rollback plan, parallel running period |

### 7.2 Monitoring & Alerting Strategy

1. **Gateway Health**: PM2 monitoring + custom health checks
2. **System Resources**: DigitalOcean monitoring + custom scripts
3. **API Usage**: Provider dashboards + billing alerts
4. **Uptime**: UptimeRobot external monitoring
5. **Security**: Fail2Ban logs + UFW logs review

### 7.3 Maintenance Schedule

| Task | Frequency | Command/Action |
|------|-----------|----------------|
| System updates | Weekly | `sudo apt-get update && sudo apt-get upgrade` |
| Backup verification | Weekly | Check backup files exist and are valid |
| Log review | Weekly | Check `~/.openclaw/logs/` for errors |
| API key rotation | Quarterly | Generate new keys, update env files |
| Security audit | Monthly | Review UFW logs, fail2ban status |
| Full system backup | Monthly | Snapshot via DigitalOcean console |

---

## 8. Post-Migration Optimization

### 8.1 Performance Tuning

```bash
# Optimize Node.js for production
export NODE_ENV=production
export UV_THREADPOOL_SIZE=128

# Monitor memory usage
pm2 monit

# Check for memory leaks
pm2 logs --lines 100
```

### 8.2 Scaling Considerations

If usage grows:
- **Vertical**: Resize droplet (requires brief downtime)
- **Horizontal**: Multiple agents with load balancer
- **Storage**: Attach Block Storage for large workspaces

### 8.3 Future Enhancements

- [ ] Set up CI/CD for workspace updates
- [ ] Implement centralized logging (ELK stack or similar)
- [ ] Add metrics dashboard (Grafana + Prometheus)
- [ ] Configure auto-scaling based on load
- [ ] Set up staging environment for testing

---

## Appendix A: Quick Reference Commands

```bash
# Gateway management
pm2 start ecosystem.config.js
pm2 restart openclaw-gateway
pm2 stop openclaw-gateway
pm2 logs openclaw-gateway --lines 50
pm2 monit

# System monitoring
htop
free -h
df -h
sudo ufw status
sudo fail2ban-client status

# Backup & restore
~/.openclaw/scripts/backup.sh
tar -xzf workspace_YYYYMMDD_HHMMSS.tar.gz

# Security
sudo ufw status verbose
sudo fail2ban-client status sshd
sudo cat /var/log/auth.log | grep "Failed password"
```

## Appendix B: Resource Links

- **OpenClaw Docs**: https://docs.openclaw.ai
- **DigitalOcean Docs**: https://docs.digitalocean.com
- **Node.js 22**: https://nodejs.org/en/blog/release/v22.0.0
- **PM2 Docs**: https://pm2.keymetrics.io/docs/usage/quick-start/
- **UFW Guide**: https://help.ubuntu.com/community/UFW

---

*Document Version: 1.0*
*Created: March 9, 2026*
*For: Charles AI Assistant Migration to DigitalOcean VPS*
