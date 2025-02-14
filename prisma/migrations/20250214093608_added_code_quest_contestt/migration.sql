/*
  Warnings:

  - You are about to drop the column `Point` on the `Problem` table. All the data in the column will be lost.
  - You are about to drop the column `Points` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `githubUsernaem` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Problem" DROP COLUMN "Point",
ADD COLUMN     "points" INTEGER;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "Points",
DROP COLUMN "githubUsernaem",
ADD COLUMN     "githubUsername" TEXT,
ADD COLUMN     "points" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Solution" (
    "id" TEXT NOT NULL,
    "solution" TEXT NOT NULL,
    "problemId" TEXT NOT NULL,

    CONSTRAINT "Solution_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Solution_problemId_key" ON "Solution"("problemId");

-- AddForeignKey
ALTER TABLE "Solution" ADD CONSTRAINT "Solution_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
