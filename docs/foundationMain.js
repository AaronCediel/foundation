/****************************************************************
*	Foundation Framework v.3.0
*	
*	Control
****************************************************************/

// Start recording time to measure execution time duration
var date = new Date();
var timeStart = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
console.log(">>> Foundation Framework Execution Time Initiation: "+timeStart);



// $(document).ready jQuery equivalent in pure JS:
// Source: https://stackoverflow.com/questions/9899372/pure-javascript-equivalent-of-jquerys-ready-how-to-call-a-function-when-t
// Short-Link: https://stackoverflow.com/a/9899701
function docReady(fn) {
	// see if DOM is already available
	if (document.readyState === "complete" || document.readyState === "interactive") {
	// call on next available tick
		setTimeout(fn, 1);
	} else {
		document.addEventListener("DOMContentLoaded", fn);
	}
}



// https://vnese.wordpress.com/2010/04/08/include-one-javascript-file-from-another-without-the-magic-of-jquery/
// or: https://stackoverflow.com/questions/16839698/jquery-getscript-alternative-in-native-javascript/28002292#28002292
function getScript(url, jsId, callback){
	var script	= document.createElement('script');
	script.id	= jsId;
	script.type	= 'text/javascript';
	script.src	= url;
	// most browsers
	script.onload = callback;
	// IE 6 & 7
	script.onreadystatechange = function() {
		if (this.readyState == 'complete') {
			callback();
		}
	}
	var element = document.getElementById(jsId);
	if (element === null) {
		document.getElementsByTagName('head')[0].appendChild(script);
	}
}

// https://stackoverflow.com/questions/574944/how-to-load-up-css-files-using-javascript
function getCss(url, cssId, callback){
	var link	= document.createElement('link');
	link.id		= cssId;
	link.rel	= 'stylesheet';
	link.type	= 'text/css';
	link.href	= url;
	link.media	= 'all';
	// most browsers
	link.onload = callback;
	// IE 6 & 7
	link.onreadystatechange = function() {
		if (this.readyState == 'complete') {
			callback();
		}
	}
	var element = document.getElementById(cssId);
	if (element === null) {
		document.getElementsByTagName('head')[0].appendChild(link);
	}
}



function appendFoundationToHead() {
	
}



