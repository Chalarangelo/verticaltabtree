var sidebarworker;

var tabtreebar = require("sdk/ui/sidebar").Sidebar({
  	id: 'verticaltabtree-sidebar',
  	title: 'Vertical Tab Tree',
  	url: require("sdk/self").data.url("verticaltabtree_sidebar.html"),
  	onAttach: function (worker) {
  		sidebarworker = worker;
  		sidebarworker.port.emit("vtt init");
    },
    onDetach: function () {
    	sidebarworker.port.emit("vtt dispose");
  	 	sidebarworker = undefined;	
    },
    onShow: function () {
  		sidebarworker.port.emit("vtt start_update");
    },
    onHide: function () {
  		worker.port.emit("vtt stop_update");
    }
});

var tabtreebartoggle = require('sdk/ui/button/action').ActionButton({
	id: 'verticaltabtree-toggle',
	label: 'Open/Close Vertical Tab Tree Sidebar',
	icon: {
		"16": "./icon-16.png",
    	"32": "./icon-32.png",
    	"64": "./icon-64.png"
	},
	onClick: toggleSidebar
});

var tabtreebarOpen = false;
function toggleSidebar(state){
	if (!tabtreebarOpen){
		tabtreebar.show();
		tabtreebarOpen = true;
	}
	else{
		tabtreebar.hide();
		tabtreebarOpen = false;
	}
}

var tabs = require("sdk/tabs");
tabs.on('open',function(tab){
	console.log('opened '+tab.url);
});

tabs.on('close',function(tab){
	console.log('closed '+tab.url);
});

tabs.on('ready',function(tab){
	console.log('loaded '+tab.url);
	if(sidebarworker){
		require("sdk/places/favicon").getFavicon(tab).then(function (url) {
      		sidebarworker.port.emit("vtt alter",{id: tab.id, title: tab.title, favicon: url});
    	});
		
	}
});

tabs.on('activate',function(tab){
	console.log('active changed to '+tab.url);
	
});

tabs.on('deactivate',function(tab){
	console.log('active changed from '+tab.url);
});