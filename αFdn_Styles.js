/****************************************************************
*	Foundation: Styles
*
*	! IMPORTANT: DO NOT EDIT - SUBJECT TO CHANGES WHEN UPDATING !
*	
*	Contains all styles and interactive functionalities of the
*	Foundation Framework.
****************************************************************/

/****************************************************************
*	Run onLoad
****************************************************************/

// start recording time to measure execution time duration
var date = new Date();
var timeStart = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
console.log(">>> αFdn_Styles Execution Time Initiation: "+timeStart);


/****************************************************************
*	Making Modal Boxes Draggable
*	Doc:		http://api.jqueryui.com/draggable/
*	Tutorial:	https://stackoverflow.com/questions/10691281/use-a-child-element-to-drag-a-parent-element
*	Deprecated:	https://www.w3schools.com/howto/howto_js_draggable.asp (JS only)
****************************************************************/

$(".modalContainer").draggable({handle: ".modalDragHandle"});

/****************************************************************
*	General Functionalities
****************************************************************/

// reset counter which allows the navigation html to be reloaded only once to 0
//$("#forceReloadNavigationCounter input").val(0).focus().blur();

$("#triggerCurrentPages input").val($.now()).focus().blur();
var currentPagesHTML = $("#currentPagesHTML").text();
$("#pages_list_menu").html(currentPagesHTML);

//identify which section of the navigation menu should be expanded for the currently selected page
var activeNavigationSection = false;
if ($("#activeNavigationSection input").val() !== 'false') {
	var activeNavigationSection = parseInt($("#activeNavigationSection input").val());
	console.log("activeNavigationSection: "+activeNavigationSection.toString());
}

//$("#infoConfluence").html($("#fdnConfluenceHTML").text());

/*$("#left").hover(function(e){
	var currentJiraHTML = $("#jiraLink_DocProp").text();
	$("#jiraLink").attr("href", currentJiraHTML);
});*/

// insert the Confluence Documentation Link into the Cover Link in case it is not yet provided.
var confluenceDocumentationLink = $("#fdnConfluenceLink").text().trim();
var currentPage = $("#currentPage").text().trim();
if ( (confluenceDocumentationLink !== null) && (currentPage === '/Cover/') ) {
	var currentConfluenceCoverLink = $("#confluenceDocumentationCoverLink").attr('href');
	if (currentConfluenceCoverLink === '#') {
		$("#confluenceDocumentationCoverLink").attr("href", confluenceDocumentationLink);
	}
}
// insert the Confluence Documentation Link into the Toolbar Link in case it is not yet provided.
if (confluenceDocumentationLink !== null) {
	var currentConfluenceToolbarLink = $("#confluenceLink").attr('href');
	if (currentConfluenceToolbarLink === '#') {
		$("#confluenceLink").attr("href", confluenceDocumentationLink);
	}
}
// insert the JIRA Ticket Template Link into the Toolbar Link in case it is not yet provided.
var jiraTicketTemplateLink = $("#jiraLink_DocProp").text().trim();
if (jiraTicketTemplateLink !== null) {
	var currentJiraTicketTemplateLink = $("#jiraLink").attr('href');
	if ((currentJiraTicketTemplateLink === '#') || (currentJiraTicketTemplateLink === '')) {
		$("#jiraLink").attr("href", jiraTicketTemplateLink);
	}
}

// append script or link only if it doesn'tnot yet exist within the <head>:
// Source 1: https://stackoverflow.com/questions/15987668/only-add-script-to-head-if-doesnt-exist
// Source 2: https://stackoverflow.com/questions/15988186/my-script-appending-function-doesnt-work
function appendScript(path, type) {
	var x = document.getElementsByTagName(type);
	var header_already_added = false;

	for (var i=0; i< x.length; i++){
		if (x[i].src == path || x[i].href == path){
				// ... do not add header again
				header_already_added = true;
		}
	}

	if (header_already_added == false){
		var head = document.getElementsByTagName('head')[0];

		// We create the style
		if (type == 'link') {

			var style = document.createElement('link');
			style.setAttribute("rel", "stylesheet");
			style.setAttribute("type", "text/css");
			style.setAttribute("href", path)

			head.appendChild(style);

		} else if (type == 'script') {

			var script = document.createElement('script');
			script.setAttribute("type", "text/javascript");
			script.setAttribute("src", path);

			head.appendChild(script);

		}
	}
}
// Google Material.io Icons
// Tutorial:	https://www.w3schools.com/icons/google_icons_intro.asp
// Source:		https://material.io/icons/
appendScript("https://fonts.googleapis.com/icon?family=Material+Icons","link");
// Font Awesome
// Tutorial:	https://www.w3schools.com/icons/fontawesome_icons_intro.asp
// Source:		https://fontawesome.com/icons?d=gallery&m=free
appendScript("https://use.fontawesome.com/releases/v5.0.10/css/all.css","link");
// Font Awesome Animated
// Tutorial:	http://l-lin.github.io/font-awesome-animation/
// Git-Project:	https://github.com/l-lin/font-awesome-animation
appendScript("http://l-lin.github.io/font-awesome-animation/dist/font-awesome-animation.min.css","link");
appendScript("https://fonts.googleapis.com/css?family=Roboto","link");
appendScript("https://fonts.googleapis.com/css?family=Ubuntu","link");
//appendScript("http://code.jquery.com/jquery-1.12.4.js","script");
//appendScript("http://code.jquery.com/ui/1.12.1/jquery-ui.js","script");
appendScript("https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css","link");

/****************************************************************
*	Environmental Variables
****************************************************************/

var spotfireEnvironment				= $("#fdnSpotfireEnvironment").text().trim();
var reportState						= $("#reportState").text().trim();

/****************************************************************
*	Digital Assets
****************************************************************/

var urlLmnLogo						= "https://lastminutegroup-cdn.thron.com/delivery/public/image/lastminutegroup/2ee12055-370c-45c3-97d5-11d50ea9f763/eli4yp/std/x/lmn_logo";
var urlLmnLogoToolbar				= "https://lastminutegroup-cdn.thron.com/delivery/public/image/lastminutegroup/8f9237db-35f5-432a-9d86-ef8cf69e5d1d/bhkqyj/std/x/lmn_logo_toolbar";
var urlReportTypeDraft				= "https://lastminutegroup-cdn.thron.com/delivery/public/image/lastminutegroup/8eb588d3-2f4a-4f71-bb9c-b024ff39cee9/jre7aj/std/x/draft";
var urlReportTypeUnofficial			= "https://lastminutegroup-cdn.thron.com/delivery/public/image/lastminutegroup/3311746e-b715-4a2f-8b10-d466e3f02cb5/fdgml6/std/x/unofficial";
var urlReportTypeOfficial			= "https://lastminutegroup-cdn.thron.com/delivery/public/image/lastminutegroup/0695aa41-aafa-4c31-8c8a-8a53f2f9a6f8/dhzdnk/std/x/official";
var urlReportTypeGolden				= "https://lastminutegroup-cdn.thron.com/delivery/public/image/lastminutegroup/13002e22-7fa4-410c-b408-434a55208eeb/3ah0ym/std/x/golden";
var uiIcons_e81193					= "https://lastminutegroup-cdn.thron.com/delivery/public/image/lastminutegroup/5e7b37db-7eea-403e-92ec-25bf5625e507/xukhec/std/x/ui-icons_e81193";
var uiIcons_2a2a2a					= "https://lastminutegroup-cdn.thron.com/delivery/public/image/lastminutegroup/3cee54cc-0790-423d-a96f-5a031d7e643d/mqtune/std/x/ui-icons_2a2a2a";
if (reportState === "Production") {
	var uiIcons						= uiIcons_e81193;
} else {
	var uiIcons						= uiIcons_2a2a2a;
}
var urlSearchGlobe					= "https://lastminutegroup-cdn.thron.com/delivery/public/image/lastminutegroup/0ad5f955-f8a7-4208-9908-bd615c1ee09f/e9ihes/std/x/search_globe";
var urlProdCatFlight				= "https://lastminutegroup-cdn.thron.com/delivery/public/image/lastminutegroup/ad290923-a680-443b-9347-c74b965e0b9c/aynstx/std/x/f_air_plane";
var urlProdCatHotel					= "https://lastminutegroup-cdn.thron.com/delivery/public/image/lastminutegroup/c7e3fec2-708c-4895-a093-0e9f35b008af/zqbci8/std/x/h_hotel_bed";
var urlProdCatDP					= "https://lastminutegroup-cdn.thron.com/delivery/public/image/lastminutegroup/0f1131c5-65ad-48ca-809b-ea1ff9c73c95/sknisl/std/x/dp_dynamic_package";
var urlProdCatTO					= "https://lastminutegroup-cdn.thron.com/delivery/public/image/lastminutegroup/4591855f-bb3e-456a-9598-96b98b556289/izd7yt/std/x/to_tour-operator";

/****************************************************************
*	Variables
****************************************************************/

