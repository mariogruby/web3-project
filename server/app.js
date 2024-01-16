require('dotenv').config();
require('./db')
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);


module.exports = app; 