var main= function () {
    "use strict";
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
  
  if ( $("#email").val() === "")
  {
  $("#email").focus() ;
  alert("enter the email");
  return false;

  } else if( !emailRegex.test($("#email").val()))

        {
          $("#email").focus() ;
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
   
  if ($("#month").val() === "") 
  {
    $("#month").focus();
    alert("select the birthday month");
    return false;
  }

  if ($("#day").val() === "")
  {
    $("#day").focus();
    alert("select the birthday day");
    return false;
  }

  if ($("#year").val() === "")
  {
    $("#year").focus();
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