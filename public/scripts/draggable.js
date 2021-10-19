$(document).ready(function() {

  $(function() {
    $('#sortable').sortable({
      update: function(event, ui) {
        var productOrder = $(this).sortable('toArray').toString();
        var productOrder2 = $(this).sortable('toArray');
        $("#sortable-9").text(productOrder);
      }
    });
  });

  const choicetemplate = (result) => {
    const appendstring = `
    <div class="draggable-rank" id ="${result.id}">${result.name}</div>
    `;
    return appendstring
  }


  const urlParams = new URLSearchParams(window.location.search);
  const pollId = urlParams.get('pollId');

  // const queryString = `
  //   SELECT id, name
  //   FROM choices
  //   WHERE poll_id = $1
  //   RETURNING *;
  //   `, pollId;

  // [
  //   { id: 5, name: 'Tree Bark Chips' },
  //   { id: 6, name: 'Apple Ramen Pie' }
  // ]

  const renderChoices = function(choicerows) {
    for (const choice of choicerows) {
      $('#sortable').append(choicetemplate(choice))
    }
  }

  $.ajax({
    url: `/api/submittors/choices/${pollId}`,
    method: "GET",
    success: function(result) {
      //console.log('the result of my query is: ', result);
      renderChoices(result);
    },
    error: function(error) {
      console.log(error);
    }
  });
  // .then((result) => {
  //   console.log('the result of my query is: ', result);
  //   renderChoices(result);
  // });

  // const values = [pollId];

  // db
  //   .query(queryString, values)
  //   .then((result) => {
  //     const choices = result.rows;

  //     res.send({ choices });
  //   })
  //   .catch(error => console.log(error.message));

  $("form").on("submit", function(event) {
    //prevents the default form post request, replacing it with ajax requests
    event.preventDefault();

    //empty object we will write to
    const rankedObj = {};
    //defines the number of choices we're ranking
    const element = document.getElementById('sortable');
    // console.log(rankings)
    // console.log(element.childElementCount);

    //appends to an object the choice and corresponding rank
    for (i = 0; i < element.childElementCount; i++) {
      const id = $(`.draggable-rank`).eq(i).attr("id");
      const rank = i + 1
      rankedObj[rank] = id;
      // console.log('id is: ', id, 'rank is: ',rank)
    }

    const nameID = 'literally me';
    const submitObj = {
      'name': nameID,
      'poll_id': pollId,
      'rankings': rankedObj
    };

    $.ajax({
      url: `/results`,
      method: "POST",
      data: submitObj,
      success: (result) => {
        window.location.pathname = `/results/${result}`;
      },
      error: (err) => console.log(err)
    })
    //return submitObj;
  });
});
