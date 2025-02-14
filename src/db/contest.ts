import { Prisma } from "@prisma/client";
import { db } from "@/db";

export type ContestsType = Prisma.ContestGetPayload<{
  include: {
    problems: true;
  };
  select: {
    id: true;
    title: true;
    banner: true;
    description: true;
    startTime: true;
    endTime: true;
  };
}>;

export async function getAllContests(): Promise<ContestsType[]> {
  return await db.contest.findMany({
    select: {
      id: true,
      title: true,
      banner: true, // Fixed typo
      description: true,
      startTime: true,
      endTime: true,
      problems: true, // Moved to select instead of include
    },
  });
}

