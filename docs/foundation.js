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
		<div id="infoCompanyLogo"></div>\n\
		<div id="infoReportType"></div>\n\
		<div id="infoReportTitle" class="toolbarInfoLabel">Foundation</div>\n\
		<div id="infoReportPage" class="toolbarInfoLabel">Cover</div>\n\
	</div>\n\
	\n\
	<div id="toolbarOptions">\n\
		<!-- Confluence Documentation Link -->\n\
		<div id="toolbarItemConfluenceDocumentation" class="toolbarButtonIcon">\n\
			<a id="confluenceLink" href="#" target="_blank">\n\
				<i class="material-icons faa-pulse animated-hover">info</i>\n\
			</a>\n\
		</div>\n\
		\n\
		<!-- Data Integrity Info -->\n\
		<label id="toolbarItemDataIntegrity" for="openDataIntegrity">\n\
			<i class="material-icons">help_outline</i>\n\
		</label>\n\
		<!--<div id="toolbarItemDataIntegrity">\n\
			<i class="material-icons">help_outline</i>\n\
		</div>-->\n\
		\n\
		<!-- JIRA Ticket Template Link -->\n\
		<div id="toolbarItemJiraTicket" class="toolbarButtonIcon">\n\
			<a id="jiraLink" href="#" target="_blank">\n\
				<i class="material-icons faa-tada animated-hover">bug_report</i>\n\
			</a>\n\
		</div>\n\
		\n\
		<!-- Current Filters: -->\n\
		<label id="toolbarItemCurrentFilters" class="toolbarButtonText" for="openCurrentFilters">\n\
			<span>Current Filters</span>\n\
		</label>\n\
		<!--<div id="toolbarItemCurrentFilters" class="toolbarButtonText">\n\
			<span>Current Filters</span>\n\
		</div>-->\n\
		\n\
		<!-- Commands: -->\n\
		<label id="toolbarItemCustomCommands" class="toolbarButtonText" for="openCommands">\n\
			<span>Commands</span>\n\
		</label>\n\
		<!--<div id="toolbarItemCustomCommands" class="toolbarButtonText">\n\
			<span>Commands</span>\n\
		</div>-->\n\
		\n\
		<!-- Reset Default: -->\n\
		<div id="toolbarItemResetDefault" class="toolbarButtonText">\n\
			<span>Reset</span>\n\
		</div>\n\
		\n\
		<!-- Reload Data: -->\n\
		<div id="toolbarItemReloadData" class="toolbarButtonText">\n\
			<span>Reload</span>\n\
		</div>\n\
		\n\
		<!-- Toggle Bookmark Panel: -->\n\
		<div id="toolbarItemBookmarkPanel" class="toolbarButtonText">\n\
			<span>Bookmarks</span>\n\
		</div>\n\
		\n\
		<!-- Toggle Filter Panel: -->\n\
		<div id="toolbarItemFilterPanel" class="toolbarButtonText">\n\
			<span>Filters</span>\n\
		</div>\n\
	</div>\n\
