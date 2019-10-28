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


// Generate a UNIX timestamp of "now"
// Source: https://flaviocopes.com/how-to-get-timestamp-javascript/
function getTimestamp() {
	return new Date().getTime();
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


// Dynamic sorting for nested JSON object by key
// Source: https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
function compareValues(key, order='asc') {
	return function(a, b) {
		if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
			// property doesn't exist on either object
			return 0;
		}

		const varA = (typeof a[key] === 'string') ?
			a[key].toUpperCase() : a[key];
		const varB = (typeof b[key] === 'string') ?
			b[key].toUpperCase() : b[key];

		let comparison = 0;
		if (varA > varB) {
			comparison = 1;
		} else if (varA < varB) {
			comparison = -1;
		}
		return (
			(order == 'desc') ? (comparison * -1) : comparison
		);
	};
}


// Group By logic for JavaScript/JSON Objects
// Source: https://gist.github.com/JamieMason/0566f8412af9fe6a1d470aa1e089a752
const groupBy = key => array =>
array.reduce((objectsByKeyValue, obj) => {
	const value = obj[key];
	objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
	return objectsByKeyValue;
}, {});


// Push to array if Element does not exist:
// Source 1: https://code-examples.net/en/q/1e56fd
// Source 2: https://stackoverflow.com/a/1988361

// check if an element exists in array using a comparer function
// comparer : function(currentElement)
Array.prototype.inArray = function(comparer) {
	for(var i=0; i < this.length; i++) {
		if(comparer(this[i])) return true;
	}
	return false;
};
// adds an element to the array if it does not already exist using a comparer
// function
Array.prototype.pushIfNotExist = function(element, comparer) {
	if (!this.inArray(comparer)) {
		this.push(element);
	}
};


// Toggle DOM Class
function toggleElementClass(querySelector, className) {
	var element = document.querySelector(querySelector);
	element.classList.toggle(className);
}


function setDocPropViaInput(querySelector, value) {
	// Spotfire X update Doc. Prop. through JS input focus blur method not working:
	// Issue: https://community.tibco.com/questions/assigning-values-document-properties-javascript-not-working-spotfire-10
	// The solution to the problem is to simulate a Enter keystroke to confirm entering the value into the input box
	// Solution: https://stackoverflow.com/questions/29268613/simulate-enter-keypress-in-javascript-to-trigger-a-form-submit?rq=1
	
	const inputConfirmationEvent = new KeyboardEvent("keypress", {
		keyCode: 13,
		bubbles: true,
		cancelable: false
	});
	
	var fdnDocPropInput = document.querySelector(querySelector);
	fdnDocPropInput.value = value;
	fdnDocPropInput.blur();
	fdnDocPropInput.focus();
	
	document.querySelector(querySelector).dispatchEvent(inputConfirmationEvent);
	fdnDocPropInput.blur();
}


function determineActivePage() {
	var activePage = document.querySelector(".sfpc-active").getAttribute("title");
	return activePage;
}


function validatePage() {
	const inputConfirmationEvent = new KeyboardEvent("keypress", {
		keyCode: 13,
		bubbles: true,
		cancelable: false
	});
	
	var activePage = document.querySelector(".sfpc-active").getAttribute("title");
	var selectedPage = document.querySelector("#fdnCurrentPage input").value;
	
	if (activePage === selectedPage) {
		console.log("SUCCESS: 'selectedPage' and 'activePage' match: '"+activePage+"'");
	} else {
		console.log("ERROR: 'selectedPage' ('"+selectedPage+"') and 'activePage' ('"+activePage+"') mismatch!");
		setDocPropViaInput("#fdnCurrentPage input", activePage);
		console.log("CORRECTION: 'activePage' now set to '"+document.querySelector("#fdnCurrentPage input").value+"'");
	}
}


