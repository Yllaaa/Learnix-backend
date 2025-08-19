import { pgTable, text, date, integer, serial } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { timestamps } from '../columns.helpers';
import { cities } from '../globe/cities';
import { courseTrainers } from '../trainers/trainers';
import { curriculums } from './curriculum';
import { categories } from './categories';
import { courseOutcomes } from './outcomes';

export const courses = pgTable('courses', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  titleEn: text('title_en').notNull(),
  titleAr: text('title_ar').notNull(),
  descriptionEn: text('description_en'),
  descriptionAr: text('description_ar'),
  startDate: date('start_date'),
  price: integer('price'),
  cityId: integer('city_id').references(() => cities.id),
  picture: text('picture'),
  ...timestamps,
});

export const courseCategories = pgTable('course_categories', {
  id: serial('id').primaryKey(),
  courseId: integer('course_id').references(() => courses.id, {
    onDelete: 'cascade',
  }),
  categoryId: integer('category_id').references(() => categories.id, {
    onDelete: 'cascade',
  }),
  ...timestamps,
});

export const coursesRelations = relations(courses, ({ one, many }) => ({
  city: one(cities, {
    fields: [courses.cityId],
    references: [cities.id],
  }),
  categories: many(courseCategories),
  trainers: many(courseTrainers),
  curriculums: many(curriculums),
  outcomes: many(courseOutcomes),
}));

export const courseCategoriesRelations = relations(
  courseCategories,
  ({ one }) => ({
    course: one(courses, {
      fields: [courseCategories.courseId],
      references: [courses.id],
    }),
    category: one(categories, {
      fields: [courseCategories.categoryId],
      references: [categories.id],
    }),
  }),
);
