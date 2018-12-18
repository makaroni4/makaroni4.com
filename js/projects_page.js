$(function() {
  $(".project__thumbnail-placeholder").each(function(i, el) {
    $placeholder = $(el);

    var $img = $("<img class='project__thumbnail' />");

    $img.on("error", function () {
      $(this).parent(".project__thumbnail-placeholder").addClass("project__thumbnail-placeholder--no-image");
    });

    $img.attr("src", $placeholder.data("src"));
    $img.attr("alt", $placeholder.alt);

    $placeholder.append($img);
  })
});
