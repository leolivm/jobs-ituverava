/*
  Warnings:

  - Made the column `company` on table `Jobs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `salary` on table `Jobs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `Jobs` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Jobs" ALTER COLUMN "company" SET NOT NULL,
ALTER COLUMN "salary" SET NOT NULL,
ALTER COLUMN "address" SET NOT NULL;
