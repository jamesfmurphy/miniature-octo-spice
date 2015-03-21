var main = function(){
	"use strict";

	var movies = ["the matrix", "lord of the ring"];
	var games = ["gta v", "counter-strike", "diablo", "LoL"];
	var books = ["Harry Potter", "Lord of the Ring", "Jurrassic Park"];

	var login = false;
	homePage(login);
	listManage(movies, games, books);

/*
var AJAXFetch = function (URL){
		$.ajax({
				url:URL,
				error : function () {},dataType: "json",
				success: function (data) {},type: "post"
		});
};
var JSONFetch =function (URL){
    $.getJSON(URL, function (data) {});
};*/


	$.ajax({
		url:"/getLoginUser.json",
		error : function () {
					$("#profile").empty();
					$("#profile").text("error ajax call");
		},dataType: "json",
		success: function (data) {
					$("#profile").empty();
					console.log('data:'+data); 
					if(data === '{}'){
						$('#profile').append('<a id="signupLink" href="/signup.show">signup</a>');
					}else{
						var user = JSON.parse(data);
						console.log('user:'+ user); 
						$("#profile").append("<p> welcome "+user+"</p>");
					} 
		},type: "post"
	});


}


var homePage = function(login) {
	var $form,
		$div,
		$input,
		$button,
		$content,
		$p;

	//what the user will see if they are not login
	if (login === false) {

		$form = $("<form>").attr("class", "navbar-form navbar-right");
		$div = $("<div>").attr("class", "form-group");
		$input = $("<input>").attr("type", "text").attr("placeholder", "Email").attr("class", "form-control");
		$form.append($div.append($input));
		
		$div = $("<div>").attr("class", "form-group");
		$input = $("<input>").attr("type", "text").attr("placeholder", "Password").attr("class", "form-control");
		$form.append($div.append($input));
		
		$button = $("<button>").attr("type", "submit").attr("class", "btn btn-success").text("Sign In");
		$form.append($button);
		$("div.navbar-collapse.collapse").append($form);

		$div = $("<div>").attr("class", "container");
		$content = $("<h1>").text("Welcome to Cinder!");
		$p = $("<p>").text("A social site for the socially awkward.  Meet others with common interest!");
		$div = $div.append($content).append($p);
		$p = $("<p>").append($("<a>").attr("class", "btn btn-primary btn-lg").attr("href", "/public/signup.html").attr("role", "button").text
			("Sign Up"));
		$div.append($p);
		$(".jumbotron").append($div);

	//login successuful this is where code for profile will occur
	} else {


	}

}

var listManage = function(movies, games, books) {
	$(".tabs a span").toArray().forEach(function (element) {
		// create a click handler for this element
		var $element = $(element);
		
		$(element).on("click", function () {

			var $newLI,
				$input,
				$button,
				$content,
				$form,
				$select,
				$option;

			$(".tabs a span").removeClass("active");
			$(element).addClass("active");
			$("main .content").empty();
			

		
			if ($element.parent().is(":nth-child(1)")) {
				console.log("FIRST TAB CLICKED!");
				movies.forEach(function (movie) {
					var $newLI =$("<li>");
					$newLI.text(movie);
					$("main .content").append($newLI);
				})
			} else if ($element.parent().is(":nth-child(2)")) {
				console.log("SECOND TAB CLICKED!");
				games.forEach(function (game) {
					var $newLI =$("<li>");
					$newLI.text(game);
					$("main .content").append($newLI);
				});
			} else if ($element.parent().is(":nth-child(3)")) {
				console.log("THIRD TAB CLICKED!");
				books.forEach(function (book) {

					var $newLI = $("<li>");
					$newLI.text(book);
					$("main .content").append($newLI);
				});
			} else if ($element.parent().is(":nth-child(4)")) {
				
				$select = $("<select>").attr("id", "single");
				$input = $("<input>");
				$button = $("<button>").text("+");
				
				$option = $("<option>").attr("value", "Movies").text("Movies");
				var $option1 = $("<option>").attr("value", "Games").text("Games");
				var $option2 = $("<option>").attr("value", "Books").text("Books");
				$select.append($option).append($option1).append($option2);

				$button.on("click", function () {
					if ($input.val() != "") {
						if($select.val() === "Movies") {
							movies.push($input.val());
							$input.val("");
						} else if ($select.val() === "Games") {
							games.push($input.val());
							$input.val("");
						} else if ($select.val() === "Books") {
							books.push($input.val());
							$input.val("");
						}

					}

				});
				
				
				$content = $("<div>").append($input).append($button).append($select);
			}

			$("main .content").append($content);
			// return false so we don't follow the link
			return false;
		});
	});
}

//setInterval(AJAXFetch(),200);};
$(document).ready(main);