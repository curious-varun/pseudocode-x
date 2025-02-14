
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Google Generative AI with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { description, code, message } = body;

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // Log the code for debugging purposes
    console.log(code);

    // Prepare prompt for Gemini with all available information
    const prompt = `
Problem Description: ${description || "No description provided"}

User's Code:
\`\`\`
${code || "No code provided"}
\`\`\`

User's Message: ${message}

Please analyze the above information and provide a helpful response addressing the problem, code issues, and any relevant suggestions.
`;

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Generate content using Gemini
    const result = await model.generateContent(prompt);
    const response = result.response;
    const generatedText = response.text();

    return NextResponse.json({
      response: generatedText,
      description,
      code,
      message
    });

  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({
      error: "Internal server error",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}

