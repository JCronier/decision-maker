$(() => {
  $("#submittor-link").on("click", function() {
    // NO QUERY PARAM
    // const urlParams = new URLSearchParams(window.location.search);
    // const pollId = urlParams.get('pollId');

    // window.location.href = "/api/submittors/poll/" + pollId;

    const urlParams = new URLSearchParams(window.location.search);
    const pollId = urlParams.get('pollId');

    window.location.href = "/api/submittors/poll?pollId=" + pollId;
  });

  $("#admin-link").on("click", function() {
    // NO QUERY PARAM
    // const urlParams = new URLSearchParams(window.location.search);
    // const pollId = urlParams.get('pollId');

    // window.location.href = "/api/creators/admin/" + pollId;

    const urlParams = new URLSearchParams(window.location.search);
    const pollId = urlParams.get('pollId');

    window.location.href = "/api/creators/admin?pollId=" + pollId;
  });
});
