$(function() {
  var $jobAd = $(".post__job-ad");

  if($jobAd.length === 0 || readCookie("seen-job-ad")) {
    return;
  }

  $jobAd.addClass("post__job-ad--active");

  $jobAd.on("click", ".job-ad__not-interested-link", function(e) {
    e.preventDefault();

    $jobAd.addClass("post__job-ad--fade-out").delay(1000).queue(function(next){
      $(this).remove();
      next();
    });

    createCookie("seen-job-ad", true, 30);
  })
});
