ALTER TABLE "courses" ADD COLUMN "picture" text;--> statement-breakpoint
ALTER TABLE "trainers" ADD COLUMN "picture" text;--> statement-breakpoint
ALTER TABLE "trainers" ADD COLUMN "lead_weekend" boolean DEFAULT false NOT NULL;