/*
  Warnings:

  - Added the required column `Points` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Problem" ADD COLUMN     "Point" TEXT,
ADD COLUMN     "contestId" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "Points" INTEGER NOT NULL,
ADD COLUMN     "codeforcesUsername" TEXT,
ADD COLUMN     "githubUsernaem" TEXT,
ADD COLUMN     "leetcodeUsername" TEXT;

-- CreateTable
CREATE TABLE "Contest" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "banenr" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CodeQuest" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "CodeQuest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CodeQuestSolutions" (
    "id" TEXT NOT NULL,
    "gitRepoLink" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "CodeQuestSolutions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CodeQuestSolutions_gitRepoLink_key" ON "CodeQuestSolutions"("gitRepoLink");

-- AddForeignKey
ALTER TABLE "Problem" ADD CONSTRAINT "Problem_contestId_fkey" FOREIGN KEY ("contestId") REFERENCES "Contest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CodeQuest" ADD CONSTRAINT "CodeQuest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CodeQuestSolutions" ADD CONSTRAINT "CodeQuestSolutions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
