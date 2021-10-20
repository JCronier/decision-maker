$(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const pollId = urlParams.get('pollId');

  $("#submittor-link").attr("href", `localhost:8080/api/submittors/poll?pollId=${pollId}`);
  $("#admin-link").attr("href", `localhost:8080/api/creators/admin?pollId=${pollId}`);

  $("#submittor-link").on("click", function(event) {
    // NO QUERY PARAM
    // const urlParams = new URLSearchParams(window.location.search);
    // const pollId = urlParams.get('pollId');

    // window.location.href = "/api/submittors/poll/" + pollId;

    // const urlParams = new URLSearchParams(window.location.search);
    // const pollId = urlParams.get('pollId');

    // window.location.href = "/api/submittors/poll?pollId=" + pollId;

    event.preventDefault();
    let copyText = $(this).attr('href');

    document.addEventListener('copy', function(event) {
      event.clipboardData.setData('text/plain', copyText);
      event.preventDefault();
    }, true);

    document.execCommand('copy');
    alert("Participant's Link Copied to Clipboard");
  });

  $("#admin-link").on("click", function(event) {
    // NO QUERY PARAM
    // const urlParams = new URLSearchParams(window.location.search);
    // const pollId = urlParams.get('pollId');

    // window.location.href = "/api/creators/admin/" + pollId;

    // const urlParams = new URLSearchParams(window.location.search);
    // const pollId = urlParams.get('pollId');

    // window.location.href = "/api/creators/admin?pollId=" + pollId;

    event.preventDefault();
    let copyText = $(this).attr('href');

    document.addEventListener('copy', function(event) {
      event.clipboardData.setData('text/plain', copyText);
      event.preventDefault();
    }, true);

    document.execCommand('copy');
    alert("Administrator's Link Copied to Clipboard");
  });
});
