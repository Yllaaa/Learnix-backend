CREATE TYPE "public"."lead_weekends_applications_status" AS ENUM('pending', 'accepted', 'rejected');--> statement-breakpoint
CREATE TABLE "lead_weekend_applicants" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" text NOT NULL,
	"email" text NOT NULL,
	"job_title" text NOT NULL,
	"company_name" text NOT NULL,
	"city_id" serial NOT NULL,
	"trainer_id" serial NOT NULL,
	"status" "lead_weekends_applications_status" DEFAULT 'pending' NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "courses" DROP CONSTRAINT "courses_country_id_countries_id_fk";
--> statement-breakpoint

ALTER TABLE "countries" ADD COLUMN "iso" text NOT NULL;--> statement-breakpoint
ALTER TABLE "lead_weekend_applicants" ADD CONSTRAINT "lead_weekend_applicants_city_id_cities_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."cities"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lead_weekend_applicants" ADD CONSTRAINT "lead_weekend_applicants_trainer_id_trainers_id_fk" FOREIGN KEY ("trainer_id") REFERENCES "public"."trainers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "courses" DROP COLUMN "country_id";