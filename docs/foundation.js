/****************************************************************
*	Foundation Framework v.3.0
*	
*	Development Version
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


// Detect Operating System
// https://gist.github.com/hkulekci/3433850
function detectOs() {
	// This script sets OSName variable as follows:
	// "Windows"    for all versions of Windows
	// "MacOS"      for all versions of Macintosh OS
	// "Linux"      for all versions of Linux
	// "UNIX"       for all other UNIX flavors 
	// "Unknown OS" indicates failure to detect the OS

	var OSName = "Unknown OS";
	if (navigator.appVersion.indexOf("Win")!=-1) OSName = "Windows";
	if (navigator.appVersion.indexOf("Mac")!=-1) OSName = "MacOS";
	if (navigator.appVersion.indexOf("X11")!=-1) OSName = "UNIX";
	if (navigator.appVersion.indexOf("Linux")!=-1) OSName = "Linux";

	return OSName;
}

/*
var opSys = detectOs();
var scrollbarWidth = 17;
if (opSys === 'Windows') scrollbarWidth = 17;
if (opSys === 'MacOS') scrollbarWidth = 8;
*/


// Append Pseudo class styles to <head> if they do not exist yet:
function appendStylesToHead(id, styles) {
	var elementExists = $("#"+id).length;
	if (elementExists === 0) {
		$('<style id="'+id+'" type="text/css">'+styles+'</style>').appendTo('head');
	}
}


