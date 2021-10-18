module.exports = (router, db) => {
  router.get("/:id", (req, res) => {
    console.log(req.params.id);
    db.getResults(req.params.id)
      .then(result => {
        const templateVars = { poll: result };
        res.render("results", templateVars);
      })
      .catch(e => res.send(e));
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
