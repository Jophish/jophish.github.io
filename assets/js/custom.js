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
      $('#sidebar').css('max-width', $(window).width());
      $('#sidebar').css('width', $(window).width());
      $('#sidebar-button').css('width', $(window).width());
      
      $('#stuff').css('height', Math.max($(window).height(), $("#stuff").height()));
      $('.sidebar-nav').css('max-width', 'none');
      
	
    }
  else{
     $('.sidebar-nav').css('max-width', '120px');
    $('#sidebar-nav').css('height', Math.max($(window).height(), $("#stuff").height()));
    //$('#sidebar').css('width', 'auto');
      $('#sidebar').css('max-width', '100px');
	$("#stuff").css('height','auto');
    }
    

});



$(window).load(function(){
    if (findBootstrapEnvironment() == 'ExtraSmall') {
	
      $('#sidebar').css('height', $(window).height());
      $('#sidebar').css('max-width', $(window).width());
      $('#sidebar').css('width', $(window).width());
      $('#sidebar-button').css('width', $(window).width());
      $('#stuff').css('height', Math.max($(window).height(), $("#stuff").height()));
       $('.sidebar-nav').css('max-width', 'initial');
	
	
    }
  else{
     $('.sidebar-nav').css('max-width', '120px');
      $('#sidebar').css('height', Math.max($(window).height(), $("#stuff").height()));
            $('#sidebar').css('max-width', '100px');
    $("#stuff").css('height','auto');
    //$('#sidebar').css('width', 'auto');
    }

    
});





$(window).resize(function() {
    console.log(findBootstrapEnvironment());
    
    if (findBootstrapEnvironment() == 'ExtraSmall') {
      $('#sidebar').css('height', $(window).height());
       $('#sidebar').css('max-width', $(window).width());
      $('#sidebar').css('width', $(window).width());
      $('#sidebar-button').css('width', $(window).width());
      $('#stuff').css('height', Math.max($(window).height(), $("#stuff").height()));
       $('.sidebar-nav').css('max-width', 'initial');
	
	
    }
    
  else{
     $('.sidebar-nav').css('max-width', '120px');
      $('#sidebar').css('height', Math.max($(window).height(), $("#stuff").height()));
         $('#sidebar').css('max-width', '100px');
    $("#stuff").css('height','auto');
    //$('#sidebar').css('width', 'auto');
    }
    
});
