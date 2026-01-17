# EmailJS Setup Guide - Real-Time Contact Form Notifications

## What is EmailJS?
EmailJS is a free service that sends emails directly from your website without needing a backend server. Perfect for portfolios and static sites!

---

## Step-by-Step Setup

### 1. Create a Free EmailJS Account
- Go to: https://www.emailjs.com
- Click "Sign Up Free"
- Complete registration (email + password)

### 2. Add Gmail as Email Service
- From dashboard, go to **Email Services** (left menu)
- Click **+ Add Service**
- Select **Gmail**
- Click **Connect with Gmail**
- Login with your Gmail account (chanduchandavath934@gmail.com)
- Authorize EmailJS to send emails from your Gmail
- Note the **Service ID** (looks like: `service_xxxxxxxxxx`)

### 3. Create Email Template
- Go to **Email Templates** (left menu)
- Click **+ Create New Template**
- Name it: `template_contact`
- In the **To Email** field, put: `{{to_email}}`
- In the **Subject** field, put: `New Message from {{from_name}} - {{subject}}`
- In the **Content** section, use this template:

```
Hello,

You have received a new message from your portfolio website.

From: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
Reply to: {{reply_to}}
```

- Click **Save**

### 4. Get Your Public Key
- Go to **Account** (top left dropdown)
- Copy your **Public Key** (looks like: `bBuN0Y5B0Z-Aq2aHb`)

### 5. Update Your Portfolio Code
- Open `script.js`
- Find this line (around line 200):
  ```javascript
  emailjs.init("bBuN0Y5B0Z-Aq2aHb");
  ```
- Replace `bBuN0Y5B0Z-Aq2aHb` with **your actual Public Key** from Step 4

### 6. Verify Service and Template IDs
- In `script.js`, look for this line (around line 223):
  ```javascript
  emailjs.send("service_portfolio", "template_contact", {
  ```
- `"service_portfolio"` = Your Service ID from Step 2
- `"template_contact"` = Your Template ID from Step 3
- Update if they're different

---

## How It Works

**When someone submits the contact form:**
1. ✓ They see "Sending..." on the button
2. ✓ EmailJS sends the message to your Gmail inbox instantly
3. ✓ They see "✓ Message sent successfully!" notification
4. ✓ Form resets automatically

**If something goes wrong:**
1. ✗ They see "✗ Failed to send message" notification
2. ✗ Check browser console (F12) for error details
3. ✗ Verify your Public Key and Service/Template IDs are correct

---

## Free Tier Limits
- **300 emails/month** (enough for most portfolios)
- No credit card required
- Upgrade anytime if you need more

---

## Testing the Form
1. Deploy your portfolio to any hosting (Netlify, Vercel, GitHub Pages, etc.)
2. Fill out the contact form
3. Submit and check your Gmail inbox within seconds
4. You should receive an email with all the details

---

## Troubleshooting

**"Failed to send message" error?**
- Check your Public Key is correct
- Verify Gmail service is connected
- Check that template variable names match exactly
- Open browser console (F12) to see detailed error message

**Not receiving emails?**
- Check Gmail spam folder
- Verify EmailJS service is connected to your Gmail
- Make sure the template is published

**Need help?**
- EmailJS docs: https://www.emailjs.com/docs/
- Contact support: support@emailjs.com

---

## Security Notes
- Public Key is safe to expose (it's public)
- Gmail account needs to authorize EmailJS once
- No private keys are stored in your code
- All communication is encrypted

---

## Next Steps
Once configured, your contact form will work perfectly when deployed! 🚀
