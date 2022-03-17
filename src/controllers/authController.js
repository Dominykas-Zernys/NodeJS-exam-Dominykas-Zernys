/* eslint-disable comma-dangle */
const {
  failResponse,
  successResponse,
  hashPassword,
  verifyPassword,
  createJWToken,
} = require('../helper');
const { addUserToDatabase, findUserByEmail } = require('../models/authModel');

async function registerUser(req, res) {
  const { fullName, email, password } = req.body;
  const userRegistered = await addUserToDatabase(
    fullName,
    email,
    hashPassword(password)
  );
  if (!userRegistered) {
    failResponse(res);
    return;
  }
  successResponse(res, 'user registered successfully');
}

async function loginUser(req, res) {
  const foundUser = await findUserByEmail(req.body.email);
  if (!foundUser) {
    failResponse(res, ['Email or password is incorrect']);
    return;
  }
  verifyPassword(req.body.password, foundUser.password);
  if (!verifyPassword(req.body.password, foundUser.password)) {
    failResponse(res, ['Email or password is incorrect']);
    return;
  }
  const userToken = createJWToken(foundUser.id);
  successResponse(res, userToken);
}

module.exports = { registerUser, loginUser };
