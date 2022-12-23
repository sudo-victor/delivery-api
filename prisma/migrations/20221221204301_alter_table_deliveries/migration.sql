/*
  Warnings:

  - You are about to drop the column `clientsId` on the `deliveries` table. All the data in the column will be lost.
  - You are about to drop the column `deliverymanId` on the `deliveries` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "deliveries" DROP CONSTRAINT "deliveries_id_deliveryman_fkey";

-- AlterTable
ALTER TABLE "deliveries" DROP COLUMN "clientsId",
DROP COLUMN "deliverymanId",
ALTER COLUMN "id_deliveryman" DROP NOT NULL,
ALTER COLUMN "end_at" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_id_deliveryman_fkey" FOREIGN KEY ("id_deliveryman") REFERENCES "deliveryman"("id") ON DELETE SET NULL ON UPDATE CASCADE;
