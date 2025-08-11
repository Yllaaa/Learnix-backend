CREATE TABLE "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name_en" text NOT NULL,
	"name_ar" text NOT NULL,
	"description_en" text,
	"description_ar" text,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "course_outcomes" (
	"id" serial PRIMARY KEY NOT NULL,
	"title_en" text NOT NULL,
	"title_ar" text NOT NULL,
	"description_en" text NOT NULL,
	"description_ar" text NOT NULL,
	"course_id" serial NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "courses" DROP CONSTRAINT "courses_category_id_course_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "course_trainers" ALTER COLUMN "course_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "course_trainers" ALTER COLUMN "course_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "course_trainers" ALTER COLUMN "trainer_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "course_trainers" ALTER COLUMN "trainer_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "courses" ALTER COLUMN "city_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "courses" ALTER COLUMN "city_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "course_categories" ADD COLUMN "course_id" integer;--> statement-breakpoint
ALTER TABLE "course_categories" ADD COLUMN "category_id" integer;--> statement-breakpoint
ALTER TABLE "course_outcomes" ADD CONSTRAINT "course_outcomes_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course_categories" ADD CONSTRAINT "course_categories_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course_categories" ADD CONSTRAINT "course_categories_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "courses" DROP COLUMN "category_id";--> statement-breakpoint
ALTER TABLE "course_categories" DROP COLUMN "name_en";--> statement-breakpoint
ALTER TABLE "course_categories" DROP COLUMN "name_ar";--> statement-breakpoint
ALTER TABLE "course_categories" DROP COLUMN "description_en";--> statement-breakpoint
ALTER TABLE "course_categories" DROP COLUMN "description_ar";