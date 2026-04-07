import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, email, type, message } = data;
    if (!name || !email || !email.includes("@")) {
      return NextResponse.json({ error: "Name and valid email required" }, { status: 400 });
    }

    // Send notification email to info@alignmenteconomy.org
    if (resend) {
      await resend.emails.send({
        from: "Alignment Economy <notifications@alignmenteconomy.org>",
        to: "info@alignmenteconomy.org",
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
    } else {
      console.log("RESEND_API_KEY not set. Contact form:", { name, email, type, message, at: new Date().toISOString() });
    }

    return NextResponse.json({ success: true, message: "Thanks! We'll be in touch." });
  } catch (err) {
    console.error("Contact error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