function foundationNavigationInteractivity() {
	var clickOnSelectedPage = function() {
		var pageSelected = this.innerText;
		console.log("Clicked Page Name: " + pageSelected);
		// create array of titled tabs
		var titleTabs = document.getElementsByClassName("sf-element-page-tab");
		// loop through all titled tabs searching for the title attribute within
		// and looking for the clciked element's name
		for (var i = 0, len = titleTabs.length; i < len; i++) {
			console.log("Tab Name: " + titleTab);
			var titleTab = titleTabs[i];
			var titleTab = titleTab.getAttribute("title");
			if (titleTab == pageSelected) {
				console.log("Match Found: '"+pageSelected+"' (pageSelected) = '"+titleTab+"' (titleTab)")
				
				// Update fdnCurrentPage Document Property with selected Page Name
				setDocPropViaInput("#fdnCurrentPage input", pageSelected);

				// Remove Click Event Listeners before changing the page for reloading on next page
				//removeClickListenersUponPageChange();
				
				// Remove JS & CSS Foundation Libraries to force reloading after changing the page
				var fdnJS = document.querySelector("#FoundationJS");
				if(typeof(fdnJS) != 'undefined' && fdnJS != null) {
					document.querySelector('#FoundationJS').remove();
				}
				var fdnCSS = document.querySelector("#FoundationCSS");
				if(typeof(fdnCSS) != 'undefined' && fdnCSS != null) {
					document.querySelector('#FoundationCSS').remove();
				}
				
				// Simulate click on the tab to trigger opening the selected Page
				titleTabs[i].click();
				
				// Reload the JS & CSS Foundation Libraries after the page had changed
				var pageChangeDate = new Date();
				var pageChangeTimeStamp = pageChangeDate.valueOf();
				getScript("https://aaroncediel.github.io/foundation/foundation.js?"+pageChangeTimeStamp, "FoundationJS", function(){
					console.log('Foundation Framework - JS initialized');
				});
				getCss("https://aaroncediel.github.io/foundation/foundation.css?"+pageChangeTimeStamp, "FoundationCSS", function(){
					console.log('Foundation Framework - CSS initialized');
				});
			}
		}
	}
	
	// Click Listener Logic Source: https://stackoverflow.com/a/19655662
	// fetch list of spotfire native tab pages
	var htmlPageList = document.getElementsByClassName("fdnNavPageLink");
	// loop through html dom elements of each page
	for(var i = 0; i < htmlPageList.length; i++) {
		htmlPageList[i].addEventListener('click', clickOnSelectedPage, false);
	}
	
	
	var clickAction = function() {
		var titleTab = this.getAttribute("title");
		console.log("Clicked Page Name (via Spotfire native tabbed navigation): " + titleTab);

		// Update fdnCurrentPage Document Property with selected Page Name
		setDocPropViaInput("#fdnCurrentPage input", titleTab);
		
		// Remove Click Event Listeners before changing the page for reloading on next page
		//removeClickListenersUponPageChange();

		// Remove JS & CSS Foundation Libraries to force reloading after changing the page
		var fdnJS = document.querySelector("#FoundationJS");
		if(typeof(fdnJS) != 'undefined' && fdnJS != null) {
			document.querySelector('#FoundationJS').remove();
		}
		var fdnCSS = document.querySelector("#FoundationCSS");
		if(typeof(fdnCSS) != 'undefined' && fdnCSS != null) {
			document.querySelector('#FoundationCSS').remove();
		}

		// Simulate click on the tab to trigger opening the selected Page
		//this.click();

		// Reload the JS & CSS Foundation Libraries after the page had changed
		var pageChangeDate = new Date();
		var pageChangeTimeStamp = pageChangeDate.valueOf();
		getScript("https://aaroncediel.github.io/foundation/foundation.js?"+pageChangeTimeStamp, "FoundationJS", function(){
			console.log('Foundation Framework - JS initialized');
		});
		getCss("https://aaroncediel.github.io/foundation/foundation.css?"+pageChangeTimeStamp, "FoundationCSS", function(){
			console.log('Foundation Framework - CSS initialized');
		});
	}
	
	// Click Listener Logic Source: https://stackoverflow.com/a/19655662
	// fetch list of spotfire native tab pages
	var titleTabs = document.getElementsByClassName("sf-element-page-tab");
	// loop through html dom elements of each page
	for(var i = 0; i < titleTabs.length; i++) {
		titleTabs[i].addEventListener('click', clickAction, false);
	}
	
	function removeClickListenersUponPageChange() {
		// Foundation Navigation
		var fdnHtmlPageList = document.getElementsByClassName("fdnNavPageLink");
		// loop through html dom elements of each page
		for(var i = 0; i < fdnHtmlPageList.length; i++) {
			fdnHtmlPageList[i].removeEventListener('click', clickOnSelectedPage);
		}
		// Spotfire Native Tabbed Navigation
		var sfTitleTabs = document.getElementsByClassName("sf-element-page-tab");
		for(var i = 0; i < sfTitleTabs.length; i++) {
			sfTitleTabs[i].removeEventListener('click', clickAction);
		}
	}
}



// Run Foundation
docReady(function() {
	appendFoundationToHead();
	foundationNavigationInteractivity();
});



// Mark recorded time to indicate final execution time duration
var timeEnd = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
console.log("<<< Foundation Framework Execution Time | Completion: "+timeEnd+" | Duration: "+((new Date()-date)/1000).toString()+" sec");


// -------------------------------------------------
// Notes:




