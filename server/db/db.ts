import { Pool } from "pg";

export const db = new Pool({
    host: "localhost",
    user: "postgres",
    password: "Paing2958",
    database: "price_list",
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});