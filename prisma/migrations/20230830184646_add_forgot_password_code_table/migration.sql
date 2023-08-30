-- CreateTable
CREATE TABLE "ForgotPasswordCode" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "exp" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ForgotPasswordCode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ForgotPasswordCode_id_key" ON "ForgotPasswordCode"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ForgotPasswordCode_code_key" ON "ForgotPasswordCode"("code");

-- AddForeignKey
ALTER TABLE "ForgotPasswordCode" ADD CONSTRAINT "ForgotPasswordCode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
