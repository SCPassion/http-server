ALTER TABLE "users" ALTER COLUMN "token" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "token" DROP NOT NULL;