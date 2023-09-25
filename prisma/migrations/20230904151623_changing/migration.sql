/*
  Warnings:

  - You are about to drop the column `name` on the `StocksHeld` table. All the data in the column will be lost.
  - Added the required column `share_name` to the `StocksHeld` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StocksHeld" DROP COLUMN "name",
ADD COLUMN     "share_name" TEXT NOT NULL;
