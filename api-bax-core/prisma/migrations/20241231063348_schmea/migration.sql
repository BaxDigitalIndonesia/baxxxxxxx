/*
  Warnings:

  - A unique constraint covering the columns `[profileId]` on the table `Address` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Address` DROP FOREIGN KEY `Address_profileId_fkey`;

-- DropIndex
DROP INDEX `Address_profileId_fkey` ON `Address`;

-- CreateIndex
CREATE UNIQUE INDEX `Address_profileId_key` ON `Address`(`profileId`);

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
