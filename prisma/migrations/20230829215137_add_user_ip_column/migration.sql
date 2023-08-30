/*
  Warnings:

  - You are about to drop the column `emailStatusName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `PasswordCode` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `user_ip` to the `tokens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email_status_name` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PasswordCode" DROP CONSTRAINT "PasswordCode_userId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_emailStatusName_fkey";

-- AlterTable
ALTER TABLE "tokens" ADD COLUMN     "user_ip" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "emailStatusName",
ADD COLUMN     "email_status_name" "EmailStatusEnum" NOT NULL;

-- DropTable
DROP TABLE "PasswordCode";

-- CreateTable
CREATE TABLE "password_codes" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "exp" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "password_codes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "password_codes_id_key" ON "password_codes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "password_codes_code_key" ON "password_codes"("code");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_email_status_name_fkey" FOREIGN KEY ("email_status_name") REFERENCES "email_status"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "password_codes" ADD CONSTRAINT "password_codes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
