var main = function(){
	"use strict";
	getUserProfile(fillProfile);


};

var getUserProfile = function(callback){
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
						$('#profile').append('<a id="signupLink" href="/signup.show">signup</a> | '+
							'<a id="loginLink" href="/login.show">login</a>');
					}else{
						var user = JSON.parse(data);
						//console.log('user:'+ user); 
						callback(user);
						
					} 
		},type: "post"
	});

};

var fillProfile = function(user)
{
	console.log(user.movies);
	$("#name h1").append(user.firstName+' '+user.lastName);

	var displayMovie = function(user) {
		$(".col-md-4 .movie").empty();
		user.movies.forEach(function (movie) {
			var $newLI =$("<li>");
			$newLI.text(movie);
			$(".col-md-4 .movie").append($newLI);
		});
	};

	var displayGames = function(user) {
		$(".col-md-4 .game").empty();
		user.games.forEach(function (game) {
			var $newLI =$("<li>");
			$newLI.text(game);
			$(".col-md-4 .games").append($newLI);
		});
	};

	var displayBooks = function(user) {
		$(".col-md-4 .book").empty();
		user.books.forEach(function (book) {

			var $newLI =$("<li>");
			$newLI.text(book);
			$(".col-md-4 .books").append($newLI);
		});
	};

	displayMovie(user);
	displayGames(user);
	displayBooks(user);

	$("body .list button").on("click", function () {
		console.log("CLICK!");
		if ($(".list input").val() != "") {
			
			if($(".list select").val() === "Movies") {
				console.log("hello");
				user.movies.push($(".list input").val());
				$(".list input").val("");
				$(".col-md-4 .movie").empty();
				displayMovie(user);
				// $.post("updateMovie", currentUser, function(response) {
				// 	console.log("works");
					
				// });
			} else if ($(".list select").val() === "Games") {
				console.log("hello!!");
				user.games.push($(".list input").val());
				$(".list input").val("");
				$(".col-md-4 .game").empty();
				displayGames(user);
			} else if ($(".list select").val() === "Books") {
				user.books.push($(".list input").val());
				$(".list input").val("");
				$(".col-md-4 .book").empty();
				displayBooks(user);
			}

		}

	});	

}


$(document).ready(main);