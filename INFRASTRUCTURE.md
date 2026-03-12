# INFRASTRUCTURE.md

Infrastructure and Security Documentation for OpenClaw Deployment

## System Overview

| Property | Value |
|----------|-------|
| **Hostname** | 1ea8e8e1143b |
| **OS** | Debian GNU/Linux 12 (bookworm) |
| **Kernel** | Linux 5.15.0-25-generic x86_64 |
| **Node.js** | v22.22.0 |
| **OpenClaw Channel** | stable (default) |
| **OpenClaw Version** | 2026.3.2 (latest) |
| **Environment** | Container/Docker |

## OpenClaw Configuration

### Gateway
- **Bind Address**: ws://127.0.0.1:18789 (local loopback)
- **Dashboard**: http://172.17.0.38:18789/
- **Tailscale**: Off
- **Probes**: Enabled
- **Heartbeat**: 30m (main)

### Channels
| Channel | Status | Details |
|---------|--------|---------|
| Telegram | ON | @CharlesBot_AIBot (token configured) |

### Agents
- **Count**: 1 active (main)
- **Sessions**: 45 active sessions
- **Default Model**: kimi-k2.5 (200k context)

---

## Security Audit Findings

**Audit Date**: 2026-03-07 04:00 UTC  
**Audit Type**: Phase 3 Security - Night 3 Review

### Summary
- **Critical Issues**: 4
- **Warnings**: 5
- **Info**: 1

### Critical Issues (Immediate Action Required)

#### 1. Control UI Allowed Origins Contains Wildcard
- **Issue**: `gateway.controlUi.allowedOrigins` includes "*" which disables origin allowlisting
- **Risk**: DNS rebinding attacks, unauthorized Control UI access
- **Fix**: Replace wildcard with explicit trusted origins
- **Command**: Update `openclaw.json` to specify allowed origins

#### 2. Host-Header Origin Fallback Enabled (DANGEROUS)
- **Issue**: `gateway.controlUi.dangerouslyAllowHostHeaderOriginFallback=true`
- **Risk**: Weakens DNS rebinding protections
- **Fix**: Set `gateway.controlUi.dangerouslyAllowHostHeaderOriginFallback=false`
- **Note**: Must configure explicit `allowedOrigins` first

#### 3. Control UI Device Auth Disabled (DANGEROUS)
- **Issue**: `gateway.controlUi.dangerouslyDisableDeviceAuth=true`
- **Risk**: Disables device identity checks for Control UI
- **Fix**: Set `gateway.controlUi.dangerouslyDisableDeviceAuth=false`
- **Note**: Only disable in short-lived break-glass scenarios

#### 4. Config File World-Readable
- **Issue**: `/root/.openclaw/openclaw.json` has mode 644
- **Risk**: Config may contain tokens and private settings
- **Fix**: `chmod 600 /root/.openclaw/openclaw.json`

### Warnings (Should Address)

#### 1. Control UI Insecure Auth Toggle Enabled
- **Issue**: `gateway.controlUi.allowInsecureAuth=true`
- **Recommendation**: Disable or switch to HTTPS/Tailscale Serve

#### 2. Insecure/Dangerous Flags Enabled
- **Issue**: 3 dangerous flags detected
- **Flags**: `allowInsecureAuth`, `dangerouslyAllowHostHeaderOriginFallback`, `dangerouslyDisableDeviceAuth`
- **Recommendation**: Disable when not actively debugging

#### 3. No Auth Rate Limiting Configured
- **Issue**: Gateway bind is not loopback but no rate limiting configured
- **Risk**: Brute-force auth attacks not mitigated
- **Fix**: Add `gateway.auth.rateLimit` configuration

#### 4. State Directory Readable by Others
- **Issue**: `/root/.openclaw` has mode 755
- **Fix**: `chmod 700 /root/.openclaw`

#### 5. Auth Profiles File Readable by Others
- **Issue**: `/root/.openclaw/agents/main/agent/auth-profiles.json` has mode 644
- **Risk**: Contains API keys and OAuth tokens
- **Fix**: `chmod 600 /root/.openclaw/agents/main/agent/auth-profiles.json`

### Info

#### Attack Surface Summary
- Open groups: 0
- Allowlist groups: 1
- Elevated tools: Enabled
- Webhooks: Disabled
- Browser control: Enabled
- Trust model: Personal assistant (single trusted operator)

