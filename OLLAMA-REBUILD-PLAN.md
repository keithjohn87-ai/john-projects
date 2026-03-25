# OLLAMA REBUILD PLAN - Tue Mar 25 @ 6 PM EST
## Created: 2026-03-24 01:37 UTC

### GOAL
Clean nuclear rebuild - no root services, no permission hell.

---

### STEP 1: SSH IN & WIPE (5 min)

```bash
# Stop everything
pkill -9 ollama 2>/dev/null; pkill -9 openclaw-gateway 2>/dev/null; sleep 2

# Wipe configs (both john and root)
rm -rf ~/.ollama ~/.config/openclaw ~/.openclaw
sudo rm -rf /root/.ollama /root/.config/openclaw /etc/openclaw /opt/openclaw 2>/dev/null

# If OpenClaw was installed via apt
sudo apt remove openclaw 2>/dev/null || true
```

---

### STEP 2: REINSTALL OPENCLAW AS JOHN (10 min)

```bash
# Download latest (as john, no sudo)
mkdir -p ~/bin
curl -L https://github.com/openclaw/openclaw/releases/latest/download/openclaw-linux-amd64 -o ~/bin/openclaw
chmod +x ~/bin/openclaw
export PATH=$PATH:~/bin

# Test
openclaw --version
```

---

### STEP 3: INSTALL OLLAMA (5 min)

```bash
# Install ollama (this runs as root but that's fine - it's just the daemon)
curl -fsSL https://ollama.com/install.sh | sh

# Start it
ollama serve &
sleep 3

# Pull the 7B model ONLY (not 32B)
ollama pull qwen2.5-coder:7b

# Verify
ollama list
# Should show: qwen2.5-coder:7b
```

**⚠️ CRITICAL:** DO NOT pull 32B. 16GB RAM cannot load 19GB model.

---

### STEP 4: WRITE THE CONFIG (2 min)

```bash
# Create directory
mkdir -p ~/.config/openclaw

# Write the file (note: "qwen2.5-coder:7b" - must include "-coder")
cat > ~/.config/openclaw/config.json << 'EOF'
{
  "llm": {
    "provider": "ollama",
    "model": "qwen2.5-coder:7b",
    "apiUrl": "http://localhost:11434"
  }
}
EOF

# Verify content
cat ~/.config/openclaw/config.json
```

---

### STEP 5: START CHARLES 3.0 (NO SYSTEMD) (2 min)

```bash
# Start OpenClaw in foreground (easiest to debug)
openclaw gateway start

# OR background with log:
# nohup openclaw gateway start > ~/openclaw.log 2>&1 &
```

**⚠️ CRITICAL:** Do NOT use `sudo`. Run as `john` user only.

---

### STEP 6: TEST (5 min)

```bash
# Verify Ollama sees the model
curl http://localhost:11434/api/tags

# Test Charlie on Telegram
# First message: 10-20 sec (loading into RAM)
# After that: normal speed
```

---

## TROUBLESHOOTING

**Model 404?**
```bash
# Check Charlie's config says:
"qwen2.5-coder:7b"
# NOT: "qwen2.5:7b" or "qwen2.5:32b"
```

**Permission denied?**
- You used `sudo` somewhere. Start over from Step 1.

**Ollama not responding?**
```bash
ps aux | grep ollama
# If empty: ollama serve &
```

---

## TIME ESTIMATE: ~30 minutes

---

Last Updated: 2026-03-24 01:37 UTC
