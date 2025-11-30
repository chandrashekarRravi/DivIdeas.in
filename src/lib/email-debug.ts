/**
 * Debug utility for EmailJS
 * Use this to test if your EmailJS credentials are working
 */

import emailjs from '@emailjs/browser';

export const testEmailJS = async (
  publicKey: string,
  serviceId: string,
  templateId: string
) => {
  try {
    emailjs.init(publicKey);
    
    const testParams = {
      to_email: 'rchandrashaker292004@gmail.com',
      subject: 'Test Email from DivIdeas',
      message: 'This is a test email to verify EmailJS is working correctly.',
      meeting_date: 'Test Date',
      meeting_time: 'Test Time',
      purpose: 'Testing EmailJS Configuration',
      meet_link: 'https://meet.google.com/test',
      ics_content: '',
      from_email: 'rchandrashaker292004@gmail.com',
      from_name: 'DivIdeas Team',
      user_email: 'rchandrashaker292004@gmail.com',
      meetLink: 'https://meet.google.com/test',
    };

    console.log('Testing EmailJS with:', {
      publicKey: publicKey.substring(0, 10) + '...',
      serviceId,
      templateId,
    });

    const response = await emailjs.send(serviceId, templateId, testParams);
    
    console.log('✅ EmailJS test successful!', response);
    return { success: true, response };
  } catch (error: any) {
    console.error('❌ EmailJS test failed:', error);
    return {
      success: false,
      error: {
        message: error?.message,
        text: error?.text,
        status: error?.status,
      },
    };
  }
};

// Helper to check if EmailJS is configured
export const checkEmailJSConfig = () => {
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateUser = import.meta.env.VITE_EMAILJS_TEMPLATE_USER_ID;
  const templateOwner = import.meta.env.VITE_EMAILJS_TEMPLATE_OWNER_ID;

  const config = {
    publicKey: publicKey || 'NOT SET',
    serviceId: serviceId || 'NOT SET',
    templateUser: templateUser || 'NOT SET',
    templateOwner: templateOwner || 'NOT SET',
  };

  console.log('📧 EmailJS Configuration Check:', config);

  const allSet = publicKey && serviceId && templateUser && templateOwner;
  
  if (!allSet) {
    console.warn('⚠️ EmailJS is not fully configured. Please check your .env file.');
  }

  return { config, allSet };
};

