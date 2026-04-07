import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }
    // TODO: Integrate with email service (Buttondown, Mailchimp, Resend, etc.)
    // For now, log and return success
    console.log("Newsletter signup:", email, "at", new Date().toISOString());
    return NextResponse.json({ success: true, message: "Thanks for subscribing!" });
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
