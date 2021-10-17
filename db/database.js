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
exports.getResults = getResults;
