/*
  Warnings:

  - You are about to drop the `EmailCode` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EmailCode" DROP CONSTRAINT "EmailCode_userId_fkey";

-- DropTable
DROP TABLE "EmailCode";

-- CreateTable
CREATE TABLE "email_codes" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "exp" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "email_codes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "email_codes_id_key" ON "email_codes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "email_codes_code_key" ON "email_codes"("code");

-- AddForeignKey
ALTER TABLE "email_codes" ADD CONSTRAINT "email_codes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