// Foundation Properties
var left							= "#left";
var right							= "#right";
var currentTheme					= $("#currentTheme").text().trim();
var delayOpen						= 333;
var delayClose						= 0;

// Toolbar Element Visibility
var filtersToggle					= $("#fdnToolbarToggleFilters").text().trim();
var bookmarksToggle					= $("#fdnToolbarToggleBookmarks").text().trim();
var reloadDataToggle				= $("#fdnToolbarToggleReload").text().trim();
var commandsFound					= $('#customOptions').length;
var commandsToggle					= $("#fdnToolbarToggleCommands").text().trim();
var currentFiltersToggle			= $("#fdnToolbarToggleCurrentFilters").text().trim();
var currentFiltersAutoProcessState	= $("#fdnToolbarToggleCurrentFiltersAutoProcessing").text().trim();
var confluenceToggle				= $("#fdnToolbarToggleConfluence").text().trim();
var dataIntegrityFound				= $('#dataIntegrity').length;
var dataIntegrityToggle				= $("#fdnToolbarToggleDataIntegrity").text().trim();
var jiraTicketToggle				= $("#fdnToolbarToggleJiraTicket").text().trim();

// Positioning
//var topMargin						= 31; // 34 or 29 // "0" comment for production; 32px = space required to see page-tabs on top
var topMargin						= $(".sf-element-page-navigation-bar").height()+1;
var webPlayerEditMode				= $(".sf-element-toolbar").length;
var webPlayerEditToolbar			= 36;
if (webPlayerEditMode === 1) {
	topMargin						= topMargin + webPlayerEditToolbar;
}
var bottomMargin					= 24; // 24
var zIndex							= 1000;

// Font
var fontFamily						= "Roboto, Segoe UI, Calibri, Arial, sans-serif";
var fontFamilyCode					= "Roboto Mono, Consolas, Courier New";
var fontSize						= 13;
var lineHeight						= fontSize;

// Colors
if (reportState === "Production") {
	var colorPrimary					= "#E81193";
	var colorPrimaryRGB					= "255,0,143";
} else {
	var colorPrimary					= "#484848";
	var colorPrimaryRGB					= "72,72,72";
}

// Report Type Image URLs
var reportType						= $("#reportType").text().trim();
if (reportType == 'unofficial') {
	var reportTypeImageURL			= urlReportTypeUnofficial;
} else if (reportType == 'official') {
	var reportTypeImageURL			= urlReportTypeOfficial;
} else if (reportType == 'golden') {
	var reportTypeImageURL			= urlReportTypeGolden;
} else {
	var reportTypeImageURL			= urlReportTypeDraft;
}

if(currentTheme === "light") {
	var colorPrimaryTone			= "#6A003A";
	var colorPrimaryToneExtra		= "#FFE6F3";
	var colorFont					= "#262626";
	var colorFontHighlightBG		= "#CDCDCD";
	var colorFontHighlightText		= "#5F5F5F";
	var colorBackground				= "#EEEEEE";
	var colorTabBackground			= "#E4E4E4";
	var colorMenuBackground			= "#F5F5F5";
	var colorHeader					= "#F5F5F5";
	var colorBoxBackground			= "#EEEEEE";
	var colorBoxTabHeader			= "#E4E4E4";
	var colorBoxTabHeaderBorder		= "#CDCDCD";
	var colorBoxTabBackground		= "#F5F5F5";
	var colorBoxTabBorder			= "#E4E4E4";
	var colorShadow					= "250,250,250";
	// to be added to dark theme:
	var colorToolbarBackground		= "#FAFAFA";
} else {
	var colorPrimaryTone			= "#FFD7ED";
	var colorPrimaryToneExtra		= "#460026";
	var colorFont					= "#D9D9D9";
	var colorFontHighlightBG		= "#C0C0C0";
	var colorFontHighlightText		= "#404040";
	var colorBackground				= "#2A2A2A";
	var colorTabBackground			= "#404040";
	var colorMenuBackground			= "#373737";
	var colorHeader					= "#373737";
	var colorBoxBackground			= "#2A2A2A";
	var colorBoxTabHeader			= "#373737";
	var colorBoxTabHeaderBorder		= "#2A2A2A";
	var colorBoxTabBackground		= "#404040";
	var colorBoxTabBorder			= "#373737";
	var colorShadow					= "42,42,42";
}
// Height (px)
var heightItem						= 40;
// Width (px)
var widthExpanded					= 300;
var navigationIconVisibilityToggle	= $("#fdnNavigationIconVisibilityToggle").text().trim();
if (navigationIconVisibilityToggle === 'show') {
	var widthCollapsed				= 40;
} else {
	var widthCollapsed				= 0;
}
var widthHeader						= widthExpanded - 16;
var widthText						= widthExpanded - 18;
var toolbarScrollToggle				= $("#fdnToolbarScrollToggle").text().trim();
/*if (toolbarScrollToggle === 'true') {
	var toolbarPosition				= "fixed";
} else {
	var toolbarPosition				= "relative";
}*/
// Data Integrity
// Colors
var dataIntegrityColorOkay			= "#6AA84F";
var dataIntegrityColorWarning		= "#F1C232";
var dataIntegrityColorError			= "#CC0000";
var dataIntegrityColorUnknown		= "#999999";
// Icons
var dataIntegrityIconOkay			= "check";
var dataIntegrityIconWarning		= "warning";
var dataIntegrityIconError			= "error";
var dataIntegrityIconUnknown		= "help_outline";
// Condition
var dataIntegrityColor				= dataIntegrityColorUnknown;
var dataIntegrityIcon				= dataIntegrityIconUnknown;

/****************************************************************
*	Global Styles
****************************************************************/

$(".hidden").css({
	"display": "none"
});


/****************************************************************
*	Overwrite Spotfire native classes
****************************************************************/

$(".HtmlTextArea a").css({
	"color": "#E81193" // #FF008F
	,"text-decoration": "underline"
});

/****************************************************************
*	Document Properties Styles for Debugging & Functionality
****************************************************************/

$("#fdnDocProps").css({
	"position": "fixed"
	,"top": (topMargin+heightItem)+"px"
	,"left": "0"
	,"bottom": bottomMargin+"px"
	,"width": "100%"
	,"height": "calc(100% - "+(topMargin+bottomMargin+heightItem)+"px)"
	,"overflow-y": "scroll"
	,"background": "#FAFAFA"
	,"font-family": fontFamily
	,"display": "flex"
	,"flex-flow": "row wrap"
	,"justify-content": "flex-start"
	,"align-content": "flex-start"
	,"z-index": zIndex-4
});

$("#fdnDocProps > *").css({
	"flex": "0 1 auto"
});

$("#fdnDocProps .settingSection").css({
	"font-size": "11px"
	,"color": "#666666"
	,"background": "#FDFDFD"
	,"width": "100%"
	,"margin": "6px 8px"
	,"padding": "6px 8px"
	,"border": "solid 1px #EEEEEE"
	,"border-top": "solid 3px "+colorPrimary
	,"border-bottom-left-radius": "8px"
	,"border-bottom-right-radius": "8px"
	,"overflow": "hidden"
});

$("#fdnDocProps > * > h3").css({
	"color": "#444444"
	,"font-family": "Ubuntu"
	,"font-size": "20px"
	,"line-height": "24px"
	,"font-weight": "bold"
	,"padding": "0 0 2px 0"
	,"margin": "0 0 4px 0"
	,"width": "100%"
});

$("#fdnDocProps .settingProperty").css({
	"font-size": "11px"
	,"color": "#666666"
	,"background": "#FDFDFD"
	,"margin": "6px 8px"
	,"padding": "6px 8px"
	,"border": "solid 1px #EEEEEE"
	,"border-left": "solid 3px "+colorPrimary
	,"border-top-right-radius": "8px"
	,"border-bottom-right-radius": "8px"
	,"overflow": "hidden"
});

$("#fdnDocProps > * > h4").css({
	"color": "#555555"
	,"font-size": "12px"
	,"line-height": "16px"
	,"font-weight": "bold"
	,"padding": "0 0 2px 0"
	,"margin": "0 0 4px 0"
	,"border-bottom": "dashed 1px #EEEEEE"
	,"width": "100%"
});

$("#fdnDocProps input").css({
	"font-family": fontFamilyCode
});

$("#fdnDocProps span").css({
	"font-family": fontFamily
});

$("#fdnDocProps > * > .currentSetting > span").css({
	"display": "inline-block"
	,"padding": "6px 12px"
	,"position": "relative"
	,"font-family": fontFamilyCode
	,"background-color": "#FAFAFA"
	,"border": "solid 1px #F0F0F0"
	,"border-left": "solid 3px #F0F0F0"
	,"margin": "3px 0"
});

$("#fdnDocProps .settingInfo").css({
	"display": "flex"
	,"flex-flow": "row nowrap"
});

$("#fdnDocProps .settingInfo > *").css({
	"flex": "0 1 auto"
	,"align-content": "align-content"
});

$("#fdnDocProps .settingInfo i").css({
	"min-width": "28px"
});
$("#fdnDocProps p").css({
	"margin-bottom": "2px"
});

