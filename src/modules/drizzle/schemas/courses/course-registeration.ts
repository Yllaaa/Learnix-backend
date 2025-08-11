import { pgEnum, pgTable, serial, text } from 'drizzle-orm/pg-core';

import { timestamps } from '../columns.helpers';
import { trainers } from '../trainers/trainers';
import { cities } from '../globe/cities';
import { courses } from './courses';

export const courseRegisterationStatus = pgEnum('course_registeration_status', {
  pending: 'pending',
  accepted: 'accepted',
  rejected: 'rejected',
  completed: 'completed',
});
export const courseRegisteration = pgTable('course_registeration', {
  id: serial('id').primaryKey(),
  courseId: serial('course_id').references(() => courses.id),
  fullName: text('full_name').notNull(),
  email: text('email').notNull(),
  jobTitle: text('job_title').notNull(),
  companyName: text('company_name').notNull(),
  startDate: text('start_date').notNull(),
  endDate: text('end_date').notNull(),
  cityId: serial('city_id').references(() => cities.id),
  trainerId: serial('trainer_id').references(() => trainers.id),
  status: courseRegisterationStatus('status').default('pending').notNull(),

  ...timestamps,
});
