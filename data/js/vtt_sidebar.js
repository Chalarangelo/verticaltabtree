// Fires when a tab's content is altered (new page loaded).
addon.port.on("vtt alter", function(tabData) {
	if($('#'+tabData.id).length == 0){
		$('#tabList').append('<li id="'+tabData.id+'"><span class="fav" id="fav'+tabData.id+'"></span>'+tabData.title+'</li>');
		$('#fav'+tabData.id).css('background-image','url('+tabData.favicon+')');
	}
	else{
		$('#'+tabData.id).html('<span class="fav" id="fav'+tabData.id+'"></span>'+tabData.title);
		$('#fav'+tabData.id).css('background-image','url('+tabData.favicon+')');
	}
});
// Fires once when the sidebar is opened.
addon.port.on("vtt clear", function(){
	$('#tabList').html('');
});
// Fires once for each open tab when the sidebar is opened.
addon.port.on("vtt init", function(tabData){
	$('#tabList').append('<li id="'+tabData.id+'"><span class="fav" id="fav'+tabData.id+'"></span>'+tabData.title+'</li>');
	$('#fav'+tabData.id).css('background-image','url('+tabData.favicon+')');
});
// Fires when a tab is closed.
addon.port.on("vtt close", function(tabData){
	$('#'+tabData.id).remove();
});
// Fires when a tab is opened.
addon.port.on("vtt open", function(tabData){
	$('#tabList').append('<li id="'+tabData.id+'"><span class="fav" id="fav'+tabData.id+'"></span>'+tabData.title+'</li>');
	$('#fav'+tabData.id).css('background-image','url('+tabData.favicon+')');
});
// Fires when a tab is activated.
addon.port.on("vtt activate", function(tabData){
	$('#'+tabData.id).addClass('active');
});
// Fires when a tab is deactivated.
addon.port.on("vtt deactivate", function(tabData){
	$('#'+tabData.id).removeClass('active');
});