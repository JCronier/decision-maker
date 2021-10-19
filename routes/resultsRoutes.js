const { findMax } = require("../public/scripts/displayBarChart");

module.exports = (router, db) => {
  router.get("/:id", (req, res) => {
    db.getResults(req.params.id)
      .then(result => {
        const templateVars = { poll: result, maxPoints: findMax(result) };
        res.render("results", templateVars);
      })
      .catch(e => console.log(e));
  });

  router.post("/", (req, res) => {
    const resultsObj = {
      name: 'Jordan',
      poll_id: 1,
      results: {
        1: 2,
        2: 3,
        3: 1
      }
    };
                           //req.body;
    db.addResults(resultsObj)
      .then(result => {
        res.redirect(`/results/${result}`);
      })
  })
  return router;
};
