-- CreateTable
CREATE TABLE "Contact" (
    "name" STRING NOT NULL,
    "username" STRING NOT NULL,
    "link" STRING NOT NULL,
    "at" BOOL NOT NULL DEFAULT true,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("name")
);
