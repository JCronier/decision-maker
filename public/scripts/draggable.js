//draggable choice rankings
// const ui = require('jquery-ui-dist/jquery-ui');

// $(document).ready(function() {
  $(function(){
    $( "#rank-sorting" ).sortable({
      revert: true
    });

    $(".draggabletoo").draggable({
      // axis: "y",
      // cursor: "move"
      // cursorAt: { top: 56, left: 56 }
      connectToSortable: "#rank-sorting",
      helper: "clone",
      revert: "invalid"
    });

});



// });
$( function() {
  $( "#sortable" ).sortable({
    revert: true
  });
  $( "#draggable" ).draggable({
    connectToSortable: "#sortable",
    helper: "clone",
    revert: "invalid"
  });
  $( "ul, li" ).disableSelection();
} );
