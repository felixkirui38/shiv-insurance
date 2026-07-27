import net from "net";
import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";
import type { FormSubmission } from "@shared/schema";
import { getLeadEmail } from "./cmsStorage";

const COMPANY_NAME = "Shiv Insurance Brokers Ltd";

export function isSmtpConfigured(): boolean {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

function smtpPort(): number {
  return parseInt(process.env.SMTP_PORT || "465", 10);
}

function smtpSecure(port = smtpPort()): boolean {
  return process.env.SMTP_SECURE === "true" ||
    (process.env.SMTP_SECURE !== "false" && port === 465);
}

/** Hosts to try when Docker cannot reach the public mail hostname / IP. */
function smtpHostCandidates(): string[] {
  const primary = (process.env.SMTP_HOST || "").trim();
  const extras = (process.env.SMTP_HOST_FALLBACKS || "")
    .split(",")
    .map((h) => h.trim())
    .filter(Boolean);

  const defaults = [
    "host.docker.internal",
    "172.17.0.1",
    "172.18.0.1",
    "172.19.0.1",
    "10.0.0.1",
    "127.0.0.1",
  ];

  return [...new Set([primary, ...extras, ...defaults].filter(Boolean))];
}

function canConnect(host: string, port: number, timeoutMs = 2500): Promise<boolean> {
  return new Promise((resolve) => {
    const socket = net.connect({ host, port });
    const done = (ok: boolean) => {
      socket.removeAllListeners();
      socket.destroy();
      resolve(ok);
    };
    socket.setTimeout(timeoutMs);
    socket.once("connect", () => done(true));
    socket.once("timeout", () => done(false));
    socket.once("error", () => done(false));
  });
}

let resolvedSmtpHost: string | null = null;

export async function resolveReachableSmtpHost(): Promise<string | null> {
  if (resolvedSmtpHost) return resolvedSmtpHost;
  if (!isSmtpConfigured()) return null;

  const port = smtpPort();
  const candidates = smtpHostCandidates();

  for (const host of candidates) {
    const ok = await canConnect(host, port);
    if (ok) {
      resolvedSmtpHost = host;
      console.log(`[smtp] Using reachable host ${host}:${port}`);
      return host;
    }
    console.warn(`[smtp] Unreachable ${host}:${port}`);
  }

  return null;
}

export function getSmtpStatus() {
  const configured = isSmtpConfigured();
  const port = smtpPort();
  return {
    configured,
    host: resolvedSmtpHost || process.env.SMTP_HOST || null,
    port: configured ? port : null,
    user: process.env.SMTP_USER || null,
    secure: smtpSecure(port),
  };
}

function buildTransporter(host: string): Transporter {
  const port = smtpPort();
  const secure = smtpSecure(port);

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER!,
      pass: process.env.SMTP_PASS!,
    },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 20000,
    tls: {
      // cPanel certs often don't match Docker gateway IPs / host.docker.internal
      rejectUnauthorized: process.env.SMTP_TLS_REJECT_UNAUTHORIZED === "true",
      minVersion: "TLSv1.2",
      servername: process.env.SMTP_TLS_SERVERNAME || process.env.SMTP_HOST || host,
    },
    requireTLS: !secure && port === 587,
  });
}

async function createTransporter(): Promise<Transporter | null> {
  if (!isSmtpConfigured()) {
    console.warn("SMTP credentials not configured. Emails will not be sent.");
    return null;
  }

  const host = await resolveReachableSmtpHost();
  if (!host) {
    console.error(
      "[smtp] No reachable SMTP host. From Coolify set Network Mode to Host and SMTP_HOST=127.0.0.1, or open CSF for Docker → Exim.",
    );
    return null;
  }

  return buildTransporter(host);
}

const formatFormData = (data: FormSubmission): string => {
  return `
Form Name: ${data.formName}
-----------------------------------
Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phone}
${data.insuranceType ? `Insurance Type: ${data.insuranceType}` : ""}
-----------------------------------
Message:
${data.message}
-----------------------------------
Submitted: ${new Date().toLocaleString("en-KE", { timeZone: "Africa/Nairobi" })}
  `.trim();
};

function fromAddress() {
  const fromEmail = process.env.SMTP_FROM || process.env.SMTP_USER || "noreply@shivinsbro.co.ke";
  return `"${COMPANY_NAME} Website" <${fromEmail}>`;
}

