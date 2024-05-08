const helmet = require('helmet');
const { json } = require('express');
const morgan = require('morgan');
const debug = require('debug');
// import cors from 'cors';
const cookieParser = require('cookie-parser');
// import corsOptions from './corsOptions.js';

const debugHTTP = debug('http');


const useHelmet = helmet();

/**
 * Morgan
 * HTTP request logger middleware for node.js
 * options: combined | common | dev | short | tiny
 */

const useMorgan = morgan('combined', {
  stream: {
    write: (message) => debugHTTP(message.trim())
  }
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
exports.attach = (app, http) => {
  // Add morgan logger
  app.use(useMorgan);
  // hide x-powered-by
  app.set('x-powered-by', false);


  // Add helmet
  app.use(useHelmet);

  // Add json body parser
  app.use(json());

  // // Add cors
  // app.use(cors(corsOptions));

  // Add cookie parser
  app.use(cookieParser());

}

