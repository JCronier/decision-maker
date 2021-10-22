// bar chart
const displayBarChart = function(poll) {

  // no results
  if (!poll || poll.length === 0) {
    displayError();
    return;
  }
  const pollName = poll[0].poll;
  const winner = poll[0].choice;
  const $main = $('main');
  const $barChart = $(`
    <table class="charts-css bar show-heading show-labels data-spacing-${20}" id="barchart">
      <tbody>
      </tbody>
    </table>`
    );

  // display poll info
  displayPoll(pollName);
  displayWinner(winner);
  $main.append($barChart);
  const maxPoints = findMax(poll);

  for (const choice of poll) {
    $main.find("tbody").append(createRow(choice, maxPoints));
    }
};

// chart x-axis
const findMax = function(poll) {
  let pointsArr = []
  poll.forEach(choice => {
    pointsArr.push(Number(choice.points));
  });
  const rounded = Math.ceil(Math.max(...pointsArr) / 5) * 5;
  return rounded;
}

const createRow = function(choice, maxPoints) {
  return $(`
  <tr>
    <th scope="row"> ${choice.choice} </th>
    <td style="--size: calc( ${choice.points}  / ${maxPoints} ); font-family: sans-serif;"> ${choice.points}
    </td>
  </tr>`);
};

const displayWinner = function(winner) {
  $('main').append('<h4>And the winner is...</h4>');
  $('main').append(`<h1>${winner}</h1>`);
};

const displayError = function() {
  $('header').after('<h1>Oof! There are no results yet...<h1>');
};

const displayPoll = function(poll) {
  $('main').append(`<h2>${poll}</h2>`);
};

$('document').ready(() => {

  // reveal button
  $('#reveal').on('click', () => {
    const $button = $('#reveal');
    $.get(window.location.href, {reveal: true})
      .then(result => {
        $button.remove();
        displayBarChart(result);
      })
  })

});
