const express = require('express');
const { getBillsById, postNewBill } = require('../controllers/billsController');

const billsRouter = express.Router();

billsRouter.get('/:id', getBillsById);
billsRouter.post('/', postNewBill);

module.exports = billsRouter;
