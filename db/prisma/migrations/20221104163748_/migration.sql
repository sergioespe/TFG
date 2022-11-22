-- CreateEnum
CREATE TYPE "Role" AS ENUM ('WORKER', 'MANAGER');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'REVIEW', 'COMPLETED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "id_slack" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'WORKER',
    "max_words" INTEGER NOT NULL DEFAULT 2000,
    "current_availability" INTEGER NOT NULL,
    "last_assignment" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "removed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "word_length" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "assigneeId" TEXT NOT NULL,
    "translatorId" TEXT NOT NULL,
    "update_time" TIMESTAMP(3) NOT NULL,
    "due_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_translatorId_fkey" FOREIGN KEY ("translatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
