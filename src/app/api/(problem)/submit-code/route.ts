import { type NextRequest } from "next/server";
import { db } from "@/db";
import { TransformedCase, ProblemWithTestCases, transformTestCases } from "@/utils/base-64";

const JUDGE0_BASE_URL = "http://localhost:2358/";

export async function POST(request: NextRequest) {
  try {
    const { problem_id, language_id, source_code } = await request.json();

    if (!problem_id || !language_id || !source_code) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const problem: ProblemWithTestCases | null = await db.problem.findUnique({
      where: { id: problem_id },
      include: { testCases: true },
    });

    if (!problem) {
      return Response.json(
        { error: "Problem not found" },
        { status: 404 }
      );
    }

    const transformedTestCases: TransformedCase[] = transformTestCases(
      problem,
      source_code,
      language_id
    );

    const response = await fetch(
      `${JUDGE0_BASE_URL}submissions/batch?base64_encoded=true&wait=true`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transformedTestCases),
      }
    );

    if (!response.ok) {
      return Response.json(
        { error: "Judge0 service error" },
        { status: response.status }
      );
    }

    const judgeResponse = await response.json();

    return Response.json(judgeResponse);

  } catch (error) {
    console.error("Submit code error:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