// Foundation Toolbar Item State Detection
function detectToolbarItemStates() {
	//setTimeout(function(){
	// Current Filters:
	// Open Bookmark Panel:
	if (document.querySelector(".sf-element-bookmark-list")) {
		toggleElementClass("#toolbarItemBookmarkPanel", "toolbarItemActive");
	}
	// Open Filters Panel:
	if (document.querySelector(".sfc-filter-panel")) {
		toggleElementClass("#toolbarItemFilterPanel", "toolbarItemActive");
	}
	//}, 333);
}


function prepareConfiguration() {
	var foundationConfigRAW = document.querySelector("#foundationConfig").textContent;
	var foundationConfig = JSON.parse(foundationConfigRAW)[0].fdnConfig;
	return foundationConfig;
}
function prepareNavigation() {
	var foundationNavigationRAW = document.querySelector("#foundationNavigation").textContent;
	var foundationNavigation = JSON.parse(foundationNavigationRAW);
	return foundationNavigation;
}

function constructFoundation() {
	
	var activePage = determineActivePage();
	console.log("Current Active Page Name: '"+activePage+"'");
	
	// Foundation Configuration:
	var foundationConfig = prepareConfiguration();
	//console.log(foundationConfig);
	
	var reportType = foundationConfig.REPORT_TYPE
		, navigationHideIcons = foundationConfig.NAVIGATION_HIDE_ICONS
		, businessRefernceEmail = foundationConfig.BUSINESS_REFERNCE_EMAIL
		, reportReferenceEmail = foundationConfig.REPORT_REFERENCE_EMAIL
		, navigationMainPage = foundationConfig.NAVIGATION_MAIN_PAGE
		, reportDescription = foundationConfig.REPORT_DESCRIPTION
		, reportDefaultResetDescription = foundationConfig.REPORT_DEFAULT_RESET_DESCRIPTION
		, reportColor = foundationConfig.REPORT_COLOR
		, businessOwnerEmail = foundationConfig.BUSINESS_OWNER_EMAIL
		, reportPerimeter = foundationConfig.REPORT_PERIMETER
		, linkConfluenceDocumentation = foundationConfig.LINK_CONFLUENCE_DOCUMENTATION
		, reportName = foundationConfig.REPORT_NAME
		, navigationDefaultFolderIcon = foundationConfig.NAVIGATION_DEFAULT_FOLDER_ICON
		, navigationDefaultPageIcon = foundationConfig.NAVIGATION_DEFAULT_PAGE_ICON
		, reportRefreshTime = foundationConfig.REPORT_REFRESH_TIME
		, reportVersion = foundationConfig.REPORT_VERSION
		, departmentName = foundationConfig.DEPARTMENT_NAME
		, linkOpenJiraTicket = foundationConfig.LINK_OPEN_JIRA_TICKET;
	
	// Report Type:
	var urlReportTypeDraft = "https://res.cloudinary.com/lastminute-contenthub/image/upload/v1559857155/DAM/BI%20Reporting/Report%20Type/draft.png";
	var urlReportTypeUnofficial = "https://res.cloudinary.com/lastminute-contenthub/image/upload/v1559857153/DAM/BI%20Reporting/Report%20Type/unofficial.png";
	var urlReportTypeOfficial = "https://res.cloudinary.com/lastminute-contenthub/image/upload/v1559857155/DAM/BI%20Reporting/Report%20Type/official.png";
	var urlReportTypeGolden = "https://res.cloudinary.com/lastminute-contenthub/image/upload/v1559857154/DAM/BI%20Reporting/Report%20Type/golden.png";

	if (reportType.match(/unofficial/i)) {
		var reportTypeImageURL = urlReportTypeUnofficial;
	} else if (reportType.match(/official/i)) {
		var reportTypeImageURL = urlReportTypeOfficial;
	} else if (reportType.match(/golden/i)) {
		var reportTypeImageURL = urlReportTypeGolden;
	} else {
		var reportTypeImageURL = urlReportTypeDraft;
	}
	
	
	// Foundation Navigation
	var foundationNavigation = prepareNavigation();
	//console.log(foundationNavigation);
	// foundationNavigation.NAVIGATION_PAGE_NAME
	
	var foundationActivePageToolbarConfig = [];
	var foundationNavigationMenuPageListUnsorted = [];
	Object.keys(foundationNavigation).forEach(fdnNavPage => {
		//console.log(foundationNavigation[fdnNavPage]);
		if (foundationNavigation[fdnNavPage].fdnNavigation.NAVIGATION_PAGE_NAME === activePage) {
			foundationActivePageToolbarConfig = [{
				"TOOLBAR_FILTERS": foundationNavigation[fdnNavPage].fdnNavigation.TOOLBAR_FILTERS
				, "TOOLBAR_BOOKMARKS": foundationNavigation[fdnNavPage].fdnNavigation.TOOLBAR_BOOKMARKS
				, "TOOLBAR_RELOAD": foundationNavigation[fdnNavPage].fdnNavigation.TOOLBAR_RELOAD
				, "TOOLBAR_RESET": foundationNavigation[fdnNavPage].fdnNavigation.TOOLBAR_RESET
				, "TOOLBAR_COMMANDS": foundationNavigation[fdnNavPage].fdnNavigation.TOOLBAR_COMMANDS
				, "TOOLBAR_CURRENT_FILTERS": foundationNavigation[fdnNavPage].fdnNavigation.TOOLBAR_CURRENT_FILTERS
				, "TOOLBAR_CURRENT_FILTERS_AUTO_PROCESSING": foundationNavigation[fdnNavPage].fdnNavigation.TOOLBAR_CURRENT_FILTERS_AUTO_PROCESSING
				, "TOOLBAR_OPEN_TICKET": foundationNavigation[fdnNavPage].fdnNavigation.TOOLBAR_OPEN_TICKET
				, "TOOLBAR_DATA_INTEGRITY": foundationNavigation[fdnNavPage].fdnNavigation.TOOLBAR_DATA_INTEGRITY
				, "TOOLBAR_INFO": foundationNavigation[fdnNavPage].fdnNavigation.TOOLBAR_INFO
			}];
		}
		
		foundationNavigationMenuPageListUnsorted.push({
			"NAVIGATION_PAGE_ORDER": foundationNavigation[fdnNavPage].fdnNavigation.NAVIGATION_PAGE_ORDER
			, "NAVIGATION_FOLDER_NAME": foundationNavigation[fdnNavPage].fdnNavigation.NAVIGATION_FOLDER_NAME
			, "NAVIGATION_FOLDER_ICON": foundationNavigation[fdnNavPage].fdnNavigation.NAVIGATION_FOLDER_ICON
			, "NAVIGATION_PAGE_NAME": foundationNavigation[fdnNavPage].fdnNavigation.NAVIGATION_PAGE_NAME
			, "NAVIGATION_PAGE_ICON": foundationNavigation[fdnNavPage].fdnNavigation.NAVIGATION_PAGE_ICON
		});
	});
	console.log("> foundationActivePageToolbarConfig:");
	console.log(JSON.stringify(foundationActivePageToolbarConfig));
	
	var foundationNavigationMenuPageList = foundationNavigationMenuPageListUnsorted.sort(compareValues('NAVIGATION_PAGE_ORDER', 'asc'));
	console.log("> foundationNavigationMenuPageList:");
	console.log(JSON.stringify(foundationNavigationMenuPageList));
	
	
	
	// Initialize main foundation HTML string-container:
	var foundation = '';
	
	// Prepare Toolbar Option Items according to Page Toolbar configuration
	// Confluence Documentation Info Link:
	var toolbarOptionsItemConfluenceDocumentation = '';
	if (foundationActivePageToolbarConfig[0].TOOLBAR_INFO) {
		toolbarOptionsItemConfluenceDocumentation = '\n\
		<!-- Confluence Documentation Info Link -->\n\
		<div id="toolbarItemConfluenceDocumentation" class="toolbarButtonIcon">\n\
			<a id="confluenceLink" href="'+linkConfluenceDocumentation+'" target="_blank">\n\
				<i class="material-icons faa-pulse animated-hover">info</i>\n\
			</a>\n\
		</div>\n';
	}
	// Data Integrity Info:
	var toolbarOptionsItemDataIntegrity = '';
	if (foundationActivePageToolbarConfig[0].TOOLBAR_DATA_INTEGRITY) {
		toolbarOptionsItemDataIntegrity = '\n\
		<!-- Data Integrity Info -->\n\
		<label id="toolbarItemDataIntegrity" for="openDataIntegrity">\n\
			<i class="material-icons">help_outline</i>\n\
		</label>\n';
	}
	// JIRA Ticket Template Link:
	var toolbarOptionsItemJiraTicket = '';
	if (foundationActivePageToolbarConfig[0].TOOLBAR_OPEN_TICKET) {
		toolbarOptionsItemJiraTicket = '\n\
		<!-- JIRA Ticket Template Link -->\n\
		<div id="toolbarItemJiraTicket" class="toolbarButtonIcon">\n\
			<a id="jiraLink" href="'+linkOpenJiraTicket+'" target="_blank">\n\
				<i class="material-icons faa-tada animated-hover">bug_report</i>\n\
			</a>\n\
		</div>\n';
	}
	// Current Filters:
	var toolbarOptionsItemCurrentFilters = '';
	if (foundationActivePageToolbarConfig[0].TOOLBAR_CURRENT_FILTERS) {
		toolbarOptionsItemCurrentFilters = '\n\
		<!-- Current Filters: -->\n\
		<label id="toolbarItemCurrentFilters" class="toolbarButtonText" for="openCurrentFilters">\n\
			<span>Current Filters</span>\n\
		</label>\n';
	}
	// Commands:
	var toolbarOptionsItemCustomCommands = '';
	if (foundationActivePageToolbarConfig[0].TOOLBAR_COMMANDS) {
		toolbarOptionsItemCustomCommands = '\n\
		<!-- Commands: -->\n\
		<label id="toolbarItemCustomCommands" class="toolbarButtonText" for="openCommands">\n\
			<span>Commands</span>\n\
		</label>\n';
	}
	// Reset Default:
	var toolbarOptionsItemResetDefault = '';
	if (foundationActivePageToolbarConfig[0].TOOLBAR_RESET) {
		toolbarOptionsItemResetDefault = '\n\
		<!-- Reset Default: -->\n\
		<div id="toolbarItemResetDefault" class="toolbarButtonText">\n\
			<span>Reset</span>\n\
		</div>\n';
	}
	// Reload Data:
	var toolbarOptionsItemReloadData = '';
	if (foundationActivePageToolbarConfig[0].TOOLBAR_RELOAD) {
		toolbarOptionsItemReloadData = '\n\
		<!-- Reload Data: -->\n\
		<div id="toolbarItemReloadData" class="toolbarButtonText">\n\
			<span>Reload</span>\n\
		</div>\n';
	}
	// Toggle Bookmark Panel:
	var toolbarOptionsItemBookmarkPanel = '';
	if (foundationActivePageToolbarConfig[0].TOOLBAR_BOOKMARKS) {
		toolbarOptionsItemBookmarkPanel = '\n\
		<!-- Toggle Bookmark Panel: -->\n\
		<div id="toolbarItemBookmarkPanel" class="toolbarButtonText">\n\
			<span>Bookmarks</span>\n\
		</div>\n';
	}
	// Toggle Filter Panel:
	var toolbarOptionsItemFilterPanel = '';
	if (foundationActivePageToolbarConfig[0].TOOLBAR_FILTERS) {
		toolbarOptionsItemFilterPanel = '\n\
		<!-- Toggle Filter Panel: -->\n\
		<div id="toolbarItemFilterPanel" class="toolbarButtonText">\n\
			<span>Filters</span>\n\
		</div>\n';
	}
	
	// Initialize Foundatiuon toolbar HTML string-container:
	var toolbar = '\
<!-- --------------------------------------------------------------\n\
|	Toolbar\n\
---------------------------------------------------------------- -->\n\
<!--<div id="menuOpenFixed" class="infoLabel"><i class="material-icons">menu</i></div>-->\n\
<div id="foundationToolbar">\n\
	<div id="toolbarInfo">\n\
		<div id="infoCompanyLogo"></div>\n\
		<div id="infoReportType" style="background-image: url(\''+reportTypeImageURL+'\');"></div>\n\
		<div id="infoReportTitle" class="toolbarInfoLabel">'+reportName+'</div>\n\
		<div id="infoReportPage" class="toolbarInfoLabel">'+activePage+'</div>\n\
	</div>\n\
	\n\
	<div id="toolbarOptions">'
		+toolbarOptionsItemConfluenceDocumentation
		+toolbarOptionsItemDataIntegrity
		+toolbarOptionsItemJiraTicket
		+toolbarOptionsItemCurrentFilters
		+toolbarOptionsItemCustomCommands
		+toolbarOptionsItemResetDefault
		+toolbarOptionsItemReloadData
		+toolbarOptionsItemBookmarkPanel
		+toolbarOptionsItemFilterPanel+'\
	</div>\n\
</div>\
';
	
	
	//var navigationPageListByFolder = groupBy('NAVIGATION_FOLDER_NAME');
	//console.log(navigationPageListByFolder(foundationNavigationMenuPageList));
	
	var navigationMenuFolderOpened = [];
	var navigationMenuDistinctFolderList = foundationNavigationMenuPageList.map(item => item.NAVIGATION_FOLDER_NAME).filter((value, index, self) => self.indexOf(value) === index);
	var navigationMenuDistinctFolders = navigationMenuDistinctFolderList.filter(function (element) { element el != null; });
	console.log("navigationMenuDistinctFolders:");
	console.log(navigationMenuDistinctFolders);
	var navigationMenuItemsProcessed = [];
	var navigationMenuItems = [];
	Object.keys(foundationNavigationMenuPageList).forEach(fdnNavPage => {
		var pageOrder = foundationNavigationMenuPageList[fdnNavPage].NAVIGATION_PAGE_ORDER;
		var folderName = foundationNavigationMenuPageList[fdnNavPage].NAVIGATION_FOLDER_NAME;
		var folderIcon = foundationNavigationMenuPageList[fdnNavPage].NAVIGATION_FOLDER_ICON;
		var pageName = foundationNavigationMenuPageList[fdnNavPage].NAVIGATION_PAGE_NAME;
		var pageIcon = foundationNavigationMenuPageList[fdnNavPage].NAVIGATION_PAGE_ICON;
		
		var navigationMenuFolderTemplate = '\
		<div class="navigationMenuItem">\n\
			<input type="checkbox" id="check1">\n\
			<label class="navigationMenuItem-folder" for="check1">Folder 1</label>\n\
			<div class="navigationMenuItem-nested">\n\
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum, reiciendis!\n\
			</div>\n\
			<!--<div class="navigationMenuItem-details">\n\
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum, reiciendis!\n\
			</div>-->\n\
		</div>\n';
		
		var navigationMenuPageTemplate = '\
		<div class="navigationMenuItem">\n\
			<div class="navigationMenuItem-featured">\n\
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum, reiciendis!\n\
			</div>\n\
		</div>\n';
		
		if ((navigationMenuFolderOpened.indexOf(folderName) === -1) && (folderName !== "")) {
			if (folderName === "") {
				console.log("Featured Page: '"+pageName+"'");
			}
			navigationMenuFolderOpened.push(folderName);
		} else {
			console.log("Folder name '"+folderName+"' already opened");
		}
	});
	
	
	// Initialize Foundation navigation HTML string-container:
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
	
	// Initialize Foundation currentFilters HTML string-container:
	var currentFilters = '\
<!-- --------------------------------------------------------------\n\
|	Current Filters\n\
---------------------------------------------------------------- -->\n\
<input type="checkbox" id="openCurrentFilters">\n\
<!--<label id="buttonOpenCurrentFilters" for="openCurrentFilters">Open Current Filters</label>-->\n\
<div id="currentFilters" class="modalContainer">\n\
	<h4 id="currentFiltersHandle" class="modalDragHandle"><i id="modalDragIcon" class="material-icons faa-burst animated-hover">open_with</i>Current Filters<i id="modalRefreshButton" class="material-icons faa-spin animated-hover">refresh</i><i id="modalCloseButton" class="material-icons faa-burst animated-hover">close</i></h4>\n\
	<div class="scrollArea">\n\
		<div id="currentFiltersHTML"></div>\n\
	</div>\n\
</div>\
';
	
	// Insert Placeholder for Functional Input Boxes
	document.querySelector("#fdnFunction input").setAttribute("placeholder", "fdnFunction");
	document.querySelector("#fdnCurrentPage input").setAttribute("placeholder", "fdnCurrentPage");
	
	// Compile foundation
	foundation += toolbar + navigation + currentFilters;
	
	var dataIntegrityToggle = document.createElement('input');
	dataIntegrityToggle.setAttribute("type", "checkbox");
	dataIntegrityToggle.setAttribute("id", "openDataIntegrity");
	var dataIntegrityParent = document.querySelector("#dataIntegrity").parentNode;
	var dataIntegritySibling = document.querySelector("#dataIntegrity");
	dataIntegrityParent.insertBefore(dataIntegrityToggle, dataIntegritySibling);
	//document.querySelector("#dataIntegrityAreaBG").innerHTML = '<input type="checkbox" id="openDataIntegrity">';
	
	var commandsToggle = document.createElement('input');
	commandsToggle.setAttribute("type", "checkbox");
	commandsToggle.setAttribute("id", "openCommands");
	var commandsParent = document.querySelector("#customOptions").parentNode;
	var commandsSibling = document.querySelector("#customOptions");
	commandsParent.insertBefore(commandsToggle, commandsSibling);
	//document.querySelector("#customOptionsAreaBG").innerHTML = '<input type="checkbox" id="openCommands">';
	
	//document.getElementById("foundation").innerHTML = foundation;
	document.querySelector("#foundation").innerHTML = foundation;
	
	// Foundation Toolbar Functionality
	// Default Reset:
	document.querySelector("#toolbarItemResetDefault").onclick = function() {
		setDocPropViaInput("#fdnFunction input", "fdnDefaultReset|"+getTimestamp());
		detectToolbarItemStates();
	}
	// Reload:
	document.querySelector("#toolbarItemReloadData").onclick = function() {
		setDocPropViaInput("#fdnFunction input", "fdnReloadDataConnections|"+getTimestamp());
		detectToolbarItemStates();
	}
	// Open Bookmark Panel:
	document.querySelector("#toolbarItemBookmarkPanel").onclick = function() {
		setDocPropViaInput("#fdnFunction input", "fdnToggleBookmarkPane|"+getTimestamp());
		detectToolbarItemStates();
	}
	// Open Filters Panel:
	document.querySelector("#toolbarItemFilterPanel").onclick = function() {
		setDocPropViaInput("#fdnFunction input", "fdnToggleFilterPane|"+getTimestamp());
		detectToolbarItemStates();
	}
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
	convertToDraggable(document.querySelector("#customOptions"));
	convertToDraggable(document.querySelector("#dataIntegrity"));
	detectToolbarItemStates();
});





// Mark recorded time to indicate final execution time duration
var timeEnd = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
console.log("<<< Foundation Framework Execution Time | Completion: "+timeEnd+" | Duration: "+((new Date()-date)/1000).toString()+" sec");


// -------------------------------------------------
// Notes:




