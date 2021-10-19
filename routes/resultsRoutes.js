module.exports = (router, db) => {
  router.get("/:id", (req, res) => {
    if (req.query.reveal !== 'true'){
      return res.render("results");
    }

    db.getResults(req.params.id)
      .then(result => {
        res.json(result);
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
