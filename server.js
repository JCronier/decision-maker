const database = require('./db/database.js');
const resultsRoutes = require('./routes/resultsRoutes');

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({ extended: true }));

app.use(cookieSession({
  name: "session",
  keys: ["key1", "key2"]
}));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
// const usersRoutes = require("./routes/users");
// const widgetsRoutes = require("./routes/widgets");
// /results/endpoints
const resultsRouter = express.Router();
resultsRoutes(resultsRouter, database);
app.use('/results', resultsRouter);

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// app.use("/api/users", usersRoutes(db));
// app.use("/api/widgets", widgetsRoutes(db));
const creatorsRoutes = require("./routes/creators");
const submittorsRoutes = require("./routes/submittors");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
const creatorsRouter = express.Router();
app.use("/api/creators", creatorsRoutes(creatorsRouter, database));
app.use("/api/submittors", submittorsRoutes(database));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  res.render("create_poll");
});

app.listen(PORT, () => {
  console.log(`Decision Maker listening on port ${PORT}`);
});
