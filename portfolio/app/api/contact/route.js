import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return Response.json({ error: "All fields are required." }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SENDER_EMAIL_ID,
        pass: process.env.EMAIL_PASSKEY,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SENDER_EMAIL_ID}>`,
      to: process.env.SENDER_EMAIL_ID,
      replyTo: email,
      subject: `New message from ${name} — Portfolio`,
      html: `
        <div style="font-family:Inter,sans-serif;max-width:560px;margin:0 auto;background:#111827;color:#e5e7eb;border-radius:12px;overflow:hidden;">
          <div style="background:#1f2937;padding:24px 32px;border-bottom:1px solid #374151;">
            <h2 style="margin:0;font-size:20px;color:#f9fafb;">New Contact Message</h2>
            <p style="margin:4px 0 0;font-size:13px;color:#9ca3af;">From your portfolio contact form</p>
          </div>
          <div style="padding:32px;">
            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:8px 0;color:#9ca3af;font-size:13px;width:80px;">Name</td>
                <td style="padding:8px 0;color:#f9fafb;font-size:14px;font-weight:600;">${name}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#9ca3af;font-size:13px;">Email</td>
                <td style="padding:8px 0;color:#f9fafb;font-size:14px;">
                  <a href="mailto:${email}" style="color:#93c5fd;">${email}</a>
                </td>
              </tr>
            </table>
            <div style="margin-top:24px;padding:20px;background:#1f2937;border-radius:8px;border:1px solid #374151;">
              <p style="margin:0 0 8px;color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;">Message</p>
              <p style="margin:0;color:#e5e7eb;font-size:14px;line-height:1.7;white-space:pre-wrap;">${message}</p>
            </div>
            <p style="margin-top:24px;font-size:12px;color:#6b7280;">
              Reply directly to this email to respond to ${name}.
            </p>
          </div>
        </div>
      `,
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error("Email error:", err.message);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
