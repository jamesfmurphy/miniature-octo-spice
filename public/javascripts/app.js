var main = function(){
"use strict";
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

//setInterval(AJAXFetch(),200);};
$(document).ready(main);