-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Resource" ADD COLUMN     "description" STRING;
