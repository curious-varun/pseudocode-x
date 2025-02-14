import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { description, code, message } = body;

    if (!message) return NextResponse.json({ error: "Message is required" }, { status: 400 });


    console.log(code);
    return NextResponse.json({ response: "description" });

  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