$("#fdnDocProps .settingOption").css({
	"width": "100%"
	,"margin": "4px"
});
$("#fdnDocProps .settingOption > .titleLeft").css({
	"line-height": "20px"
	,"padding": "2px 12px 3px 6px"
	,"margin-right": "-6px"
	,"border": "solid 1px #EEEEEE"
	,"border-right": "none"
	,"border-top-left-radius": "4px"
	,"border-bottom-left-radius": "4px"
	,"font-weight": "bold"
});

if (reportState === "Production") {
	$("#fdnDocProps .settingProperty > #reportState").parent().css({
		"background-color": "#F5FBF4"
		,"border": "solid 1px #D9EAD3"
		,"border-left": "solid 3px #6AA84F"
	});
	$("#fdnDocProps .settingProperty > #reportState > span").css({
		"color": "#6AA84F"
		,"font-weight": "bold"
		,"background-color": "#D9EAD3"
		,"border": "solid 1px #6AA84F"
		,"border-left": "solid 3px #6AA84F"
	});
} else {
	$("#fdnDocProps .settingProperty > #reportState").parent().css({
		"background-color": "#FDF4F4"
		,"border": "solid 1px #F4CCCC"
		,"border-left": "solid 3px #E06666"
	});
	$("#fdnDocProps .settingProperty > #reportState > span").css({
		"color": "#E06666"
		,"font-weight": "bold"
		,"background-color": "#F4CCCC"
		,"border": "solid 1px #E06666"
		,"border-left": "solid 3px #E06666"
	});
}


/****************************************************************
*	Toolbar / Command Panel
****************************************************************/

if (reportState === "Production") {
	$("#commandPanel").css({
		"position": "fixed"
		,"left": "0"
		,"top": topMargin+"px"
	});
} else {
	$("#commandPanel").css({
		"position": "relative"
		,"left": "0"
		,"top": "0"
	});
}

$("#commandPanel").css({
	"background": colorPrimary
	,"width": "100%"
	,"height": heightItem+"px"
	,"z-index": zIndex-2
	,"overflow": "hidden"
});

// adapting the Command Panel's width to window conditions
// (incl. text areas besides toolbar itself, filter-panel state and window width)
$("#commandPanel").mouseover(function() {
	var commandPanelOffset = $(this).parent().offset();
	var commandPanelWidth = $(this).parent().width() + commandPanelOffset.left;
	$(this).css({
		"width": commandPanelWidth+"px"
	});
});
$("#commandPanel").mouseout(function() {
	var commandPanelOffset = $(this).parent().offset();
	var commandPanelWidth = $(this).parent().width() + commandPanelOffset.left;
	$(this).css({
		"width": commandPanelWidth+"px"
	});
});
$(window).resize(function(){
	var commandPanelOffset = $("#commandPanel").parent().offset();
	var commandPanelWidth = $("#commandPanel").parent().width() + commandPanelOffset.left;
	$("#commandPanel").css({
		"width": commandPanelWidth+"px"
	});
});
// deprecated alternative when Toolbar CSS-position is set to "relative"
/*$(window).resize(function(){
	$("#commandPanel").css({
		"width": "100%"
	});
});*/
	
// hide the toolbar when in Setting "Scroll Behaviour" is set to "Pin to top", otherwise show it always:
if (toolbarScrollToggle === 'true') {
	//$("#commandPanel").show();
	$(".sf-element-visualization-area").children().scroll(function(){
		if ($(this).scrollTop() > 0) {
			$("#commandPanel").show();
		} else {
			$("#commandPanel").show();
		}
	});
} else {
	//$(window).scroll(function(){
	// the above does not work properly because the window of Spotfire is not considered a scrollable window
	// as long as there is not physical scrollbar on the right side. (i.e. scrollable visuals don't count)
	// fixed:
	$(".sf-element-visualization-area").children().scroll(function(){
		if ($(this).scrollTop() > 0) {
			//console.log("currently not at the top of the page: hiding toolbar");
			$("#commandPanel").hide();
		} else {
			//console.log("reached top of the page: showing toolbar");
			$("#commandPanel").show();
		}
	});
}

/****************************************************************
*	Header Lines & Text
****************************************************************/

$(".side-menu li\
, .side-menu p\
, .side-menu a\
, .side-menu span").css({
	"font-size": fontSize+"px"
});
$(".boxScroll .column .content li\
, .boxScroll .column .content p\
, .boxScroll .column .content span").css({
	"font-size": (fontSize-1)+"px"
});
$(".side-menu a\
#fdnDocProps a").css({
	"color": "#E81193" // #FF008F
	,"text-decoration": "underline"
});
$("#fdnDocProps a").css({
	"font-size": "12px"
	,"line-height": "24px"
});
$(".side-menu p\
, .side-menu li\
, .side-menu h1\
, .side-menu h2\
, .side-menu h3\
, .side-menu h4\
, .side-menu h5\
, .side-menu h6\
, .boxScroll p").css({
	"font-family": fontFamily
	,"font-weight": "normal"
	,"color": colorFont
});

$(".side-menu p\
, .side-menu li").css({
	"line-height": lineHeight+"px"
});

$(".boxScroll .column .content p").css({
	"line-height": lineHeight+7+"px"
});

$(".side-menu ul").css({
	"padding": "0 20px"
	,"margin": "3px 0 6px 0"
});

$(".side-menu p").css({
	"white-space": "normal"
	,"width": widthText+"px"
});

$(".side-menu h6").css({
	"font-weight": "bold"
	,"background": colorHeader
	,"border-top": "1px solid "+colorBackground
	,"border-bottom": "1px dotted "+colorPrimary
	,"width": widthHeader+"px"
	,"margin": "0 0 4px 0"
	,"padding": "0 8px"
	,"position": "relative"
	,"left": "-8px"
	,"white-space": "normal"
});

$(".side-menu h1").css({
	"font-size": (fontSize+11)+"px"
	,"line-height": (lineHeight+11)+"px"
});
$(".side-menu h2").css({
	"font-size": (fontSize+9)+"px"
	,"line-height": (lineHeight+9)+"px"
});
$(".side-menu h3").css({
	"font-size": (fontSize+7)+"px"
	,"line-height": (lineHeight+7)+"px"
});
$(".side-menu h4").css({
	"font-size": (fontSize+4)+"px"
	,"line-height": (lineHeight+4)+"px"
});
$(".side-menu h5").css({
	"font-size": (fontSize+2)+"px"
	,"line-height": (lineHeight+2)+"px"
});
$(".side-menu h6").css({
	"font-size": fontSize+"px"
	,"line-height": (lineHeight*2)+"px"
});

$(".side-menu span").css({
	"font-size": fontSize+"px"
	,"font-family": fontFamily
	,"font-weight": "normal"
	,"color": colorFont
	,"margin": "0 0 4px 0"
	,"padding": "1px 1px 0 1px"
});

$("#commandPanel span").css({
	"font-size": fontSize+"px"
	,"font-family": fontFamily
	,"font-weight": "normal"
	,"color": colorFont
	,"margin": "0 0 4px 0"
	,"padding": "1px 1px 0 1px"
});


$(".side-menu span.date").css({
	"font-family": fontFamilyCode
	,"padding": "0 5px"
	,"margin": "0 6px 0 -30px"
	,"font-weight": "bold"
	,"color": colorFontHighlightBG
	,"background-color": colorFontHighlightText
	,"border-top-left-radius": "6px"
	,"border-bottom-left-radius": "6px"
	,"border": "1px solid "+colorFontHighlightBG
	,"position": "relative"
	,"z-index": zIndex-6
});
$(".side-menu span.date").find("span").css({
	"color": colorFontHighlightBG
});

$(".side-menu span.version").css({
	"font-family": fontFamilyCode
	,"padding": "0 5px 0 10px"
	,"margin": "0 6px 0 -15px"
	,"font-weight": "bold"
	,"color": colorFontHighlightText
	,"background-color": colorFontHighlightBG
	,"border-radius": "6px"
	,"border": "1px solid "+colorFontHighlightBG
	,"position": "relative"
	,"z-index": zIndex-7
});
$(".side-menu span.version").find("span").css({
	"color": colorFontHighlightText
});

$(".side-menu span.code").css({
	"font-family": fontFamilyCode
	,"padding": "1px 8px"
	,"margin": "0 3px"
	,"background-color": colorFontHighlightBG
	,"color": colorFontHighlightText
	,"font-weight": "bold"
});
$(".side-menu span.code").find("span").css({
	"color": colorFontHighlightText
});
$(".side-menu span.code").children().css({
	"color": colorFontHighlightText
});

$("#pages_list_menu").css({
	"position": "absolute"
	,"top": heightItem+"px"
	,"bottom": "0px"
	,"left": "0px"
	,"right": "-17px" // document.getElementById('pages_list_menu').clientWidth - document.getElementById('pages_list_menu').offsetWidth + "px"
	,"overflow-x": "hidden"
	,"overflow-y": "scroll"
});


/****************************************************************
*	Accordion Setup
****************************************************************/

