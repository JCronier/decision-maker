/*
 * All routes for users submitting polls are defined here
 * Since this file is loaded in server.js into api/submittors,
 *   these routes are mounted onto /submittors
 */

const express = require('express');
const { render } = require('sass');
const router = express.Router();

module.exports = (db) => {
  // NO QUERY PARAM
  // router.get("/poll/:pollId", (req, res) => {
  //   res.render("temp_submit_poll");
  // });

  router.get("/poll", (req, res) => {
    res.render("temp_submit_poll");
  });

  return router;
};
