/*
  Warnings:

  - You are about to drop the column `isGoing` on the `Guest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Guest" DROP COLUMN "isGoing",
ADD COLUMN     "response" INTEGER DEFAULT 0;
