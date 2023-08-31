/*
  Warnings:

  - You are about to drop the column `userId` on the `email_codes` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `password_codes` table. All the data in the column will be lost.
  - You are about to drop the `ForgotPasswordCode` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `user_id` to the `email_codes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `password_codes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ForgotPasswordCode" DROP CONSTRAINT "ForgotPasswordCode_userId_fkey";

-- DropForeignKey
ALTER TABLE "email_codes" DROP CONSTRAINT "email_codes_userId_fkey";

-- DropForeignKey
ALTER TABLE "password_codes" DROP CONSTRAINT "password_codes_userId_fkey";

-- AlterTable
ALTER TABLE "email_codes" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "password_codes" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "ForgotPasswordCode";

-- CreateTable
CREATE TABLE "forgot_password_code" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "exp" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "forgot_password_code_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_bans" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "reason" TEXT,
    "duration" TIMESTAMP(3) NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_bans_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "forgot_password_code_id_key" ON "forgot_password_code"("id");

-- CreateIndex
CREATE UNIQUE INDEX "forgot_password_code_code_key" ON "forgot_password_code"("code");

-- CreateIndex
CREATE UNIQUE INDEX "user_bans_id_key" ON "user_bans"("id");

-- AddForeignKey
ALTER TABLE "email_codes" ADD CONSTRAINT "email_codes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "password_codes" ADD CONSTRAINT "password_codes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forgot_password_code" ADD CONSTRAINT "forgot_password_code_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_bans" ADD CONSTRAINT "user_bans_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
