/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
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
    INSERT INTO polls (title, description, admin_email, name_submission_require)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `;

    const pollValues = [title, description, email, nameRequired];

    // Data to construct a choice row(s)
    let pollId;
    const choices = req.body.choices;


    const choiceQueryString = `
    INSERT INTO choices (poll_id, choice_name)
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
        res.send({ title, description, email, nameRequired });
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

  return router;
};
