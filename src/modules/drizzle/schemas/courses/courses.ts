import { pgTable, text, date, integer, serial } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { timestamps } from '../columns.helpers';
import { cities } from '../global/cities';
import { countries } from '../global/countries';
import { courseCategories } from './categories';
import { trainers } from '../trainers/trainers';

export const courses = pgTable('courses', {
  id: serial('id').primaryKey(),
  titleEn: text('title_en').notNull(),
  titleAr: text('title_ar').notNull(),
  descriptionEn: text('description_en'),
  descriptionAr: text('description_ar'),
  startDate: date('start_date'),
  price: integer('price'),
  countryId: serial('country_id').references(() => countries.id),
  cityId: serial('city_id').references(() => cities.id),
  categoryId: serial('category_id').references(() => courseCategories.id),
  ...timestamps,
});

export const coursesRelations = relations(courses, ({ one, many }) => ({
  country: one(countries, {
    fields: [courses.countryId],
    references: [countries.id],
  }),
  city: one(cities, {
    fields: [courses.cityId],
    references: [cities.id],
  }),
  category: one(courseCategories, {
    fields: [courses.categoryId],
    references: [courseCategories.id],
  }),
  trainers: many(courseTrainers),
}));

export const courseTrainers = pgTable('course_trainers', {
  id: serial('id').primaryKey(),
  courseId: serial('course_id').references(() => courses.id),
  trainerId: serial('trainer_id').references(() => trainers.id),
  ...timestamps,
});

export const courseTrainersRelations = relations(courseTrainers, ({ one }) => ({
  course: one(courses, {
    fields: [courseTrainers.courseId],
    references: [courses.id],
  }),
  trainer: one(trainers, {
    fields: [courseTrainers.trainerId],
    references: [trainers.id],
  }),
}));
