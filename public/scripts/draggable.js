// const { Pool } = require('pg');

// const pool = new Pool({
//   database_url = process.env.DATABASE_URL
// });

$(document).ready(function() {

  const getChoices = function(id) {
    return pool
    .query(`
    SELECT * FROM choices
    WHERE poll_id=$1;
    `, [id])
    .then((result) => {
      console.log(result.rows[0])
    })
  }

  $(function() {
    $('#sortable-8').sortable({
      update: function(event, ui) {
          var productOrder = $(this).sortable('toArray').toString();
          var productOrder2 = $(this).sortable('toArray');
          $("#sortable-9").text (productOrder);
          console.log(productOrder2)
      }
    });
  });

});
