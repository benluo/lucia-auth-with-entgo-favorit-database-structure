// import { drizzle } from 'drizzle-orm/postgres-js';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
// import * as pg from 'pg';
export const db = drizzle(process.env.DATABASE_URL);
// import postgres from 'postgres';
// import { env } from '$env/dynamic/private';
// if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

// const pool = new pg.Pool({
// 	connectionString: process.env.DATABASE_URL
// });
// // const client = postgres(env.DATABASE_URL);
// // export const db = drizzle(client);
// export const db = drizzle({ client: pool });
