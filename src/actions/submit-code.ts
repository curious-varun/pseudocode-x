"use server";

import { db } from "@/db";
import { TransformedCase, ProblemWithTestCases, transformTestCases } from "@/utils/base-64";
import axios from "axios"

const JUDGE0_BASE_URL = "http://localhost:2358/"


export async function codeSubmissionAction(problem_id: string, language_id: number, source_code: string) {
  try {
    const problem: ProblemWithTestCases | null = await db.problem.findUnique({
      where: { id: problem_id },
      include: { testCases: true },
    });
    if (!problem) return { error: "Problem not found" };

    const transformedTestCases: TransformedCase[] = transformTestCases(problem, source_code, language_id);

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


    return response;

  }
  catch (error) {
    console.clear();
    console.log(error);
    return { message: "internal error by varun " }
  }

}