export const sendFormNotification = async (
  data: FormSubmission,
): Promise<{ success: boolean; message: string; configured: boolean }> => {
  const transporter = await createTransporter();
  const companyEmail = await getLeadEmail();

  const adminEmailContent = {
    from: fromAddress(),
    to: companyEmail,
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
      ${data.insuranceType ? `<div class="field"><span class="label">Insurance Type:</span> ${data.insuranceType}</div>` : ""}
      <div class="field">
        <span class="label">Message:</span>
        <div class="message-box">${data.message.replace(/\n/g, "<br>")}</div>
      </div>
    </div>
    <div class="footer">
      <p>Submitted on ${new Date().toLocaleString("en-KE", { timeZone: "Africa/Nairobi" })}</p>
      <p>To respond, simply reply to this email.</p>
    </div>
  </div>
</body>
</html>
    `.trim(),
  };

  const customerEmailContent = {
    from: fromAddress(),
    to: data.email,
    subject: `Thank you for contacting ${COMPANY_NAME}`,
    text: `
Dear ${data.firstName},

Thank you for reaching out to ${COMPANY_NAME}. We have received your inquiry and our team will get back to you shortly.

Here's a summary of your submission:
-----------------------------------
Form: ${data.formName}
${data.insuranceType ? `Insurance Type: ${data.insuranceType}` : ""}
Message: ${data.message}
-----------------------------------

If you have any urgent questions, please call us at +254 700 652 040 or email us at ${companyEmail}.

Best regards,
${COMPANY_NAME}
Westpark Towers, Mpesi Lane, Westlands, Nairobi

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
        ${data.insuranceType ? `<div class="summary-item"><strong>Insurance Type:</strong> ${data.insuranceType}</div>` : ""}
        <div class="summary-item"><strong>Message:</strong> ${data.message}</div>
      </div>

      <p>We typically respond within 1-2 business days. If you have urgent questions, please don't hesitate to contact us directly.</p>
    </div>
    
    <div class="contact-info">
      <p><strong>Need immediate assistance?</strong></p>
      <p>Call: +254 700 652 040</p>
      <p>Email: <a href="mailto:${companyEmail}">${companyEmail}</a></p>
    </div>
    
    <div class="footer">
      <p>${COMPANY_NAME}</p>
      <p>Westpark Towers, Mpesi Lane, Westlands, Nairobi</p>
      <p style="color: #999;">This is an automated confirmation email.</p>
    </div>
  </div>
</body>
</html>
    `.trim(),
  };

  if (!transporter) {
    console.log("=== Form Submission (SMTP not reachable) ===");
    console.log("To (lead):", companyEmail);
    console.log("Customer confirmation would go to:", data.email);
    console.log("Subject:", adminEmailContent.subject);
    console.log("==============================================");
    return {
      success: false,
      configured: isSmtpConfigured(),
      message: isSmtpConfigured()
        ? "Inquiry saved, but SMTP host is unreachable from the app container (ECONNREFUSED). In Coolify set Network Mode to Host and SMTP_HOST=127.0.0.1, then redeploy."
        : "Inquiry saved, but SMTP is not configured on the server — emails were not sent",
    };
  }

  try {
    const [adminResult, customerResult] = await Promise.allSettled([
      transporter.sendMail(adminEmailContent),
      transporter.sendMail(customerEmailContent),
    ]);

    if (adminResult.status === "fulfilled") {
      console.log(`Admin notification sent to ${companyEmail}`);
    } else {
      console.error("Admin notification failed:", adminResult.reason);
    }

    if (customerResult.status === "fulfilled") {
      console.log(`Confirmation email sent to ${data.email}`);
    } else {
      console.error("Customer confirmation failed:", customerResult.reason);
    }

    if (adminResult.status === "rejected" && customerResult.status === "rejected") {
      const reason =
        adminResult.reason instanceof Error
          ? adminResult.reason.message
          : "SMTP send failed";
      return {
        success: false,
        configured: true,
        message: `Form saved but email sending failed: ${reason}`,
      };
    }

    if (adminResult.status === "rejected" || customerResult.status === "rejected") {
      return {
        success: false,
        configured: true,
        message:
          "Form saved, but one of the notification emails failed — check Coolify logs",
      };
    }

    return {
      success: true,
      configured: true,
      message: "Form submitted and emails sent successfully",
    };
  } catch (error) {
    console.error("Email sending failed:", error);
    return {
      success: false,
      configured: true,
      message:
        error instanceof Error
          ? `Form saved but email notification failed: ${error.message}`
          : "Form saved but email notification failed",
    };
  }
};

export async function verifySmtpConnection(): Promise<{
  ok: boolean;
  message: string;
}> {
  if (!isSmtpConfigured()) {
    return {
      ok: false,
      message: "SMTP_HOST, SMTP_USER, and SMTP_PASS are not all set",
    };
  }

  const host = await resolveReachableSmtpHost();
  if (!host) {
    return {
      ok: false,
      message:
        `No SMTP listener reachable on port ${smtpPort()} from this container. ` +
        "Coolify → Application → Network → set mode to Host, set SMTP_HOST=127.0.0.1, redeploy. " +
        "Or on the VPS enable CSF Docker support so containers can reach Exim.",
    };
  }

  try {
    const transporter = buildTransporter(host);
    await transporter.verify();
    return {
      ok: true,
      message: `SMTP connection verified via ${host}:${smtpPort()}`,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "SMTP verify failed";
    console.error("SMTP verify failed:", error);
    return { ok: false, message: `${message} (host ${host}:${smtpPort()})` };
  }
}
