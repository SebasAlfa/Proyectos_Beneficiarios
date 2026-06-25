import mysql from 'mysql2/promise';

if (!process.env.DATABASE_URL) {
  throw new Error(
    "Por favor, define la variable DATABASE_URL en tu archivo .env.local"
  );
}

const pool = mysql.createPool({
  uri: process.env.DATABASE_URL,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;