$(left).accordion({
	header: "h3"
	,heightStyle: "content"
	,icons: {
		"header": "ui-icon-plus"
		,"activeHeader": "ui-icon-minus"
	}
	,animation: 200
	,collapsible: true
	,active: activeNavigationSection
});

$(right).accordion({
	header: "h3"
	,heightStyle: "content"
	,icons: {
		"header": "ui-icon-plus"
		,"activeHeader": "ui-icon-minus"
	}
	,animation: 200
	,collapsible: true
	//,active: 3
});


/****************************************************************
*	Menu Effects
****************************************************************/

// toggle ("open" & "close") menu button:
//$("#menuOpen, #menuOpenFixed").click(function() {
$("#menuOpen").unbind().on('click', function() {
	var navigationWidth = $("#left").width();
	if (navigationWidth < widthExpanded) {
		$("#left").css("width", widthExpanded+"px");
		$("#left").css("transition", "width 333ms ease-in-out 0ms");
		$('#menuOpen').addClass('anim');
	} else {
		$("#left").css("width", widthCollapsed+"px");
		$("#left").css("transition", "width 333ms ease-in-out 0ms");
		$('#menuOpen').removeClass('anim');
	}
});
// only "open" menu-button:
/*$("#menuOpen, #menuOpenFixed").click(function() {
	$(left).css("width", widthExpanded+"px");
	$(left).css("transition", "width 333ms ease-in-out 0ms");
});*/

//$("#menuClose, #menuOpenFixed").click(function() {
$("#menuClose").unbind().click(function() {
	$("#left").css("width", widthCollapsed+"px");
	$("#left").css("transition", "width 333ms ease-in-out 0ms");
	$('#menuOpen').removeClass('anim');
});

$(".side-menu").mouseover(function() {
	$(this).css("width", widthExpanded+"px");
	$(this).css("transition", "width 333ms ease-in-out "+delayOpen+"ms");
	setTimeout(function() {
		$('#menuOpen').addClass('anim');
	}, delayOpen);
});

$(".side-menu").mouseleave(function() {
	$(this).css("width", widthCollapsed+"px");
	$(this).css("transition", "width 333ms ease-in-out "+delayClose+"ms");
	setTimeout(function() {
		$('#menuOpen').removeClass('anim');
	}, delayOpen);
});

$(".menuLink").mouseover(function() {
	$(this).children().css({
		"color": colorBackground
	});
	$(this).css("background", colorPrimary);
});

$("#menuClose").mouseover(function() {
	$(this).children().css({
		"color": colorPrimary
		, "cursor": "pointer"
	});
	$(this).css("background", colorBackground);
});

$(".tab-content .menuLink").not(".sel").mouseover(function() {
	$(this).children().css("color", colorTabBackground);
	$(this).css("background", colorPrimary);
});

$(".menuLink").not(".sel").mouseout(function() {
	$(this).children().css("color", colorPrimary);
	$(this).css("background", "transparent");
});

$(".filterTab").mouseover(function() {
	$(this).css("background",colorPrimary);
	$(this).find(".material-icons").css("color", colorBackground);
	$(this).find(".title").css("color", colorBackground);
	$(this).find(".ui-icon").css("background-image", "url('"+uiIcons+"')");
});

$(".filterTab").mouseout(function() {
	$(this).css("background","transparent");
	$(this).find(".material-icons").css("color", colorPrimary);
	$(this).find(".title").css("color", colorPrimary);
	$(this).find(".ui-icon").css("background-image", "url('"+uiIcons+"')");
});


/****************************************************************
*	Accordion Adaptions: overwrite Spotfire native classes
****************************************************************/

$(".ui-state-default").css({
	"background": "inherit"
	,"font-weight": "inherit"
});

$(".ui-accordion-header, .ui-accordion-content").css({
	"padding": "0"
	,"margin": "0"
	,"line-height": "inherit"
	,"border": "none"
	,"border-radius": "0"
	,"overflow": "hidden"
	,"color": "inherit"
});

$(".ui-accordion .ui-accordion-header .ui-accordion-header-icon").css({
	"position": "inherit"
	,"left": "inherit"
	,"top": "inherit"
});

$(".ui-icon").css({
	"position": "absolute"
	,"top": "11px"
	,"right": "4px"
	,"display": "inline-block"
	,"vertical-align": "inherit"
	,"margin": "0"
	,"padding": "0"
	,"text-indent": "-99999px"
	,"overflow": "hidden"
	,"background-repeat": "no-repeat"
	// Source: http://stackoverflow.com/questions/1821568/how-to-specify-override-jquery-icon-color
	//,"background-image": "url(http://download.jqueryui.com/themeroller/images/ui-icons_"+colorPrimary.substr(1)+"_256x240.png)"
	,"background-image": "url('"+uiIcons+"')"
});


/****************************************************************
*	Navigation Menu
****************************************************************/

$(".side-menu").css({
	"font-family": fontFamily
	,"white-space": "nowrap"
	,"position": "fixed"
	,"top": topMargin+"px"
	,"bottom": bottomMargin+"px"
	,"margin": "0"
	,"padding": "0"
	,"width": widthCollapsed+"px"
	,"background": colorBackground
	,"overflow": "hidden"
	,"z-index": zIndex-3
	//,"transition": "width .5s"
	,"transition": "width 333ms ease-in-out "+delayOpen+"ms"
});

$(left).css({
	"left": "0"
	//,"border-left": "3px solid #FFFFFF"
	,"border-right": "3px solid "+colorPrimary
});

$(right).css({
	"border-left": "2px solid "+colorPrimary
	// the following enables the scrollbar but hides it, with windows
	// defaults standards of 17px width, by moving the entire pane
	// 17px px to the right (putside of the window) and spacing the
	// content to the left by the same px (thereby showing all of it)
	,"right": "0"
	,"padding-right": "17px"
	,"margin-right": "-17px"
	,"overflow-y": "scroll"
});

$(".menuLink").css({
	"width": widthExpanded+"px"
	,"height": heightItem+"px"
	,"margin": "0"
	,"cursor": "pointer"
});

$(".filterTab").css({
	"width": widthExpanded+"px"
	,"height": heightItem+"px"
	,"margin": "0"
});

$(".material-icons\
, .fa").css({
	"display": "inline-block"
	,"position": "relative"
	//,"z-index": zIndex-1
});

$(".side-menu .material-icons\
, #commandPanel .material-icons").css({
	"width": "24px"
	,"margin": "8px"
	,"font-size": "24px"
});

$(".side-menu .material-icons\
, .side-menu .fa").css({
	"color": colorPrimary
});

$("#commandPanel .material-icons\
, #commandPanel .fa").css({
	"color": "#FFFFFF"
});

$("#fdnDocProps .material-icons").css({
	"width": "22px"
	,"margin": "0px"
});

$("#fdnDocProps h3 .material-icons").css({
	"color": "#444444"
	,"font-size": "28px"
	,"position": "relative"
	,"top": "7px"
	,"margin": "-2px 6px 0 0"
});

$("#fdnDocProps .settingInfo .material-icons").css({
	"color": colorPrimary
	,"font-size": "22px"
});

$(".side-menu .fa\
, #commandPanel .fa").css({
	"width": "24px"
	,"margin": "12px"
	,"font-size": "16px"
});

$("#fdnDocProps .fa").css({
	"width": "16px"
	,"margin": "0px"
});

$("#fdnDocProps h3 .fa").css({
	"color": "#444444"
	,"font-size": "20px"
	,"position": "relative"
	,"top": "7px"
	,"margin": "-2px 6px 0 0"
});

// Colors
if (reportState === "Production") {
	$("#commandPanel #infoCompanyLogo").css({
		"background": "url('"+urlLmnLogoToolbar+"') no-repeat 0 50%"
		,"-moz-filter": "none"
		,"-o-filter": "none"
		,"-webkit-filter": "none"
		,"filter": "none"
	});
} else {
	$("#commandPanel #infoCompanyLogo").css({
		"background": "url('"+urlLmnLogoToolbar+"') no-repeat 0 50%"
		,"-moz-filter": "url('data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'grayscale\'><feColorMatrix type=\'matrix\' values=\'0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\'/></filter></svg>#grayscale')"
		,"-o-filter": "url('data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'grayscale\'><feColorMatrix type=\'matrix\' values=\'0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\'/></filter></svg>#grayscale')"
		,"-webkit-filter": "grayscale(100%)"
		,"filter": "gray"
		,"filter": "url('data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'grayscale\'><feColorMatrix type=\'matrix\' values=\'0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\'/></filter></svg>#grayscale')"
	});
}

