/* eslint-disable operator-linebreak */
const mysql = require('mysql2/promise');
const { dbConfig } = require('../helper');

async function addUserToDatabase(fullName, email, password) {
  try {
    const sql =
      'INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)';
    const conn = await mysql.createConnection(dbConfig);
    const [result] = await conn.execute(sql, [fullName, email, password]);
    await conn.close();
    return result;
  } catch (error) {
    console.log('addUserToDatabase', error);
    return false;
  }
}

async function findUserByEmail(email) {
  try {
    const sql = 'SELECT * FROM users WHERE email = ?';
    const conn = await mysql.createConnection(dbConfig);
    const [foundUser] = await conn.execute(sql, [email]);
    await conn.close();
    return foundUser[0];
  } catch (error) {
    console.log('addUserToDatabase', error);
    return false;
  }
}

module.exports = { addUserToDatabase, findUserByEmail };
