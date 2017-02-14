
$(document).ready(function() {
  var click = 0;
  var click1 = 0;

  $('#cat1').text("Tai");
  $('#cat2').text("Suki");

  $('#catPicture').click(function() {
    click = click + 1;
    $('#catBadge').text(click);
  });

  $('#catPicture1').click(function() {
    click1 = click1 + 1;
    $('#catBadge1').text(click1);
  });
});
