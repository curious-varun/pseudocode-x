import { Prisma } from "@prisma/client";
import { db } from "@/db";

export type GetAllProblemType = Prisma.ProblemGetPayload<{
  select: {
    id: true;
    title: true;
    difficulty: true;
  };
}>;
export async function getAllProblem(): Promise<GetAllProblemType[]> {
  return await db.problem.findMany({
    select: {
      id: true,
      title: true,
      difficulty: true,
    },
  });
}

export type GetProblemWithTestCaseByIdType = Prisma.ProblemGetPayload<{
  select: {
    difficulty: true;
    title: true;
    description: true;
    testCases: {
      select: {
        id: true;
        inputs: true;
        output: true;
      };
      where: {
        isPublic: true;
      };
    };
  };
}>;

export async function getProblemWithTestCaseById(id: string): Promise<GetProblemWithTestCaseByIdType | null> {
  return await db.problem.findUnique({
    where: { id },
    select: {
      difficulty: true,
      title: true,
      description: true,
      testCases: {
        select: {
          id: true,
          inputs: true,
          output: true,
        },
        where: {
          isPublic: true,
        },
      },
    },
  });
}

