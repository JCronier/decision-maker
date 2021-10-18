/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const { render } = require('sass');
const router = express.Router();

module.exports = (db) => {
  // router.get("/create", (req, res) => {
  //   res.render("create_poll");
  // });


  router.get("/:pollId", (req, res) => {
    // res.send(`${req.params.pollId}`);
    // console.log("HERE", req.params.pollId);
    res.render("temp_submit_poll");
    // res.redirect("https://www.google.com");
  });

  return router;
};