$("#commandPanel #infoCompanyLogo").css({
	"display": "inline-block"
	,"float": "left"
	,"position": "relative"
	,"width": "185px"
	,"height": heightItem+"px"
	//,"background": "url('"+urlLmnLogoToolbar+"') no-repeat 0 50%"
	,"background-size": "auto 40px"
});
$("#infoReportType").css({
	"display": "inline-block"
	,"float": "left"
	,"position": "relative"
	,"width": "75px"
	,"height": heightItem+"px"
	,"line-height": heightItem+"px"
	,"background": "#FFFFFF url('"+reportTypeImageURL+"') no-repeat 50% 50%"
	,"background-size": "auto 32px"
	,"-webkit-clip-path": "polygon(0 0, 87.5% 0, 100% 100%, 12.5% 100%)"
	,"clip-path": "polygon(0 0, 87.5% 0, 100% 100%, 12.5% 100%)"
});

$(".menuLink a\
, .menuLink span\
, #menuOpen span\
, .infoLabel span").css({
	"position": "relative"
	,"top": "-7px"
	,"width": "252px"
	,"line-height": heightItem+"px"
	,"font-size": "14px"
	,"font-weight": "bold"
	,"color": colorPrimary
	,"text-decoration": "none"
	,"margin": "0"
	,"padding-left": "5px"
	,"z-index": zIndex-2
});

$("#menuOpenFixed").css({
	"display": "inline-block"
	,"position": "fixed"
	,"top": "0"
	,"left": "0"
	,"width": "75px"
	,"height": heightItem+"px"
	,"line-height": heightItem+"px"
	,"background": colorPrimary
	,"-webkit-clip-path": "polygon(0 0, 100% 0%, 87.5% 100%, 0% 100%)"
	,"clip-path": "polygon(0 0, 100% 0%, 87.5% 100%, 0% 100%)"
});

$("#menuOpen span\
, .infoLabel span").css({
	"color": "#FFFFFF"
	,"width": "auto"
	,"top": "0"
});

$(".infoLabel").css({
	"float": "left"
});

$(".infoLabel span").css({
	"padding-left": "16px"
});

$("#menuOpen").css({
	"cursor": "pointer"
	,"height": heightItem+"px"
});

$(".filterTab a").css({
	"display": "inline-block"
	,"position": "relative"
	,"top": "-7px"
	,"left": "-43px"
	,"width": "252px"
	,"line-height": heightItem+"px"
	,"font-size": "14px"
	,"font-weight": "bold"
	,"color": colorPrimary
	,"text-decoration": "none"
	,"margin": "0"
	,"padding-left": "48px"
	,"z-index": zIndex-2
});

$(".filterTab .title").css({
	"position": "relative"
	,"top": "-7px"
	,"left": "-43px"
	,"width": "252px"
	,"line-height": heightItem+"px"
	,"font-size": "14px"
	,"font-weight": "bold"
	,"color": colorPrimary
	,"text-decoration": "none"
	,"margin": "0"
	,"padding-left": "48px"
	,"z-index": zIndex-2
});

$(".sel").css({
	"background": colorPrimary
});

$(".sel").children().css({
	"color": colorBackground
});

$(".sel").find("ui-icon").css({
	"background-image": "url('"+uiIcons+"')"
});


$(".tab-content").css({
	"background": colorTabBackground
	,"width": "292px"
	,"padding": "0 4px 8px 8px"
	,"border-top": "1px solid "+colorPrimary
});

$(left+" .tab-content").css({
	"background": colorMenuBackground
	,"padding": "0"
	,"width": "300px"
});


/****************************************************************
*	Accordion Adaptions
****************************************************************/

$(".ui-accordion-header").css({
	"color": colorPrimary
	,"background": colorBackground
});
$(".ui-accordion-header.ui-state-active").css({
	"color": colorPrimary
	,"background": colorBackground
});

/****************************************************************
*	Cover Container
****************************************************************/

$("#coverContainer").css({
	"background": "#FAFAFA"
	,"height": "calc(100% - 10px)"
	,"width": "calc(100% - 30px)"
	,"text-align": "center"
	,"display": "flex"
	,"margin": "0 15px"
	,"overflow": "hidden"
	,"border": "5px solid #F0F0F0"
});

$("#coverContainer #cover").css({
	"margin": "auto"
});

$("#coverContainer .regularWidth").css({
	"flex": "1"
	,"margin": "5px"
	,"z-index": "1"
});

$("#coverContainer .fullWidth").css({
	"flex": "0 1 100vw"
	,"margin": "25px"
	,"z-index": "1"
});


/****************************************************************
*	Cover Content
****************************************************************/

$("#coverContainer #title h1").css({
	"font-size": "42px"
	,"font-family": "Ubuntu, Roboto"
	,"color": "#E81193" // #FF008F
	,"line-height": "42px"
	,"margin": "0"
	,"font-weight": "normal"
});

$("#coverContainer #logoType").css({
	"text-align": "right"
});

$("#coverContainer .version").css({
	"background-color": "#FAFAFA"
	,"font-size": "14px"
	,"font-weight": "bold"
	,"border": "solid 1px #D9D9D9"
	,"border-radius": "4px"
	,"padding": "1.5px 4px"
	,"line-height": "24px"
});

$("#coverContainer #confDoc").css({
	"font-size": "14px"
	,"line-height": "22px"
});

$("#coverContainer #confDoc a").css({
	"color": "#E81193" // #FF008F
	,"text-decoration": "underline"
});










/****************************************************************
*	Buttons
****************************************************************/

// Button (standard - disabeled)

$("#commandPanel #commandPanelContainer\
, #commandPanel #commandPanelContainer > *").css({
	"display": "inline-block"
	,"float": "right"
});

$("#commandPanel .button > *").css({
	"display": "inline-block"
});

$(".button input\
, .button span\
, .button a").css({
	"color": colorMenuBackground
	,"background": colorPrimary
	,"border": "1px solid "+colorPrimary
	,"border-radius": "6px"
	,"font-family": fontFamily
	,"font-size": fontSize+"px"
	,"text-align": "center"
	,"font-weight": "bold"
	,"max-width": Math.round(((widthExpanded-22)/1)-(2*(1-1)))+"px"
	,"height": heightItem+"px"
	,"line-height": heightItem+"px"
	,"white-space": "nowrap"
	,"overflow": "hidden"
	,"padding": "0"
	,"margin": "4px 2px 6px 2px"
	,"cursor": "pointer"
});

$("#commandPanel .button input\
, #commandPanel .button span\
, #commandPanel .button a").css({
	"border-radius": "0"
	,"margin": "0 2px 0 2px"
	,"border": "none"
});

$(".button").css({
	"border": "none"
});

/****************************************************************
*	Button Sizes
****************************************************************/

$(".huge input\
, .huge span\
, .huge a").css({
	"width": Math.round(((widthExpanded-22)/1)-(2*(1-1)))+"px"
});
$(".large input\
, .large span\
, .large a").css({
	"width": Math.round(((widthExpanded-22)/2)-(2*(2-1)))+"px"
});
$(".medium input\
, .medium span\
, .medium a").css({
	"width": Math.round(((widthExpanded-22)/3)-(2*(3-1)))+"px"
});
$(".regular input\
, .regular span\
, .regular a").css({
	"width": Math.round(((widthExpanded-22)/4)-(2*(4-1)))+"px"
});
$(".small input\
, .small span\
, .small a").css({
	"width": Math.round(((widthExpanded-22)/5)-(2*(5-1)))+"px"
});
$(".tiny input\
, .tiny span\
, .tiny a").css({
	"width": Math.round(((widthExpanded-22)/6)-(2*(6-1)))+"px"
});

$(".half input\
, .half span\
, .half a").css({
	"font-size": (fontSize-2)+"px"
	,"height": ((heightItem/2)+2)+"px"
	,"line-height": ((heightItem/2)+2)+"px"
	,"margin": "4px 2px 6px 2px"
	,"border-radius": "4px"
});

/****************************************************************
*	Button Mouse Effects
****************************************************************/

$(".button").not("#actnCtrl_dataIntegrity").mouseover(function(){
	$(this).find("*").css({
		"color": colorPrimary
		,"background": colorMenuBackground
	});
});

$(".button").not("#actnCtrl_dataIntegrity").mouseout(function(){
	var id						= $(this).attr("id");
	var state_CurrentFilters	= $("#currentFiltersDocProp").text().trim();
	var state_BookmarkPanel		= $("#stateBookmarkPanel").text().trim();
	var state_FilterPanel		= $("#stateFilterPanel").text().trim();
	if ((id === 'actnCtrl_currentFilters') && (state_CurrentFilters !== '<!-- >> Current Filters >> --><div id="currentFiltersHTML">			<p><b>Filtering Scheme:</b> Default</p>')) {
		$(this).find("*").css({
			'color': colorPrimary
			,'background': colorMenuBackground
		});
	} else if ((id === 'actnCtrl_bookmarkShowHide') && (state_BookmarkPanel === "opened")) {
		$(this).find("*").css({
			'color': colorPrimary
			,'background': colorMenuBackground
		});
	} else if ((id === 'actnCtrl_filterShowHide') && (state_FilterPanel === "opened")) {
		$(this).find("*").css({
			'color': colorPrimary
			,'background': colorMenuBackground
		});
	} else {
		$(this).find("*").css({
			"color": colorMenuBackground
			,"background": colorPrimary
		});
	}
});

