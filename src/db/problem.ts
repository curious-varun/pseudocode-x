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

export type GetProblemDescriptionType = Prisma.ProblemGetPayload<{ select: { description: true; }; }>;
export async function getProblemDescriptionById(id: string): Promise<GetProblemDescriptionType | null> {
  return await db.problem.findUnique({
    where: { id },
    select: { description: true },
  });
}

