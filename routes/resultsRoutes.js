module.exports = (router, db) => {
  router.get("/:id", async(req, res) => {
    db.getResults(req.params.id)
      .then(result => {
        const templateVars = { poll: result};
        res.render("results", templateVars);
      })
      .catch(e => res.send(e));
  });
  return router;
};
