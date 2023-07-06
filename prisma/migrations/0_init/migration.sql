-- CreateTable
CREATE TABLE "Post" (
    "id" STRING NOT NULL,
    "title" STRING NOT NULL,
    "description" STRING NOT NULL,
    "markdown" STRING NOT NULL,
    "covers" STRING[],
    "type" STRING NOT NULL,
    "date" STRING NOT NULL,
    "tags" STRING[],
    "createdAt" TIMESTAMP(3) NOT NULL,
    "editedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resource" (
    "id" STRING NOT NULL,
    "title" STRING NOT NULL,
    "filename" STRING NOT NULL,
    "url" STRING NOT NULL,
    "type" STRING NOT NULL,
    "postId" STRING,

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

