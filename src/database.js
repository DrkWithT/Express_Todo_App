/**
 * @file database.js
 * @author Derek Tan
 */

var mysql = require('mysql');
require('dotenv').config(); // load .env variables

var databaseCon = mysql.createConnection({
    host: `${process.env.DB_HOST}`,
    user: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DB_NAME}`
});

var databaseReady = false;

/**
 * @description Connects to a remote mySQL database. Should be called once!
 */
function setupDBConnection() {
    databaseCon.connect((err) => {
        databaseReady = !err;

        if (!databaseReady) {
            console.error(`${err.message}`);
            return;
        }

        console.info('Connected to database.');
    });
}

function fetchTodoTask(data, callback) {
    databaseCon.query('SELECT title, description FROM tasks WHERE title = ?', data.title, (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows[0]);
        }
    });
}

function closeDBConnection() {
    databaseCon.end((err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Closed DB connection.');
        }
    });
}

/// Exports of database.js:
module.exports = {
    setupDBConnection: setupDBConnection,
    fetchTodoTask: fetchTodoTask,
    closeDBConnection: closeDBConnection
};