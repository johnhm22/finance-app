/*
  Warnings:

  - You are about to drop the `Stocks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Stocks" DROP CONSTRAINT "Stocks_userId_fkey";

-- DropTable
DROP TABLE "Stocks";

-- CreateTable
CREATE TABLE "StocksHeld" (
    "id" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "exchange_acronym" TEXT NOT NULL,
    "bookCost" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "StocksHeld_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockData" (
    "id" TEXT NOT NULL,
    "country" TEXT,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "exchange_acronym" TEXT NOT NULL,
    "exchange_name" TEXT NOT NULL,
    "exchange_country" TEXT NOT NULL,
    "exchange_city" TEXT NOT NULL,

    CONSTRAINT "StockData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_StockDataToStocksHeld" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "StocksHeld_userId_key" ON "StocksHeld"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_StockDataToStocksHeld_AB_unique" ON "_StockDataToStocksHeld"("A", "B");

-- CreateIndex
CREATE INDEX "_StockDataToStocksHeld_B_index" ON "_StockDataToStocksHeld"("B");

-- AddForeignKey
ALTER TABLE "StocksHeld" ADD CONSTRAINT "StocksHeld_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StockDataToStocksHeld" ADD CONSTRAINT "_StockDataToStocksHeld_A_fkey" FOREIGN KEY ("A") REFERENCES "StockData"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StockDataToStocksHeld" ADD CONSTRAINT "_StockDataToStocksHeld_B_fkey" FOREIGN KEY ("B") REFERENCES "StocksHeld"("id") ON DELETE CASCADE ON UPDATE CASCADE;
