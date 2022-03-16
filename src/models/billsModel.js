/* eslint-disable operator-linebreak */
const mysql = require('mysql2/promise');
const { dbConfig } = require('../helper');

async function getBillsFromDb(groupId) {
  try {
    const sql = 'SELECT * FROM bills WHERE group_id = ?';
    const conn = await mysql.createConnection(dbConfig);
    const [bills] = await conn.execute(sql, [groupId]);
    await conn.close();
    return bills;
  } catch (error) {
    console.log('getBillsFromDb', error);
    return false;
  }
}

async function postBillToDb(newBillObj) {
  try {
    const { groupId, amount, description } = newBillObj;
    const sql =
      'INSERT INTO bills (group_id, amount, description) VALUES (?, ?, ?)';
    const conn = await mysql.createConnection(dbConfig);
    const [result] = await conn.execute(sql, [groupId, amount, description]);
    await conn.close();
    return result;
  } catch (error) {
    console.log('postBillToDb', error);
    return false;
  }
}

module.exports = { getBillsFromDb, postBillToDb };
