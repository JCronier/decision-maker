/*
 * All routes for users submitting polls are defined here
 * Since this file is loaded in server.js into api/submittors,
 *   these routes are mounted onto /submittors
 */

const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.get("/poll", (req, res) => {
    res.render("submission");
  });


  router.get("/choices/:pollId", (req, res) => {

    const values = [req.params.pollId];

    db.getChoices(values, res);
  });

  return router;
};
