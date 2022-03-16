/* eslint-disable operator-linebreak */
const mysql = require('mysql2/promise');
const { dbConfig } = require('../helper');

async function getAccountsFromDb(userId) {
  try {
    const sql =
      'SELECT groups.id, groups.name FROM accounts JOIN groups ON group_id=groups.id WHERE accounts.user_id = ?';
    const conn = await mysql.createConnection(dbConfig);
    const [result] = await conn.execute(sql, [userId]);
    await conn.close();
    return result;
  } catch (error) {
    console.log('addNewAccToDb', error);
    return false;
  }
}

async function addNewAccToDb(newAccObj) {
  try {
    const { groupId, userId } = newAccObj;
    const sql = 'INSERT INTO accounts (group_id, user_id) VALUES (?, ?) ';
    const conn = await mysql.createConnection(dbConfig);
    const [result] = await conn.execute(sql, [groupId, userId]);
    await conn.close();
    return result;
  } catch (error) {
    console.log('addNewAccToDb', error);
    return false;
  }
}

module.exports = { addNewAccToDb, getAccountsFromDb };
