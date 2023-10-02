/*
  Warnings:

  - Added the required column `mic` to the `StocksHeld` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StocksHeld" ADD COLUMN     "mic" TEXT NOT NULL;
