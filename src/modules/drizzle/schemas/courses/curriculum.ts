import { pgTable, text, serial } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { timestamps } from '../columns.helpers';
import { courses } from './courses';

export const curriculums = pgTable('curriculums', {
  id: serial('id').primaryKey(),
  nameEn: text('name_en').notNull(),
  nameAr: text('name_ar').notNull(),
  descriptionEn: text('description_en').notNull(),
  descriptionAr: text('description_ar').notNull(),
  courseId: serial('course_id').references(() => courses.id),
  ...timestamps,
});

export const curriculumsRelations = relations(curriculums, ({ one }) => ({
  course: one(courses, {
    fields: [curriculums.courseId],
    references: [courses.id],
  }),
}));
