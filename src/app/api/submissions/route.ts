import { NextRequest, NextResponse } from "next/server";
import { transformTestCases } from "@/utils/base-64";
import { db } from "@/db";

const JUDGE0_BASE_URL = process.env.JUDGE0_URL || "http://localhost:2358";
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchWithRetry(url: string, options: RequestInit, retries = MAX_RETRIES) {
  try {
    const response = await fetch(url, options);
    if (!response.ok && retries > 0) {
      await delay(RETRY_DELAY);
      return fetchWithRetry(url, options, retries - 1);
    }
    return response;
  } catch (error) {
    if (retries > 0) {
      await delay(RETRY_DELAY);
      return fetchWithRetry(url, options, retries - 1);
    }
    throw error;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { language_id, problem_id, source_code } = body;
    console.log("lenguage", language_id);
    console.log("problem", problem_id);
    console.log("code", source_code);

    if (!language_id || !problem_id || !source_code) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // WIP: Check authentication


    // 4. Fetch problem and test cases
    const problem = await db.problem.findUnique({
      where: { id: problem_id },
      include: { testCases: true },
    });

    if (!problem) {
      return NextResponse.json(
        { error: "Problem not found" },
        { status: 404 }
      );
    }

    // 5. Transform test cases for Judge0
    try {
      console.clear();
      console.log(problem);

      const transformedCases = transformTestCases(problem, source_code, language_id);

      if (!transformedCases || transformedCases.length === 0) {
        return NextResponse.json(
          { error: "Failed to process test cases" },
          { status: 400 }
        );
      }

      // 6. Submit batch to Judge0
      const batchSubmissionResponse = await fetchWithRetry(
        `${JUDGE0_BASE_URL}/submissions/batch?base64_encoded=true`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            submissions: transformedCases.map(({ language_id, source_code, stdin, expected_output }) => ({
              language_id,
              source_code,
              stdin,
              expected_output,
            })),
          }),
        }
      );

      if (!batchSubmissionResponse.ok) {
        const errorText = await batchSubmissionResponse.text();
        console.error('Judge0 submission failed:', errorText);
        throw new Error(`Judge0 submission failed: ${errorText}`);
      }

      const tokens = await batchSubmissionResponse.json();

      // 7. Get batch results with retries
      const resultsResponse = await fetchWithRetry(
        `${JUDGE0_BASE_URL}/submissions/batch?tokens=${tokens
          .map((t: { token: string }) => t.token)
          .join(",")}&fields=status_id,stdout,stderr,compile_output`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!resultsResponse.ok) {
        const errorText = await resultsResponse.text();
        console.error('Failed to fetch submission results:', errorText);
        throw new Error("Failed to fetch submission results");
      }

      const results = await resultsResponse.json();

      // 8. Check if all test cases passed (status_id 3 means Accepted)
      const allTestsPassed = results.every(
        (result: { status_id: number }) => result.status_id === 3
      );

      // 9. Save submission to database
      const submission = await db.submission.create({
        data: {
          userId: 'varun',
          problemId: problem_id,
          sourceCode: source_code,
          verdict: allTestsPassed ? "Accepted" : "Wrong Answer",
        },
      }).catch((error) => {
        console.error('Database error:', error);
        throw new Error('Failed to save submission');
      });

      // 10. Return response
      return NextResponse.json({
        submission_id: submission.id,
        verdict: allTestsPassed ? "Accepted" : "Wrong Answer",
        results: results.map((result: any) => ({
          status: result.status_id === 3 ? "Accepted" : "Wrong Answer",
          stdout: result.stdout,
          stderr: result.stderr,
          compile_output: result.compile_output,
        })),
      });

    } catch (error) {
      console.error('Error in test case processing:', error);
      return NextResponse.json(
        { error: "Failed to process submission" },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error("Submission processing error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
