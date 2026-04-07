import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const NOTIFY_EMAIL = "mattfmccormick@gmail.com";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    console.log("RESEND_API_KEY exists:", !!apiKey);

    const resend = apiKey ? new Resend(apiKey) : null;
    const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "Alignment Economy <onboarding@resend.dev>";

    const data = await req.json();
    const { name, email, type, message } = data;

    if (!name || !email || !email.includes("@")) {
      return NextResponse.json({ error: "Name and valid email required" }, { status: 400 });
    }

    if (resend) {
      console.log("Sending contact notification via Resend...");
      const result = await resend.emails.send({
        from: FROM_EMAIL,
        to: NOTIFY_EMAIL,
        subject: `New Contact Form: ${type || "general"} from ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Type:</strong> ${type || "not specified"}</p>
          <p><strong>Message:</strong> ${message || "none"}</p>
          <p><strong>Time:</strong> ${new Date().toISOString()}</p>
        `,
      });
      console.log("Resend result:", JSON.stringify(result));
    } else {
      console.log("RESEND_API_KEY not set. Contact form:", { name, email, type, message, at: new Date().toISOString() });
    }

    return NextResponse.json({ success: true, message: "Thanks! We'll be in touch." });
  } catch (err: unknown) {
    console.error("Contact error:", JSON.stringify(err, Object.getOwnPropertyNames(err as object)));
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
