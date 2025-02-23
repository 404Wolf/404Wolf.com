-- CreateTable
CREATE TABLE "User" (
    "id" STRING NOT NULL,
    "firstName" STRING NOT NULL,
    "lastName" STRING NOT NULL,
    "email" STRING NOT NULL,
    "image" STRING NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
