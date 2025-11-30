/**
 * Email service using EmailJS for sending emails automatically
 * 
 * Setup Instructions:
 * 1. Sign up at https://www.emailjs.com/
 * 2. Create an email service (Gmail/Outlook/etc.)
 * 3. Create an email template with these variables:
 *    - {{user_email}}
 *    - {{user_name}}
 *    - {{meeting_date}}
 *    - {{meeting_time}}
 *    - {{meeting_purpose}}
 *    - {{meet_link}}
 *    - {{ics_content}}
 * 4. Get your Public Key, Service ID, and Template ID
 * 5. Add them to environment variables or replace in this file
 */

import emailjs from '@emailjs/browser';

// EmailJS Configuration
// Option 1: Use environment variables (recommended for production)
// Option 2: Directly set your credentials here for testing
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_USER_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_USER_ID || 'YOUR_TEMPLATE_ID';
const EMAILJS_TEMPLATE_OWNER_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_OWNER_ID || 'YOUR_TEMPLATE_ID';

// For testing: Uncomment and fill in your credentials below
// const EMAILJS_PUBLIC_KEY = 'your_public_key_here';
// const EMAILJS_SERVICE_ID = 'your_service_id_here';
// const EMAILJS_TEMPLATE_USER_ID = 'your_user_template_id_here';
// const EMAILJS_TEMPLATE_OWNER_ID = 'your_owner_template_id_here';

// Log configuration on load (in development only)
if (import.meta.env.DEV) {
  console.log('📧 EmailJS Configuration:', {
    publicKey: EMAILJS_PUBLIC_KEY?.substring(0, 10) + '...' || 'NOT SET',
    serviceId: EMAILJS_SERVICE_ID || 'NOT SET',
    templateUser: EMAILJS_TEMPLATE_USER_ID || 'NOT SET',
    templateOwner: EMAILJS_TEMPLATE_OWNER_ID || 'NOT SET',
  });
}

interface SendEmailParams {
  toEmail: string;
  subject: string;
  body: string;
  meetingDate: string;
  meetingTime: string;
  purpose: string;
  meetLink: string;
  icsContent?: string;
}

/**
 * Send email using EmailJS
 */
export const sendEmail = async (params: SendEmailParams): Promise<boolean> => {
  try {
    // Check if EmailJS is configured
    if (EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY' || EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID' || EMAILJS_TEMPLATE_USER_ID === 'YOUR_TEMPLATE_ID') {
      console.error('EmailJS not configured. Please set environment variables or update email-service.ts');
      return false;
    }

    // Initialize EmailJS (only needed once, but safe to call multiple times)
    emailjs.init(EMAILJS_PUBLIC_KEY);

    // Prepare template parameters
    // CRITICAL: EmailJS Gmail service requires the recipient email to be in the template settings
    // OR use the exact variable name that matches your template's "To Email" field
    // 
    // In EmailJS Dashboard → Template → Settings → "To Email" field
    // You must set it to: {{to_email}} or {{email_to}} or whatever variable name you use
    const templateParams: Record<string, any> = {
      // RECIPIENT EMAIL - This MUST match what you set in EmailJS template "To Email" field
      to_email: params.toEmail,
      email_to: params.toEmail,
      to: params.toEmail,
      user_email: params.toEmail,
      recipient_email: params.toEmail,
      
      // Email subject
      subject: params.subject,
      email_subject: params.subject,
      
      // Email body/content
      message: params.body,
      body: params.body,
      email_body: params.body,
      html: params.body,
      
      // Meeting-specific fields
      meeting_date: params.meetingDate,
      meeting_time: params.meetingTime,
      purpose: params.purpose,
      meet_link: params.meetLink,
      meetLink: params.meetLink,
      meeting_link: params.meetLink,
      ics_content: params.icsContent || '',
      
      // Sender fields
      from_email: 'rchandrashaker292004@gmail.com',
      from: 'rchandrashaker292004@gmail.com',
      from_name: 'DivIdeas Team',
      reply_to: 'rchandrashaker292004@gmail.com',
    };
    
    // Log what we're sending for debugging
    console.log('Template parameters being sent:', {
      to_email: templateParams.to_email,
      subject: templateParams.subject,
      has_message: !!templateParams.message,
      other_params: Object.keys(templateParams).filter(k => !['to_email', 'subject', 'message'].includes(k)),
    });

    console.log('Sending email with params:', {
      serviceId: EMAILJS_SERVICE_ID,
      templateId: EMAILJS_TEMPLATE_USER_ID,
      to: params.toEmail,
    });

    // Send email
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_USER_ID,
      templateParams
    );

    console.log('Email sent successfully:', response);
    return true;
  } catch (error: any) {
    console.error('Error sending email:', error);
    console.error('Error details:', {
      message: error?.message,
      text: error?.text,
      status: error?.status,
    });
    
    // 422 usually means template parameters don't match
    if (error?.status === 422) {
      console.error('⚠️ 422 Error: Template parameters mismatch!');
      console.error('Template expects certain parameters. Check your EmailJS template variables.');
      console.error('Check your EmailJS template and make sure parameter names match exactly.');
      console.error('See FIX_422_ERROR.md for help.');
    }
    
    return false;
  }
};

