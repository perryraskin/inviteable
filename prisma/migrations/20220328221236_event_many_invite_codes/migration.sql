/*
  Warnings:

  - You are about to drop the column `inviteCode` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `inviteUrl` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "inviteCode",
DROP COLUMN "inviteUrl";

-- CreateTable
CREATE TABLE "EventInvite" (
    "id" SERIAL NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "eventId" INTEGER,
    "code" TEXT,
    "url" TEXT,
    "redeemed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "EventInvite_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EventInvite" ADD CONSTRAINT "EventInvite_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;
