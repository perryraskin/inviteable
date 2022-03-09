/*
  Warnings:

  - You are about to drop the column `allowComments` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `isPrivate` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `showGuestList` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "allowComments",
DROP COLUMN "isPrivate",
DROP COLUMN "showGuestList";

-- CreateTable
CREATE TABLE "EventSettings" (
    "id" SERIAL NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "eventId" INTEGER NOT NULL,
    "isPrivate" BOOLEAN NOT NULL DEFAULT true,
    "showGuestList" BOOLEAN NOT NULL DEFAULT true,
    "allowComments" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "EventSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EventSettings_eventId_key" ON "EventSettings"("eventId");

-- AddForeignKey
ALTER TABLE "EventSettings" ADD CONSTRAINT "EventSettings_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "User.issuer_unique" RENAME TO "User_issuer_key";
