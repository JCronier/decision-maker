/*
 * All routes for users submitting polls are defined here
 * Since this file is loaded in server.js into api/submittors,
 *   these routes are mounted onto /submittors
 */

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  // NO QUERY PARAM
  // router.get("/poll/:pollId", (req, res) => {
  //   res.render("temp_submit_poll");
  // });

  router.get("/poll", (req, res) => {
    res.render("submission");
  });


  router.get("/choices/:pollId", (req, res) => {
    // console.log("GETTING CHOICES FOR:", req.params.pollId);

    // const queryString = `
    // SELECT id, name
    // FROM choices
    // WHERE poll_id = $1;
    // `;

    const values = [req.params.pollId];

    // db
    //   .query(queryString, values)
    //   .then((result) => {
    //     console.log(result.rows);
    //     res.send(result.rows);
    //   })
    //   .catch(error => console.log(error.message));

    db.getChoices(values, res);
  });

  return router;
};
