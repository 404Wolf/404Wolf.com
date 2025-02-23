-- AlterTable
ALTER TABLE "Version" ADD COLUMN     "postId" STRING;

-- AddForeignKey
ALTER TABLE "Version" ADD CONSTRAINT "Version_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
