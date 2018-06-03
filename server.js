/**
 * Created at 06/04/2018
 * By Adrien
 */
const express = require('express');
const http = require('http');

const path = require('path');
const rootDir = 'dist';

const app = module.exports.app = exports.app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const port = 8080;

app.disable('x-powered-by');

app.use(express.static(rootDir));
app.set('views', path.join(rootDir, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({ extended: true }));

require('./routes/_')(app, jsonParser);

const server_http = http.createServer(app);
server_http.listen(port, (err) => {
    if (err) {
        console.error(err);
    } else {
        /**
         * Server is up
         * App is now ready to be used
         */
        console.log('#Server UP#');
    }
});