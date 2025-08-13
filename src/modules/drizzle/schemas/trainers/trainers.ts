import { pgTable, text, serial, boolean, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { timestamps } from '../columns.helpers';
import { courses } from '../courses/courses';

export const trainers = pgTable('trainers', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  nameEn: text('name_en').notNull(),
  nameAr: text('name_ar').notNull(),
  titleEn: text('title_en').notNull(),
  titleAr: text('title_ar').notNull(),
  linkedIn: text('linked_in'),
  trainerPicture: text('trainer_picture'),
  leadWeekend: boolean('lead_weekend').default(false).notNull(),
  ...timestamps,
});

export const trainersRelations = relations(trainers, ({ one, many }) => ({
  courses: many(courseTrainers),
}));

export const courseTrainers = pgTable('course_trainers', {
  id: serial('id').primaryKey(),
  courseId: integer('course_id').references(() => courses.id),
  trainerId: integer('trainer_id').references(() => trainers.id),
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
