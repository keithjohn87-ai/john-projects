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

---

## Notes

- This is a containerized deployment; some security controls (firewall, SSH) must be managed at the host level
- Current trust model assumes single trusted operator
- Browser control is enabled - ensure 2FA on all important accounts
- No systemd services detected (container environment)
