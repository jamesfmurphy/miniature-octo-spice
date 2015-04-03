var main = function(){
	"use strict";
	$('#loginBtn').on('click',function (event){	
		if(!validation()) return;
		$.ajax({
			url:"/login",
			error : function () {
				//$("#messageDiv").empty();
				//$("#messageDiv").text("error ajax call");
			},dataType: "json",
			data:$( "#loginForm" ).serialize(),
			success: function (data) {
				//$("#messageDiv").empty();
				var result = JSON.parse(data);
				if(result.status !== 'success'){
					// $('#messageDiv').append('<p calss="has-error form-control-feedback">'+
					// 	result.message+'</p>'+
					// 	'<a id="signupLink" href="/signup.show">signup</a> | '+
					// 	'<a id="homeLink" href="/">Home</a>');
				}else{
					console.log(' login success!');
					console.log(result.redirect);
					window.location = result.redirect;

				} 
			},type: "post"
		});

		return false;
	});
};

function validation() {
	var emailRegex = /^[A-Za-z0-9._]*\@[A-Za-z]*\.[A-Za-z]{2,5}$/;

	if ( $("#emailId").val() === "")
	{
		$("#emailId").focus() ;
		alert("enter the email");
		return false;

	} else if( !emailRegex.test($("#emailId").val()))

	{
		$("#emailId").focus() ;
		alert("enter the valid email");
		return false;
	}

	if($("#password").val() === "")
	{
		$("#password").focus() ;
		alert("enter the password");
		return false;
	}
	return true;
}

//setInterval(AJAXFetch(),200);};
$(document).ready(main);