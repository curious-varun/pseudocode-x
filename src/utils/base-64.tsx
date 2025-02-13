import { Prisma } from "@prisma/client";

export type ProblemWithTestCases = Prisma.ProblemGetPayload<{
  include: { testCases: true };
}>;

export type TransformedCase = {
  language_id: number;
  source_code: string;
  stdin: string;
  expected_output: string;
};


export function transformTestCases(problem: ProblemWithTestCases, source_code: string, languageId: number): TransformedCase[] {
  return problem.testCases.map(({ input, output }) => ({
    language_id: languageId,
    source_code: stringToBase64(source_code),
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

