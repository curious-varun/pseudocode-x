// import db (prisam instance) like import {db} form "@/db"
// schema : 
/*
 * generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id         String       @id @default(cuid())
  email      String       @unique
  name       String?
  image      String?
  Submission Submission[]
}

model Problem {
  id          String       @id @default(cuid())
  title       String       @unique
  description String
  difficulty  String
  testCases   TestCase[]
  Submission  Submission[]
}

model TestCase {
  id        String  @id @default(cuid())
  input    String
  output    String
  isPublic  Boolean @default(false)
  problem   Problem @relation(fields: [problemId], references: [id])
  problemId String
}

model Submission {
  id         String  @id @default(cuid())
  user       User    @relation(fields: [userId], references: [id])
  userId     String
  Problem    Problem @relation(fields: [problemId], references: [id])
  problemId  String
  sourceCode String
  verdict    String
}
 */

// make a post request on using the next js latest verion and do following thing 
// 1 make a post endpoint 
// check for language_id , problem_id , source_code are given in body or not 
// if not then return response accordingly 
//
// now after inputs are checked check if the user is authenticated or not uisng the auth() ( using nextauth v5/ authjs ) 
// if not then return response accordingly 
//
// now using the problem_id check if it exist by  fetch the all the test cases for the given problem id (schema is given above)
// if not then return response accordingly 
//
// now i have a judge0 running on port : 2358 you have to send a batch Submission to that 
// here is the docs of judge 0 
/*Submission Batch  ¶
Create a Submission BatchPOST/submissions/batch{?base64_encoded}
Create multiple submissions at once.

Example URI
POST https://ce.judge0.com/submissions/batch?base64_encoded=false
URI ParametersHide
base64_encoded
boolean (optional) Default: false Example: false
Set to true if you are sending Base64 encoded data.

RequestHide
Headers
Content-Type: application/json
Body
{
  "submissions": [
    {
      "language_id": 46,
      "source_code": "echo hello from Bash"
    },
    {
      "language_id": 71,
      "source_code": "print(\"hello from Python\")"
    },
    {
      "language_id": 72,
      "source_code": "puts(\"hello from Ruby\")"
    }
  ]
}
Response  201Hide
Headers
Content-Type: application/json
Body
[
  {
    "token": "db54881d-bcf5-4c7b-a2e3-d33fe7e25de7"
  },
  {
    "token": "ecc52a9b-ea80-4a00-ad50-4ab6cc3bb2a1"
  },
  {
    "token": "1b35ec3b-5776-48ef-b646-d5522bdeb2cc"
  }
]
RequestHide
Headers
Content-Type: application/json
Body
{
  "submissions": [
    {
      "language_id": 46,
      "source_code": "echo hello from Bash"
    },
    {
      "language_id": 123456789,
      "source_code": "print(\"hello from Python\")"
    },
    {
      "language_id": 72,
      "source_code": ""
    }
  ]
}
Response  201Hide
Headers
Content-Type: application/json
Body
[
  {
    "token": "c2dd8881-644b-462d-b1f9-73dd3bb0118a"
  },
  {
    "language_id": [
      "language with id 123456789 doesn't exist"
    ]
  },
  {
    "source_code": [
      "can't be blank"
    ]
  }
]
Get a Submission BatchGET/submissions/batch{?tokens,base64_encoded,fields}
Get multiple submissions at once.

Example URI
GET https://ce.judge0.com/submissions/batch?tokens=db54881d-bcf5-4c7b-a2e3-d33fe7e25de7,ecc52a9b-ea80-4a00-ad50-4ab6cc3bb2a1,1b35ec3b-5776-48ef-b646-d5522bdeb2cc&base64_encoded=false&fields=token,stdout,stderr,status_id,language_id
URI ParametersHide
tokens
string (required) Example: db54881d-bcf5-4c7b-a2e3-d33fe7e25de7,ecc52a9b-ea80-4a00-ad50-4ab6cc3bb2a1,1b35ec3b-5776-48ef-b646-d5522bdeb2cc
Submission tokens separeted with ,.

base64_encoded
boolean (optional) Default: false Example: false
Set to true if you want to receive Base64 encoded data.

fields
string (optional) Default: stdout,time,memory,stderr,token,compile_output,message,status Example: token,stdout,stderr,status_id,language_id
Return only the desired attributes.

Response  200
 * */