$(".button").not("#actnCtrl_dataIntegrity").mousedown(function(){
	$(this).find("*").css({
		"color": colorPrimary
		,"background": colorMenuBackground
	});
});

/****************************************************************
*	Data Integrity Effects
****************************************************************/

if (dataIntegrityToggle === "show") {
	$("#actnCtrl_confluenceDocumentation").mouseover(function(){
		$(this).css({ //.find("*")
			"-webkit-clip-path": "polygon(0 0, 75% 0, 95% 100%, 0 100%)"
			,"clip-path": "polygon(0 0, 75% 0, 95% 100%, 0 100%)"
			,"margin-right": "-5px"
		});
		$(this).find("*").css({
			"padding-right": "5px"
		});
	});
	$("#actnCtrl_jiraTicket").mouseover(function(){
		$(this).css({
			"-webkit-clip-path": "polygon(5% 0, 100% 0, 100% 100%, 25% 100%)"
			,"clip-path": "polygon(5% 0, 100% 0, 100% 100%, 25% 100%)"
			,"margin-left": "-5px"
		});
		$(this).find("*").css({
			"padding-left": "5px"
		});
	});
} else {
	$("#actnCtrl_confluenceDocumentation").mouseover(function(){
		$(this).css({
			"-webkit-clip-path": "none"
			,"clip-path": "none"
			,"margin": "0"
		});
		$(this).find("*").css({
			"padding": "0"
		});
	});
	$("#actnCtrl_jiraTicket").mouseover(function(){
		$(this).css({
			"webkit-clip-path": "none"
			,"clip-path": "none"
			,"margin": "0"
		});
		$(this).find("*").css({
			"padding": "0"
		});
	});
}

/****************************************************************
*	Button Visibility
****************************************************************/

// possibily improvable with this:
// $("#commandPanelContainer .optional").attr('id');

// Filters Button
if (filtersToggle === "hide") {
	$("#actnCtrl_filterShowHide").hide();
} else {
	$("#actnCtrl_filterShowHide").show();
}

// Bookmarks Button
if (bookmarksToggle === "hide") {
	$("#actnCtrl_bookmarkShowHide").hide();
} else {
	$("#actnCtrl_bookmarkShowHide").show();
}

// Reload Data Button
if (reloadDataToggle === "show") {
	$("#actnCtrl_reloadData").show();
} else {
	$("#actnCtrl_reloadData").hide();
}

// Commands Area
if ((commandsToggle === "show") && (commandsFound === 1)) {
	$("#actnCtrl_customOptions").show();
} else {
	$("#actnCtrl_customOptions").hide();
}

// Current Filters Button
if (currentFiltersToggle === "hide") {
	$("#actnCtrl_currentFilters").hide();
} else {
	$("#actnCtrl_currentFilters").show();
}

// Current Filters Auto Processing Button
if (currentFiltersAutoProcessState === "true") {
	$("#modalRefreshButton").hide();
} else {
	$("#modalRefreshButton").show();
}

// Confluence Info
if (confluenceToggle === "show") {
	$("#actnCtrl_confluenceDocumentation").show();
} else {
	$("#actnCtrl_confluenceDocumentation").hide();
}

// Data Integrity
if ((dataIntegrityToggle === "show") && (dataIntegrityFound === 1)) {
	$("#actnCtrl_dataIntegrity").show();
} else {
	$("#actnCtrl_dataIntegrity").hide();
}

// JIRA Ticket Template
if (jiraTicketToggle === "show") {
	$("#actnCtrl_jiraTicket").show();
} else {
	$("#actnCtrl_jiraTicket").hide();
}

/****************************************************************
*	Button Actions Types
****************************************************************/

// Source: https://stackoverflow.com/questions/14914372/registering-jquery-click-first-and-second-click
// 2018-10-22 apparently not working, fix in future:
/*
$('.btnToggle input\
, .btnToggle span').click(function() {
	var clicks = $(this).data('clicks');
	if (clicks) {
		$(this).css({"background": colorMenuBackground});
		$(this).css({"color": colorPrimary});
	} else {
		$(this).css({"background": colorPrimary});
		$(this).css({"color": colorMenuBackground});
	}
	$(this).data("clicks", !clicks);
});
*/

/****************************************************************
*	Command Panel Toggle Button
****************************************************************/
/*
$("#commandPanelToggle").css({
	"color": colorPrimary
	,"background": colorMenuBackground
	,"border": "1px solid "+colorPrimary
	,"border-radius": "0"
	,"font-family": fontFamily
	,"font-size": fontSize+"px"
	,"text-align": "center"
	,"font-weight": "bold"
	,"width": (heightItem-2)+"px"
	,"height": (heightItem-2)+"px"
	,"line-height": (heightItem-2)+"px"
	,"white-space": "nowrap"
	,"overflow": "hidden"
	,"padding": "0"
	,"margin": "4px 2px 6px 2px"
	,"transition-property": "background, color, border, letter-spacing, word-spacing, font-weight, font-size, margin"
	,"transition-duration": ".2s"
	,"transition-timing-function": "linear"
	,"display": "inline-block"
	,"float": "right"
});

$("#commandPanelToggle i").css({
	"color": colorPrimary
});

// Source: https://stackoverflow.com/questions/14914372/registering-jquery-click-first-and-second-click
$('#commandPanelToggle').click(function() {
	var clicks = $(this).data('clicks');
	if (clicks) {
		$("#commandPanelContainer").fadeIn('fast');
		$("#commandPanelToggle i").html("close");
		$("#commandPanelToggle").css({"background": colorMenuBackground});
		$("#commandPanelToggle i").css({"color": colorPrimary});
	} else {
		$("#commandPanelContainer").fadeOut('fast');
		$("#commandPanelToggle i").html("menu");
		$("#commandPanelToggle").css({"background": colorPrimary});
		$("#commandPanelToggle i").css({"color": colorMenuBackground});
	}
	$(this).data("clicks", !clicks);
});
*/

/****************************************************************
*	Modal Boxes
****************************************************************/

$("#customOptions").hide();
$("#currentFilters").hide();
$("#dataIntegrity").hide();
//$("#confluenceDocumentation").hide();
	
/****************************************************************
*	Toggle (show/hide) Custom Options/Commands (Modal Box)
****************************************************************/

$("#actnCtrl_customOptions span").click(function(){
	$("#customOptions").toggle();
});
$("#customOptions > h4 > #modalCloseButton").click(function(){
	$("#customOptions").hide();
});
$("#actnCtrl_customOptions").mouseover(function(){
	$("#actnCtrl_customOptions span").css({
		"background": colorMenuBackground
		,"color": colorPrimary
	});
});

/****************************************************************
*	Toggle (show/hide) Current Filters (Modal Box)
****************************************************************/

$("#actnCtrl_currentFilters span").click(function(){
	$("#currentFilters").toggle();
});
$("#currentFilters > h4 > #modalCloseButton").click(function(){
	$("#currentFilters").hide();
});
$("#actnCtrl_currentFilters").mouseover(function(){
	$("#actnCtrl_currentFilters span").css({
		"background": colorMenuBackground
		,"color": colorPrimary
	});
});

/****************************************************************
*	Toggle (show/hide) Current Filters (Modal Box)
****************************************************************/

$("#actnCtrl_dataIntegrity").click(function(){
	$("#dataIntegrity").toggle();
});
$("#dataIntegrity > h4 > #modalCloseButton").click(function(){
	$("#dataIntegrity").hide();
});/*
$("#actnCtrl_dataIntegrity").mouseover(function(){
	$("#actnCtrl_dataIntegrity").css({
		"background": colorMenuBackground
		,"color": colorPrimary
	});
});*/

/****************************************************************
*	Toggle (show/hide) Confluence Documentation (Modal Box)
*	! DEPRECATED ON 2018-10-22 WITH [BUSINT-9556]
****************************************************************/

/*$("#actnCtrl_confluenceDocumentation span").click(function(){
	$("#confluenceDocumentation").toggle();
});
$("#confluenceDocumentation > h4 > #modalCloseButton").click(function(){
	$("#confluenceDocumentation").hide();
});
$("#actnCtrl_confluenceDocumentation").mouseover(function(){
	$("#actnCtrl_confluenceDocumentation span").css({
		"background": colorMenuBackground
		,"color": colorPrimary
	});
});*/

/****************************************************************
*	Modal Box Styles
****************************************************************/

$(".modalContainer").css({
	"position": "fixed"
	,"resize": "both" // https://www.w3schools.com/cssref/css3_pr_resize.asp
	,"overflow": "hidden"
	,"background": "#FDFDFD"
	,"border": "solid 1px #EEEEEE"
	,"border-left": "solid 3px "+colorPrimary
	,"border-top-right-radius": "8px"
	,"border-bottom-right-radius": "8px"
	,"z-index": zIndex-1
});
// to let all Modal Boxes appear by default in the very center of the window
// uncomment the following lines:
/*
$("#customOptions\
, #currentFilters\
, #dataIntegrity").css({
	"width": "370px"
	,"height": "400px"
	,"top": "50%"
	,"left": "50%"
	,"margin": "-200px 0 0 -185px"
});
*/

