import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Get the last message content as the prompt
    const lastMessage = messages[messages.length - 1];

    // Generate content using Gemini
    const result = await model.generateContent(lastMessage.content);
    const response = await result.response;
    const text = response.text();

    // Return response directly without streaming
    return NextResponse.json({
      role: 'assistant',
      content: text
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error processing your request" }, { status: 500 });
  }
}
