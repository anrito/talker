ALTER TABLE "users" DROP CONSTRAINT "users_contact_phone_unique";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "name";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "contact_phone";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "phone_verified";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "email_verified";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "confirmation_code";