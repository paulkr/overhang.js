/**
 * overhang.js
 * Paul Krishnamurthy 2016
 *
 * https://paulkr.com
 * paul@paulkr.com
 */

$.fn.overhang = function (arguments) {

  var $element = $(this);

  var $overhang = $("<div class='overhang'></div>");
  var $overlay = $("<div class='overhang-overlay'></div>");

  $(".overhang").remove();
  $(".overhang-overlay").remove();

  // Flat UI color themes
  var themes = {
    "success" : ["#2ECC71", "#27AE60"],
    "error"   : ["#E74C3C", "#C0392B"],
    "warn"    : ["#E67E22", "#D35400"],
    "info"    : ["#3498DB", "#2980B9"],
    "prompt"  : ["#9B59B6", "#8E44AD"],
    "confirm" : ["#1ABC9C", "#16A085"],
    "default" : ["#95A5A6", "#7F8C8D"]
  };

  // Default attributes
  var defaults = {
    type         : "success",
    custom       : false,
    message      : "This is an overhang.js message!",
    textColor    : "#FFFFFF",
    yesMessage   : "Yes",
    noMessage    : "No",
    yesColor     : "#2ECC71",
    noColor      : "#E74C3C",
    duration     : 1.5,
    speed        : 500,
    closeConfirm : false,
    upper        : false,
    easing       : "easeOutBounce",
    html         : false,
    overlay      : false,
    callback     : function () {}
  };

  var attributes = $.extend(defaults, arguments);

  // Raise the overhang alert
  function raise (runCallback, identifier) {
    $overlay.fadeOut(100);
    $overhang.slideUp(attributes.speed, function () {
      if (runCallback) {
        attributes.callback(identifier !== null ? $element.data(identifier) : "");
      }
    });
  }

  // Force lower case for type name
  attributes.type = attributes.type.toLowerCase();

  // Handle invalid type name
  var validTypes = ["success", "error", "warn", "info", "prompt", "confirm"];
  if ($.inArray(attributes.type, validTypes) === -1) {
    attributes.type = "default";

    // Notify the user
    console.log("You have entered invalid type name for an overhang message. Overhang resorted to the default theme.");
  }

  // Set attribut primary and accent colors
  if (attributes.custom) {
    attributes.primary = arguments.primary || themes["default"][0];
    attributes.accent  = arguments.accent || themes["default"][1];
  } else {
    attributes.primary = themes[attributes.type][0] || themes["default"][0];
    attributes.accent  = themes[attributes.type][1] || themes["default"][1];
  }

  if (attributes.type === "prompt" || attributes.type === "confirm") {
    attributes.primary      = arguments.primary || themes[attributes.type][0];
    attributes.accent       = arguments.accent  || themes[attributes.type][1];
    attributes.closeConfirm = true;
  }

  // Style colors
  $overhang.css("background-color", attributes.primary);
  $overhang.css("border-bottom", "6px solid " + attributes.accent);

  // Message
  var $message = $("<span class='overhang-message'></span>");
  $message.css("color", attributes.textColor);

  // Assign html or text
  if (attributes.html) {
    $message.html(attributes.message);
  } else {
    $message.text(attributes.upper ? attributes.message.toUpperCase() : attributes.message);
  }

  $overhang.append($message);

  // Additional overhang elements
  var $inputField = $("<input class='overhang-prompt-field' />");
  var $yesButton = $("<button class='overhang-yes-option'>" + attributes.yesMessage + "</button>");
  var $noButton = $("<button class='overhang-no-option'>" + attributes.noMessage + "</button>");

  $yesButton.css("background-color", attributes.yesColor);
  $noButton.css("background-color", attributes.noColor);

  // Close button
  if (attributes.closeConfirm) {
    var $close = $("<span class='overhang-close'></span>");
    $close.css("color", attributes.accent);

    if (attributes.type !== "confirm") {
      $overhang.append($close);
    }
  }

  if (attributes.type === "prompt") {
    $overhang.append($inputField);
    $element.data("overhangPrompt", null);

    // Submit action
    $inputField.keydown(function (e) {
      if (e.keyCode == 13) {

        // Append the data to the DOM element
        $element.data("overhangPrompt", $inputField.val());
        raise(true, "overhangPrompt");
      }
    });

  } else if (attributes.type === "confirm") {

    // Add choice buttons
    $overhang.append($yesButton);
    $overhang.append($noButton);

    $overhang.append($close);

    $element.data("overhangConfirm", null);

    // Append selection to DOM element
    $yesButton.click(function () {
      $element.data("overhangConfirm", true);
      raise(true, "overhangConfirm");
    });

    $noButton.click(function () {
      $element.data("overhangConfirm", false);
      raise(true, "overhangConfirm");
    });

  }

  // Attack overhang to element
  $element.append($overhang);

  // Slide overhang down
  $overhang.slideDown(attributes.speed, attributes.easing);

  // Dim overlay
  if (attributes.overlay) {

    // Apply overlay color
    if (attributes.overlayColor) {
      $overlay.css("background-color", attributes.overlayColor);
    }

    $element.append($overlay);
  }

  // Animate drop down and up
  if (attributes.closeConfirm && !arguments.duration) {

    $close.click(function () {
      if (attributes.type !== "prompt" && attributes.type !== "confirm") {
        raise(true, null);
      } else {
        raise(false, null);
      }
    });

  // Allows usage of duration time and closeConfirm simultaneously
  } else if (attributes.closeConfirm && arguments.duration) {

    // Closing based on Timer
    var slideTimer = setTimeout(function() {
      $overhang.slideUp(attributes.speed, function () {
        raise(true, null);
      });
    }, attributes.duration * 1000);

    // Closing based on closeComfirm argument
    $close.click(function () {
      clearTimeout(slideTimer);

      if (attributes.type !== "prompt" && attributes.type !== "confirm") {
        raise(true, null);
      } else {
        raise(false, null);
      }
    });

  } else {
    $overhang
      .delay(attributes.duration * 1000)
      .slideUp(attributes.speed, function () {
        raise(true, null);
      });
  }
}
