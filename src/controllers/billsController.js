const { failResponse, successResponse } = require('../helper');
const { getBillsFromDb, postBillToDb } = require('../models/billsModel');

async function getBillsById(req, res) {
  const foundBills = await getBillsFromDb(req.params.id);
  if (!foundBills) {
    failResponse(res);
    return;
  }
  successResponse(res, foundBills);
}
async function postNewBill(req, res) {
  const newBill = await postBillToDb(req.body);
  console.log(newBill);
  if (!newBill) {
    failResponse(res);
    return;
  }
  successResponse(res, 'new bill created successfully');
}

module.exports = { getBillsById, postNewBill };
