/*
  Warnings:

  - You are about to drop the column `eventDateTime` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "eventDateTime",
ADD COLUMN     "dateTimeStart" TIMESTAMP(3),
ADD COLUMN     "dateTimeEnd" TIMESTAMP(3);
