import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { description, code, message } = body;

    if (!message) return NextResponse.json({ error: "Message is required" }, { status: 400 });


    return NextResponse.json({ response: "You can prevent any hover behavior on this element by using the pointer-events-none class from Tailwind CSS. This ensures that the element does not respond to hover interactions." });

  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

