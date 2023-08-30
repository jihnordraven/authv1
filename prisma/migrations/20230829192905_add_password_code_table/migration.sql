-- CreateTable
CREATE TABLE "PasswordCode" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "exp" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "PasswordCode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PasswordCode_id_key" ON "PasswordCode"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordCode_code_key" ON "PasswordCode"("code");

-- AddForeignKey
ALTER TABLE "PasswordCode" ADD CONSTRAINT "PasswordCode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
