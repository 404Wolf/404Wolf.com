/*
  Warnings:

  - Added the required column `editedAt` to the `Version` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Version" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "Version" ADD COLUMN     "editedAt" TIMESTAMP(3) NOT NULL;
