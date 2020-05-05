/**
 * index.js
 * Paul Krishnamurthy 2016
 *
 * https://paulkr.com
 * paul@paulkr.com
 */

$(document).ready(function () {

  $(".year").text(new Date().getFullYear());

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
      message: "⏲️ I will close in 5 seconds!",
      duration: 5,
      upper: true
    });
  });

  $(".example--4").click(function () {
    $("body").overhang({
      type: "warn",
      message: "A user has reported you!",
      duration: 3,
      overlay: true
    });
  });

  $(".example--5").click(function () {
    $("body").overhang({
      type: "prompt",
      message: "What's your name?",
      overlay: true
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
      message: "Are you sure?",
      overlay: true
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
      overlay: true,
      callback: function (value) {
        var response = value ? "Yes" : "No";
        alert("You made your selection of: " + response);
      }
    });
  });

  $(".example--11").click(function () {
    var instagramIcon = '<i class="fa fa-instagram" style="color: #FFFC00" aria-hidden="true"></i>';
    var instagramNote = ' Add National Geographic on instagram!';

    $("body").overhang({
      type: "confirm",
      primary: "#9b59b6",
      accent: "#8e44ad",
      message: instagramIcon + instagramNote,
      custom: true,
      html: true,
      overlay: true,
      overlayColor: "#1abc9c",
      callback: function (value) {
        if (value) {
          window.location.href = "https://www.instagram.com/natgeo/";
        } else {
          alert("Maybe next time then...");
        }
      }
    });
  });

});
