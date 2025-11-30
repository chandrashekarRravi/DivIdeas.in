# EmailJS Setup Instructions

To enable automatic email sending, you need to set up EmailJS. Follow these steps:

## Step 1: Sign Up for EmailJS

1. Go to https://www.emailjs.com/
2. Sign up for a free account (200 emails/month free)

## Step 2: Create an Email Service

1. In EmailJS Dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose **Gmail** (or your preferred email provider)
4. Connect your Gmail account: `rchandrashaker292004@gmail.com`
5. Note down your **Service ID** (e.g., `service_xxxxx`)

## Step 3: Create Email Templates

You need to create **2 templates**:

### Template 1: User Confirmation Email

1. Go to **Email Templates** → **Create New Template**
2. Set **Template Name**: "Meeting Confirmation to User"
3. Set **Subject**: `Meeting Confirmation - {{meeting_date}} at {{meeting_time}}`
4. Set **Content**:
```
Hello,

Thank you for scheduling a meeting with us!

Meeting Details:
Date: {{meeting_date}}
Time: {{meeting_time}}

Purpose: {{purpose}}

Google Meet Link: {{meet_link}}

Calendar Invite (ICS file):
Please copy the content below and save it as a .ics file to add to your calendar:

---BEGIN ICS FILE---
{{ics_content}}
---END ICS FILE---

Instructions:
1. Copy everything between "---BEGIN ICS FILE---" and "---END ICS FILE---"
2. Paste it into a text file
3. Save it with a .ics extension (e.g., meeting.ics)
4. Double-click the file to add it to your calendar

We're looking forward to meeting with you!

Best regards,
DivIdeas Team
```
5. Note down the **Template ID** (e.g., `template_xxxxx`)

### Template 2: Owner Notification Email

1. Create another template
2. Set **Template Name**: "Meeting Request to Owner"
3. Set **Subject**: `Meeting Request from {{from_email}} - {{meeting_date}} at {{meeting_time}}`
4. Set **Content**:
```
Hello,

You have received a new meeting request:

From: {{from_email}}
Date: {{meeting_date}}
Time: {{meeting_time}}

Purpose of Meeting:
{{purpose}}

Google Meet Link: {{meet_link}}

Please confirm or suggest an alternative time if needed.

Best regards
```
5. Note down the **Template ID**

## Step 4: Get Your Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (e.g., `xxxxxxxxxxxxx`)
3. Copy it

## Step 5: Add Environment Variables

1. Create a `.env` file in the project root (if it doesn't exist)
2. Add these variables:

```env
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_USER_ID=your_user_template_id_here
VITE_EMAILJS_TEMPLATE_OWNER_ID=your_owner_template_id_here
```

3. Replace the values with your actual IDs

## Step 6: Restart Development Server

After adding environment variables:

```bash
npm run dev
```

## Alternative: Update Source Code Directly

If you don't want to use environment variables, you can directly edit `src/lib/email-service.ts` and replace:

- `YOUR_PUBLIC_KEY`
- `YOUR_SERVICE_ID`
- `YOUR_TEMPLATE_ID` (for both user and owner templates)

## Testing

1. Book a meeting through your app
2. Check your inbox at `rchandrashaker292004@gmail.com`
3. Check the user's email inbox
4. Both should receive emails automatically!

## Troubleshooting

- **Emails not sending**: Check browser console for errors
- **Template variables not working**: Make sure variable names match exactly (case-sensitive)
- **Rate limits**: Free tier allows 200 emails/month
- **Gmail not connecting**: Make sure you allow "Less secure apps" or use OAuth2

## Note

The free tier of EmailJS allows 200 emails per month. For production use with more emails, consider upgrading to a paid plan.

