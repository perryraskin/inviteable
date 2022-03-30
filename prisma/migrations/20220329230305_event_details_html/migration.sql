/*
  Warnings:

  - You are about to drop the column `details` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "details",
ADD COLUMN     "detailsHtml" TEXT,
ADD COLUMN     "detailsText" TEXT;
