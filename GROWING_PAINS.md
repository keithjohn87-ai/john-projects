# GROWING PAINS — EXECUTIVE SUMMARY

**Total Setup Time:** ~4-6 hours (one-time)  
**Monthly Cost:** $195 (ALL INCLUSIVE)

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

## STEP-BY-STEP

### PHASE 1: Provision Server (~30 min)

1. Log into https://www.hetzner.com
2. Go to **Dedicated Servers** → **Matrix GPU**
3. Select **GEX44** (~€184/mo)
4. Deploy in Falkenstein or Helsinki
5. Get the IP address

---

### PHASE 2: SSH & Docker (~30 min)

SSH in:
```bash
ssh root@YOUR_SERVER_IP
```

Install Docker:
```bash
apt update && apt install -y ca-certificates curl gnupg lsb-release
mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list
apt update && apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
systemctl enable --now docker
```

Verify GPU:
```bash
nvidia-smi
```

---

### PHASE 3: vLLM + Model (~1 hour)

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
      - MODEL=qwen/Qwen2.5-14B-Instruct-GGUF
      - QUANTIZATION=q4_k_m
      - TENSOR_PARALLEL_SIZE=1
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
      --model qwen/Qwen2.5-14B-Instruct-GGUF
      --quantization q4_k_m
      --gpu-memory-utilization 0.90
      --max-model-len 8192

volumes:
  vllm-data:
EOF
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

## TIME SUMMARY

| Phase | Time |
|-------|------|
| Provision Server | 30 min |
| SSH + Docker | 30 min |
| vLLM + Model | 1 hour |
| OpenClaw | 1 hour |
| Nginx | 1 hour |
| Verify | 30 min |
| **TOTAL** | **~4-5 hours** |

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
      --model qwen/Qwen2.5-14B-Instruct-GGUF
      --quantization q4_k_m
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

## FINAL CHECKLIST

- [ ] Server provisioned (GEX44)
- [ ] Docker installed
- [ ] vLLM running + model loaded
- [ ] OpenClaw running
- [ ] Telegram bot responding
- [ ] (Optional) Nginx + SSL

**That's it. ~5 hours. $195/mo. Done.**

---

_Last Updated: March 26, 2026_
