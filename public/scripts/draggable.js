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
          // console.log(productOrder2)
      }
    });
  });

  const choicetemplate = (result) => {
    const appendstring = `
    <div class="draggable-rank" id ="${result.name}">${result.name}</div>
    `;
    return appendstring
  }

  $("form").on("submit", function (event) {
    //prevents the default form post request, replacing it with ajax requests
    event.preventDefault();

    //empty object we will write to
    const rankedObj = {};
    //defines the number of choices we're ranking
    const element = document.getElementById('sortable-8');
    // console.log(rankings)
    // console.log(element.childElementCount);

    //appends to an object the choice and corresponding rank
    for (i = 0; i < element.childElementCount; i++) {
      const id = $(`.draggable-rank`).eq(i).attr("id");
      const rank = i+1
      rankedObj[rank] = id;
      // console.log('id is: ', id, 'rank is: ',rank)
    }

    const nameID = 'literally me';
    const pollId = 1;
    const submitObj = {
      'name': nameID,
      'poll_id': pollId,
      'rankings' : rankedObj
    };
    console.log(submitObj)
    return submitObj;
  });
});
