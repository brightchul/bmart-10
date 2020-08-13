import mysql from "mysql2/promise";

const options: mysql.PoolOptions = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 30,
  charset: "utf8mb4",
};

export default options;
