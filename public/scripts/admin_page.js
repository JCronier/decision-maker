$(() => {
  $("#result-link").on("click", function() {
    // NON-QUERY WAY
    // const pollId = window.location.pathname.split("/").pop();
    // window.location.href = "/api/creators/admin/result/" + pollId;

    const urlParams = new URLSearchParams(window.location.search);
    const pollId = urlParams.get('pollId');

    // http://localhost:8080/results/4?pollId=4

    // window.location.href = "/results/" + pollId;

    window.location.href = "/results/" + pollId + "?pollId=" + pollId;

  });
});
