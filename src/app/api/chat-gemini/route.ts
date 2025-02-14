import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const chat = genAI.getGenerativeModel({ model: "gemini-pro" }).startChat();
    const response = await chat.sendMessage(messages);
    const aiMessage = response.response.text();

    return NextResponse.json({ id: Date.now().toString(), role: "assistant", content: aiMessage });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong!" }, { status: 500 });
  }

}









// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { NextResponse } from "next/server";
//
// // Initialize Gemini AI
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
// const model = genAI.getGenerativeModel({ model: "gemini-pro" });
//
// export async function POST(req: Request) {
//   return NextResponse.json({
//     role: 'assistant',
//     content: "hi there this is the init message "
//   });
//
//   // try {
//   //   const { messages } = await req.json();
//   //
//   //   // Get the last message content as the prompt
//   //   const lastMessage = messages[messages.length - 1];
//   //
//   //   // Generate content using Gemini
//   //   const result = await model.generateContent(lastMessage.content);
//   //   const response = await result.response;
//   //   const text = response.text();
//   //
//   //   // Return response directly without streaming
//   //   return NextResponse.json({
//   //     role: 'assistant',
//   //     content: text
//   //   });
//   //
//   // } catch (error) {
//   //   console.error(error);
//   //   return NextResponse.json({ error: "Error processing your request" }, { status: 500 });
//   // }
// }
//


