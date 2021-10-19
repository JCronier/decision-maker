module.exports = (router, db) => {
  router.get("/:id", (req, res) => {
    db.getResults(req.params.id)
      .then(result => {
        const barWidth = 400 / 2 / result.length;
        const barHeight = 10;
        const templateVars = { poll: result, barWidth, barHeight };
        res.render("results", templateVars);
        console.log("success")
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
