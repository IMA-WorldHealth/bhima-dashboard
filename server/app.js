/**
 * @overview Financement sante
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

import 'use-strict';
import dotEnv from 'dotenv';
dotEnv.config();
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';
import express from 'express';
import dbug from 'debug';
import { attach } from './config/express.js';
import routes from './routes/index.routes.js';

const debug = dbug('app');

const app = express();
const port = process.env.PORT_SERVER || 8092;
const mode = process.env.NODE_ENV;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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
app.use('/', routes);
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
