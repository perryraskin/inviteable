/*
  Warnings:

  - You are about to drop the column `location` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "location",
ADD COLUMN     "locationName" TEXT,
ADD COLUMN     "latitude" DECIMAL(65,30),
ADD COLUMN     "longitude" DECIMAL(65,30),
ADD COLUMN     "address1" TEXT,
ADD COLUMN     "address2" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "state" TEXT,
ADD COLUMN     "zip" TEXT,
ADD COLUMN     "country" TEXT;
