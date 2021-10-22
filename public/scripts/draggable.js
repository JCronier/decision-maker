$(document).ready(function() {
  //creates a draggable UI element that auto-sorts the choices
  $(function() {
    $('#sortable').sortable({
      update: function(event, ui) {
        const productOrder = $(this).sortable('toArray').toString();
        // $("#sortable-9").text(productOrder);
      }
    });
  });

  //sets a variable for the poll's ID to use in various functions below
  const urlParams = new URLSearchParams(window.location.search);
  const pollId = urlParams.get('pollId');

  //a template for creating the list of choices
  const choicetemplate = (result) => {
    const appendstring = `
    <div class="draggable-rank" id ="${result.id}">${result.name}</div>
    `;
    return appendstring;
  };

  //perhaps create an escape for nameinput that prevents cross site scripting
  //an html element for an input field for the user to input their name
  const nameInput = `
    <label for="email">Name *required</label>
    <input type="name" id="name-field" name="name" placeholder="name" required style="width: 300px; margin: 1em">
  `;

  const errorOut = `
  <span>An error has occured, please make sure you recieved the right link to our page.</span>
  `;

  //a function that adds the choices, and if required the name field.
  const renderChoices = function(choicerows) {

    $('h2').text(choicerows[0].title);
    if (choicerows[0].require_name) {
      $('#ranking-form').prepend(nameInput);
    }
    for (const choice of choicerows) {
      $('#sortable').append(choicetemplate(choice));
    }
  };

  //a request for populating the choices list corresponding to the poll id
  $.ajax({
    url: `/api/submittors/choices/${pollId}`,
    method: "GET",
    success: function(result) {
      if (result[0] === undefined) {
        $('#ranking-form').append(errorOut);
      }
      renderChoices(result);
    },
    error: function(error) {
      console.log(error);
    }
  });


  //a function that governs the submit for the rankings form
  $("form").on("submit", function(event) {
    //prevents the default form post request, replacing it with ajax requests
    event.preventDefault();

    //empty object we will write to
    const rankedObj = {};
    //defines the number of choices we're ranking
    const element = document.getElementById('sortable');

    //appends to an object the choice and corresponding rank
    for (let i = 0; i < element.childElementCount; i++) {
      const id = $(`.draggable-rank`).eq(i).attr("id");
      const rank = i + 1;
      rankedObj[rank] = id;
    }

    //declare a nameID variable
    //checks name field for a submitted name then changes nameID to match
    let nameID = '';
    ($('#name-field' ? nameID = $('#name-field').val() : nameID = 'anonymous'));

    //constructs an object to submit as the user's vote
    const submitObj = {
      'name': nameID,
      'poll_id': pollId,
      'rankings': rankedObj
    };

    //sends that object to the url
    $.ajax({
      url: `/results`,
      method: "POST",
      data: submitObj,
      success: (result) => {
        window.location.pathname = `/results/${result}`;
      },
      error: (err) => console.log(err)
    });
  });
});
