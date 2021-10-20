const { generateRandomString } = require("../public/scripts/generate_string");

module.exports = (router, db) => {
  router.get("/:id", (req, res) => {
    db.checkUser(req.params.id, req.session.user_id)
      .then((result) => {
        console.log(result);
        if (result.length === 0) {
          return res.redirect("/api/creators/create");
        }
        if (!req.query.reveal){
          return res.render("results");
        }

        db.getResults(req.params.id)
        .then(result => {
          res.json(result);
        })
        .catch(e => console.log(e));
      });



  });

  router.post("/", (req, res) => {
    const resultsObj = req.body;

    const userId = req.session.user_id || generateRandomString();

    db.addUser(userId, resultsObj.poll_id)
      .then(() => {
        req.session.user_id = userId;
      });

    db.addResults(resultsObj)
      .then(result => {
        res.json( result );
      })
  })
  return router;
};
