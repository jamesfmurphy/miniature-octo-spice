
var searchForFiernd = function (){	
		$.ajax({
		url:"/search",
		error : function () {
					$("#searchForFierndResult").empty();
					$("#searchForFierndResult").text("error ajax call");
		},dataType: "json",
		data:$( "#queryString" ).serialize(),
		success: function (data) {
					$("#searchForFierndResult").empty();
					var result = JSON.parse(data);
					console.log('in client data:'+data);
					if(result.length > 0){
						$('#searchForFierndResult').append('<h4>List of result</h4>');
						result.forEach(function(user){
								$('#searchForFierndResult').
								append('<p>'+user.firstName+' '+user.lastName+'</p>');
							});
					}else{
						$('#searchForFierndResult').append('<h4>no result found</h4>');
					} 
		},type: "post"
	});
};
var searchForMovies = function (){	
		$.ajax({
          url: 'http://api.themoviedb.org/3/search/movie?api_key=ae22cfb91b3d2c0a8179d99a29831489&query=' + $('#movieName').val() ,
          data: {
             format: 'json'
          },
          error: function() {
             $('#moviesResults').html('<h4>error in ajax call movie</h4><img id="poster" src="" />');
          },
          dataType: 'jsonp',
          success: function(data) {
            if (data.total_results > 0){
              $('#moviesResults').html('<h3 >We found the poster</h3><img id="poster" style="width: 150px, height: 200px" src="http://image.tmdb.org//t//p//w500' + data.results[0].poster_path+ '"/>');
            } else {
              $('#moviesResults').html('<h3 >We do not find what you search</h3><img id="poster" src="" />');
            }
          },
          type: 'GET'
	});
};
var main = function(){
	"use strict";

	/// show current user profile
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
						console.log('user:'+ user); 
						$("#profile").append("<p> welcome "+user.firstName+' '+user.lastName+"</p>" +
							'<a id="logoutLink" href="/logout">logout</a>');
					} 
		},type: "post"
	});

	$('#queryString').keyup(function(event){
       //if(event.keyCode === 13 /*$('#queryString').val().length > 3*/){
       	if(event.keyCode === 13 && $('#queryString').val().length >= 3){
           searchForFiernd();
       }
   	});
	setInterval(function(){ 
		/// show login users 
		$.ajax({
			url:"/getLoginUserList",
			error : function () {
						$("#loginUserList").empty();
						$("#loginUserList").text("error ajax call");
			},dataType: "json",
			success: function (data) {
						$("#loginUserList").empty();
						var result = JSON.parse(data);
						console.log('in client ~ loginUserList data:'+data);
						if(result.length > 0){
							$('#loginUserList').append('<h5>Login Users Now</h4>');
							result.forEach(function(user){
									$('#loginUserList').
									append('<p>'+user.firstName+' '+user.lastName+'</p>');
								});
						}else{
							$('#loginUserList').append('<h4>no user here</h4>');
						} 
			},type: "post"
		})}, 3000);
	// search for movies
    $('#movieName').keyup(function(event){
       if(event.keyCode == 13){
           searchForMovies();
       }
   });
}

//setInterval(AJAXFetch(),200);};
$(document).ready(main);