/*
 * All routes for users creating polls are defined here
 * Since this file is loaded in server.js into api/creators,
 *   these routes are mounted onto /creators
 */

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/create", (req, res) => {
    res.render("create_poll");
  });

  router.post("/create", (req, res) => {
    // console.log("IN TERMINAL", req.body);

    // Data to construct a poll row
    const title = req.body.title;
    const description = req.body.description;
    const email = req.body.email;
    const nameRequired = req.body.nameRequired;

    const pollQueryString = `
    INSERT INTO polls (title, description, email, require_name)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `;

    const pollValues = [title, description, email, nameRequired];

    // Data to construct a choice row(s)
    let pollId;
    const choices = req.body.choices.filter(choice => choice !== "");
    console.log("choices", choices);

    const choiceQueryString = `
    INSERT INTO choices (poll_id, name)
    VALUES ($1, $2);
    `;

    // Perform queries to insert into polls and choices
    db
      .query(pollQueryString, pollValues)
      .then(result => {
        pollId = result.rows[0].id;

        for (const choice of choices) {
          const choiceValues = [pollId, choice];

          db
            .query(choiceQueryString, choiceValues)
            .catch(error => console.log(error.message));
        }
      })
      .then(() => {
        res.send({ title, description, email, nameRequired, pollId });
      })
      .catch(error => console.log(error.message));
  });

  router.get("/confirmation", (req, res) => {
    // http://localhost:8080/api/creators/confirmation?title=sdfsdfsdfsdfsd&description=&email=&nameRequired=false
    // console.log(req.query);
    // {
    //   title: 'A',
    //   description: 'sdf',
    //   email: '1!!!@gmail.com',
    //   nameRequired: 'false'
    // }
    res.render("create_confirmation", req.query);
  });

  // NO QUERY PARAM
  // router.get("/admin/:pollId", (req, res) => {
  //   res.render("admin_page");
  // });

  router.get("/admin", (req, res) => {
    // console.log("/admin", req.query);
    res.render("admin_page");
  });

  // NO QUERY PARAM
  // router.get("/admin/result/:pollId", (req, res) => {
  //   res.render("temp_result");
  // });

  router.get("/admin/result", (req, res) => {
    // console.log("/admin/result", req.query);
    res.render("temp_result");
  });

  return router;
};
