/**
 * index.js
 * Paul Krishnamurthy 2016
 */

$(document).ready(function () {

  $(".sample").click(function () {
    $("body").overhang({
      type : "success"
    });
  });

  $(".example--1").click(function () {
    $("body").overhang({
      type : "success",
      message: "Woohoo! Our message works!"
    });
  });

  $(".example--2").click(function () {
    $("body").overhang({
      type: "error",
      message: "Whoops! Something went wrong!",
      closeConfirm: true
    });
  });

  $(".example--3").click(function () {
    $("body").overhang({
      type: "info",
      message: "This message will close in 5 seconds!",
      duration: 5,
      upper: true
    });
  });

  $(".example--4").click(function () {
    $("body").overhang({
      type: "warn",
      message: "A user has reported you!",
      duration: 3
    });
  });

  $(".example--5").click(function () {
    $("body").overhang({
      type: "prompt",
      message: "What's your name?"
    });
  });

  $(".example--6").click(function () {
    $("body").overhang({
      type: "info",
      message: $("body").data("overhangPrompt") || "You have not entered anything!"
    });
  });

  $(".example--7").click(function () {
    $("body").overhang({
      type: "confirm",
      message: "Are you sure?"
    });
  })

  $(".example--8").click(function () {
    var selected = $("body").data("overhangConfirm");

    if (selected === null) {
      selected = "You have not entered anything!";
    } else {
      selected = selected ? "True!" : "False!";
    }

    $("body").overhang({
      type: "info",
      message: selected
    });
  });

  $(".example--9").click(function () {
    $("body").overhang({
      custom: true,
      textColor: "#FCE4EC",
      primary: "#F06292",
      accent: "#FCE4EC",
      message: "This is my custom message 😜"
    });
  });

  $(".example--10").click(function () {
    $("body").overhang({
      type: "confirm",
      primary: "#40D47E",
      accent: "#27AE60",
      yesColor: "#3498DB",
      message: "Do you want to continue?",
      callback: function () {
        var selection = $("body").data("overhangConfirm");
        var response = selection ? "yes" : "no";
        alert("You made your selection of " + response);
      }
    });
  });

  $(".example--11").click(function () {
    var snapchatIcon = '<i class="fa fa-snapchat-ghost" style="color: #FFFC00" aria-hidden="true"></i>';
    var snapchatNote = ' Add "thepaulkr" on snapchat!';

    $("body").overhang({
      type: "confirm",
      primary: "#333333",
      accent: "#FFFC00",
      message: snapchatIcon + snapchatNote,
      custom: true,
      html: true,
      callback: function () {
        var selection = $("body").data("overhangConfirm");
        if (selection) {
          window.open("https://www.snapchat.com/add/thepaulkr", "_blank");
        } else {
          alert("Maybe next time then...");
        }
      }
    });
  });

});
