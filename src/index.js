/**
 * @file index.js
 * @author Derek Tan
 */

var express = require('express');
const mydatabase = require('./database');

const PORT = 3000;

/* App Setup */
const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.set('view engine', 'pug');

/* Middleware */
app.get('/', (req, res) => {
    res.render('landing', {page_title: 'Todos', result_title:'N/A', result_text: 'N/A'});
});

app.post('/', (req, res) => {
    let appAction = parseInt(req.body.action) || 0;
    let todoTitle = req.body.title || 'foo';
    let todoDescription = req.body.description;

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
    AppServer.close(() => mydatabase.closeDBConnection());
});
