import {neon} from '@neondatabase/serverless';
import {drizzle} from 'drizzle-orm/neon-http';
import * as schema from '../../db/schema';

// Importante para que reconozca el archivo .env
import dotenv from 'dotenv';
dotenv.config();

// Aqui creas el cliente sql de Neon (postgres)
const sql = neon(process.env.DATABASE_URL);

// Aqui inicializas drizzle, con el schema de las tablas de ../db/schema.js
const database = drizzle({client: sql, schema});

export * from 'drizzle-orm';
export {database, schema};