// for that you need to transform the input data use folling (import form @/utils/base-64)
/*
 * import { Prisma } from "@prisma/client";

export type ProblemWithTestCases = Prisma.ProblemGetPayload<{
  include: { testCases: true };
}>;

export type TransformedCase = {
  language_id: number;
  Source_code: string;
  stdin: string;
  expected_output: string;
};


export function transformTestCases(problem: ProblemWithTestCases, sourceCode: string, languageId: number): TransformedCase[] {
  return problem.testCases.map(({ input, output }) => ({
    language_id: languageId,
    Source_code: stringToBase64(sourceCode),
    stdin: stringToBase64(input),
    expected_output: stringToBase64(output),
  }));
}

export const stringToBase64 = (str: string): string => {
  return Buffer.from(str, "utf-8").toString("base64");
};

export const base64ToString = (base64: string): string => {
  return Buffer.from(base64, "base64").toString("utf-8");
};
*/
// now make a batch submission to the judge0 
// then check for each of the testCases is the problem is accepted ? 
// if yes then return accordingly 
// if not then return accordingly 
//
// do all this shit in try catch if there is error in the return a resopnse and log the error 




import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { transformTestCases } from "@/utils/base-64";

export async function POST(req: NextRequest) {
  try {
    // 1. Extract and validate request body
    const body = await req.json();
    const { language_id, problem_id, source_code } = body;

    if (!language_id || !problem_id || !source_code) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    console.log("checkpoint 1 ✅");

    // 2. Check authentication
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }
    console.log("checkpoint 2 ✅");
    const email = session.user.email;
    console.log(email);

    // 3. Fetch problem and test cases
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
    console.log("checkpoint 3 ✅");

    // 4. Transform test cases for Judge0
    const transformedCases = transformTestCases(problem, source_code, language_id);

    // 5. Submit batch to Judge0
    const batchSubmissionResponse = await fetch(
      "http://localhost:2358/submissions/batch",
      {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({
          submissions: transformedCases.map(
            ({ language_id, Source_code, stdin, expected_output }) => ({
              language_id,
              source_code: source_code,
              stdin,
              expected_output,
            })
          ),
        }),
      }
    );
    if (!batchSubmissionResponse.ok) {
      throw new Error("Judge0 submission failed");
    }
    console.log("checkpoint 4 ✅");

    const tokens = await batchSubmissionResponse.json();

    // 6. Get batch results
    const resultsResponse = await fetch(
      `http://localhost:2358/submissions/batch?tokens=${tokens
        .map((t: { token: string }) => t.token)
        .join(",")}&fields=status_id,stdout,stderr,compile_output`,
      {
        method: "GET",
      }
    );

    if (!resultsResponse.ok) {
      throw new Error("Failed to fetch submission results");
    }
    console.log("checkpoint 5 ✅");

    const results = await resultsResponse.json();

    // 7. Check if all test cases passed (status_id 3 means Accepted)
    const allTestsPassed = results.every(
      (result: { status_id: number }) => result.status_id === 3
    );

    console.log("checkpoint 6 ✅");

    // 8. Save submission to database
    const submission = await db.submission.create({
      data: {
        userId: session.user.id,
        problemId: problem_id,
        sourceCode: source_code,
        verdict: allTestsPassed ? "Accepted" : "Wrong Answer",
      },
    });
    console.log("checkpoint 6 ✅");

    console.log("✅ ✅ ✅ ✅ ✅");
    // 9. Return response
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
    console.error("Submission processing error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
