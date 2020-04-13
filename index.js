$("ul").on("click", "li", function () {
	// body...
     $(this).toggleClass("completed");
 });

//delete button
$("ul").on("click","span",function(){
	$(this).parent().fadeOut(500,function(){
		$(this).remove();
	});
     event.stopPropagation();
});

$("input[type = 'text']").keypress(function(k){
	if(k.which === 13){
		var todoText = $(this).val();
		$(this).val("");
		$("ul").append("<li><span><i class='fas fa-trash-alt'></i></span>" + todoText + "</li>");
	}

});

$(".fa-pencil-alt").click(function(){
 $("input[type='text']").fadeToggle()
});