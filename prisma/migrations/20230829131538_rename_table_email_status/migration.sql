/*
  Warnings:

  - You are about to drop the `EmailStatus` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_emailStatusName_fkey";

-- DropTable
DROP TABLE "EmailStatus";

-- CreateTable
CREATE TABLE "email_status" (
    "id" SERIAL NOT NULL,
    "name" "EmailStatusEnum" NOT NULL,

    CONSTRAINT "email_status_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "email_status_id_key" ON "email_status"("id");

-- CreateIndex
CREATE UNIQUE INDEX "email_status_name_key" ON "email_status"("name");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_emailStatusName_fkey" FOREIGN KEY ("emailStatusName") REFERENCES "email_status"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
