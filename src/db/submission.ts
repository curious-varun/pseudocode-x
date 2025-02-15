import { db as prisma } from "@/db"; // Adjust based on your Prisma setup
import { Prisma } from "@prisma/client";

export type SubmissionType = Prisma.SubmissionGetPayload<{}>;

export async function getUserSubmissions(userId: string, problemId: string): Promise<SubmissionType[]> {
  return await prisma.submission.findMany({
    where: {
      userId,
      problemId,
    },
    //    orderBy: { createdAt: "desc" }, // Latest first
  });
}



import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { language_id, problem_id, source_code, user_id } = body;

    // Validate required fields
    if (!language_id || !problem_id || !source_code || !user_id) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Save submission in database
    const submission = await db.submission.create({
      data: {
        userId: user_id,
        problemId: problem_id,
        sourceCode: source_code,
        verdict: "Pending", // Processing later
      },
    });

    return NextResponse.json({
      submission_id: submission.id,
      verdict: "Pending",
      message: "Submission recorded. Verdict will be processed later."
    });
  } catch (error) {
    console.error("Submission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

