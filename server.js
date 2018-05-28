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
/**
 * The next is a configuration for micro service management
 */
//
// const MM = require('@estimeo/npm-ms-manager');
//
// let config = require(`./config/config.json`) || {};
// config['hydra']['redis']['url'] = process.env.REDIS_PORT + '/0';
// config['_LOGGER'] = {
//     log: function() { /* useless */ },
//     debug: function() { /* useless */ },
//     info: function() { /* useless */ },
//     error: function() { /* useless */ },
// };
// MM.init(config, (err, serviceInfo) => {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log(serviceInfo);
//         /**
//          * Micro-services system is up
//          * App is now ready to work with other services
//          */
//     }
// });

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