---

## Firewall Status

| Check | Status |
|-------|--------|
| UFW | Not detected |
| firewalld | Not detected |
| nftables | Not detected |
| iptables | Not detected |
| **Overall** | **No standard firewall active** |

**Note**: Running in container environment. Host-level firewall should be configured on the Docker host.

### Listening Ports
- No listening ports detected from container (isolated network stack)
- Gateway binds to localhost:18789 (loopback only)

---

## SSH Configuration

**Status**: SSH configuration not accessible from container

**Note**: SSH hardening should be reviewed at the host level. Recommended settings:
- Disable root login: `PermitRootLogin no`
- Use key-based auth: `PasswordAuthentication no`, `PubkeyAuthentication yes`
- Change default port (optional): `Port 2222`

---

## File Permissions Audit

| Path | Current | Recommended | Status |
|------|---------|-------------|--------|
| `/root/.openclaw/` | 755 | 700 | ⚠️ Too permissive |
| `/root/.openclaw/openclaw.json` | 644 | 600 | 🔴 World-readable |
| `/root/.openclaw/agents/main/agent/auth-profiles.json` | 644 | 600 | 🔴 World-readable |
| `/root/.openclaw/credentials/` | 700 | 700 | ✅ Good |
| `/root/.openclaw/delivery-queue/` | 700 | 700 | ✅ Good |

---

## Remediation Plan

### Immediate (Critical)

1. **Fix config file permissions**:
   ```bash
   chmod 600 /root/.openclaw/openclaw.json
   chmod 600 /root/.openclaw/agents/main/agent/auth-profiles.json
   chmod 700 /root/.openclaw
   ```

2. **Secure Control UI configuration** (requires planning):
   - Determine trusted origins for Control UI access
   - Update `openclaw.json` with explicit `allowedOrigins`
   - Disable `dangerouslyAllowHostHeaderOriginFallback`
   - Disable `dangerouslyDisableDeviceAuth`
   - Disable `allowInsecureAuth` (or ensure HTTPS/Tailscale)

3. **Add rate limiting**:
   ```json
   "gateway": {
     "auth": {
       "rateLimit": {
         "maxAttempts": 10,
         "windowMs": 60000,
         "lockoutMs": 300000
       }
     }
   }
   ```

### Short-term (Warnings)

4. Review and disable dangerous debug flags when not needed
5. Enable host-level firewall (ufw/iptables on Docker host)
6. Review SSH configuration on host system

### Long-term

7. Consider enabling Tailscale for secure remote access
8. Set up automated security audits via cron
9. Implement backup verification procedures

---

## Update Status

| Component | Status |
|-----------|--------|
| OpenClaw | ✅ Up to date (2026.3.2) |
| Channel | stable |
| Install Method | pnpm |

---

## Audit History

| Date | Phase | Auditor | Notes |
|------|-------|---------|-------|
| 2026-03-07 | Phase 3A - Night 3 | Charles (AI) | Initial security audit, 4 critical issues identified |
| 2026-03-08 | Phase 3B - Night 4 | Charles (AI) | API keys audit, 7 secrets inventoried, rotation plan created |

---

## API Keys & Secrets Audit

**Audit Date**: 2026-03-08 04:00 UTC  
**Audit Type**: Phase 3B - API Keys & Secrets Rotation Plan  
**Auditor**: Charles (AI)

### Secrets Inventory

| Service | Key Type | Location | Risk Level | Rotation Priority |
|---------|----------|----------|------------|-------------------|
| Moonshot AI | API Key (`sk-MPsMx...`) | `openclaw.json` | 🔴 High | **Immediate** |
| Brave Search | API Key (`BSAKdgsp...`) | `openclaw.json` | 🟡 Medium | Quarterly |
| Telegram Bot | Bot Token (`8622191614:AAES...`) | `openclaw.json` | 🔴 High | **Immediate** |
| Gateway Auth | Bearer Token (`voD8JL7c...`) | `openclaw.json` | 🟡 Medium | Bi-annually |
| GitHub | PAT (`ghp_hgSNC...`) | `auth-profiles.json` | 🔴 High | **Immediate** |
| OpenAI | API Key (`sk-proj-1hV7...`) | `auth-profiles.json` | 🔴 High | **Immediate** |
| Google | App Password (`gggx mitx...`) | `auth-profiles.json` | 🔴 High | **Immediate** |

