import { pgTable, text, serial } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { timestamps } from '../columns.helpers';
import { courses } from '../courses/courses';

export const courseOutcomes = pgTable('course_outcomes', {
  id: serial('id').primaryKey(),
  titleEn: text('title_en').notNull(),
  titleAr: text('title_ar').notNull(),
  descriptionEn: text('description_en').notNull(),
  descriptionAr: text('description_ar').notNull(),
  courseId: serial('course_id').references(() => courses.id),
  ...timestamps,
});

export const courseOutcoumesRelations = relations(
  courseOutcomes,
  ({ one }) => ({
    course: one(courses, {
      fields: [courseOutcomes.courseId],
      references: [courses.id],
    }),
  }),
);
