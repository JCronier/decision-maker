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
    .catch(err => {
      console.log(err);
    });
};
//exports.getResults = getResults;

const addResults = function(results) {
  console.log(Object.keys(results.results).length);
  let query = `
  INSERT INTO results (poll_id, name, choice_id, points)
  VALUES
  `;
  const pollId = results.poll_id;
  const name = results.name;
  const entryCount = Object.keys(results.results).length;
  const valueArr = [];

  for (const choice in results.results) {
    valueArr.push(`(${pollId}, $1, ${choice}, ${bordaCount(entryCount, results.results[choice])})`);
  }
  query += ' ' + valueArr.join(', ') + ' RETURNING poll_id';

  return db
    .query(query, [name])
    .then(result => {
      return result.rows[0].poll_id;
    })
    .catch(err => console.log(err));
};
//exports.addResults = addResults;

const bordaCount = function(entryCount, rank) {
  return entryCount + 1 - rank;
};

// Tommy - called when user clicks button to create a poll on create_poll.ejs
const populatePollAndChoices = function(pollValues, choices, postResponse) {
  let pollId;

  const pollQueryString = `
  INSERT INTO polls (title, description, email, require_name)
  VALUES ($1, $2, $3, $4)
  RETURNING *;
  `;

  const choiceQueryString = `
  INSERT INTO choices (poll_id, name)
  VALUES ($1, $2);
  `;

  db
    .query(pollQueryString, pollValues)
    .then(result => {
      pollId = result.rows[0].id;

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
  SELECT name, choices.id, polls.require_name FROM choices
  JOIN polls ON poll_id = polls.id
  WHERE poll_id = $1;
  `;

  db
    .query(queryString, values)
    .then((result) => {
      // console.log(result.rows);
      getResponse.send(result.rows);
    })
    .catch(error => console.log(error.message));
};

exports.getChoices = getChoices;
