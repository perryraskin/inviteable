/*
  Warnings:

  - A unique constraint covering the columns `[issuer]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `issuer` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "issuer" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User.issuer_unique" ON "User"("issuer");
