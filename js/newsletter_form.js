$(function() {
  var $formContainer = $(".post__newsletter-form");
  var HIDE_COOKIE = "hide-newsletter-form";

  if($formContainer.length === 0 || window.helpers.readCookie(HIDE_COOKIE)) {
    return;
  } else {
    $formContainer.addClass("post__newsletter-form--active");
  }

  $formContainer.on("click", ".newsletter-form__close", function(e) {
    e.preventDefault();

    $formContainer.slideUp();

    window.helpers.createCookie(HIDE_COOKIE, true, 30);
  });

  $formContainer.on("keyup", ".mce_inline_error", function(e) {
    window.mc.mce_validator.element(".mce_inline_error");
  });

  window.mc.ajaxOptions.success = function() {
    var $successMessage = $formContainer.find(".newsletter-form__success-message");
    var $formBody = $formContainer.find(".newsletter-form__body");
    var $form = $formContainer.find(".newsletter-form__form");
    var firstName = $form.find("#mce-FNAME").val();

    if(firstName) {
      var $header = $formContainer.find(".newsletter-form__header");
      $header.text("Wow, thank you for subscribing, " + firstName + "!");
    }

    $successMessage.addClass("newsletter-form__success-message--active");

    $formBody.remove();

    window.helpers.createCookie(HIDE_COOKIE, true, 365);
  }
});
