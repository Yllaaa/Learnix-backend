CREATE TABLE "join_us_form" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"is_resolved" boolean DEFAULT false NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "wait_list_form" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"is_resolved" boolean DEFAULT false NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "vistor_messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"subject" text NOT NULL,
	"message" text NOT NULL,
	"status" "lead_weekends_applications_status" DEFAULT 'pending' NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "lead_weekend_applicants" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "lead_weekend_applicants" ALTER COLUMN "status" SET DEFAULT 'pending'::text;--> statement-breakpoint
ALTER TABLE "vistor_messages" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "vistor_messages" ALTER COLUMN "status" SET DEFAULT 'pending'::text;--> statement-breakpoint
DROP TYPE "public"."lead_weekends_applications_status";--> statement-breakpoint
CREATE TYPE "public"."lead_weekends_applications_status" AS ENUM('pending', 'resolved', 'reopened');--> statement-breakpoint
ALTER TABLE "lead_weekend_applicants" ALTER COLUMN "status" SET DEFAULT 'pending'::"public"."lead_weekends_applications_status";--> statement-breakpoint
ALTER TABLE "lead_weekend_applicants" ALTER COLUMN "status" SET DATA TYPE "public"."lead_weekends_applications_status" USING "status"::"public"."lead_weekends_applications_status";--> statement-breakpoint
ALTER TABLE "vistor_messages" ALTER COLUMN "status" SET DEFAULT 'pending'::"public"."lead_weekends_applications_status";--> statement-breakpoint
ALTER TABLE "vistor_messages" ALTER COLUMN "status" SET DATA TYPE "public"."lead_weekends_applications_status" USING "status"::"public"."lead_weekends_applications_status";