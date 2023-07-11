-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "notes" STRING;
ALTER TABLE "Post" ALTER COLUMN "title" DROP NOT NULL;
ALTER TABLE "Post" ALTER COLUMN "date" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Version" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "name" STRING NOT NULL,
    "notes" STRING,

    CONSTRAINT "Version_pkey" PRIMARY KEY ("id")
);
