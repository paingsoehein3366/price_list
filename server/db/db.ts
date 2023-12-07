import { Pool } from "pg";

export const db = new Pool({
    host: "dpg-clcmtlvgsrdc7388h8b0-a.singapore-postgres.render.com",
    user: "bus_stop_user",
    password: "m2Ta15c3HrQ1jp8ufvABdifrXi3CI0jT",
    database: "bus_stop",
    max: 20,
    ssl: true,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});