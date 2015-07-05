// overHang.js
// Paul Krishnamurthy 2015
// www.PaulKr.com

$.fn.overHang = function(arguments){

	// Containing element
	restart();

	// Containing element
	var $element = this;

	// Attributes
	var message;
	var col;
	var dCol;
	var overHangHeight;
	
	// Default action
	var activity = "notification";
	// Default time
	var duration = 1.5;

	// Flat UI colors (www.flatuicolors.com)
	var themes = {
		"turquoise" : ["#1abc9c", "#16a085"],
		"emerald" : ["#2ecc71", "#27ae60"],
		"river" : ["#3498db", "#2980b9"],
		"amethyst" : ["#9b59b6", "#8e44ad"],
		"asphalt" : ["#34495e", "#2c3e50"],
		"flower" : ["#f1c40f", "#f39c12"],
		"carrot" : ["#e67e22", "#d35400"],
		"alizarin" : ["#e74c3c", "#c0392b"],
		"clouds" : ["#ecf0f1", "#bdc3c7"],
		"concrete" : ["#95a5a6" , "#7f8c8d"],
	};

	if (arguments != undefined){
		
		// Validate activity argument
		if (arguments.activity != undefined && ["", "notification", "prompt", "confirmation"].indexOf(arguments.activity)){
			activity = arguments.activity;
		}

		if (arguments.duration != undefined && typeof(arguments.duration) == "number"){
			duration = arguments.duration;
		}

		// Set message
		if (arguments.message != undefined){
			message = arguments.message;
			// Math to get the appropriate overHang height based on message
			overHangHeight = (($element.width%message.length*5)*20).toString();
		} else {
			message = "overHang.js";
		}
	 
		// Set color or theme
		if (arguments.col != undefined){
			if (arguments.col in themes){
				col = themes[arguments.col][0];
				dCol = themes[arguments.col][1];
			} else {
				col = arguments.col;
				dCol = col;
			}
		} else {
			col = themes["turquoise"][0];
			dCol = themes["turquoise"][1];
		}

	// Defaults
	} else {
		message = "overHang.js";
		col = themes["turquoise"][0];
		dCol = themes["turquoise"][1];
	}

	// Add 'Roboto' google font
	$("head").append("<link href='http://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>");

	// Drop or raise overHang banner
	function animate(state){
		if (state == "drop"){
			$(".overHangClass").slideDown("slow");
		} else {
			$(".overHangClass").slideUp("slow");
		}
	}

	// Create new dropdown style class
	var $overHangClass = {
		"position" : "fixed",
		"width" : "100%",
		"height" : overHangHeight,
		"display" : "none",
		"background-color" : col,
		"border-top" : "6px solid " + dCol,
		"z-index" : "9999",
		"top" : "0"
	}

	// Create new text styled class (notification)
	var $textContainer = {
		"font-family" : "Roboto",
		"font-size": "20px",
		"color" : "#fff",
		"text-align" : "center"
	}

	// Create new input styled class (input prompt)
	var $promptField = {
		"width" : $element.width/2,
		"height" : "30px",
		"border-radius" : "5px",
		"border" : "none",
		"display" : "block",
		"margin-left" : "auto",
		"margin-right" : "auto",
		"margin-top" : "15px",
		"bottom" : "7px",
		"position" : "relative",
		"font-family" : "Roboto",
		"padding-left" : "3px",
		"padding-right" : "3px"
	}

	// Yes button (confirmation)
	var $yes = {
		"width" : "50px",
		"height" : "30px",
		"background-color" : "#2ecc71",
		"border" : "none",
		"outline" : "none",
		"border-radius" : "4px",
		"font-family" : "'Roboto', 'sans-serif'",
		"font-size" : "20px",
		"color" : "#fff"
	}
	// No button (confirmation)
	var $no = {
		"width" : "50px",
		"height" : "30px",
		"background-color" : "#e74c3c",
		"border" : "none",
		"outline" : "none",
		"border-radius" : "4px",
		"font-family" : "'Roboto', 'sans-serif'",
		"font-size" : "20px",
		"color" : "#fff"	
	}

	// Notification
	if (activity == "notification"){
		$element.prepend("<span class='removeSpan'><div class='overHangClass textContainer'><div style='padding-top:5px; padding-bottom:15px'>" + message + "</div></div></span>");

		// Add CSS attributes
		$(".overHangClass").css($overHangClass);
		$(".textContainer").css($textContainer);

		// Jquery animation
		$(".overHangClass").slideDown("slow").delay(duration*1000).slideUp("slow");	
	}

	// Prompt for input
	else if (activity == "prompt"){

		$element.prepend("<span class='removeSpan'><div class='overHangClass'><input type='text' class='promptField' placeholder=' " + message + "'></div></span>");

		// Add CSS attributes
		$(".overHangClass").css($overHangClass);
		$(".promptField").css($promptField);

		// Disable focus outline
		$(".promptField").on("focus", function(){
			$(".promptField").css("outline", "none");
		})

		// Submit action
		$(".promptField").keydown(function(e) {
			if (e.keyCode == 13) {
				animate("raise");
				// Append the data to the DOM element
				$element.data("overHangPrompt", $(".promptField").val());
			}
		});

		// Jquery initial animation
		animate("drop");
	}

	// Confirmation (yes / no)
	else {

		$element.prepend("<span class='removeSpan'><div class='overHangClass textContainer'><div style='padding-top:5px; padding-bottom:10px; display: inline-block'>" + 
						message + " <button class='yes' id='yes'>Yes</button>" + " or " + "<button id='no' class='no'>No</button></div></div></span>");

		// Add CSS attributes
		$(".overHangClass").css($overHangClass);
		$(".textContainer").css($textContainer);
		$(".yes").css($yes);
		$(".no").css($no);
		$("#yes").css("cursor", "pointer");
		$("#no").css("cursor", "pointer");

		// Disable focus outline
		$(".promptField").on("focus", function(){
			$(".promptField").css("outline", "none");
		})

		// Get response and set data to the DOM element
		$("#yes").click(function(){
			$element.data("overHangConfirm", true);
			animate("raise");
		})
		$("#no").click(function(){
			$element.data("overHangConfirm", false);
			animate("raise");
		})

		// Jquery initial animation
		animate("drop");
	}

	// Remvoes appeneded span
	function restart(){
		$(".removeSpan").remove();
	}

}
