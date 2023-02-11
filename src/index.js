/**
 * @file index.js
 * @author Derek Tan
 */

var express = require('express');
const { closeDBConnection } = require('./database');
const mydatabase = require('./database');

const PORT = 8080;

/* App Setup */
const app = express();
app.use(express.static('public'));
app.set('view engine', 'pug');

/* Middleware */
app.get('/', (req, res) => {
    res.render('landing', {page_title: 'Todos', result_title:'N/A', result_text: 'N/A'});
});

app.post('/', (req, res) => {
    let appAction = req.body.action || 0;
    let todoTitle = req.body.title || 'foo';
    let todoDescription = req.body.description;

    switch (appAction) {
        case 1: // fetch a todo task here...
            mydatabase.fetchTodoTask({title: todoTitle}, (err, data = null) => {
                if (err) {
                    res.render('landing', {page_title: 'Todos', result_title: 'Error', result_text: 'Failed to fetch data.'});
                } else if (data !== null) {
                    res.render('landing', {page_title: 'Todos', result_title: data.title, result_text: data.description});
                } else {
                    res.render('landing', {page_title: 'Todos', result_title: 'Error', result_text: 'No data found.'});
                }
            });
            break;
        case 2: // TODO: add an insertion action of a todo task.
        case 3: // TODO: add a deletion action of a todo task.
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
    AppServer.close(() => {
        closeDBConnection();
        console.log('Closing app server.');
    });
});
