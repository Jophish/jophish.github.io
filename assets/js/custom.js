function findBootstrapEnvironment() {
    var envs = ["ExtraSmall", "Small", "Medium", "Large"];
    var envValues = ["xs", "sm", "md", "lg"];

    var $el = $('<div>');
    $el.appendTo($('body'));

    for (var i = envValues.length - 1; i >= 0; i--) {
        var envVal = envValues[i];

        $el.addClass('hidden-'+envVal);
        if ($el.is(':hidden')) {
            $el.remove();
            return envs[i]
        }
    };
}

$(document).ready(function(){
    
    if (findBootstrapEnvironment() == 'ExtraSmall') {
	$('#sidebar').css('height', $(window).height());
	$('#stuff').css('height', Math.max($(window).height(), $("#stuff").height()));
	
	
    }
    else{
        $('#sidebar-nav').css('height', Math.max($(window).height(), $("#stuff").height()));
	$("#stuff").css('height','auto');
    }
    

});



$(window).load(function(){
    if (findBootstrapEnvironment() == 'ExtraSmall') {
	
	$('#sidebar').css('height', $(window).height());
	$('#stuff').css('height', Math.max($(window).height(), $("#stuff").height()));
	
	
    }
    else{
        $('#sidebar').css('height', Math.max($(window).height(), $("#stuff").height()));
	$("#stuff").css('height','auto');
    }

    
});





$(window).resize(function() {
    console.log(findBootstrapEnvironment());
    
    if (findBootstrapEnvironment() == 'ExtraSmall') {
	$('#sidebar').css('height', $(window).height());
	$('#stuff').css('height', Math.max($(window).height(), $("#stuff").height()));
	
	
    }
    
    else{
        $('#sidebar').css('height', Math.max($(window).height(), $("#stuff").height()));
	$("#stuff").css('height','auto');
    }
    
});
