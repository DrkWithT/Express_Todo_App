/**
 * @file index.js
 * @author Derek Tan
 */

import express from 'express';

const PORT = 8080;

/* App Setup */
const app = express();
app.use(express.static('public'));
app.set('view engine', 'pug');

/* Middleware */
app.get('/', (req, res) => {
    res.render('landing', {page_title: 'Landing', result_title:'N/A', result_text: 'N/A'});
});

app.post('/', (req, res) => {
    res.render('landing', {page_title: 'Landing', result_title:'N/A', result_text: 'N/A'});
});

app.get('/*', (req, res) => {
    res.send('Unknown page.')
});

const AppServer = app.listen(PORT, () => {
    console.log(`Started server at port ${PORT}`);
});

/* Exit Handlers */
process.on('SIGINT', (signal) => {
    AppServer.close(() => console.log('Closed server.'));
});