$("#customOptions\
, #currentFilters\
, #dataIntegrity").css({
	"width": "370px"
	,"height": "400px"
});
$("#customOptions").css({
	"top": (heightItem*2)+"px"
	,"right": heightItem+"px"
});
$("#currentFilters").css({
	"top": (heightItem*2)+"px"
	,"right": (heightItem*2)+"px"
});
$("#dataIntegrity").css({
	"top": (heightItem*2)+"px"
	,"right": (heightItem*3)+"px"
});
// ! DEPRECATED ON 2018-10-22 WITH [BUSINT-9556]:
/*
$("#confluenceDocumentation").css({
	"width": "70%"
	,"height": "70%"
	,"top": (heightItem*2)+"px"
	,"left": (heightItem*2)+"px"
});

$("#confluenceDocumentation #infoConfluence > iframe").css({
	"position": "absolute"
	,"width": "calc(100% - 32px)"
	,"height": "calc(100% - 60px)"
});
*/
$(".scrollArea").css({
	"font-size": "11px"
	,"font-family": fontFamily
	,"color": "#666666"
	,"background": "#FDFDFD"
	,"margin": "6px 8px"
	,"padding": "4px 8px"
	,"width": "calc(100% - 32px)"
	// remove 60px to account to combined margin and padding height of h4 and scrollArea, 
	// so that the content area is 100% visible and not partially hidden on the bottom
	,"height": "calc(100% - 60px)"
	,"overflow": "auto"
});

$(".scrollArea p").css({
	"font-family": fontFamily
	,"margin-bottom": "2px"
});

$(".modalContainer h4\
, #customOptions h4").css({
	"color": "#555555"
	,"position": "relative"
	,"font-size": "14px"
	,"font-weight": "bold"
	,"line-height": "18px"
	,"margin": "4px 8px 0 8px"
	,"padding": "5px 8px 7px 30px"
	,"border-bottom": "dashed 1px #EEEEEE"
	,"width": "auto"
	,"cursor": "all-scroll"
});

$(".modalContainer h4 .material-icons\
, .modalContainer h4 .fa").css({
	"color": "#CCCCCC"
	,"width": "22px"
	,"font-size": "22px"
	,"position": "absolute"
	,"top": "3px"
	,"margin": "0"
});
$(".modalContainer h4 #modalDragIcon").css({
	"left": "1px"
});
$(".modalContainer h4 #modalRefreshButton").css({
	"right": "28px"
	,"cursor": "pointer"
});
$(".modalContainer h4 #modalCloseButton").css({
	"right": "2px"
	,"cursor": "pointer"
});

// Background to distinct the Text-Areas from the Toolbar
$("#customOptionsAreaBG").css({
	"width": "calc(100% - 20px)"
	,"height": "calc(100% - 20px)"
	,"margin": "5px 10px 15px 10px"
	,"position": "absolute"
});
$("#dataIntegrityAreaBG").css({
	"width": "calc(100% - 20px)"
	,"height": "calc(100% - 20px)"
	,"margin": "5px 10px 15px 10px"
	,"position": "absolute"
});
if (reportState === "Production") {
	$("#customOptionsAreaBG").css({
		"background-color": "#FFFFFF"
	});
	$("#dataIntegrityAreaBG").css({
		"background-color": "#FFFFFF"
	});
} else {
	$("#customOptionsAreaBG").css({
		"background-color": "#0063BE"
	});
	$("#dataIntegrityAreaBG").css({
		"background-color": "#80BE13"
	});
}

/****************************************************************
*	Data Integrity Info Button & Modal Box Styles
****************************************************************/

// Toolbar Info & Button
$("#actnCtrl_dataIntegrity").css({
	"position": "relative"
	,"width": "75px"
	,"height": heightItem+"px"
	,"line-height": heightItem+"px"
	,"background-color": "#FFFFFF"
	,"-webkit-clip-path": "polygon(0 0, 87.5% 0, 100% 100%, 12.5% 100%)"
	,"clip-path": "polygon(0 0, 87.5% 0, 100% 100%, 12.5% 100%)"
});

//var dataIntegrityHTML = $("#dataIntegrityHTML").text();
var dataIntegrityHTML = '<i class="material-icons">'+dataIntegrityIcon+'</i>';
$("#actnCtrl_dataIntegrity").html(dataIntegrityHTML);

// Modal Box
$("#dataIntegrity").css({
	"border": "solid 1px #EEEEEE"
	,"border-left": "solid 3px "+dataIntegrityColor
	,"border-top-right-radius": "8px"
	,"border-bottom-right-radius": "8px"
	,"z-index": zIndex-15
});
$("#dataIntegrity > h4").css({
	"color": dataIntegrityColor
});

// Modal Box
$("#actnCtrl_dataIntegrity > *").css({
	"color": dataIntegrityColor
	,"display": "flex"
	,"justify-content": "center"
	,"position": "relative"
	,"width": "100%"
	,"height": heightItem+"px"
	,"line-height": heightItem+"px"
	,"padding": "0"
	,"cursor": "pointer"
});


/****************************************************************
*	Controls Container
****************************************************************/

$(".controls").css({
	"background": "#FAFAFA"
	,"position": "relative"
	,"width": "100%"
	,"height": "100%"
	,"font-size": "11px"
	,"overflow": "hidden"
});

$(".ctrlRow").css({
	"display": "flex"
	,"flex-flow": "row wrap"
});

$(".ctrlCol").css({
	"display": "flex"
	,"flex-flow": "column wrap"
});

$(".controls .content").css({
	"text-align": "center"
	,"font-size": "11px"
	,"background": "#"
	,"border": "solid 1px #EEEEEE"
	,"border-radius": "4px"
	,"padding": "6px 10px"
	,"position": "relative"
});

$(".controls .regularWidth").css({
	"flex": "1"
	,"margin": "5px"
});

$(".controls .fullWidth").css({
	"flex": "0 1 100vw"
	,"margin": "25px"
});

/****************************************************************
*	Controls Content
****************************************************************/

$(".controls h2").css({
	"font-size": "14px"
	,"color": "#FF008F"
	,"line-height": "32px"
	,"margin": "0"
	,"font-weight": "normal"
});

$(".controls .content h3").css({
	"font-size": "14px"
	,"color": "#666666"
	,"background": "#FDFDFD"
	,"line-height": "10px"
	,"margin": "-7px 0 6px 0"
	,"padding": "5px 0 5px 0"
	,"font-weight": "bold"
	,"width": "100%"
	,"border": "solid 1px #EEEEEE"
	,"border-top": "solid 3px #FF008F"
	,"border-bottom-left-radius": "8px"
	,"border-bottom-right-radius": "8px"
	,"overflow": "hidden"
	,"z-index": "0"
});

$(".controls .content .selected").css({
	"color": "#666666"
	,"font-size": "11px"
	,"font-weight": "bold"
	,"margin": "0 0 -1px -10px" // -10px (left) to compensate for .controls padding
	,"width": "100%"
	,"position": "absolute"
	,"bottom": "0"
	,"overflow": "hidden"
	,"z-index": "0"
});

$(".controls .content .selected > span").css({
	"background-color": "#FDFDFD"
	,"border": "solid 1px #EEEEEE"
	,"border-top-left-radius": "8px"
	,"border-top-right-radius": "8px"
	,"line-height": "18px"
	,"display": "inline-block"
	,"width": "80%"
});

$(".variable").css({
	"background-color": "#FAFAFA"
	,"font-size": "11px"
	,"font-weight": "bold"
	,"border": "solid 1px #D9D9D9"
	,"border-radius": "4px"
	,"padding": "2px 4px"
	,"line-height": "24px"
});

$(".controls .filters .filter\
, .controls .summary .dimension").css({
	"margin": "6px 0"
	,"font-size": "11px"
});

$(".controls .filters .filterTitle\
, .controls .filters .sliderTitle\
, .controls .summary .dimensionTitle\
, .controls .filters .filterName\
, .controls .summary .filterName").css({
	"font-size": "11px"
	,"display": "inline-block"
	,"padding": "2px"
	,"margin-right": "-4px"
	,"font-weight": "bold"
	,"background-color": "#FDFDFD"
	,"border": "solid 1px #D9D9D9"
	,"border-top-left-radius": "4px"
	,"border-bottom-left-radius": "4px"
	,"border-right": "none"
	,"white-space": "nowrap"
});

$(".controls .filters .filterName\
, .controls .summary .filterName").css({
	"border": "solid 1px #D9D9D9"
	,"border-radius": "4px"
	,"padding": "2px 4px"
});

$(".controls .filters .filterTitle").css({
	"width": "100px"
	,"line-height": "14px"
	,"position": "relative"
});

$(".controls .filters .sliderTitle").css({
	"width": "100px"
	,"line-height": "30px"
	,"position": "relative"
});

$(".controls .filters .filterDatePicker").css({
	"vertical-align": "middle"
	,"height": "20px"
	,"display": "inline-block"
});

