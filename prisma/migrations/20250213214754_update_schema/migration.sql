/*
  Warnings:

  - You are about to drop the column `inputs` on the `TestCase` table. All the data in the column will be lost.
  - Added the required column `input` to the `TestCase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TestCase" DROP COLUMN "inputs",
ADD COLUMN     "input" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Submission" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "problemId" TEXT NOT NULL,
    "sourceCode" TEXT NOT NULL,
    "verdict" TEXT NOT NULL,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
