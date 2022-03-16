const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const { validateUserLogin, validateUserRegister } = require('../helper');

const authRouter = express.Router();

authRouter.post('/register', validateUserRegister, registerUser);
authRouter.post('/login', validateUserLogin, loginUser);

module.exports = authRouter;
