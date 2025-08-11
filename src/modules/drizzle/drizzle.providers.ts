import { Inject } from '@nestjs/common';
import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schemas/schema';

export const DrizzleProvider = {
  provide: 'DRIZZLE',
  useFactory: (): NodePgDatabase<typeof schema> => {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
    return drizzle<typeof schema>(pool, { schema });
  },
};

export const InjectDrizzle = () => Inject('DRIZZLE');
