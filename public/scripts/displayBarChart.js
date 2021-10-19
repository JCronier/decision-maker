const displayBarChart = function(poll) {
    const $body = $('body');
    const barChart = $(`
        <table class="charts-css bar show-heading show-labels show-primary-axis show-5-secondary-axes data-spacing-20" id="barchart">
          <caption></caption>
          <tbody>

          </tbody>
      </table>`);

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
    <td style="--size: calc( ${choice.points}  / ${maxPoints} )">${choice.points}</td>
  </tr>`);
};

$('document').ready(() => {
  $('#reveal').on('click', () => {
    const $button = $('#reveal');
    $.get(window.location.href, {reveal: true})
      .then(result => {
        $button.remove();
        displayBarChart(result);
      })
      .catch(e => console.log(e));
  })

});
