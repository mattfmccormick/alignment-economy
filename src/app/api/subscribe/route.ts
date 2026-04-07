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
    const { email } = data;

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    if (resend) {
      console.log("Sending subscribe notification via Resend...");
      const result = await resend.emails.send({
        from: FROM_EMAIL,
        to: NOTIFY_EMAIL,
        subject: `New Newsletter Subscriber: ${email}`,
        html: `
          <h2>New Newsletter Signup</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Time:</strong> ${new Date().toISOString()}</p>
        `,
      });
      console.log("Resend result:", JSON.stringify(result));
    } else {
      console.log("RESEND_API_KEY not set. Subscribe:", { email, at: new Date().toISOString() });
    }

    return NextResponse.json({ success: true, message: "Thanks for subscribing!" });
  } catch (err: unknown) {
    console.error("Subscribe error:", JSON.stringify(err, Object.getOwnPropertyNames(err as object)));
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
