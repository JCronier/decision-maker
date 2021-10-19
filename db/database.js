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

const bordaCount = function (entryCount, rank) {
  return entryCount + 1 - rank;
};

module.exports = {
  addResults,
  getResults
};
