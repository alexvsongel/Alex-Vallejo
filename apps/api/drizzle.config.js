import {defineConfig} from 'drizzle-kit';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  dialect: 'postgresql', // 'mysql' | 'sqlite' | 'turso'
  schema: './db/schema.js',
  dbCredentials: {
    url: process.env.DATABASE_URL
  }
});
