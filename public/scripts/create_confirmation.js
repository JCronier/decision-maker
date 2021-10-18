$(() => {
  $("#submittor-link").on("click", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const pollId = urlParams.get('pollId');

    window.location.href = `/api/submittors/` + pollId;
  });
});
