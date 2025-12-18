import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from './db';
import * as schema from './db/schema';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: schema,
  }),
  user: {
    additionalFields: {
      dob: {
        type: "string",
      },
      gender: {
        type: "string",
      },
      shoeSize: {
        type: "string",
      }
    }
  },
  emailAndPassword: {
    enabled: true,
  },
});
