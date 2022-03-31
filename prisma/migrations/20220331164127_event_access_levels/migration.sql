/*
  Warnings:

  - You are about to drop the column `isPrivate` on the `EventSettings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EventSettings" DROP COLUMN "isPrivate",
ADD COLUMN     "access" INTEGER NOT NULL DEFAULT 0;
