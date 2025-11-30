# EmailJS Troubleshooting Guide

If emails are working on EmailJS platform but not from your app, follow these steps:

## Step 1: Check Browser Console

1. Open your browser's Developer Tools (F12)
2. Go to the Console tab
3. Look for any error messages when you click "Send Message"
4. Common errors:
   - `EmailJS not configured` - Credentials not loaded
   - `400 Bad Request` - Template ID or Service ID incorrect
   - `403 Forbidden` - Public Key incorrect or service not active

## Step 2: Verify Environment Variables

1. Check if `.env` file exists in project root
2. Make sure it contains:
   ```env
   VITE_EMAILJS_PUBLIC_KEY=your_actual_public_key
   VITE_EMAILJS_SERVICE_ID=your_actual_service_id
   VITE_EMAILJS_TEMPLATE_USER_ID=your_user_template_id
   VITE_EMAILJS_TEMPLATE_OWNER_ID=your_owner_template_id
   ```
3. **Restart your dev server** after adding/modifying `.env` file
4. Check console on page load - you should see configuration logged

## Step 3: Test with Direct Credentials

If environment variables aren't working, you can hardcode credentials for testing:

1. Open `src/lib/email-service.ts`
2. Comment out the environment variable lines:
   ```typescript
   // const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';
   ```
3. Uncomment and fill in the direct credentials:
   ```typescript
   const EMAILJS_PUBLIC_KEY = 'your_actual_public_key';
   const EMAILJS_SERVICE_ID = 'your_actual_service_id';
   const EMAILJS_TEMPLATE_USER_ID = 'your_user_template_id';
   const EMAILJS_TEMPLATE_OWNER_ID = 'your_owner_template_id';
   ```
4. Save and test again

## Step 4: Verify Template Parameters

Make sure your EmailJS templates use these exact parameter names:

**User Template Variables:**
- `{{to_email}}` or `{{user_email}}`
- `{{subject}}`
- `{{message}}`
- `{{meeting_date}}`
- `{{meeting_time}}`
- `{{purpose}}`
- `{{meet_link}}`
- `{{ics_content}}`

**Owner Template Variables:**
- `{{to_email}}`
- `{{subject}}`
- `{{message}}`
- `{{meeting_date}}`
- `{{meeting_time}}`
- `{{purpose}}`
- `{{meet_link}}`
- `{{from_email}}`
- `{{user_email}}`

## Step 5: Check EmailJS Service Status

1. Go to EmailJS Dashboard
2. Check if your service is "Active"
3. Verify the service email is correct: `rchandrashaker292004@gmail.com`
4. Test the service by sending a test email from EmailJS dashboard

## Step 6: Common Issues

### Issue: "Public Key Invalid"
- Solution: Copy the Public Key from EmailJS Account → General settings
- Make sure there are no extra spaces

### Issue: "Service ID Invalid"
- Solution: Check Email Services → Your service → Service ID
- Make sure it starts with `service_`

### Issue: "Template ID Invalid"
- Solution: Check Email Templates → Your template → Template ID
- Make sure it starts with `template_`
- Make sure template is published (not just saved as draft)

### Issue: Emails Work on EmailJS but not from App
- Check browser console for specific error messages
- Verify template parameters match exactly (case-sensitive)
- Make sure you're using the correct template ID for each email type

## Step 7: Test with Console Commands

Open browser console and run:

```javascript
// Check configuration
import { checkEmailJSConfig } from './lib/email-debug';
checkEmailJSConfig();

// Test email sending
import { testEmailJS } from './lib/email-debug';
testEmailJS(
  'your_public_key',
  'your_service_id',
  'your_template_id'
);
```

## Still Not Working?

1. Check EmailJS account limits (free tier: 200 emails/month)
2. Verify email addresses are correct
3. Check spam/junk folder
4. Try with a different email address
5. Contact EmailJS support if service shows as active but emails not sending

