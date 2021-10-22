/*
 * All routes for the results of polls are defined here
 * Since this file is loaded in server.js into /routes/resultsRoutes,
 *   these routes are mounted onto /results
 */

const { generateRandomString } = require("../public/scripts/generate_string");

module.exports = (router, db) => {
  router.get("/:id", (req, res) => {

    // user in database
    db.checkUser(req.params.id, req.session.user_id)
      .then((result) => {
        if (result.length === 0) {
          return res.redirect("/");
        }

        if (!req.query.reveal){
          return res.render("results");
        }

        db.getResults(req.params.id)
        .then(result => {
          res.json(result);
        })
      });
  });

  // put new results into database
  router.post("/", (req, res) => {
    const resultsObj = req.body;

    // new or existing user
    const userId = req.session.user_id || generateRandomString();

    db.addUser(userId, resultsObj.poll_id)
      .then(() => {
        req.session.user_id = userId;
      });

    db.addResults(resultsObj)
      .then(result => {
        res.json(result);
      })
  })

  return router;
};
