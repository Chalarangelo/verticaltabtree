var tabtreebar = require("sdk/ui/sidebar").Sidebar({
  	id: 'verticaltabtree-sidebar',
  	title: 'Vertical Tab Tree',
  	url: require("sdk/self").data.url("verticaltabtree_sidebar.html"),
  	onAttach: function (worker) {
  		worker.port.emit("vtt init");
    	worker.port.on("ping", function() {
    	});
    },
    onDetach: function (worker) {
  		worker.port.emit("vtt dispose");
    	worker.port.on("ping", function() {
    	});
    },
    onShow: function (worker) {
  		worker.port.emit("vtt start_update");
    	worker.port.on("ping", function() {
    	});
    },
    onHide: function (worker) {
  		worker.port.emit("vtt stop_update");
    	worker.port.on("ping", function() {
    	});
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
	console.log('opened '+tab.url)
});

tabs.on('close',function(tab){
	console.log('closed '+tab.url)
});

tabs.on('ready',function(tab){
	console.log('loaded '+tab.url)
});

tabs.on('activate',function(tab){
	console.log('active changed to '+tab.url)
});

tabs.on('deactivate',function(tab){
	console.log('active changed from '+tab.url)
});