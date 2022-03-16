const express = require('express');
const { postAccount, getAccounts } = require('../controllers/accController');
const { validateToken } = require('../helper');

const accRouter = express.Router();

accRouter.get('/', validateToken, getAccounts);
accRouter.post('/', validateToken, postAccount);

module.exports = accRouter;
