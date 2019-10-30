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
// [DEPRECATED] 2019-10-29: the const groupBy function caused a conflict when reloading the file upon page change.
// A possible solution would be to convert the "const" into "var".
/*const groupBy = key => array =>
array.reduce((objectsByKeyValue, obj) => {
	const value = obj[key];
	objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
	return objectsByKeyValue;
}, {});*/
// Use Example:
// >	var navigationPageListByFolder = groupBy('NAVIGATION_FOLDER_NAME');
// >	console.log(navigationPageListByFolder(foundationNavigationMenuPageList));


// Push to array if Element does not exist:
// Source 1: https://code-examples.net/en/q/1e56fd
// Source 2: https://stackoverflow.com/a/1988361
// --
// check if an element exists in array using a comparer function
// comparer : function(currentElement)
Array.prototype.inArray = function(comparer) {
	for(var i = 0; i < this.length; i++) {
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


// detect boolean value from string (e.g. "true" or "false")
// Source:
function parseBoolean(string) {
	var bool;
	bool = (function() {
		switch (false) {
			case string.toLowerCase() !== 'true':
				return true;
			case string.toLowerCase() !== 'false':
				return false;
		}
	})();
	if (typeof bool === "boolean") {
		return bool;
	}
	return void 0;
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
				"TOOLBAR_FILTERS": parseBoolean(foundationNavigation[fdnNavPage].fdnNavigation.TOOLBAR_FILTERS)
				, "TOOLBAR_BOOKMARKS": parseBoolean(foundationNavigation[fdnNavPage].fdnNavigation.TOOLBAR_BOOKMARKS)
				, "TOOLBAR_RELOAD": parseBoolean(foundationNavigation[fdnNavPage].fdnNavigation.TOOLBAR_RELOAD)
				, "TOOLBAR_RESET": parseBoolean(foundationNavigation[fdnNavPage].fdnNavigation.TOOLBAR_RESET)
				, "TOOLBAR_COMMANDS": parseBoolean(foundationNavigation[fdnNavPage].fdnNavigation.TOOLBAR_COMMANDS)
				, "TOOLBAR_CURRENT_FILTERS": parseBoolean(foundationNavigation[fdnNavPage].fdnNavigation.TOOLBAR_CURRENT_FILTERS)
				, "TOOLBAR_CURRENT_FILTERS_AUTO_PROCESSING": parseBoolean(foundationNavigation[fdnNavPage].fdnNavigation.TOOLBAR_CURRENT_FILTERS_AUTO_PROCESSING)
				, "TOOLBAR_OPEN_TICKET": parseBoolean(foundationNavigation[fdnNavPage].fdnNavigation.TOOLBAR_OPEN_TICKET)
				, "TOOLBAR_DATA_INTEGRITY": parseBoolean(foundationNavigation[fdnNavPage].fdnNavigation.TOOLBAR_DATA_INTEGRITY)
				, "TOOLBAR_INFO": parseBoolean(foundationNavigation[fdnNavPage].fdnNavigation.TOOLBAR_INFO)
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
	
	/*var navigationMenuDistinctFolderList = foundationNavigationMenuPageList.map(item => item.NAVIGATION_FOLDER_NAME).filter((value, index, self) => self.indexOf(value) === index);
	var navigationMenuDistinctFolders = navigationMenuDistinctFolderList.filter(function (element) { return element != ""; });
	console.log("navigationMenuDistinctFolders:");
	console.log(navigationMenuDistinctFolders);*/
	
	var navigationMenuItemCounter = 0;
	var navigationMenuHtml = '';
	Object.keys(foundationNavigationMenuPageList).forEach(fdnNavPage => {
		var pageOrder = foundationNavigationMenuPageList[fdnNavPage].NAVIGATION_PAGE_ORDER;
		var folderName = foundationNavigationMenuPageList[fdnNavPage].NAVIGATION_FOLDER_NAME;
		var folderIcon = foundationNavigationMenuPageList[fdnNavPage].NAVIGATION_FOLDER_ICON;
		var pageName = foundationNavigationMenuPageList[fdnNavPage].NAVIGATION_PAGE_NAME;
		var pageIcon = foundationNavigationMenuPageList[fdnNavPage].NAVIGATION_PAGE_ICON;
		
		var navigationMenuFeaturedPageHtml = '\
		<div class="navigationMenuItem">\n\
			<div class="fdnNavPageLink navigationMenuItem-featured">'+pageName+'</div>\n\
		</div>\n';
		
		var navigationMenuFolderFirstHtml = '\
		<div class="navigationMenuItem">\n\
			<input type="checkbox" id="check'+eval(navigationMenuItemCounter + 1)+'">\n\
			<label class="navigationMenuItem-folder" for="check'+eval(navigationMenuItemCounter + 1)+'">'+folderName+'</label>\n';
		
		var navigationMenuFolderMiddleHtml = '\
			<div class="fdnNavPageLink navigationMenuItem-nested">'+pageName+'</div>\n\
			<!--<div class="navigationMenuItem-details"></div>-->\n';
		
		var navigationMenuFolderLastHtml = '\
		</div>\n';
		
		if (navigationMenuItemCounter < foundationNavigationMenuPageList.length) {
			/*
			console.log("Current Navigation Menu Item [ "+navigationMenuItemCounter+" ] - Page Order: '"+pageOrder+"' - Folder Name: '"+folderName+"' - Page Name: '"+pageName+"'");
			console.log("Next Navigation Menu Item - Page Order: '"
				    +foundationNavigationMenuPageList[navigationMenuItemCounter+1].NAVIGATION_PAGE_ORDER+"' - Folder Name: '"
				    +foundationNavigationMenuPageList[navigationMenuItemCounter+1].NAVIGATION_FOLDER_NAME+"' - Page Name': "
				    +foundationNavigationMenuPageList[navigationMenuItemCounter+1].NAVIGATION_PAGE_NAME+"'");
			*/
			
			if ((folderName !== '') && (navigationMenuItemCounter + 1 === foundationNavigationMenuPageList.length)) {
				if (folderName === foundationNavigationMenuPageList[navigationMenuItemCounter - 1].NAVIGATION_FOLDER_NAME) {
					navigationMenuHtml += navigationMenuFolderMiddleHtml;
					navigationMenuHtml += navigationMenuFolderLastHtml;
				} else if (folderName !== foundationNavigationMenuPageList[navigationMenuItemCounter - 1].NAVIGATION_FOLDER_NAME) {
					navigationMenuHtml += navigationMenuFolderFirstHtml;
					navigationMenuHtml += navigationMenuFolderMiddleHtml;
					navigationMenuHtml += navigationMenuFolderLastHtml;
				}
			} else if ((folderName !== '') && (navigationMenuItemCounter > 0)) {
				if ((folderName === foundationNavigationMenuPageList[navigationMenuItemCounter - 1].NAVIGATION_FOLDER_NAME) && (folderName === foundationNavigationMenuPageList[navigationMenuItemCounter + 1].NAVIGATION_FOLDER_NAME)) {
					navigationMenuHtml += navigationMenuFolderMiddleHtml;
				} else if ((folderName === foundationNavigationMenuPageList[navigationMenuItemCounter - 1].NAVIGATION_FOLDER_NAME) && (folderName !== foundationNavigationMenuPageList[navigationMenuItemCounter + 1].NAVIGATION_FOLDER_NAME)) {
					navigationMenuHtml += navigationMenuFolderMiddleHtml;
					navigationMenuHtml += navigationMenuFolderLastHtml;
				} else if ((folderName !== foundationNavigationMenuPageList[navigationMenuItemCounter - 1].NAVIGATION_FOLDER_NAME) && (folderName === foundationNavigationMenuPageList[navigationMenuItemCounter + 1].NAVIGATION_FOLDER_NAME)) {
					navigationMenuHtml += navigationMenuFolderFirstHtml;
					navigationMenuHtml += navigationMenuFolderMiddleHtml;
				} else if ((folderName !== foundationNavigationMenuPageList[navigationMenuItemCounter - 1].NAVIGATION_FOLDER_NAME) && (folderName !== foundationNavigationMenuPageList[navigationMenuItemCounter + 1].NAVIGATION_FOLDER_NAME)) {
					navigationMenuHtml += navigationMenuFolderFirstHtml;
					navigationMenuHtml += navigationMenuFolderMiddleHtml;
					navigationMenuHtml += navigationMenuFolderLastHtml;
				}
			} else if (folderName === '') {
				navigationMenuHtml += navigationMenuFeaturedPageHtml;
			} else {
				navigationMenuHtml += navigationMenuFolderFirstHtml;
				navigationMenuHtml += navigationMenuFolderMiddleHtml;
			}
		}
		
		navigationMenuItemCounter += 1;
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
		'+navigationMenuHtml+'\
	</div>\n\
</div>\n\
';
	
	
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
				
				// Remove JS & CSS Foundation Libraries to force reloading after changing the page
				document.querySelector('#FoundationJS').remove();
				document.querySelector('#FoundationCSS').remove();
				
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
}


function foundationNavigationSpotfireNative() {
	var clickAction = function() {
		var titleTab = this.getAttribute("title");
		console.log("Clicked Page Name (via Spotfire native tabbed navigation): " + titleTab);

		// Update fdnCurrentPage Document Property with selected Page Name
		setDocPropViaInput("#fdnCurrentPage input", titleTab);

		// Remove JS & CSS Foundation Libraries to force reloading after changing the page
		document.querySelector('#FoundationJS').remove();
		document.querySelector('#FoundationCSS').remove();

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
	foundationNavigationInteractivity();
	foundationNavigationSpotfireNative();
});





// Mark recorded time to indicate final execution time duration
var timeEnd = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
console.log("<<< Foundation Framework Execution Time | Completion: "+timeEnd+" | Duration: "+((new Date()-date)/1000).toString()+" sec");


// -------------------------------------------------
// Notes:




