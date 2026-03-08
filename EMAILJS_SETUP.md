# EmailJS Setup Guide for ContractorPro

## Purpose
Automated product delivery via email after Stripe purchase

## Steps

### 1. Create EmailJS Account
- Go to https://www.emailjs.com/
- Sign up with CharlesCreatorAI@gmail.com
- Verify email

### 2. Create Email Service
- Click "Email Services" → "Add New Service"
- Select "Gmail" 
- Connect to CharlesCreatorAI@gmail.com
- Name it: "ContractorPro-Delivery"

### 3. Create Email Template
- Go to "Email Templates" → "Create New Template"
- Template name: "Product-Delivery"
- Subject: "Your ContractorPro {{tier_name}} - Download Inside"

**Email Body:**
```
Hi {{to_name}},

Thank you for purchasing the {{tier_name}} from ContractorPro!

Your download is ready:
{{download_link}}

What's included:
{{product_list}}

Need help? Reply to this email or contact support.

Best,
ContractorPro Team
```

### 4. Get API Keys
- Go to "Account" → "API Keys"
- Copy:
  - Public Key
  - Private Key (keep secret)
  - Service ID
  - Template ID

### 5. Add to Website
Add this script to checkout success page:
```javascript
emailjs.init("YOUR_PUBLIC_KEY");

emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
  to_name: customerName,
  tier_name: tierName,
  download_link: downloadUrl,
  product_list: productList,
  to_email: customerEmail
});
```

### 6. Test
- Send test email to yourself
- Verify download links work
- Check spam folder

## Cost
- Free tier: 200 emails/month
- Paid: $5/month for 2,000 emails

## Next Steps
1. John creates EmailJS account
2. Connects Gmail
3. Creates template
4. Gives me API keys
5. I integrate into site
