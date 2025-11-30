# How to Fix "The recipients address is empty" Error

This error means EmailJS doesn't know where to send the email. Here's how to fix it:

## The Problem

EmailJS needs the recipient email address in a specific way:
1. Set in the template's "To Email" field in EmailJS Dashboard
2. OR passed as a template parameter that matches the template settings

## Solution: Configure Template Settings

### Step 1: Go to EmailJS Dashboard

1. Go to https://dashboard.emailjs.com/
2. Click on **Email Templates**
3. Open your template (either user or owner template)

### Step 2: Configure "To Email" Field

1. In the template editor, look for **Settings** or **Template Settings**
2. Find the **"To Email"** field
3. Set it to use a variable: `{{to_email}}` 
   - OR whatever variable name you want to use (like `{{email_to}}` or `{{to}}`)

### Step 3: Make Sure Template Settings Match

**For User Template (sending to user's email):**
- "To Email" field: `{{to_email}}`
- "From Name": `DivIdeas Team` (or `{{from_name}}`)
- "Reply To": `rchandrashaker292004@gmail.com` (or `{{reply_to}}`)

**For Owner Template (sending to rchandrashaker292004@gmail.com):**
- "To Email" field: `{{to_email}}` 
  - OR hardcode it to: `rchandrashaker292004@gmail.com`
- "From Name": `{{from_name}}`
- "Reply To": `{{from_email}}` (user's email)

### Step 4: Update Template Content (Optional)

If you're using variables in the email body, make sure they match:

**User Template Example:**
```
To: {{to_email}}
Subject: {{subject}}

{{message}}

Meeting Date: {{meeting_date}}
Meeting Time: {{meeting_time}}
Purpose: {{purpose}}
Google Meet: {{meet_link}}

{{ics_content}}
```

**Owner Template Example:**
```
To: {{to_email}}
From: {{from_email}}

{{message}}

Meeting Date: {{meeting_date}}
Meeting Time: {{meeting_time}}
Purpose: {{purpose}}
Google Meet: {{meet_link}}
```

## Alternative: Hardcode Recipient in Template

If you always send to the same email, you can hardcode it:

1. In template settings, set "To Email" to: `rchandrashaker292004@gmail.com`
2. Then you don't need to pass `to_email` in parameters
3. BUT this only works if the recipient is always the same

## Important Notes

1. **The "To Email" field in template settings is REQUIRED** - EmailJS won't send without it
2. **Variable names are case-sensitive** - `{{to_email}}` ≠ `{{To_Email}}`
3. **Restart your app** after changing template settings
4. **Test in EmailJS dashboard first** - Use the "Test" button to verify your template works

## Quick Test

1. In EmailJS Dashboard → Template → Click "Test" button
2. Fill in test values for all variables
3. Send test email
4. If test works but app doesn't, the parameter names don't match

## Still Not Working?

1. Check EmailJS service is active
2. Verify the "To Email" field is set in template settings
3. Make sure variable name in "To Email" matches what's in templateParams
4. Check console logs to see what parameters are being sent
5. Try hardcoding the recipient email in template settings as a test