/**
 * Send email to site owner
 */
export const sendEmailToOwner = async (params: SendEmailParams): Promise<boolean> => {
  try {
    // Check if EmailJS is configured
    if (EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY' || EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID' || EMAILJS_TEMPLATE_OWNER_ID === 'YOUR_TEMPLATE_ID') {
      console.error('EmailJS not configured. Please set environment variables or update email-service.ts');
      return false;
    }

    emailjs.init(EMAILJS_PUBLIC_KEY);

    const templateParams: Record<string, any> = {
      // RECIPIENT EMAIL - This MUST match what you set in EmailJS template "To Email" field
      to_email: 'rchandrashaker292004@gmail.com',
      email_to: 'rchandrashaker292004@gmail.com',
      to: 'rchandrashaker292004@gmail.com',
      recipient_email: 'rchandrashaker292004@gmail.com',
      
      // Email subject
      subject: params.subject,
      email_subject: params.subject,
      
      // Email body/content
      message: params.body,
      body: params.body,
      email_body: params.body,
      html: params.body,
      
      // Meeting-specific fields
      meeting_date: params.meetingDate,
      meeting_time: params.meetingTime,
      purpose: params.purpose,
      meet_link: params.meetLink,
      meetLink: params.meetLink,
      meeting_link: params.meetLink,
      
      // Sender/requester fields
      from_email: params.toEmail,
      from: params.toEmail,
      from_name: params.toEmail.split('@')[0],
      user_email: params.toEmail,
      requester_email: params.toEmail,
      reply_to: params.toEmail,
    };
    
    // Log what we're sending for debugging
    console.log('Owner template parameters being sent:', {
      to_email: templateParams.to_email,
      subject: templateParams.subject,
      from_email: templateParams.from_email,
    });

    console.log('Sending email to owner with params:', {
      serviceId: EMAILJS_SERVICE_ID,
      templateId: EMAILJS_TEMPLATE_OWNER_ID,
      to: 'rchandrashaker292004@gmail.com',
    });

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_OWNER_ID,
      templateParams
    );

    console.log('Email to owner sent successfully:', response);
    return true;
  } catch (error: any) {
    console.error('Error sending email to owner:', error);
    console.error('Error details:', {
      message: error?.message,
      text: error?.text,
      status: error?.status,
    });
    
    // 422 usually means template parameters don't match
    if (error?.status === 422) {
      console.error('⚠️ 422 Error: Template parameters mismatch!');
      console.error('Template expects certain parameters. Check your EmailJS template variables.');
      console.error('Check your EmailJS template and make sure parameter names match exactly.');
      console.error('See FIX_422_ERROR.md for help.');
    }
    
    return false;
  }
};

/**
 * Fallback: Send email using FormData to a backend endpoint
 * This is an alternative if EmailJS is not set up
 */
export const sendEmailViaBackend = async (
  endpoint: string,
  params: SendEmailParams
): Promise<boolean> => {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: params.toEmail,
        subject: params.subject,
        body: params.body,
        from: 'rchandrashaker292004@gmail.com',
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('Error sending email via backend:', error);
    return false;
  }
};

