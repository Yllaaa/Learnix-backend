CREATE TYPE "public"."course_registeration_status" AS ENUM('pending', 'accepted', 'rejected', 'completed');--> statement-breakpoint
CREATE TABLE "course_registeration" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" text NOT NULL,
	"email" text NOT NULL,
	"job_title" text NOT NULL,
	"company_name" text NOT NULL,
	"start_date" text NOT NULL,
	"end_date" text NOT NULL,
	"city_id" serial NOT NULL,
	"trainer_id" serial NOT NULL,
	"status" "course_registeration_status" DEFAULT 'pending' NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "course_registeration" ADD CONSTRAINT "course_registeration_city_id_cities_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."cities"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course_registeration" ADD CONSTRAINT "course_registeration_trainer_id_trainers_id_fk" FOREIGN KEY ("trainer_id") REFERENCES "public"."trainers"("id") ON DELETE no action ON UPDATE no action;