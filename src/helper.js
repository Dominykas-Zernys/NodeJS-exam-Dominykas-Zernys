/* eslint-disable newline-per-chained-call */
// database config

require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
};

// success and fail responses for controllers

function successResponse(res, data) {
  res.json({ success: true, data });
}

function failResponse(res, data = 'something went wrong') {
  res.status(500).json({ success: false, data });
}

// password encryption and verification

const bcrypt = require('bcryptjs');

function hashPassword(password) {
  return bcrypt.hashSync(password, 10);
}

function verifyPassword(enteredPassword, databasePassword) {
  return bcrypt.compareSync(enteredPassword, databasePassword);
}

// Joi validation

const Joi = require('joi');

async function validateUserRegister(req, res, next) {
  const schema = Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().min(5).max(30).required(),
  });
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const errorArr = error.details.map((errorDetail) => errorDetail.message);
    res.status(400).json({ success: false, data: errorArr });
  }
}

async function validateUserLogin(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().min(5).max(30).required(),
  });
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    res.status(400).json({ success: false, data: error[0] });
  }
}

module.exports = {
  dbConfig,
  successResponse,
  failResponse,
  hashPassword,
  verifyPassword,
  validateUserRegister,
  validateUserLogin,
};
