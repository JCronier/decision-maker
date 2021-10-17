// load .env data into process.env
require("dotenv").config();

// PG database client/connection setup
const { Client } = require("pg");
const dbParams = require('../lib/db');
const db = new Client(dbParams);
db.connect();

module.exports = {
  query: (text, params) => {
    return db.query(text, params)
      .then(result => {
        return result;
      })
      .catch(err => {
        return err;
      });
  }
};