$(".controls .filters .filterDatePicker img").css({
	"height": "20px"
	,"width": "auto"
});

$(".controls .filters .filterInputDate input").css({
	"height": "18px"
	,"position": "relative"
	,"border": "solid 1px #D9D9D9"
	,"text-align": "center"
	
});

$(".controls .filters .slider").css({
    "display": "inline-block"
    ,"top": "7px"
    ,"position": "relative"
    ,"padding": "3px"
    ,"border": "1px solid #D9D9D9"
    ,"border-radius": "4px"
});

$(".controls .summary .dimensionTitle").css({
	"width": "100px"
	,"line-height": "14px"
});
	
$(".controls .filters .sf-element-dropdown").css({
	"line-height": "18px"
});

$(".controls .summary .dimensionValue").css({
	"font-size": "11px"
	,"line-height": "14px"
	,"border": "solid 1px #CCCCCC"
	,"font-family": "Consolas, Roboto Mono, Courier New, monospace"
	,"border-radius": "3px"
	,"background": "#FAFAFA"
	,"padding": "2px"
	,"display": "inline-block"
	,"width": "65px"
});

/****************************************************************
*	Pseudo Classes
****************************************************************/

// Append Pseudo class styles to <head> if they do not exist yet:
function applyPseudoStyle(id, styles) {
	var elementExists = $("#"+id).length;
	if (elementExists === 0) {
		$('<style id="'+id+'" type="text/css">'+styles+'</style>').appendTo('head');
	}
}

// Menu Button Toggle Icon Animation:
var menuToggleAnimation = "\n.animated-icon {\
    position: relative;\
    width: 38px;\
    height: 38px;\
    cursor: pointer;\
    -webkit-transition: .3s;\
    		transition: .3s;\
    display: inline-block;\
}\
.animated-icon .ani {\
    top: "+((heightItem/2)-1)+"px;\
    left: 12px;\
}\
.animated-icon .ani,\
.animated-icon .ani:before,\
.animated-icon .ani:after {\
    content: '';\
    position: absolute;\
    height: 2px;\
    width: 18px;\
    background: #FFFFFF;\
    -webkit-transition: .3s;\
    		transition: .3s;\
}\
.animated-icon .ani:before,\
.animated-icon .ani:after {\
    background: inherit;\
}\
.animated-icon.menu-arrow-l.anim {\
    -webkit-transform: rotate(-180deg);\
    	-ms-transform: rotate(-180deg);\
    		transform: rotate(-180deg);\
}\
.animated-icon.menu-arrow-l .ani:before {\
    top: -5px;\
    right: 0;\
}\
.animated-icon.menu-arrow-l .ani:after {\
    top: 5px;\
    right: 0;\
}\
.animated-icon.menu-arrow-l.anim .ani {\
    width: 16px;\
}\
.animated-icon.menu-arrow-l.anim .ani:before {\
    top: -4px;\
    width: 9px;\
    -webkit-transform: rotate(45deg);\
    	-ms-transform: rotate(45deg);\
    		transform: rotate(45deg);\
    right: 0;\
}\
.animated-icon.menu-arrow-l.anim .ani:after {\
    top: 4px;\
    width: 9px;\
    -webkit-transform: rotate(-45deg);\
    	-ms-transform: rotate(-45deg);\
    		transform: rotate(-45deg);\
    right: 0;\
}\n";
// uncomment for developement purposes
//$("#menuToggleAnimation").remove();
applyPseudoStyle("menuToggleAnimation", menuToggleAnimation);

// Speech Bubble:
var speechBubble = "\n.speech-bubble {\
	position: relative;\
	background: #4b4b4b;\
	border-radius: .4em;\
}\
\
.speech-bubble:after {\
	content: '';\
	position: absolute;\
	top: 0;\
	left: 50%;\
	width: 0;\
	height: 0;\
	border: 37px solid transparent;\
	border-bottom-color: #4b4b4b;\
	border-top: 0;\
	margin-left: -37px;\
	margin-top: -37px;\
}\n";
applyPseudoStyle("speechBubble", speechBubble);

/****************************************************************
*	Spotfire Compatibility Fixes
****************************************************************/

// Make Spotfire Toggle Panels appear above all other elements:
$("#commandPanel").mouseover(function() {
	$(".sf-element-panel-area").css({
		"z-index": zIndex+1 // highest elements in window
	});
});

/****************************************************************
*	Bullet-Point & Status Indicator Styles
****************************************************************/

$(".status-bullets").css({
	"list-style-type": "none"
});
$(".status-bullets li").css({
	"line-height": "20px"
});
$(".bullet").css({
	"height": "16px"
	,"width": "16px"
	,"display": "inline-block"
	,"margin-left": "-24px"
	,"margin-right": "6px"
	/* center vertically with text */
	,"vertical-align": "middle"
	,"margin-top": "-3px"
	,"line-height": "100%"
	,"border-radius": "50%"
});
$(".gray").css({
	"border": "1px solid #434343"
	/* fallback if gradient isn't supported */
	,"background-color": "#999999"
	/* background gradient browser-compatibility */
	,"background":        "-webkit-gradient(linear, 0% 0%, 0% 100%, from(#D9D9D9), to(#999999))"
	,"background": "-webkit-linear-gradient(top, #D9D9D9, #999999)"
	,"background":    "-moz-linear-gradient(top, #D9D9D9, #999999)"
	,"background":     "-ms-linear-gradient(top, #D9D9D9, #999999)"
	,"background":      "-o-linear-gradient(top, #D9D9D9, #999999)"
});
$(".green").css({
	"border": "1px solid #38761D"
	/* fallback if gradient isn't supported */
	,"background-color": "#6AA84F"
	/* background gradient browser-compatibility */
	,"background":        "-webkit-gradient(linear, 0% 0%, 0% 100%, from(#B6D7A8), to(#6AA84F))"
	,"background": "-webkit-linear-gradient(top, #B6D7A8, #6AA84F)"
	,"background":    "-moz-linear-gradient(top, #B6D7A8, #6AA84F)"
	,"background":     "-ms-linear-gradient(top, #B6D7A8, #6AA84F)"
	,"background":      "-o-linear-gradient(top, #B6D7A8, #6AA84F)"
});
$(".yellow").css({
	"border": "1px solid #BF9000"
	/* fallback if gradient isn't supported */
	,"background-color": "#F1C232"
	/* background gradient browser-compatibility */
	,"background":        "-webkit-gradient(linear, 0% 0%, 0% 100%, from(#FFE599), to(#F1C232))"
	,"background": "-webkit-linear-gradient(top, #FFE599, #F1C232)"
	,"background":    "-moz-linear-gradient(top, #FFE599, #F1C232)"
	,"background":     "-ms-linear-gradient(top, #FFE599, #F1C232)"
	,"background":      "-o-linear-gradient(top, #FFE599, #F1C232)"
});
$(".orange").css({
	"border": "1px solid #B45F06"
	/* fallback if gradient isn't supported */
	,"background-color": "#E69138"
	/* background gradient browser-compatibility */
	,"background":        "-webkit-gradient(linear, 0% 0%, 0% 100%, from(#F9CB9C), to())"
	,"background": "-webkit-linear-gradient(top, #F9CB9C, #E69138)"
	,"background":    "-moz-linear-gradient(top, #F9CB9C, #E69138)"
	,"background":     "-ms-linear-gradient(top, #F9CB9C, #E69138)"
	,"background":      "-o-linear-gradient(top, #F9CB9C, #E69138)"
});
$(".red").css({
	"border": "1px solid #990000"
	/* fallback if gradient isn't supported */
	,"background-color": "#CC0000"
	/* background gradient browser-compatibility */
	,"background":        "-webkit-gradient(linear, 0% 0%, 0% 100%, from(#EA9999), to(#CC0000))"
	,"background": "-webkit-linear-gradient(top, #EA9999, #CC0000)"
	,"background":    "-moz-linear-gradient(top, #EA9999, #CC0000)"
	,"background":     "-ms-linear-gradient(top, #EA9999, #CC0000)"
	,"background":      "-o-linear-gradient(top, #EA9999, #CC0000)"
});
$(".blue").css({
	"border": "1px solid #0B5394"
	/* fallback if gradient isn't supported */
	,"background-color": "#3D85C6"
	/* background gradient browser-compatibility */
	,"background":        "-webkit-gradient(linear, 0% 0%, 0% 100%, from(#9FC5E8), to(#3D85C6))"
	,"background": "-webkit-linear-gradient(top, #9FC5E8, #3D85C6)"
	,"background":    "-moz-linear-gradient(top, #9FC5E8, #3D85C6)"
	,"background":     "-ms-linear-gradient(top, #9FC5E8, #3D85C6)"
	,"background":      "-o-linear-gradient(top, #9FC5E8, #3D85C6)"
});



// mark recorded time to indicate final execution time duration
var timeEnd = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
console.log("<<< αFdn_Styles Execution Time | Completion: "+timeEnd+" | Duration: "+((new Date()-date)/1000).toString()+" sec.");
