/**
 * @file database.js
 * @author Derek Tan
 */

var mysql = require('mysql');
require('dotenv').config(); // load DB credentials from envfile
var validators = require('./validators'); // use simple validator functions

var databaseCon = mysql.createConnection({
    host: `${process.env.DB_HOST}`,
    user: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DB_NAME}`
});

var dbConUsable = false;

/**
 * @description Connects to a remote mySQL database. Should be called once!
 */
function setupDBConnection() {
    databaseCon.connect((err) => {
        dbConUsable = !err;

        if (!dbConUsable) {
            console.error(`${err.message}`);
            return;
        }

        console.info('Connected to database.');
    });
}

/**
 * @description Runs a read SQL operation to fetch all posted tasks' titles with IDs.
 * @param {*} callback The function invoked when the SQL operation ends.
 */
function fetchTaskBriefs(callback) {
    if (!dbConUsable) {
        callback(new Error('Database unavailable.'), null);
        return;
    }

    // NOTE: the rows param in the callback is Array<object>...
    databaseCon.query('SELECT taskid, title FROM tasks', (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
}

/**
 * @description Runs a read operation of a task.
 * @param {object} data The form data object. Must be sanitized.
 * @param {Function} callback The function invoked when the SQL operation ends.
 */
function fetchTodoTask(data, callback) {
    // guard clause: check if database connection is usable
    if (!dbConUsable) {
        callback(new Error('Database unavailable.'), null);
        return;
    }

    let cleanedTitle = mysql.escape(data.title); // sanitize user given values for security purposes!

    databaseCon.query(`SELECT title, description FROM tasks WHERE title = ${cleanedTitle}`, (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows[0]);
        }
    });
}

/**
 * @description Runs a create operation of a task.
 * @param {object} data The form data object. Must be sanitized.
 * @param {Function} callback The function to invoke on the SQL operation finish.
 */
function insertTodoTask(data, callback) {
    if (!dbConUsable) {
        callback(new Error('Database unavailable.'), null);
        return;
    }

    let cleanedTitle = mysql.escape(data.title);
    let cleanedDesc = mysql.escape(data.description);

    databaseCon.query(`INSERT INTO tasks (title, description) VALUES (${cleanedTitle}, ${cleanedDesc})`, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, {ok: result.affectedRows >= 1});
        }
    });
}

/**
 * @description Runs a delete operation of a task.
 * @param {object} data The form data object.
 * @param {Function} callback The function to invoke on the SQL operation finish.
 */
function deleteTodoTask(data, callback) {
    if (!dbConUsable) {
        callback(new Error('Database unavailable.'), null);
        return;
    }

    let argChoice = 0;
    let cleanedTitle = null;
    let tempID = -1;
    
    if (data.title) {
        cleanedTitle = mysql.escape(data.title); // escape any string argument for title!
        argChoice = 1;
    } else if (validators.isBetweenInclusive(data.id, {min: 1, max: undefined, minOnly: true})) {
        tempID = data.id;
        argChoice = 2;
    }

    switch (argChoice) {
        case 1: // handle deletion by title
            databaseCon.query(`DELETE FROM tasks WHERE title = ${cleanedTitle}`, (err, result) => {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, {ok: result.affectedRows >= 1});
                }
            });
            break;
        case 2: // handle deletion by ID
            databaseCon.query(`DELETE FROM tasks WHERE taskid = ${tempID}`, (err, result) => {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, {ok: result.affectedRows >= 1});
                }
            });
            break;
        case 0:
        default:
            callback(new Error('Invalid arguments.'), null);
            break;
    }
}

function closeDBConnection() {
    console.log('About to close DB connection.');
    databaseCon.destroy();
}

// Exports of database.js
module.exports = {
    setupDBConnection: setupDBConnection,
    fetchTaskBriefs: fetchTaskBriefs,
    fetchTodoTask: fetchTodoTask,
    insertTodoTask: insertTodoTask,
    deleteTodoTask: deleteTodoTask,
    closeDBConnection: closeDBConnection
};