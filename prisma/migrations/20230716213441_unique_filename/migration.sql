/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Resource` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[filename]` on the table `Resource` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[url]` on the table `Resource` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "editedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "Resource_id_key" ON "Resource"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Resource_filename_key" ON "Resource"("filename");

-- CreateIndex
CREATE UNIQUE INDEX "Resource_url_key" ON "Resource"("url");
