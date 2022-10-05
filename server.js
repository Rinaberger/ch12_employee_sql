const express = require('express');
const inquirer = require('inquirer');
const db = require('./db');
require('console.table');
//const inputCheck = require('./utils/inputCheck');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.listen(PORT, () => {
     console.log(`Server running on port ${PORT}`);
   });