### Risk Assessment

#### 🔴 Critical Risks

1. **Plaintext Storage**: All API keys stored in plaintext JSON files
2. **No Encryption at Rest**: Secrets readable by any process with file access
3. **GitHub PAT Exposed**: Classic PAT with unknown scope permissions
4. **OpenAI Key**: Project-scoped key with unknown permissions
5. **Google App Password**: Full Gmail access via app-specific password
6. **Telegram Bot Token**: Complete bot control if leaked

#### 🟡 Medium Risks

7. **Brave Search Key**: Limited scope (search only), lower impact
8. **Gateway Token**: Local-only binding reduces exposure

### Secrets Rotation Plan

#### Phase 1: Immediate Rotation (Within 48 Hours)

| Service | Action | Steps |
|---------|--------|-------|
| **Moonshot AI** | Regenerate API Key | 1. Login to Moonshot console<br>2. Revoke existing key<br>3. Generate new key<br>4. Update `openclaw.json`<br>5. Restart OpenClaw |
| **Telegram Bot** | Revoke & Regenerate | 1. Message @BotFather<br>2. Use `/revoke` command<br>3. Copy new token<br>4. Update `openclaw.json`<br>5. Restart OpenClaw |
| **GitHub** | Create Fine-Grained PAT | 1. Go to Settings → Developer settings<br>2. Delete existing classic PAT<br>3. Create fine-grained PAT with minimal scopes<br>4. Update `auth-profiles.json` |
| **OpenAI** | Rotate Project Key | 1. Login to OpenAI Platform<br>2. Navigate to API Keys<br>3. Revoke and create new key<br>4. Update `auth-profiles.json` |
| **Google** | Regenerate App Password | 1. Go to Google Account → Security<br>2. Revoke existing app password<br>3. Generate new one for "Charles AI"<br>4. Update `auth-profiles.json` |

#### Phase 2: Short-term Improvements (Within 1 Week)

1. **Implement Secrets Encryption**
   - Use OpenClaw's built-in credential encryption if available
   - Consider external secret management (HashiCorp Vault, AWS Secrets Manager)

2. **Enable Key Rotation Automation**
   - Set calendar reminders for quarterly rotation
   - Document rotation procedures in runbook

3. **Scope Reduction**
   - Review and minimize GitHub PAT permissions
   - Use repository-specific tokens instead of account-wide
   - Restrict OpenAI key to specific projects/models

#### Phase 3: Long-term Security (Within 1 Month)

1. **Environment Variable Migration**
   - Move secrets from JSON files to environment variables
   - Use `.env` files with proper `.gitignore` protection
   - Never commit secrets to version control

2. **Secret Scanning**
   - Install pre-commit hooks to prevent secret commits
   - Use `git-secrets` or `truffleHog` for scanning

3. **Access Logging**
   - Enable audit logging for API key usage where supported
   - Monitor for anomalous access patterns

### Rotation Schedule

| Service | Frequency | Next Rotation | Owner |
|---------|-----------|---------------|-------|
| Moonshot AI | Quarterly | 2026-06-08 | John |
| OpenAI | Quarterly | 2026-06-08 | John |
| GitHub PAT | Bi-annually | 2026-09-08 | John |
| Telegram Bot | Bi-annually | 2026-09-08 | John |
| Google App Password | Bi-annually | 2026-09-08 | John |
| Brave Search | Annually | 2027-03-08 | John |
| Gateway Token | Annually | 2027-03-08 | John |

### Key Management Best Practices

1. **Never share keys** via messaging, email, or version control
2. **Rotate immediately** if any key is suspected of being compromised
3. **Use least-privilege** - grant minimum necessary permissions
4. **Monitor usage** - review API dashboards for unexpected activity
5. **Backup securely** - keep encrypted backup of current keys before rotation

---

## Notes

- This is a containerized deployment; some security controls (firewall, SSH) must be managed at the host level
- Current trust model assumes single trusted operator
- Browser control is enabled - ensure 2FA on all important accounts
- No systemd services detected (container environment)
- **CRITICAL**: All API keys are currently stored in plaintext - encryption should be prioritized
