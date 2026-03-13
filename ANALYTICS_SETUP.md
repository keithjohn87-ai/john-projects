# ContractorPro Analytics Setup

## Google Analytics 4 (Free)

### Setup Steps
1. Go to https://analytics.google.com
2. Create account: "ContractorPro"
3. Property name: "contrpro.com"
4. Industry: Construction
5. Timezone: EST

### Tracking Code
Add to all pages before </head>:
```javascript
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Key Events to Track
- Page views (all state pages)
- Pricing tier clicks
- Checkout initiations
- Purchase completions
- Download button clicks

## Hotjar (Free tier - 35 sessions/day)

### Setup
1. Go to https://www.hotjar.com
2. Sign up with CharlesCreatorAI@gmail.com
3. Add tracking code to site

### Value
- Heatmaps (where people click)
- Session recordings
- See where people drop off

## Stripe Dashboard Analytics

### Built-in Metrics
- Revenue
- Conversion rate
- Average order value
- Failed payments

## Simple Tracking Spreadsheet

Create Google Sheet with columns:
- Date
- Site visitors
- Checkout starts
- Completed purchases
- Revenue
- Traffic source

Update weekly.

## Implementation Priority
1. Google Analytics (essential)
2. Stripe dashboard (already there)
3. Hotjar (nice to have)
4. Spreadsheet (backup tracking)

## Next Steps
1. John creates GA4 account
2. Gets tracking ID
3. I add code to all pages
4. Verify data is flowing
