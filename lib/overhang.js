/**
 * overhang.js
 * Paul Krishnamurthy 2016
 */

$.fn.overhang = function (arguments) {

  var $element = $(this);
  var $overhang = $("<div class='overhang'></div>");

  $(".overhang").remove();

  // FlatUI color themes
  var themes = {
    "success" : ["#2ECC71", "#27AE60"],
    "error"   : ["#E74C3C", "#C0392B"],
    "warn"    : ["#E67E22", "#D35400"],
    "info"    : ["#3498DB", "#2980B9"],
    "prompt"  : ["#9B59B6", "#8E44AD"],
    "confirm" : ["#1ABC9C", "#16A085"],
    "blank"   : ["#34495E", "#2C3E50"]
  };

  // Default attributes
  var defaults = {
    type         : "success",
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
    callback     : function () {}
  };

  var attributes = $.extend(defaults, arguments);

  // Raise the overhang alert
  function raise (runCallback) {
    $overhang.slideUp(attributes.speed, function () {
      if (runCallback) {
        attributes.callback();
      }
    });
  }

  // Handle invalid type name
  var validTypes = ["success", "error", "warn", "info", "prompt", "confirm"];
  if ($.inArray(attributes.type, validTypes) === -1) {
    attributes.type = "blank";

    // Notify the user
    console.log("You have entered invalid type name for an overhang message.");
  }

  // Set attribut primary and accent colors
  if (arguments.custom) {
    attributes.primary = arguments.primary;
    attributes.accent  = arguments.accent;
  } else {
    attributes.primary = themes[attributes.type][0] || "#ECF0F1";
    attributes.accent  = themes[attributes.type][1] || "#BDC3C7";
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
  var $message = $("<span class='message'></span>");
  $message.css("color", attributes.textColor);

  // Assign html or text
  if (attributes.html) {
    $message.html(attributes.message);
  } else {
    $message.text(attributes.upper ? attributes.message.toUpperCase() : attributes.message);
  }

  $overhang.append($message);

  // Additional overhang elements
  var $inputField = $("<input class='prompt-field' />");
  var $yesButton = $("<button class='yes-option'>" + attributes.yesMessage + "</button>");
  var $noButton = $("<button class='no-option'>" + attributes.noMessage + "</button>");

  $yesButton.css("background-color", attributes.yesColor);
  $noButton.css("background-color", attributes.noColor);

  // Close button
  if (attributes.closeConfirm) {
    var $close = $("<span class='close'></span>");
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
        raise(true);
      }
    });

  } else if (attributes.type === "confirm") {

    $overhang.append($yesButton);
    $overhang.append($noButton);

    $overhang.append($close);

    $element.data("overhangConfirm", null);

    // Append selection to DOM element
    $yesButton.click(function () {
      $element.data("overhangConfirm", true);
      raise(true);
    });

    $noButton.click(function () {
      $element.data("overhangConfirm", false);
      raise(true);
    });

  }

  // Attack overhang to element
  $element.append($overhang);

  // Animate drop down and up
  if (attributes.closeConfirm) {
    $overhang.slideDown(attributes.speed, attributes.easing);

    $close.click(function () {
      if (attributes.type !== "prompt" && attributes.type !== "confirm") {
        raise(true);
      } else {
        raise();
      }

    });
  } else {
    $overhang
      .slideDown(attributes.speed, attributes.easing)
      .delay(attributes.duration * 1000)
      .slideUp(attributes.speed, function () {
        raise(true);
      });
  }

}
