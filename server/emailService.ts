import nodemailer from 'nodemailer';
import type { FormSubmission } from '@shared/schema';

const COMPANY_EMAIL = 'info@shivinsurance.co.ke';
const COMPANY_NAME = 'Shiv Insurance Brokers Ltd';

const createTransporter = () => {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587');
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    console.warn('SMTP credentials not configured. Emails will be logged but not sent.');
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
};

const formatFormData = (data: FormSubmission): string => {
  return `
Form Name: ${data.formName}
-----------------------------------
Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phone}
${data.insuranceType ? `Insurance Type: ${data.insuranceType}` : ''}
-----------------------------------
Message:
${data.message}
-----------------------------------
Submitted: ${new Date().toLocaleString('en-KE', { timeZone: 'Africa/Nairobi' })}
  `.trim();
};

export const sendFormNotification = async (data: FormSubmission): Promise<{ success: boolean; message: string }> => {
  const transporter = createTransporter();
  
  const adminEmailContent = {
    from: `"${COMPANY_NAME} Website" <${process.env.SMTP_USER || 'noreply@shivinsurance.co.ke'}>`,
    to: COMPANY_EMAIL,
    replyTo: data.email,
    subject: `[${data.formName}] New Inquiry from ${data.firstName} ${data.lastName}`,
    text: `
New form submission received from your website.

${formatFormData(data)}

---
This email was sent automatically from the ${COMPANY_NAME} website.
To respond, simply reply to this email.
    `.trim(),
    html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #292c8d; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; background: #f9f9f9; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #292c8d; }
    .message-box { background: white; padding: 15px; border-left: 4px solid #292c8d; margin-top: 10px; }
    .footer { text-align: center; padding: 15px; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>New ${data.formName} Submission</h2>
    </div>
    <div class="content">
      <div class="field">
        <span class="label">Name:</span> ${data.firstName} ${data.lastName}
      </div>
      <div class="field">
        <span class="label">Email:</span> <a href="mailto:${data.email}">${data.email}</a>
      </div>
      <div class="field">
        <span class="label">Phone:</span> ${data.phone}
      </div>
      ${data.insuranceType ? `<div class="field"><span class="label">Insurance Type:</span> ${data.insuranceType}</div>` : ''}
      <div class="field">
        <span class="label">Message:</span>
        <div class="message-box">${data.message.replace(/\n/g, '<br>')}</div>
      </div>
    </div>
    <div class="footer">
      <p>Submitted on ${new Date().toLocaleString('en-KE', { timeZone: 'Africa/Nairobi' })}</p>
      <p>To respond, simply reply to this email.</p>
    </div>
  </div>
</body>
</html>
    `.trim(),
  };

  const customerEmailContent = {
    from: `"${COMPANY_NAME}" <${process.env.SMTP_USER || 'noreply@shivinsurance.co.ke'}>`,
    to: data.email,
    subject: `Thank you for contacting ${COMPANY_NAME}`,
    text: `
Dear ${data.firstName},

Thank you for reaching out to ${COMPANY_NAME}. We have received your inquiry and our team will get back to you shortly.

Here's a summary of your submission:
-----------------------------------
Form: ${data.formName}
${data.insuranceType ? `Insurance Type: ${data.insuranceType}` : ''}
Message: ${data.message}
-----------------------------------

If you have any urgent questions, please call us at +254 20 2724885 or email us at ${COMPANY_EMAIL}.

Best regards,
${COMPANY_NAME}
Mezzanine 2, Real Towers, Upper Hill
Nairobi, Kenya

---
This is an automated confirmation email. Please do not reply directly to this message.
    `.trim(),
    html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #292c8d; color: white; padding: 30px; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; }
    .content { padding: 30px; background: #ffffff; }
    .summary { background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .summary-item { margin-bottom: 10px; }
    .contact-info { background: #292c8d; color: white; padding: 20px; text-align: center; margin-top: 20px; }
    .contact-info a { color: #d4666b; }
    .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Thank You, ${data.firstName}!</h1>
      <p>We've received your inquiry</p>
    </div>
    <div class="content">
      <p>Dear ${data.firstName},</p>
      <p>Thank you for reaching out to <strong>${COMPANY_NAME}</strong>. We have received your inquiry and our team will review it shortly.</p>
      
      <div class="summary">
        <h3 style="color: #292c8d; margin-top: 0;">Your Submission Summary</h3>
        <div class="summary-item"><strong>Form:</strong> ${data.formName}</div>
        ${data.insuranceType ? `<div class="summary-item"><strong>Insurance Type:</strong> ${data.insuranceType}</div>` : ''}
        <div class="summary-item"><strong>Message:</strong> ${data.message}</div>
      </div>

      <p>We typically respond within 1-2 business days. If you have urgent questions, please don't hesitate to contact us directly.</p>
    </div>
    
    <div class="contact-info">
      <p><strong>Need immediate assistance?</strong></p>
      <p>Call: +254 20 2724885</p>
      <p>Email: <a href="mailto:${COMPANY_EMAIL}">${COMPANY_EMAIL}</a></p>
    </div>
    
    <div class="footer">
      <p>${COMPANY_NAME}</p>
      <p>Mezzanine 2, Real Towers, Upper Hill, Nairobi, Kenya</p>
      <p style="color: #999;">This is an automated confirmation email.</p>
    </div>
  </div>
</body>
</html>
    `.trim(),
  };

  if (!transporter) {
    console.log('=== Form Submission (SMTP not configured) ===');
    console.log('To:', COMPANY_EMAIL);
    console.log('Subject:', adminEmailContent.subject);
    console.log('Reply-To:', data.email);
    console.log('Content:', formatFormData(data));
    console.log('==============================================');
    return { success: true, message: 'Form submitted successfully (email logging mode)' };
  }

  try {
    await transporter.sendMail(adminEmailContent);
    console.log(`Admin notification sent to ${COMPANY_EMAIL}`);
    
    await transporter.sendMail(customerEmailContent);
    console.log(`Confirmation email sent to ${data.email}`);
    
    return { success: true, message: 'Form submitted and emails sent successfully' };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, message: 'Form saved but email notification failed' };
  }
};
