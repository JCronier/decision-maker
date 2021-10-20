const displayBarChart = function(poll) {
    const $body = $('body');
    const barChart = $(`
        <table class="charts-css bar show-heading show-labels show-primary-axis data-spacing-${20}" id="barchart">
          <caption></caption>
          <tbody>

          </tbody>
      </table>`);

      displayWinner(poll[0].choice);

      $body.append(barChart);
      const maxPoints = findMax(poll);
      $body.find("caption").val(poll[0].poll);

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
    <td class"pumpkin" style="--size: calc( ${choice.points}  / ${maxPoints} )">${choice.points}</td>
  </tr>`);
};

const displayWinner = function(winner) {
  $('header').after('<h2>And the winner is...</h2>');
  $('h2').after(`<h1>${winner}</h1>`);
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
