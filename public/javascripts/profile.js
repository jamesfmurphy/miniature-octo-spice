var main = function(){
	"use strict";
	getUserProfile(fillProfile);
	setInterval(function(){ 
		/// show login users 
		$.ajax({
			url:"/getLoginUserList",
			error : function () {
						$("#loginUserList").empty();
						$("#loginUserList").text("error ajax call");
			},dataType: "json",
			success: function (data) {
						$(".usersOnline").empty();
						var result = JSON.parse(data);
						console.log('in client ~ loginUserList data:'+data);
						if(result.length > 0){
							result.forEach(function(user){
									$('.usersOnline').
									append('<p>'+user.firstName+' '+user.lastName+'</p>');
								});
						}else{
							$('#.usersOnline').append('<h4>no user here</h4>');
						} 
			},type: "post"
		})}, 3000);


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
			
			$newLI.text(movie.titleM);
			$(".col-md-4 .movie").append($newLI);
			$(".col-md-4 .movie").append($("<span>").append($("<img>").attr("src", "http://image.tmdb.org/t/p/w92" + movie.poster)));
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
				//user.movies.push($(".list input").val());
				var inputMovie = {'titleM' : ""};
				inputMovie.titleM = $(".list input").val();
				

				$.post("API", inputMovie, function (response) {
					// console.log(JSON.parse(response).results);
					var object = {"titleM": response.results[0].original_title, "poster": response.results[0].poster_path};
					user.movies.push(object);
					displayMovie(user);
					console.log(object.poster);

					$.post("updateUser", user, function (response) {
						console.log
					});
				});

				$(".list input").val("");
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