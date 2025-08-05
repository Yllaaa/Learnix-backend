import { pgTable, text, serial, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { timestamps } from '../columns.helpers';
import { cities, trainers } from '../schema';

export const leadWeekendsApplicationsStatus = pgEnum(
  'lead_weekends_applications_status',
  ['pending', 'accepted', 'rejected'],
);

export const leadWeekendApplicants = pgTable('lead_weekend_applicants', {
  id: serial('id').primaryKey(),
  fullName: text('full_name').notNull(),
  email: text('email').notNull(),
  jobTitle: text('job_title').notNull(),
  companyName: text('company_name').notNull(),
  cityId: serial('city_id').references(() => cities.id),
  trainerId: serial('trainer_id').references(() => trainers.id),
  status: leadWeekendsApplicationsStatus('status').default('pending').notNull(),

  ...timestamps,
});

export const leadWeekendApplicantsRelations = relations(
  leadWeekendApplicants,
  ({ one, many }) => ({
    trainer: one(trainers, {
      fields: [leadWeekendApplicants.trainerId],
      references: [trainers.id],
    }),
    city: one(cities, {
      fields: [leadWeekendApplicants.cityId],
      references: [cities.id],
    }),
  }),
);