</div>\
';
	
	var navigation = '\
<!-- --------------------------------------------------------------\n\
|	Navigation\n\
---------------------------------------------------------------- -->\n\
<input type="checkbox" class="openNavigationMenu" id="openNavigationMenu">\n\
<label for="openNavigationMenu" class="navigationIconToggle">\n\
	<div class="spinner diagonal part-1"></div>\n\
	<div class="spinner horizontal"></div>\n\
	<div class="spinner diagonal part-2"></div>\n\
</label>\n\
<div id="navigationMenu">\n\
	<div class="navigationMenuInner">\n\
		<div class="navigationMenuItem">\n\
			<input type="checkbox" id="check1">\n\
			<label class="navigationMenuItem-folder" for="check1">Folder 1</label>\n\
			<div class="navigationMenuItem-nested">\n\
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum, reiciendis!\n\
			</div>\n\
			<div class="navigationMenuItem-details">\n\
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum, reiciendis!\n\
			</div>\n\
		</div>\n\
		<div class="navigationMenuItem">\n\
			<div class="navigationMenuItem-featured">\n\
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum, reiciendis!\n\
			</div>\n\
		</div>\n\
		<div class="navigationMenuItem">\n\
			<input type="checkbox" id="check2">\n\
			<label class="navigationMenuItem-folder" for="check2">Folder 2</label>\n\
			<div class="navigationMenuItem-nested">\n\
				Lorem ipsum dolor sit amet consectetur adipisicing elit. A, in!\n\
			</div>\n\
		</div>\n\
	</div>\n\
</div>\n\
';
	/*
	<div class="navigationMenuInner">\n\
		<div class="navigationMenuItem">\n\
			<input type="radio" id="radio1" name="radio">\n\
			<label class="navigationMenuItem-folder" for="radio1">Folder 1</label>\n\
			<div class="navigationMenuItem-nested">\n\
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos, facilis.\n\
			</div>\n\
		</div>\n\
		<div class="navigationMenuItem">\n\
			<div class="navigationMenuItem-featured">\n\
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum, reiciendis!\n\
			</div>\n\
		</div>\n\
		<div class="navigationMenuItem">\n\
			<input type="radio" id="radio2" name="radio">\n\
			<label class="navigationMenuItem-folder" for="radio2">Folder 2</label>\n\
			<div class="navigationMenuItem-nested">\n\
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil, aut.\n\
			</div>\n\
			<div class="navigationMenuItem-details">\n\
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum, reiciendis!\n\
			</div>\n\
		</div>\n\
		<div class="navigationMenuItem">\n\
			<input type="radio" id="radio3" name="radio">\n\
			<label for="radio3" class="navigationMenuItem-close">Close others &times;</label>\n\
		</div>\n\
	</div>\n\
	
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
';*/
	
	var currentFilters = '\
<!-- --------------------------------------------------------------\n\
|	Current Filters\n\
---------------------------------------------------------------- -->\n\
<input type="checkbox" id="openCurrentFilters">\n\
<input type="checkbox" id="openCommands">\n\
<input type="checkbox" id="openDataIntegrity">\n\
<!--<label id="buttonOpenCurrentFilters" for="openCurrentFilters">Open Current Filters</label>-->\n\
<div id="currentFilters" class="modalContainer">\n\
	<h4 id="currentFiltersHandle" class="modalDragHandle"><i id="modalDragIcon" class="material-icons faa-burst animated-hover">open_with</i>Current Filters<i id="modalRefreshButton" class="material-icons faa-spin animated-hover">refresh</i><i id="modalCloseButton" class="material-icons faa-burst animated-hover">close</i></h4>\n\
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


// Make the DIV element draggable:
// Source: https://www.w3schools.com/howto/howto_js_draggable.asp
// The draggable div must feature an nested div with ID as element-name + "Handle"; e.g. "draggableDiv" with "draggableDivHandel"
function convertToDraggable(elmnt) {
	var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
	if (document.getElementById(elmnt.id + "Handle")) {
		// if present, the Handle is where you move the DIV from:
		document.getElementById(elmnt.id + "Handle").onmousedown = dragMouseDown;
	} else {
		// otherwise, move the DIV from anywhere inside the DIV:
		elmnt.onmousedown = dragMouseDown;
	}

	function dragMouseDown(e) {
		e = e || window.event;
		e.preventDefault();
		// get the mouse cursor position at startup:
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onmouseup = closeDragElement;
		// call a function whenever the cursor moves:
		document.onmousemove = elementDrag;
	}

	function elementDrag(e) {
		e = e || window.event;
		e.preventDefault();
		// calculate the new cursor position:
		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;
		// set the element's new position:
		elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
		elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
	}

	function closeDragElement() {
		// stop moving when mouse button is released:
		document.onmouseup = null;
		document.onmousemove = null;
	}
}


// Run Foundation
docReady(function() {
	constructFoundation();
	convertToDraggable(document.querySelector("#currentFilters")); //document.getElementById("currentFilters")
});





// Mark recorded time to indicate final execution time duration
var timeEnd = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
console.log("<<< Foundation Framework Execution Time | Completion: "+timeEnd+" | Duration: "+((new Date()-date)/1000).toString()+" sec");


// -------------------------------------------------
// Notes:




