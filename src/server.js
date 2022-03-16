const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const authRouter = require('./routes/authRoutes');
const accRouter = require('./routes/accRoutes');
require('dotenv').config();

const { PORT } = process.env;
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/auth', authRouter);
app.use('/accounts', accRouter);

app.listen(PORT, console.log(`server is running on port ${PORT}`));
