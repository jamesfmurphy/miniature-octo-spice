var main = function(){
"use strict";
var AJAXFetch = function (URL){
		$.ajax({
				url:URL,
				error : function () {},dataType: "json",
				success: function (data) {},type: "post"
		});
};
var JSONFetch =function (URL){
    $.getJSON(URL, function (data) {});
};


//setInterval(AJAXFetch(),200);};
$(document).ready(main);