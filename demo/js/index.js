// overHang.js
// Paul Krishnamurthy 2015
// www.PaulKr.com

$(document).ready(function(){

	// Demo button
	$("#1").click(function(){
		$("body").overHang({
			activity : "notification",
			message : "This is an overHang.js message!"
		})
	})

	// Basic usage button
	$("#2").click(function(){
		$("body").overHang({
			activity : "notification",
			message : "Hello World!",
			col : "alizarin"
		})
	})

	// Prompt
	$("#3").click(function(){
		$("body").overHang({
			activity : "prompt",
			message : "Enter your name",
			col : "amethyst"
		})
	})

	// Confirmation
	$("#4").click(function(){
		$("body").overHang({
			activity : "confirmation",
			message : "Are you sure?",
			col : "flower"
		})
	})

	// View attached data
	$("#viewData").click(function(){
		$("body").overHang({
			activity : "notification",
			message : $("body").data("overHangPrompt"),
			col : "carrot"
		})
	})

	// View confirmation
	$("#viewConfirm").click(function(){
		var output;
		if ($("body").data("overHangConfirm")){
			output = "You picked YES! (true)";
		} else if ($("body").data("overHangConfirm") == false){
			output = "Your picked NO! (false)";
		} else {
			output = "Nothing Selected."
		}
		$("body").overHang({
			activity : "notification",
			message : output,
			col : "river"
		})
	})

})

