CREATE TABLE "course_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name_en" text NOT NULL,
	"name_ar" text NOT NULL,
	"description_en" text,
	"description_ar" text,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
--> delete courses_table first
DELETE FROM "courses";

ALTER TABLE "courses" ADD COLUMN "title_en" text NOT NULL;--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "title_ar" text NOT NULL;--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "description_en" text;--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "description_ar" text;--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "category_id" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "courses" ADD CONSTRAINT "courses_category_id_course_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."course_categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "courses" DROP COLUMN "title";--> statement-breakpoint
ALTER TABLE "courses" DROP COLUMN "description";