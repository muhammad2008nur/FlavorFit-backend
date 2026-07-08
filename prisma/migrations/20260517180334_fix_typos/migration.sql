/*
  Warnings:

  - You are about to drop the column `goal_weight_cm` on the `body_measurements` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "body_measurements" DROP COLUMN "goal_weight_cm",
ADD COLUMN     "goal_weight_kg" INTEGER;
