import {admin} from 'better-auth/plugins';
import {betterAuth} from 'better-auth';
import {Pool} from 'pg';
import 'dotenv/config';

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.DATABASE_URL
  }),
  trustedOrigins: ['http://localhost:5174', 'https://alex-vallejo.vercel.app'],
  emailAndPassword: {
    enabled: true
  },
  plugins: [admin()]
});
