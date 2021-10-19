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
  const nameinput = `
    <label for="email">Name *required</label>
    <input type="name" id="name-field" name="name" placeholder="name" style="width: 300px; margin: 1em">
  `


  const urlParams = new URLSearchParams(window.location.search);
  const pollId = urlParams.get('pollId');
  console.log("ALEXTOMMY", pollId);

  const renderChoices = function(choicerows) {
    if (choicerows[0].require_name) {
      $('#ranking-form').prepend(nameinput)
    }
    for (const choice of choicerows) {
      $('#sortable').append(choicetemplate(choice))
    }
  }

  $.ajax({
    url: `/api/submittors/choices/${pollId}`,
    method: "GET",
    success: function(result) {
      console.log('the result of my query is: ', result);
      renderChoices(result);
    },
    error: function(error) {
      console.log(error);
    }
  });

  $("form").on("submit", function(event) {
    //prevents the default form post request, replacing it with ajax requests
    event.preventDefault();

    //empty object we will write to
    const rankedObj = {};
    //defines the number of choices we're ranking
    const element = document.getElementById('sortable');

    //appends to an object the choice and corresponding rank
    for (i = 0; i < element.childElementCount; i++) {
      const id = $(`.draggable-rank`).eq(i).attr("id");
      const rank = i + 1
      rankedObj[rank] = id;
    }

    const nameID = $('#name-field');
    const submitObj = {
      'name': nameID,
      'poll_id': pollId,
      'rankings': rankedObj
    };
    console.log(submitObj)

    $.ajax({
      url: `/results`,
      method: "POST",
      data: { submitObj }
    })
      .then((result) =>
        console.log(result)
        //redirect user to a "succesful post" page
      )
    return submitObj;
  });
});
