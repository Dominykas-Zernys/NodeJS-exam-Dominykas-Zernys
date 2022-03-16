const { failResponse, successResponse } = require('../helper');
const { addNewAccToDb, getAccountsFromDb } = require('../models/accModel');

async function getAccounts(req, res) {
  const foundAccounts = await getAccountsFromDb(req.userId);
  if (!foundAccounts) {
    failResponse(res);
  }
  successResponse(res, foundAccounts);
}

async function postAccount(req, res) {
  const newAccountObj = { groupId: req.body.groupId, userId: req.userId };
  const postedAcc = await addNewAccToDb(newAccountObj);
  if (!postedAcc) {
    failResponse(res);
  }
  successResponse(res, 'new account created');
}

module.exports = { postAccount, getAccounts };
