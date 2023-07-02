/*
  Warnings:

  - You are about to drop the column `key` on the `Post` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Post_key_key";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "key";
