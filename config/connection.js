
const mysql = require('mysql2');  // install this(mysql2) package for rovides client functionality for the MySQL database，use it to connect mysql database

require('dotenv').config();  // read .env file 

//create  connection to mysql database////
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: process.env.DB_USER, //hide my username in my .env for safety
    password: process.env.DB_PASSWORD, // hide my password in my .env file gor safety
    port: 3306,
    database: process.env.DB_NAME //hide my databases 
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected to the server");
  });
  

 // export this connection so i can use import in other file
module.exports = connection;