$(() => {
  // Keeps track of current number of choices
  let choiceCounter = 2;


  // Add a choice input field when + button is clicked
  const addChoice = function() {
    // Construct <input> within <div>
    const $input = $("<input>").addClass("new-poll-choice").attr({
      class: "new-poll-choice",
      placeholder: "CHOICE",
      name: `choice-${choiceCounter}`
    });

    // Construct <div> within <section>
    const $div = $("<div>").addClass("single-choice-container");
    $div.append($input);

    // Add to <section>
    const $section = $("#choices-container");
    $section.append($div);
  };


  // Event handler for when + button is clicked
  $("#add-choice-button").on("click", function(event) {
    event.preventDefault();

    // Increment current number of choices
    choiceCounter++;

    addChoice();
  });


  // Submit user inputted title, description, choices, and email
  $("#new-poll-form").on("submit", function(event) {
    // event.preventDefault();   <-- Uncomment this and console.log statements to see values

    const title = $("#new-poll-title").val();
    // console.log(title);

    const description = $("#new-poll-description").val();
    // console.log(description);

    const choices = $(".new-poll-choice").map(function() {
      return $(this).val();
    }).get();
    // console.log(choices);

    const email = $("#new-poll-email").val();
    // console.log(email);
  });
});
