addon.port.on("vtt alter", function(tabData) {
	$('#tabList').append('<li id="'+tabData.id+'"><span class="fav" id="fav'+tabData.id+'"></span>'+tabData.title+'</li>');
	console.log('favicon: '+tabData.favicon);
	$('#fav'+tabData.id).css('background-image','url('+tabData.favicon+')');
});