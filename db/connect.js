// connect to the mysql database
const mysql = require('mysql2');
const startConnect = mysql.createConnection({
	host: 'localhost',
	user: 'root',
    database: 'Notmypassword1',	
});

startConnect.connect(function (err) {
	if (err) throw err;
	console.log('Connection started.');
});

module.exports = startConnect;