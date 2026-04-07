import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "Alignment Economy <onboarding@resend.dev>";
const NOTIFY_EMAIL = "info@alignmenteconomy.org";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    if (resend) {
      console.log("Sending newsletter notification via Resend...");
      const result = await resend.emails.send({
        from: FROM_EMAIL,
        to: NOTIFY_EMAIL,
        subject: "New Newsletter Signup",
        html: `
          <h2>New Newsletter Subscriber</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Time:</strong> ${new Date().toISOString()}</p>
        `,
      });
      console.log("Resend result:", JSON.stringify(result));
    } else {
      console.log("RESEND_API_KEY not set. Newsletter signup:", email, "at", new Date().toISOString());
    }

    return NextResponse.json({ success: true, message: "Thanks for subscribing!" });
  } catch (err: unknown) {
    console.error("Subscribe error:", JSON.stringify(err, Object.getOwnPropertyNames(err as object)));
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
