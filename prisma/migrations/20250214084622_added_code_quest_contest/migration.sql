/*
  Warnings:

  - You are about to drop the column `banenr` on the `Contest` table. All the data in the column will be lost.
  - Added the required column `banner` to the `Contest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contest" DROP COLUMN "banenr",
ADD COLUMN     "banner" TEXT NOT NULL;
