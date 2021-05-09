/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Guest` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Thread` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "createdAt",
ADD COLUMN     "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "createdAt",
ADD COLUMN     "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Guest" DROP COLUMN "createdAt",
ADD COLUMN     "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Thread" DROP COLUMN "createdAt",
ADD COLUMN     "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
ADD COLUMN     "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
