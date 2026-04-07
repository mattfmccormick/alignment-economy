import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, email, type, message } = data;
    if (!name || !email || !email.includes("@")) {
      return NextResponse.json({ error: "Name and valid email required" }, { status: 400 });
    }
    // TODO: Send email notification (Resend, SendGrid, etc.) or store in Supabase
    console.log("Contact form submission:", { name, email, type, message, at: new Date().toISOString() });
    return NextResponse.json({ success: true, message: "Thanks! We'll be in touch." });
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
