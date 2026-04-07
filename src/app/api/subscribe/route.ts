import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    // Send notification email to info@alignmenteconomy.org
    if (resend) {
      await resend.emails.send({
        from: "Alignment Economy <notifications@alignmenteconomy.org>",
        to: "info@alignmenteconomy.org",
        subject: "New Newsletter Signup",
        html: `
          <h2>New Newsletter Subscriber</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Time:</strong> ${new Date().toISOString()}</p>
        `,
      });
    } else {
      console.log("RESEND_API_KEY not set. Newsletter signup:", email, "at", new Date().toISOString());
    }

    return NextResponse.json({ success: true, message: "Thanks for subscribing!" });
  } catch (err) {
    console.error("Subscribe error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
