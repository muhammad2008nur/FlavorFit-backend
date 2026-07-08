-- AlterTable
ALTER TABLE "profiles" ALTER COLUMN "full_name" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'USER';
