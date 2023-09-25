/*
  Warnings:

  - You are about to drop the `StockData` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_StockDataToStocksHeld` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `exchange_city` to the `StocksHeld` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exchange_country` to the `StocksHeld` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exchange_name` to the `StocksHeld` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `StocksHeld` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_StockDataToStocksHeld" DROP CONSTRAINT "_StockDataToStocksHeld_A_fkey";

-- DropForeignKey
ALTER TABLE "_StockDataToStocksHeld" DROP CONSTRAINT "_StockDataToStocksHeld_B_fkey";

-- AlterTable
ALTER TABLE "StocksHeld" ADD COLUMN     "exchange_city" TEXT NOT NULL,
ADD COLUMN     "exchange_country" TEXT NOT NULL,
ADD COLUMN     "exchange_name" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- DropTable
DROP TABLE "StockData";

-- DropTable
DROP TABLE "_StockDataToStocksHeld";
