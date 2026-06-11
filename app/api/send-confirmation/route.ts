import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL || "admin@zth.com";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

interface BookingPayload {
  name: string;
  email: string;
  company: string;
  services: string[];
  message: string;
}

// ── Helper: User confirmation email HTML ──────────────────────────────────────
function buildUserEmail(data: BookingPayload): string {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>We received your inquiry</title>
  </head>
  <body style="margin:0;padding:0;background:#f4f7fb;font-family:'Inter',Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7fb;padding:48px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 40px rgba(0,0,0,0.08);">
            <!-- Header -->
            <tr>
              <td style="background:#0a0a0a;padding:36px 40px;text-align:center;">
                <img src="${APP_URL}/zth%20logo.png" alt="ZTH" height="60" style="display:block;margin:0 auto;" />
              </td>
            </tr>
            <!-- Blue accent bar -->
            <tr><td style="background:#1976D2;height:4px;"></td></tr>
            <!-- Body -->
            <tr>
              <td style="padding:48px 40px;">
                <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:0.25em;text-transform:uppercase;color:#1976D2;">/ INQUIRY RECEIVED</p>
                <h1 style="margin:0 0 24px;font-size:32px;font-weight:900;color:#1A1A1A;line-height:1.1;letter-spacing:-0.03em;">
                  Thank you, ${data.name}!
                </h1>
                <p style="margin:0 0 32px;font-size:15px;color:#555555;line-height:1.7;">
                  We've received your inquiry and our team will review it shortly. 
                  We typically respond within <strong>24 hours</strong>.
                </p>

                <!-- Summary card -->
                <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:12px;border:1px solid #e5e7eb;margin-bottom:32px;">
                  <tr><td style="padding:24px 28px;">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#888888;">Your Submission</p>
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;">
                      <tr><td style="padding:6px 0;font-size:13px;color:#888;width:120px;">Company</td><td style="padding:6px 0;font-size:14px;font-weight:600;color:#1A1A1A;">${data.company}</td></tr>
                      <tr><td style="padding:6px 0;font-size:13px;color:#888;">Services</td><td style="padding:6px 0;font-size:14px;font-weight:600;color:#1976D2;">${data.services.join(", ")}</td></tr>
                    </table>
                  </td></tr>
                </table>

                <p style="margin:0 0 36px;font-size:14px;color:#888888;line-height:1.6;">
                  If you need urgent assistance, you can reply directly to this email.
                </p>

                <!-- CTA Button -->
                <a href="${APP_URL}" style="display:inline-block;padding:14px 32px;background:#1976D2;color:#ffffff;text-decoration:none;border-radius:100px;font-weight:700;font-size:14px;letter-spacing:0.02em;">
                  Visit ZTH Website →
                </a>
              </td>
            </tr>
            <!-- Footer -->
            <tr>
              <td style="background:#f8fafc;padding:24px 40px;border-top:1px solid #e5e7eb;text-align:center;">
                <p style="margin:0;font-size:12px;color:#aaaaaa;line-height:1.6;">
                  © ${new Date().getFullYear()} ZTH. All rights reserved.<br />
                  You received this because you submitted an inquiry on our website.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}

// ── Helper: Admin notification email HTML ─────────────────────────────────────
function buildAdminEmail(data: BookingPayload): string {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head><meta charset="UTF-8" /><title>New Booking Alert</title></head>
  <body style="margin:0;padding:0;background:#f4f7fb;font-family:'Inter',Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7fb;padding:48px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 40px rgba(0,0,0,0.08);">
            <tr><td style="background:#0a0a0a;padding:24px 32px;">
              <p style="margin:0;font-size:12px;font-weight:700;letter-spacing:0.25em;text-transform:uppercase;color:#1976D2;">/ NEW BOOKING ALERT</p>
            </td></tr>
            <tr><td style="background:#1976D2;height:3px;"></td></tr>
            <tr>
              <td style="padding:36px 40px;">
                <h2 style="margin:0 0 24px;font-size:22px;font-weight:800;color:#1A1A1A;">New Inquiry Received</h2>
                <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  <tr style="background:#f8fafc;">
                    <td style="padding:12px 16px;font-size:13px;color:#555;font-weight:600;width:130px;border:1px solid #e5e7eb;">Name</td>
                    <td style="padding:12px 16px;font-size:14px;color:#1A1A1A;font-weight:700;border:1px solid #e5e7eb;">${data.name}</td>
                  </tr>
                  <tr>
                    <td style="padding:12px 16px;font-size:13px;color:#555;font-weight:600;border:1px solid #e5e7eb;">Email</td>
                    <td style="padding:12px 16px;font-size:14px;color:#1976D2;border:1px solid #e5e7eb;"><a href="mailto:${data.email}" style="color:#1976D2;">${data.email}</a></td>
                  </tr>
                  <tr style="background:#f8fafc;">
                    <td style="padding:12px 16px;font-size:13px;color:#555;font-weight:600;border:1px solid #e5e7eb;">Company</td>
                    <td style="padding:12px 16px;font-size:14px;color:#1A1A1A;border:1px solid #e5e7eb;">${data.company}</td>
                  </tr>
                  <tr>
                    <td style="padding:12px 16px;font-size:13px;color:#555;font-weight:600;border:1px solid #e5e7eb;">Services</td>
                    <td style="padding:12px 16px;font-size:14px;color:#1976D2;font-weight:600;border:1px solid #e5e7eb;">${data.services.join(", ")}</td>
                  </tr>
                  <tr style="background:#f8fafc;">
                    <td style="padding:12px 16px;font-size:13px;color:#555;font-weight:600;border:1px solid #e5e7eb;vertical-align:top;">Message</td>
                    <td style="padding:12px 16px;font-size:14px;color:#1A1A1A;border:1px solid #e5e7eb;line-height:1.6;">${data.message}</td>
                  </tr>
                </table>
                <div style="margin-top:28px;">
                  <a href="${APP_URL}/admin" style="display:inline-block;padding:12px 28px;background:#1976D2;color:#ffffff;text-decoration:none;border-radius:100px;font-weight:700;font-size:13px;">
                    Open Admin Panel →
                  </a>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}

// ── Route Handler ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const data: BookingPayload = await req.json();

    if (!data.email || !data.name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const results = await Promise.allSettled([
      // 1. Confirmation to the user
      resend.emails.send({
        from: "ZTH <noreply@zth.com>",
        to: [data.email],
        subject: "We received your inquiry — ZTH",
        html: buildUserEmail(data),
      }),
      // 2. Notification to admin
      resend.emails.send({
        from: "ZTH Bookings <noreply@zth.com>",
        to: [ADMIN_EMAIL],
        subject: `🔔 New Inquiry: ${data.name} from ${data.company}`,
        html: buildAdminEmail(data),
      }),
    ]);

    const [userResult, adminResult] = results;

    return NextResponse.json({
      success: true,
      userEmailSent: userResult.status === "fulfilled",
      adminEmailSent: adminResult.status === "fulfilled",
    });
  } catch (error: unknown) {
    console.error("send-confirmation error:", error);
    return NextResponse.json(
      { error: "Failed to send emails" },
      { status: 500 }
    );
  }
}
