var main= function () {
    "use strict";
  $('#signupBtn').on('click',function (event){ 
      if(!validation()) return;
      $.ajax({
      url:"/signup",
      error : function () {
            $("#messageDiv").empty();
            $("#messageDiv").text("error ajax call");
      },dataType: "json",
      data:$( "#signupForm" ).serialize(),
      success: function (data) {
            $("#messageDiv").empty();
            var result = JSON.parse(data);
            if(result.status !== 'success'){
              $('#messageDiv').append('<p calss="">'+
                 result.message+'</p>'+
                '<a id="loginLink" href="/login.show">login</a> | '+
                '<a id="homeLink" href="/">Home</a>');
            }else{
              console.log(' signup success');
              window.location.href ="/";
            } 
      },type: "post"
    });
  });
};

function validation(){
 var emailRegex = /^[A-Za-z0-9._]*\@[A-Za-z]*\.[A-Za-z]{2,5}$/;
   
 if( $("#firstName").val() === "" )
   {
     $("#firstName").focus() ;
     alert("enter the first name");
     return false;
   }

 if( $("#lastName").val() === "" )       
   {
     $("#lastName").focus() ;
     alert("enter the last name");
     return false;
   } 
  
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

  if ($("#enterpassword").val() === "")
 {
  $("#enterpassword").focus();
  alert("Re-enter the password");
  return false;
  }
   
  if(  ($("#enterpassword").val()) !== ($("#password").val())  )
  {
   $("#enterpassword").focus();
   alert("passwords are not matching, re-enter again");
   return false;
 }
   
  if ($("#b_month").val() === "") 
  {
    $("#b_month").focus();
    alert("select the birthday month");
    return false;
  }

  if ($("#b_day").val() === "")
  {
    $("#b_day").focus();
    alert("select the birthday day");
    return false;
  }

  if ($("#b_year").val() === "")
  {
    $("#b_year").focus();
    alert("select the birthday year");
    return false;
  }

  if ($(".gender:checked").length === 0)
  {
    alert("select your gender");
    return false;
   }
   
return true;
  
}   

$(document).ready(main);