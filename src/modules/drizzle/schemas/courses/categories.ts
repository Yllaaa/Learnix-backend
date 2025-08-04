import { pgTable, text, serial } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { timestamps } from '../columns.helpers';

import { courses } from './courses';

export const courseCategories = pgTable('course_categories', {
  id: serial('id').primaryKey(),
  nameEn: text('name_en').notNull(),
  nameAr: text('name_ar').notNull(),
  descriptionEn: text('description_en'),
  descriptionAr: text('description_ar'),
  ...timestamps,
});

export const courseCategoriesRelations = relations(
  courseCategories,
  ({ one, many }) => ({
    courses: many(courses),
  }),
);
