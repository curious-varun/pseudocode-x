import { db as prisma } from "@/db"; // Adjust based on your Prisma setup
import { Prisma } from "@prisma/client";

export type SubmissionType = Prisma.SubmissionGetPayload<{}>;

export async function getUserSubmissions(userId: string, problemId: string): Promise<SubmissionType[]> {
  return await prisma.submission.findMany({
    where: {
      userId,
      problemId,
    },
    //    orderBy: { createdAt: "desc" }, // Latest first
  });
}


