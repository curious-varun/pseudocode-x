/*
  Warnings:

  - You are about to drop the column `dificulty` on the `Problem` table. All the data in the column will be lost.
  - Added the required column `difficulty` to the `Problem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Problem" DROP COLUMN "dificulty",
ADD COLUMN     "difficulty" TEXT NOT NULL;
