//Importa mysql
const mysql = require('mysql2');

// Crea una connessione al database utilizzando le variabili di ambiente
const connection = mysql.createConnection({
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    password: process.env.PSW_DB,
    database: process.env.DATABASE_DB
});

// Connette al database e gestisce eventuali errori
connection.connect((err) =>{
    if(err) throw err;
    console.log('db connesso');
});

module.exports = connection;