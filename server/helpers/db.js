const mysql = require('mysql');
const debug = require('debug');


class DatabaseConnector {
  constructor() {
    const params = {
      port: process.env.DB_PORT,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      charset: 'UTF8MB4_UNICODE_CI',
    };

    this.pool = mysql.createPool(params);

    debug('#constructor(): Initialized database connector.');
  }

  exec(sql, params) {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err, connection) => {
        if (err) {
          debug('#exec(): An error occurred getting a connection.');
          reject(err);
        } else {
          // format the SQL statement using MySQL's escapes
          const statement = mysql.format(sql.trim(), params);
          connection.query(statement, params, (error, results) => {
            connection.release();
            if (error) {
              debug('#exec(): An error occurred getting a connection.');
              reject(error);
              debug()
            } else {
              debug(`#exec(): ${statement}`);
              resolve(results);
            }
          });
        }
      });
    });
  }
}

module.exports = new DatabaseConnector();