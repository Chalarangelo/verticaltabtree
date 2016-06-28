var sidebarworker;				// Worker for the sidebar's async port messaging.
var tabs = require("sdk/tabs");	// Tabs list.
// Helper function that returns the favicon using google. 
// See https://github.com/Chalarangelo/verticaltabtree/issues/4 for more
// details.
function getFaviconFromDomain(url){
	return('https://plus.google.com/_/favicon?domain_url='+url);
}
// Sidebar control for the add-on.
var tabtreebar = require("sdk/ui/sidebar").Sidebar({
  	id: 'verticaltabtree-sidebar',
  	title: 'Vertical Tab Tree',
  	url: require("sdk/self").data.url("verticaltabtree_sidebar.html"),
  	// When a worker is attached to the sidebar, store the worker in the variable.
  	onAttach: function (worker) {
  		sidebarworker = worker;
    },
    // When the worker is detached from the sidebar, reset the worker.
    onDetach: function () {
  	 	sidebarworker = undefined;	
    },
    // When the sidebar is shown, clear previous content and send initialization 
    // messages to populate the tabs list.
    onShow: function () {
    	sidebarworker.port.emit("vtt clear");
    	for (let tab of tabs)
    		sidebarworker.port.emit("vtt init",{id: tab.id, title: tab.title, favicon: getFaviconFromDomain(tab.url)});
  		
    }
});
// Menu button that opens and closes the sidebar.
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
// State of the sidebar (false for hidden).
var tabtreebarOpen = false;
// Change sidebar's hidden/shown state.
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
// Fires when a tab is opened.
tabs.on('open',function(tab){
	console.log('opened '+tab.url);
});
// Fires when a tab is closed.
tabs.on('close',function(tab){
	console.log('closed '+tab.url);
});
// Fires when a tab is loaded.
tabs.on('ready',function(tab){
	console.log('loaded '+tab.url);
	if(sidebarworker){
		console.log('sent');
    	sidebarworker.port.emit("vtt alter",{id: tab.id, title: tab.title, favicon: getFaviconFromDomain(tab.url)});
	}
});
// Fires when a tab is activated.
tabs.on('activate',function(tab){
	console.log('active changed to '+tab.url);
	
});
// Fires when a tab is deactivated.
tabs.on('deactivate',function(tab){
	console.log('active changed from '+tab.url);
});