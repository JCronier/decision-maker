const { generateRandomString } = require('../public/scripts/generate_string');
const db = require('./index');

const getResults = function(pollId) {
  const query = `
  SELECT polls.title AS poll, choices.name AS choice, sum(points) AS points
  FROM polls
  JOIN choices ON polls.id = poll_id
  JOIN results ON choices.id = choice_id
  WHERE polls.id = $1
  GROUP BY choices.name, polls.title
  ORDER BY points DESC
  `;
  return db
    .query(query, [pollId])
    .then(result => {
      return result.rows;
    })
};
exports.getResults = getResults;

const addResults = function(results) {
  let query = `
  INSERT INTO results (poll_id, name, choice_id, points)
  VALUES
  `;
  const pollId = results.poll_id;
  const name = results.name;
  const entryCount = results.rankings.length;
  const valueArr = [];

  for (let i = 0; i < results.rankings.length; i++) {
    valueArr.push(`(${pollId}, $1, ${results.rankings[i]}, ${bordaCount(entryCount, i + 1)})`);
  }
  query += ' ' + valueArr.join(', ') + ' RETURNING poll_id';

  return db
    .query(query, [name])
    .then(result => {
      return result.rows[0].poll_id;
    })
};
exports.addResults = addResults;

const bordaCount = function(entryCount, rank) {
  return entryCount + 1 - rank;
};

// Tommy - called when user clicks button to create a poll on create_poll.ejs
const populatePollAndChoices = function(pollValues, choices, postResponse, postRequest) {
  let pollId;

  const pollQueryString = `
  INSERT INTO polls (title, description, email, require_name)
  VALUES ($1, $2, $3, $4)
  RETURNING *;
  `;

  const choiceQueryString = `
  INSERT INTO choices (poll_id, name)
  VALUES ($1, $2)
  RETURNING poll_id;
  `;

  db
    .query(pollQueryString, pollValues)
    .then(result => {
      pollId = result.rows[0].id;

      const userId = postRequest.session.user_id || generateRandomString();


      addUser(userId, pollId)
        .then(() => {
          postRequest.session.user_id = userId;
        });


      for (const choice of choices) {
        const choiceValues = [pollId, choice];

        db
          .query(choiceQueryString, choiceValues)
          .catch(error => console.log(error.message));
      }
    })
    .then(() => {
      const title = pollValues[0];
      const description = pollValues[1];
      const email = pollValues[2];
      const nameRequired = pollValues[3];

      postResponse.send({ title, description, email, nameRequired, pollId });
    })
    .catch(error => console.log(error.message));
}
exports.populatePollAndChoices = populatePollAndChoices;

// Tommy - called when user clicks submitter link on create_confirmation.ejs
const getChoices = function(values, getResponse) {
  const queryString = `
  SELECT choices.name, choices.id, polls.require_name, polls.title as title
  FROM choices
  JOIN polls ON choices.poll_id = polls.id
  WHERE polls.id = $1;
  `;

  db
    .query(queryString, values)
    .then((result) => {
      getResponse.send(result.rows);
    })
    .catch(error => console.log(error.message));
};

exports.getChoices = getChoices;

// Tommy
const getPollName = function(values, getResponse) {
  const queryString = `
  SELECT title
  FROM polls
  WHERE id = $1;
  `;

  db
    .query(queryString, values)
    .then((result) => {
      // console.log(result.rows);
      getResponse.render("admin_page", { pollTitle: result.rows[0].title, pollId: values[0] });
    })
    .catch(error => console.log(error.message));
}
exports.getPollName = getPollName;

//
const addUser = function(userId, pollId) {
  const query = `
    INSERT INTO users (poll_id, user_id)
    VALUES ($1, $2);
  `
  const values = [pollId, userId];
  return db
    .query(query, values);
};
exports.addUser = addUser;

const checkUser = function(pollId, userId) {
  const query = `
    SELECT * FROM users
    WHERE poll_id = $1
    AND user_id = $2;
  `;
  return db
    .query(query, [pollId, userId])
    .then(result => {
      return result.rows;
    })
};
exports.checkUser = checkUser;
