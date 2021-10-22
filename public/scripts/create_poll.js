$(() => {
  // Keeps track of current number of choices
  let choiceCounter = 2;

  // Helper function to validate choice inputs
  const hasMinimumNumberOfChoices = function(choices) {
    const minimum = 2;
    let current = 0;

    for (const choice of choices) {
      if (choice.trim() !== "") {
        current++;
      }
    }

    if (current < minimum) {
      return false;
    }

    return true;
  };

  const hasTitle = function(title) {
    if (title.trim() !== "") {
      return true;
    }

    return false;
  }

  const hasEmail = function(email) {
    if (email.trim() !== "") {
      return true;
    }

    return false;
  }

  const checkEmailFormat = function(email) {
    const regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

  const checkFormInputs = function(title, choices, email) {
    let pass = true;

    if (!hasTitle(title)) {
      const $titleInput = $("#new-poll-title");

      $titleInput.removeClass("valid-title");
      $titleInput.addClass("invalid-title");
      $titleInput.attr("placeholder", "Title Required*")

      pass = false
    } else {
      const $titleInput = $("#new-poll-title");

      $titleInput.removeClass("invalid-title");
      $titleInput.addClass("valid-title");
      $titleInput.attr("placeholder", "Title")
    }

    if (!hasMinimumNumberOfChoices(choices)) {
      $(".choices-error").remove();
      $("#choices-error-container").append($("<span>").addClass("choices-error").text("Min. Two Choices Required"));
      pass = false
    } else {
      $(".choices-error").remove();
    }

    if (!hasEmail(email)) {
      const $emailInput = $("#new-poll-email");

      $emailInput.removeClass("valid-email");
      $emailInput.addClass("invalid-email");
      $emailInput.attr("placeholder", "Email Required*")

      pass = false
    } else {
      if (!checkEmailFormat(email)) {
        $("#email-error").remove();
        const $span = $("<span>").attr("id", "email-error").text("Expected Email Format: username@mailserver.domain");
        $("#email-container").append($span);

        pass = false;
      } else {
        $("#email-error").remove();
      }

      const $emailInput = $("#new-poll-email");

      $emailInput.removeClass("invalid-email");
      $emailInput.addClass("valid-email");
      $emailInput.attr("placeholder", "Email");
    }


    return pass;
  };

  // Add a choice input field when + button is clicked
  const addChoice = function() {
    // Construct <input> within <section>
    const $input = $("<input>").addClass("new-poll-choice").attr({
      class: "new-poll-choice",
      placeholder: "Choice",
      name: `choice-${choiceCounter}`
    });

    // Add to <section>
    const $section = $("#choices-container");
    $section.append($input);

    console.log(choiceCounter);
  };

  // Remove a choice input field when - button is clicked
  const removeChoice = function() {
    if (choiceCounter > 2) {
      $(`input[name=choice-${choiceCounter}]`).remove();

      // Decrement current number of choices
      choiceCounter--;
    }

    console.log(choiceCounter);
  };

  // Event handler for when + button is clicked
  $("#add-choice-button").on("click", function(event) {
    event.preventDefault();

    // Increment current number of choices
    choiceCounter++;

    addChoice();

    $([document.documentElement, document.body]).scrollTop($("#add-choice-button").offset().top, 2000);
    $(`input[name=choice-${choiceCounter}]`).focus();
  });

  // Event handler for when - button is clicked
  $("#remove-choice-button").on("click", function(event) {
    event.preventDefault();

    removeChoice();

    // $([document.documentElement, document.body]).scrollTop($("#remove-choice-button").offset().top, 2000);
  });

  // Event handler for when RESET button is clicked
  $("#reset-choices-button").on("click", function(event) {
    event.preventDefault();

    while (choiceCounter > 2) {
      removeChoice();
    }
  })


  // Submit user inputted title, description, choices, and email
  $("#create-poll-button").on("click", function(event) {
    // event.preventDefault();   // <-- Uncomment this and console.log statements to see values
    const title = $("#new-poll-title").val();
    // console.log(title);

    const description = $("#new-poll-description").val();
    // console.log(description);

    const choices = $(".new-poll-choice").map(function() {
      return $(this).val();
    }).get();
    // console.log(choices);

    const email = $("#new-poll-email").val();
    console.log("first pass:", email);

    const nameRequired = $("#name-option-checkbox").is(":checked");
    // console.log(nameRequired);

    const newPollData = {
      title,
      description,
      choices,
      email,
      nameRequired
    };
    // console.log(newPollData);

    if (checkFormInputs(title, choices, email)) {
      $.ajax({
        url: "/api/creators/create",
        type: "POST",
        data: newPollData,
        success: function(dataToPassToCreateConfirmation) {
          const title = dataToPassToCreateConfirmation.title;
          const description = dataToPassToCreateConfirmation.description;
          const email = dataToPassToCreateConfirmation.email;
          const nameRequired = dataToPassToCreateConfirmation.nameRequired;
          const pollId = dataToPassToCreateConfirmation.pollId;

          let confirmationQueryStringURL = '/api/creators/confirmation?';
          confirmationQueryStringURL += `title=${title}&`;
          confirmationQueryStringURL += `description=${description}&`;
          confirmationQueryStringURL += `email=${email}&`;
          confirmationQueryStringURL += `nameRequired=${nameRequired}&`;
          confirmationQueryStringURL += `pollId=${pollId}`;

          window.location.href = confirmationQueryStringURL;
        },
        error: function(error) {
          console.log(error);
        }
      });
    }
  });
});
