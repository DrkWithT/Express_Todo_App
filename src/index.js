/**
 * @file index.js
 * @brief Contains the main logic of my Express application including middleware and exit listeners.
 * @author Derek Tan
 */

/** CommonJS Imports */
var express = require('express');
const mydatabase = require('./database');

/** Constants */
const PORT = 3000;

/* App Setup */
const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.set('view engine', 'pug');

/* Middleware */
app.get('/', (req, res) => {
    mydatabase.fetchTaskBriefs((err, data) => {
        if (data) {
            res.render('landing', {page_title: 'Todos', tasks: data, result_title:'N/A', result_text: 'N/A'});
        } else {
            res.render('landing', {page_title: 'Todos', tasks: [], result_title:'Error', result_text: `${err.message}`});
        }
    });
});

app.post('/', (req, res) => {
    let appAction = parseInt(req.body.action) || 0;
    let todoTitle = req.body.title || 'foo';
    let todoID;
    let todoDescription = req.body.description || 'No content';

    if (!isNaN(todoTitle)) {
        todoID = parseInt(todoTitle); // if a valid ID is passed instead of a title, use it for deletions only!
    }

    let realTitle = todoTitle.trim().split(' ').join('_'); // format title string with snake case

    switch (appAction) {
        case 1: // fetch a todo task here...
            mydatabase.fetchTodoTask({title: realTitle}, (err, data = null) => {
                if (err) {
                    console.error(`SQL Error: ${err.message}`);

                    res.render('landing', {page_title: 'Todos', result_title: 'Error', result_text: 'Failed to fetch data.'});
                } else if (data) {
                    res.render('landing', {page_title: 'Todos', result_title: data.title.replace('_', ' '), result_text: data.description});
                } else {
                    res.render('landing', {page_title: 'Todos', result_title: 'Error', result_text: 'No data found.'});
                }
            });
            break;
        case 2: // add a todo task...
            mydatabase.insertTodoTask({title: realTitle, description: todoDescription}, (err, data) => {
                if (err) {
                    console.error(`SQL Error: ${err.message}`);

                    res.render('landing', {page_title: 'Todos', result_title: 'Error', result_text: 'Failed to add the task.'});
                } else if (data.ok) {
                    res.render('landing', {page_title: 'Todos', result_title: 'Success', result_text: 'Added task.'});
                } else {
                    res.render('landing', {page_title: 'Todos', result_title: 'Error', result_text: 'Failed to add the task.'});
                }
            });
            break;
        case 3: // delete a todo task...
            mydatabase.deleteTodoTask({title: realTitle, id: todoID}, (err, data) => {
                if (err) {
                    console.error(`SQL Error: ${err.message}`);

                    res.render('landing', {page_title: 'Todos', result_title: 'Error', result_text: 'Failed to delete new task.'});
                } else if (data.ok) {
                    res.render('landing', {page_title: 'Todos', result_title: 'Success', result_text: 'Deleted task.'});
                } else {
                    res.render('landing', {page_title: 'Todos', result_title: 'Error', result_text: 'Failed to delete new task.'});
                }
            });
            break;
        default:
            res.render('landing', {page_title: 'Todos', result_title:'Error', result_text: 'Unsupported action.'});
            break;
    }
});

app.get('/info', (req, res) => {
    res.render('info', {page_title: 'Info'});
});

app.get('/*', (req, res) => {
    res.status(404).send('Unknown page.');
});

const AppServer = app.listen(PORT, () => {
    mydatabase.setupDBConnection();
    console.log(`Started server at port ${PORT}`);
});

/* Exit Handlers */
process.on('SIGINT', () => {
    AppServer.close(() => mydatabase.closeDBConnection());
});
