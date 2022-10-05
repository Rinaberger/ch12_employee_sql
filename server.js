const mysql = require("mysql2");
const express = require('express');
//const inputCheck = require('./utils/inputCheck');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

















// Start server after DB connection
db.connect(err => {
    if (err) throw err;
   console.log('Database connected.');
   app.listen(PORT, () => {
     console.log(`Server running on port ${PORT}`);
   });
 });