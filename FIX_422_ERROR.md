# How to Fix 422 Error from EmailJS

A 422 error means your template parameters don't match what's in your EmailJS template.

## Quick Fix Steps:

### 1. Check Your EmailJS Template Variables

Go to EmailJS Dashboard → Email Templates → Open your template

Look at what variables you're using, for example:
- `{{to_email}}`
- `{{subject}}`
- `{{message}}`

### 2. Match Parameter Names Exactly

The parameter names in `email-service.ts` must match EXACTLY (case-sensitive) with your template variables.

**Common Template Variable Names:**

For User Email Template:
- `{{to_email}}` or `{{email_to}}` or `{{to}}`
- `{{subject}}` or `{{email_subject}}`
- `{{message}}` or `{{body}}` or `{{email_body}}`
- `{{meeting_date}}`
- `{{meeting_time}}`
- `{{purpose}}`
- `{{meet_link}}` or `{{meetLink}}`
- `{{ics_content}}`

For Owner Email Template:
- `{{to_email}}`
- `{{subject}}`
- `{{message}}`
- `{{meeting_date}}`
- `{{meeting_time}}`
- `{{purpose}}`
- `{{meet_link}}`
- `{{from_email}}` or `{{user_email}}`

### 3. Update email-service.ts

I've added multiple variations of parameter names to cover common cases. But if your template uses different names, you need to update the code.

**Example:**
If your template uses `{{email}}` instead of `{{to_email}}`, update the code:

```typescript
const templateParams = {
  email: params.toEmail,  // Match your template
  // ... other fields
};
```

### 4. Minimal Template Test

Create a simple test template with just:
```
To: {{to_email}}
Subject: {{subject}}
Message: {{message}}
```

If this works, gradually add more variables.

### 5. Check Template Syntax

Make sure your EmailJS template uses correct syntax:
- Variables: `{{variable_name}}`
- No spaces: `{{variable_name}}` not `{{ variable_name }}`
- Case sensitive: `{{To_Email}}` ≠ `{{to_email}}`

### 6. Verify in EmailJS Dashboard

1. Go to your template
2. Click "Test" button
3. See what parameters it expects
4. Make sure those match what we're sending

The code now sends multiple variations of parameter names, so it should work with most common template setups. But if your template uses specific names, update the code to match exactly.

