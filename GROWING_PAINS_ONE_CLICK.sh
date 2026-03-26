# GROWING PAINS — ONE-CLICK SETUP
# Run this entire file on a FRESH GEX44 server as ROOT
# Estimated time: 4-5 hours (mostly waiting for model download)

# ============================================
# STEP 1: DOCKER & DEPENDENCIES (~30 min)
# ============================================

# Install Docker
apt update && apt install -y ca-certificates curl gnupg lsb-release
mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list
apt update && apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
systemctl enable --now docker

# Verify Docker
docker run hello-world

# ============================================
# STEP 2: vLLM + MODEL (~1 hour first run)
# ============================================

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

# Start vLLM (will download model ~8GB, takes 10-20 min)
docker compose up -d

# WAIT HERE! Check if model is loaded:
# curl http://localhost:8000/v1/models
# Keep checking until you see "qwen/Qwen2.5-14B-Instruct-GGUF" in the response

# ============================================
# STEP 3: OPENCLAW (~30 min)
# ============================================

# Install OpenClaw
mkdir -p ~/bin ~/.config/openclaw
curl -L https://github.com/openclaw/openclaw/releases/latest/download/openclaw-linux-amd64 -o ~/bin/openclaw
chmod +x ~/bin/openclaw
echo 'export PATH="$PATH:~/bin"' >> ~/.bashrc
source ~/.bashrc

# Verify
openclaw --version

# Create OpenClaw config
# IMPORTANT: Replace YOUR_TELEGRAM_TOKEN_HERE with your actual token from @BotFather

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

# Start OpenClaw
openclaw gateway start

# ============================================
# STEP 4: NGINX / WEB HOSTING (~30 min)
# ============================================

apt install -y nginx certbot python3-certbot-nginx

# Create website directory
mkdir -p /var/www/contrpro

# Create placeholder website
cat > /var/www/contrpro/index.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>ContractorPro</title>
</head>
<body>
    <h1>ContractorPro</h1>
    <p>Coming soon...</p>
</body>
</html>
EOF

# Create Nginx config (replace YOUR_DOMAIN.com with your actual domain)
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

# Enable site
ln -s /etc/nginx/sites-available/contrpro /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx

# OPTIONAL: Get SSL certificate (replace YOUR_DOMAIN.com)
# certbot --nginx -d YOUR_DOMAIN.com -d www.YOUR_DOMAIN.com

# ============================================
# VERIFY EVERYTHING
# ============================================

echo "=== VERIFICATION ==="

echo "1. Docker running?"
docker ps

echo "2. vLLM responding?"
curl -s http://localhost:8000/v1/models | head -20

echo "3. OpenClaw running?"
openclaw status

echo "=== ALL DONE ==="
echo "Telegram: Message your bot and it should respond!"
echo "Web: Visit YOUR_DOMAIN.com (after pointing domain to this server IP)"
