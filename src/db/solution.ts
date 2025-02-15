import { db as prisma } from "@/db"; // Adjust based on your Prisma setup
import { Prisma } from "@prisma/client";

export type SolutionType = Prisma.SolutionGetPayload<{}>;

export async function getSolution(problemId: string): Promise<SolutionType | null> {
  return await prisma.solution.findUnique({
    where: { problemId },
  });
}