function constructFoundation() {
	var foundation = '';
	
	var toolbar = '\
<!-- --------------------------------------------------------------\n\
|	Toolbar\n\
---------------------------------------------------------------- -->\n\
<!--<div id="menuOpenFixed" class="infoLabel"><i class="material-icons">menu</i></div>-->\n\
<div id="foundationToolbar">\n\
	<div id="toolbarInfo">\n\
		<div id="menuOpen" class="infoLabel animated-icon menu-arrow-l"><div class="ani"></div></div>\n\
		<div id="infoCompanyLogo"></div>\n\
		<div id="infoReportType"></div>\n\
		<div id="infoReportTitle" class="infoLabel">Foundation</div>\n\
		<div id="infoReportSectionPage" class="infoLabel">Cover</div>\n\
	</div>\n\
	\n\
	<div id="toolbarOptions">\n\
		<!-- Toggle Filter Panel: -->\n\
		<div id="actnCtrl_filterShowHide" class="optional button medium"><span>Filters</span></div>\n\
		\n\
		<!-- Toggle Bookmark Panel: -->\n\
		<div id="actnCtrl_bookmarkShowHide" class="optional button medium"><span>Bookmarks</span></div>\n\
		\n\
		<!-- Reload Data: -->\n\
		<div id="actnCtrl_reloadData" class="optional button medium"><span>Reload</span></div>\n\
		\n\
		<!-- Reset Filters: -->\n\
		<div id="actnCtrl_resetFiltersMarkings" class="button medium"><span>Reset</span></div>\n\
		\n\
		<!-- Options: -->\n\
		<div id="actnCtrl_customOptions" class="optional button btnToggle medium"><span>Commands</span></div>\n\
		\n\
		<!-- Current Filters: -->\n\
		<div id="actnCtrl_currentFilters" class="optional button large"><span>Current Filters</span></div>\n\
		\n\
		<!-- JIRA Ticket Template -->\n\
		<div id="actnCtrl_jiraTicket" class="optional button small"><a id="jiraLink" href="#" target="_blank"><i class="material-icons faa-tada animated-hover">bug_report</i></a></div>\n\
		\n\
		<!-- Data Integrity Info -->\n\
		<div id="actnCtrl_dataIntegrity" class="optional button medium"><i class="material-icons">help_outline</i></div>\n\
		\n\
		<!-- Confluence Documentation -->\n\
		<div id="actnCtrl_confluenceDocumentation" class="optional button small"><a id="confluenceLink" href="#" target="_blank"><i class="material-icons faa-pulse animated-hover">info</i></a></div>\n\
	</div>\n\
</div>\
';
	
	var navigation = '\
<!-- --------------------------------------------------------------\n\
|	Navigation\n\
---------------------------------------------------------------- -->\n\
<input type="checkbox" class="openSidebarMenu" id="openSidebarMenu">\n\
<label for="openSidebarMenu" class="sidebarIconToggle">\n\
	<div class="spinner diagonal part-1"></div>\n\
	<div class="spinner horizontal"></div>\n\
	<div class="spinner diagonal part-2"></div>\n\
</label>\n\
<div id="sidebarMenu">\n\
	<ul class="sidebarMenuInner">\n\
		<li>abc <span>test 123</span></li>\n\
		<li>abc</li>\n\
		<li>abc</li>\n\
		<li>abc <span>test 123</span></li>\n\
		<li>abc</li>\n\
	</ul>\n\
</div>\
';
	var navigationOld = '\
<!-- --------------------------------------------------------------\n\
|	Navigation\n\
---------------------------------------------------------------- -->\n\
<div id="left" class="side-menu">\n\
	<div id="menuClose" class="menuLink"><i class="material-icons">close</i><span>Navigation</span></div>\n\
	<div id="pages_list_menu">\n\
		<div class="menuLink pageslist"><span class="hidden">/Cover/</span><i class="material-icons">home</i><a>Cover</a></div>\n\
		<div class="menuLink pageslist"><span class="hidden">/[star] Featured Page/</span><i class="material-icons">star</i><a>Featured Page</a></div>\n\
		\n\
		<h3 class="filterTab"><i class="material-icons">folder</i><span class="title">Foundation</span></h3><div class="tab-content page-tab">\n\
		<div class="menuLink pageslist"><span class="hidden">Ungrouped Page</span><i class="material-icons">arrow_right</i><a>Ungrouped Page</a></div>\n\
		<div class="menuLink pageslist"><span class="hidden">[vertical_align_bottom] Scrollable Page</span><i class="material-icons">vertical_align_bottom</i><a>Scrollable Page</a></div>\n\
		<div class="menuLink pageslist"><span class="hidden">Flight Page</span><i class="material-icons">flight</i><a>Flight Page</a></div>\n\
		<div class="menuLink pageslist"><span class="hidden">Hotel Page</span><i class="material-icons">hotel</i><a>Hotel Page</a></div>\n\
		</div>\n\
		\n\
		<h3 class="filterTab"><i class="material-icons">grade</i><span class="title">Page Group #1</span></h3><div class="tab-content page-tab">\n\
		<div class="menuLink pageslist"><span class="hidden">[grade] Page Group #1 > [looks_one] Grouped Page #1</span><i class="material-icons">looks_one</i><a>Grouped Page #1</a></div>\n\
		<div class="menuLink pageslist"><span class="hidden">Page Group #1 > [looks_two] Page #2</span><i class="material-icons">looks_two</i><a>Page #2</a></div>\n\
		</div>\n\
	</div>\n\
</div>\
';
	
	var currentFilters = '\
<!-- --------------------------------------------------------------\n\
|	Current Filters\n\
---------------------------------------------------------------- -->\n\
<div class="modalContainer" id="currentFilters">\n\
	<h4 class="modalDragHandle"><i id="modalDragIcon" class="material-icons faa-burst animated-hover">open_with</i>Current Filters<i id="modalRefreshButton" class="material-icons faa-spin animated-hover">refresh</i><i id="modalCloseButton" class="material-icons faa-burst animated-hover">close</i></h4>\n\
	<div class="scrollArea">\n\
		<div id="currentFiltersHTML"></div>\n\
	</div>\n\
</div>\
';
	// Compile foundation
	foundation += toolbar + navigation + currentFilters;
	
	//document.getElementById("foundation").innerHTML = foundation;
	document.querySelector("#foundation").innerHTML = foundation;
}


// Run Foundation
docReady(function() {
    constructFoundation();
});





// Mark recorded time to indicate final execution time duration
var timeEnd = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
console.log("<<< Foundation Framework Execution Time | Completion: "+timeEnd+" | Duration: "+((new Date()-date)/1000).toString()+" sec");


// -------------------------------------------------
// Notes:




