/*
  Warnings:

  - You are about to drop the column `username` on the `Token` table. All the data in the column will be lost.
  - Added the required column `user_email` to the `Token` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Token" DROP COLUMN "username",
ADD COLUMN     "user_email" VARCHAR(255) NOT NULL;
