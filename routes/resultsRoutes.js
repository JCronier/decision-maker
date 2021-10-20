module.exports = (router, db) => {
  router.get("/:id", (req, res) => {
    if (!req.query.reveal){
      return res.render("results");
    }

    db.getResults(req.params.id)
      .then(result => {
        res.json(result);
      })
      .catch(e => console.log(e));
  });

  router.post("/", (req, res) => {
    const resultsObj = req.body;
    db.addResults(resultsObj)
      .then(result => {
        console.log("here",result);
        res.json( result );
      })
  })
  return router;
};
