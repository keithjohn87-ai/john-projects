# ContractorPro Development Guide

## Quick Deploy
```bash
./deploy.sh "your commit message"
```

## Project Structure
```
/root/.openclaw/workspace/
├── index.html              # Main landing page
├── css/                    # Stylesheets
├── js/                     # JavaScript
│   ├── app.js             # Main app logic
│   ├── stripe-config.js   # Payment processing
│   └── delivery-config.js # Product delivery
├── products/              # Product files
│   └── packages/          # Downloadable packages
├── images/                # Assets
├── .github/workflows/     # Auto-deployment
└── deploy.sh              # Quick deploy script
```

## Domain Setup
- **Production:** https://contrpro.com
- **Hosting:** GitHub Pages (free, auto-deploys on push)
- **DNS:** Cloudflare (recommended for future)

## Future-Ready Infrastructure

### When you need more:

1. **Backend/API** → Add `api/` folder, deploy to:
   - Vercel Functions (serverless)
   - Railway/Render (full backend)
   - AWS Lambda

2. **Database** → Options:
   - Supabase (PostgreSQL, free tier)
   - Firebase (NoSQL)
   - PlanetScale (MySQL)

3. **User Accounts** → Add:
   - Auth0 or Clerk for authentication
   - JWT tokens for API security

4. **Custom Server** → Keep domain, switch hosting:
   - VPS (DigitalOcean, Linode): $5-10/month
   - Keep GitHub Pages for static, VPS for API

## Current Capabilities
✅ Static site hosting
✅ Stripe checkout (client-side)
✅ Email delivery (EmailJS)
✅ Auto-deployment on push
✅ Domain + SSL

## Next Steps When Ready
- [ ] Enable Stripe live mode
- [ ] Set up user account system
- [ ] Add admin dashboard
- [ ] Implement analytics

## Deployment
Every push to `master` branch automatically deploys to contrpro.com within 30 seconds.