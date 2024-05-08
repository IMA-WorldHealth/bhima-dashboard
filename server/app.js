/**
 * @overview 
 *
 * The application routes are configured in {@link server/routes}, while
 * the middleware is configured in {@link server/middlewares}.
 *
 * @requires http
 * @requires dotenv
 * @requires express
 * @requires debug
 *
 * @requires config/express
 * @requires config/routes
 *
 * @license MIT
 */

require('use-strict');
require('dotenv').config();
const path = require('path');
const http = require('http');
const express = require('express');
const debug = require('debug')('app');
const { attach } = require('./config/express');

const app = express();
const port = process.env.PORT || 8092;
const mode = process.env.NODE_ENV;
// server creation and listen to a port
const startingMsg = () => debug(`Dashboard: Server started in mode ${mode} on port ${port}.`);
const server = http.createServer(app);
server.listen(port, startingMsg);

// global configuration for the Express server
attach(app, http);



/**
 * ======================================================================
 *                            ROUTES DEFINITION
 * ======================================================================
 */

// serve static file - ReactJS App
app.use(express.static(path.join(__dirname, '../dist')));

// public routes
app.use('/', require('./routes/index.routes.js'));
// not defined protected routes
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.all('*', (req, res, next) => {
  res.status(404);
  if (req.accepts('json')) {
    res.json({ error: 'Not found' });
  } else {
    res.send('Not Found');
  }
});


/**
 * ======================================================================
 *                            END ROUTES DEFINITION
 * ======================================================================
 */

// ensure the process terminates gracefully when an error occurs.
process.on('uncaughtException', (e) => {
  debug('process.onUncaughException: %o', e);
  process.exit(1);
});

// crash on unhandled promise rejections
process.on('unhandledRejection', (e) => {
  debug('process.onUnhandledRejection: %o', e);
  process.exit(1);
});

process.on('warning', (warning) => {
  debug('process.onWarning: %o', warning);
});
