$(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const pollId = urlParams.get('pollId');

  $("#copy-result").attr("href", `localhost:8080/results/${pollId}?pollId=${pollId}`);

  $("#result-link").on("click", function() {
    // NON-QUERY WAY
    // const pollId = window.location.pathname.split("/").pop();
    // window.location.href = "/api/creators/admin/result/" + pollId;

    // const urlParams = new URLSearchParams(window.location.search);
    // const pollId = urlParams.get('pollId');

    // http://localhost:8080/results/4?pollId=4

    // window.location.href = "/results/" + pollId;

    window.location.href = "/results/" + pollId + "?pollId=" + pollId;

  });

  $("#copy-result").on("click", function(event) {
    event.preventDefault();
    let copyText = $(this).attr('href');

    document.addEventListener('copy', function(event) {
      event.clipboardData.setData('text/plain', copyText);
      event.preventDefault();
    }, true);

    document.execCommand('copy');
    alert("Results Link Copied to Clipboard");
  });
});
