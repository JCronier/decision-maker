const displayBarChart = function(poll) {
  if (!poll || poll.length === 0) {
    displayError();
    return;
  }
    const $body = $('body');
    const $barChart = $(`
        <table class="charts-css bar show-heading show-labels data-spacing-${20}" id="barchart">
          <tbody>

          </tbody>
      </table>`);

      displayPoll(poll[0].poll);

      displayWinner(poll[0].choice);

      $body.append($barChart);
      const maxPoints = findMax(poll);

      for (const choice of poll) {
        $body.find("tbody").append(createRow(choice, maxPoints));
      }
};

const findMax = function(poll) {
  let pointsArr = []
  poll.forEach(choice => {
    pointsArr.push(Number(choice.points));
  });
  const rounded = Math.ceil(Math.max(...pointsArr) / 10) * 10;
  return rounded;
}

const createRow = function(choice, maxPoints) {
  return $(`
  <tr>
    <th scope="row"> ${choice.choice} </th>
    <td style="--size: calc( ${choice.points}  / ${maxPoints} )"> ${choice.points}
    </td>
  </tr>`);
};

const displayWinner = function(winner) {
  $('h2').after('<h3>And the winner is...</h3>');
  $('h3').after(`<h2>${winner}</h2>`);
};

const displayError = function() {
  $('header').after('<h1>Oof! There are no results yet...<h1>');
};

const displayPoll = function(poll) {
  $('header').after(`<h2>${poll}</h2>`);
};

$('document').ready(() => {
  $('#reveal').on('click', () => {
    const $button = $('#reveal');
    $.get(window.location.href, {reveal: true})
      .then(result => {
        $button.remove();
        displayBarChart(result);
      })
  })

});
