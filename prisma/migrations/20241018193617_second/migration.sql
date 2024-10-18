/*
  Warnings:

  - Added the required column `seats` to the `Table` table without a default value. This is not possible if the table is not empty.
  - Added the required column `table_number` to the `Table` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `table` ADD COLUMN `seats` INTEGER NOT NULL,
    ADD COLUMN `table_number` INTEGER NOT NULL;
