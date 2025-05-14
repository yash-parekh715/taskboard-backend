/*
  Warnings:

  - Changed the type of `duedate` on the `Task` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "duedate",
ADD COLUMN     "duedate" TIMESTAMP(3) NOT NULL;
