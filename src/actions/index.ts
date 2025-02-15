"use server";
import { db } from "@/db";

export async function decreaseShowSolutionPoint(userId: string) {
  const user = await db.user.update({
    where: { id: userId },
    data: { points: { decrement: 10 } },
  });

  return { success: "10 points decremented" };
}

