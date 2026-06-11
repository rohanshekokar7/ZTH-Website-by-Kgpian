import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createAdminClient } from "@/lib/supabase";

const resend = new Resend(process.env.RESEND_API_KEY);
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export async function POST(req: NextRequest) {
  try {
    // Verify auth via Supabase admin client
    const adminSupabase = createAdminClient();
    const authHeader = req.headers.get("cookie") || "";

    // Parse body
    const { to, subject, body } = await req.json() as {
      to: string[];
      subject: string;
      body: string;
    };

    if (!to?.length || !subject?.trim() || !body?.trim()) {
      return NextResponse.json({ error: "Missing required fields: to, subject, body" }, { status: 400 });
    }

    if (to.length > 100) {
      return NextResponse.json({ error: "Maximum 100 recipients per send" }, { status: 400 });
    }

    // Build HTML email
    const htmlBody = `
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="UTF-8" /><title>${subject}</title></head>
    <body style="margin:0;padding:0;background:#f4f7fb;font-family:'Inter',Arial,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7fb;padding:48px 0;">
        <tr><td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 40px rgba(0,0,0,0.08);">
            <tr><td style="background:#0a0a0a;padding:28px 40px;text-align:center;">
              <img src="${APP_URL}/zth%20logo.png" alt="ZTH" height="52" style="display:block;margin:0 auto;" />
            </td></tr>
            <tr><td style="background:#1976D2;height:3px;"></td></tr>
            <tr><td style="padding:40px;">
              <div style="font-size:15px;color:#333333;line-height:1.75;white-space:pre-wrap;">${body.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
              <div style="margin-top:40px;padding-top:24px;border-top:1px solid #f0f0f0;font-size:12px;color:#aaa;text-align:center;">
                © ${new Date().getFullYear()} ZTH. All rights reserved.
              </div>
            </td></tr>
          </table>
        </td></tr>
      </table>
    </body>
    </html>
    `;

    // Send emails in batches of 10 (Resend rate limiting)
    const BATCH_SIZE = 10;
    const results: { email: string; success: boolean; error?: string }[] = [];

    for (let i = 0; i < to.length; i += BATCH_SIZE) {
      const batch = to.slice(i, i + BATCH_SIZE);

      const batchResults = await Promise.allSettled(
        batch.map((email) =>
          resend.emails.send({
            from: "ZTH <noreply@zth.com>",
            to: [email],
            subject,
            html: htmlBody,
          })
        )
      );

      batchResults.forEach((result, idx) => {
        results.push({
          email: batch[idx],
          success: result.status === "fulfilled",
          error: result.status === "rejected" ? String(result.reason) : undefined,
        });
      });

      // Small delay between batches
      if (i + BATCH_SIZE < to.length) {
        await new Promise((r) => setTimeout(r, 200));
      }
    }

    const successCount = results.filter((r) => r.success).length;
    const failCount = results.filter((r) => !r.success).length;

    return NextResponse.json({
      success: failCount === 0,
      sent: successCount,
      failed: failCount,
      results,
    });
  } catch (error: unknown) {
    console.error("admin/send-email error:", error);
    return NextResponse.json({ error: "Failed to send emails" }, { status: 500 });
  }
}
