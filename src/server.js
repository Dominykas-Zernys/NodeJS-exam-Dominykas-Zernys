const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const { PORT } = process.env;
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json('testing');
});

app.listen(PORT, console.log(`server is running on port ${PORT}`));
