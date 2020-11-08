require("dotenv").config();

import mysql from "mysql2/promise";

export async function executeQuery(query) {
  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASS,
      database: process.env.MYSQL_DB,
    });

    const [rows] = await connection.execute(query);
    // console.log("the rows are ", rows);
    return rows;
  } catch (error) {
    // console.log("the error is ", error.message);
    return error.message;
  }
}
