/*
  Warnings:

  - You are about to drop the column `address1` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `address2` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `locationName` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `zip` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "address1",
DROP COLUMN "address2",
DROP COLUMN "city",
DROP COLUMN "country",
DROP COLUMN "latitude",
DROP COLUMN "locationName",
DROP COLUMN "longitude",
DROP COLUMN "state",
DROP COLUMN "zip",
ADD COLUMN     "allowComments" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "showGuestList" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "eventId" INTEGER,
    "locationName" TEXT,
    "latitude" DECIMAL(65,30),
    "longitude" DECIMAL(65,30),
    "address1" TEXT,
    "address2" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zip" TEXT,
    "country" TEXT,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Address" ADD FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;
