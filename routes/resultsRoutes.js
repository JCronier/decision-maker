const { generateRandomString } = require("../public/scripts/generate_string");

module.exports = (router, db) => {
  router.get("/:id", (req, res) => {
    db.checkUser(req.params.id, req.session.user_id)
      .then((result) => {
        if (result.length === 0) {
          return res.send("hold on buckaroo");
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
    console.log(req.session);

    const userId = generateRandomString();
    console.log(userId);
    db.addUser(userId, resultsObj.poll_id)
      .then(() => {
        req.session.user_id = userId;
        console.log(userId, "successful user");
      });

    db.addResults(resultsObj)
      .then(result => {
        console.log("add results");
        res.json( result );
      })
  })
  return router;
};
