const { mailgun } = require("../api/mailgun");

/*
 * All routes for users creating polls are defined here
 * Since this file is loaded in server.js into api/creators,
 *   these routes are mounted onto /creators
 */

module.exports = (router, db) => {
  router.get("/create", (req, res) => {
    res.render("create_poll");
  });

  router.post("/create", (req, res) => {
    // Data to construct a poll row
    const title = req.body.title;
    const description = req.body.description;
    const email = req.body.email;
    const nameRequired = req.body.nameRequired;

    const pollValues = [title, description, email, nameRequired];

    // Data to construct a choice row(s)
    const choices = req.body.choices.filter(choice => choice !== "");

    db.populatePollAndChoices(pollValues, choices, res);
  });

  router.get("/confirmation", (req, res) => {
    // Send email
    const pollId = req.query.pollId;
    const email = req.query.email;
    const adminLink = `http://localhost:${process.env.PORT || 8080}/api/creators/admin?pollId=${pollId}`;
    const submittorLink = `http://localhost:${process.env.PORT || 8080}/api/submittors/poll?pollId=${pollId}`;

    var data = {
      from: '9/2021 Group 9 <me@samples.mailgun.org>',
      to: `${email}`,
      subject: 'Your poll is ready to be shared.',
      text: `Administrator Link (contains Result Link): ${adminLink}\nSubmittor Link: ${submittorLink}`,
    };

    mailgun.messages().send(data, function(error, body) {
      if (error) {
        console.log(error);
      }

      console.log(body);
    });

    res.render("create_confirmation", req.query);
  });

  router.get("/admin", (req, res) => {
    res.render("admin_page");
  });

  router.get("/admin/result", (req, res) => {
    res.render("temp_result");
  });

  return router;
};
