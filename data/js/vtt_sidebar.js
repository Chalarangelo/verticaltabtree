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
