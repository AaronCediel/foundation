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



function appendFoundationToHead() {
	
}



// Run Foundation
docReady(function() {
	appendFoundationToHead();
});



// Mark recorded time to indicate final execution time duration
var timeEnd = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
console.log("<<< Foundation Framework Execution Time | Completion: "+timeEnd+" | Duration: "+((new Date()-date)/1000).toString()+" sec");


// -------------------------------------------------
// Notes:




