import { db } from "@/db"

import { Prisma } from "@prisma/client";

export type getAllProblemType = Prisma.ProblemGetPayload<{
  select: {
    id: true,
    title: true,
    difficulty: true
  },
}>
export async function getAllProblem() {
  return await db.problem.findMany(
    {
      select: {
        id: true,
        title: true,
        difficulty: true,
      },
    }
  );
}

export async function getProblemByTitle() {

} 
