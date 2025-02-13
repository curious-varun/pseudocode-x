import { Prisma } from "@prisma/client";

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
  return problem.testCases.map(({ inputs, output }) => ({
    language_id: languageId,
    Source_code: stringToBase64(sourceCode),
    stdin: stringToBase64(inputs),
    expected_output: stringToBase64(output),
  }));
}

export const stringToBase64 = (str: string): string => {
  return Buffer.from(str, "utf-8").toString("base64");
};

export const base64ToString = (base64: string): string => {
  return Buffer.from(base64, "base64").toString("utf-8");
};

