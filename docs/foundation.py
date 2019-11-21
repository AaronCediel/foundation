#===============================================================#
#	Foundation Library for enhanced Functions and Options
#
#	! IMPORTANT: DO NOT EDIT !
#===============================================================#

import System
from System import DateTime
from Spotfire.Dxp.Data import *
from Spotfire.Dxp.Application.Visuals import *
from Spotfire.Dxp.Application.Filters import *

# Start recording time to measure execution time duration
now = DateTime.Now
print ">>> Function Execution Time Initiation: "+str(now)


#===============================================================#
#	Function Triggers
#===============================================================#

def foundationFunction():

	function = Document.Properties["fdnFunction"].split('|')[0]
	print 'Function execution triggered: "'+function+'"\n'

	#---------------------------------------------------------------#
	#	On Open Report
	#---------------------------------------------------------------#

	# Update Foundation Config and Navigation and detect
	# Spotfire Environment variables when opening the report file:
	if function == 'fdnOnOpen':
		fdnConfigNavigationToJSON()

	# Trigger a custom script when Page is changed:
	elif function == 'fdnOnOpenPage':
		fdnOnPageChange()

	#---------------------------------------------------------------#
	#	Foundation Functions
	#---------------------------------------------------------------#

	# Parse Foundation Config and Navigation data from imported
	# table into JSON format:
	elif function == 'fdnConfigNavigationToJSON':
		fdnConfigNavigationToJSON()

	# Default Reset:
	elif function == 'fdnDetectSpotfireEnvironment':
		fdnDetectSpotfireEnvironment()

	# Default Reset:
	elif function == 'fdnDetectSpotfireVersion':
		fdnDetectSpotfireVersion()

	#---------------------------------------------------------------#
	#	Toolbar Functions
	#---------------------------------------------------------------#

	# Reload all Data Connections to external data tables:
	elif function == 'fdnReloadDataConnections':
		fdnReloadDataConnections()

	# Default Reset:
	elif function == 'fdnDefaultReset':
		fdnConfigNavigationToJSON()
		fdnDefaultReset()
		fdnResetZoomSliders()

	# Reset X & Y Zoom Sliders:
	elif function == 'fdnResetZoomSliders':
		fdnResetZoomSliders()

	#---------------------------------------------------------------#
	#	Fallback when "function" does not exist
	#---------------------------------------------------------------#

	else:
		print '\nThe Script Parameter "'+function+'" has no associated function!'

	print '\nFunction execution completed: "'+function+'"'


#===============================================================#
#	Functions
#===============================================================#

#---------------------------------------------------------------#
#	Parse Foundation Config and Navigation data
#	from imported table into JSON format:
#
#	https://stackoverflow.com/questions/34809422/how-to-convert-a-datatable-into-json-in-spotfire-using-ironpython
#---------------------------------------------------------------#

def fdnConfigNavigationToJSON():
	reportId = Document.Properties["fdnReportId"]

	import clr
	import sys
	import json
	clr.AddReference('System.Web.Extensions')
	from System.Web.Script.Serialization import JavaScriptSerializer
	from Spotfire.Dxp.Data import IndexSet
	from Spotfire.Dxp.Data import DataValueCursor

	for eTable in Document.Data.Tables:
		if eTable.Name in ['fdnConfig', 'fdnNavigation']:
			rowCount = eTable.RowCount
			rows = IndexSet(rowCount,True)
			cols = eTable.Columns
			fdnData = []

			for r in rows:
				list = {}
				item = {}
				for c in cols:
					item[c.Name] = c.RowValues.GetFormattedValue(r)
					list[eTable.Name] = item
				# add Spotfire Environment Information to fdnConfig
				if eTable.Name == 'fdnConfig':
					item["SPOTFIRE_ENVIRONMENT"] = fdnDetectSpotfireEnvironment()
					list[eTable.Name] = item
				# Add data only if the "REPORT_ID" matches the "fdnReportId" Doc. Prop.:
				if reportId == list[eTable.Name]["REPORT_ID"]:
					fdnData.append(list)

			fdnDataOutput = json.dumps(fdnData)
			Document.Properties[eTable.Name] = fdnDataOutput


#---------------------------------------------------------------#
#	On Open Page:
#
#	https://community.tibco.com/questions/how-can-i-call-ironpython-script-another-script-if-someone-can-provide-example-would-be
#---------------------------------------------------------------#

def fdnOnPageChange():
	from Spotfire.Dxp.Application.Scripting import ScriptDefinition
	from System.Collections.Generic import Dictionary
	import Spotfire.Dxp.Application.Filters as filters
	import clr

	scriptDefinition = clr.Reference[ScriptDefinition]()
	Document.ScriptManager.TryGetScript("βFoundationCustom", scriptDefinition)
	parameters = Dictionary[str, object]()
	Document.ScriptManager.ExecuteScript(scriptDefinition.ScriptCode, parameters)

#---------------------------------------------------------------#
#	Reload all Data Connections to external data tables:
#---------------------------------------------------------------#

def fdnReloadDataConnections():
	for table in Document.Data.Tables:
		# when removing the comment from the next line of code, 
		# add another indentation on the subsequent line(s):
		#if t.IsRefreshable and t.NeedsRefresh:
		table.Refresh()

#---------------------------------------------------------------#
#	Detect Spotfire Environment:
#
#	https://spotfired.blogspot.in/2017/02/current-user-in-webplayer.html
#	http://spotfired.blogspot.in/2015/03/how-to-tell-if-spotfire-is-running-from.html
#---------------------------------------------------------------#

def fdnDetectSpotfireEnvironment():
	from System import Environment
	return str(Environment.CommandLine).replace("\'", "").replace('\"', '').strip()

#---------------------------------------------------------------#
#	Reset X & Y Zoom Sliders:
#---------------------------------------------------------------#

def fdnResetZoomSliders():
	from Spotfire.Dxp.Application.Visuals import VisualContent
	from Spotfire.Dxp.Data import Range

	for visual in Application.Document.ActivePageReference.Visuals:
		visual = visual.As[VisualContent]()
		try:
			visual.XAxis.ZoomRange = visual.XAxis.ZoomRange.DefaultRange
			visual.YAxis.ZoomRange = visual.YAxis.ZoomRange.DefaultRange
			print('X & Y Zoom Sliders Reset: "'+str(visual.TypeId)+'" for "'+str(visual.Title)+'".')
		except:
			print('Invalid Visualization Type: "'+str(visual.TypeId)+'" for "'+str(visual.Title)+'".')

#---------------------------------------------------------------#
#	Default Reset:
#
#	https://community.tibco.com/questions/how-can-i-call-ironpython-script-another-script-if-someone-can-provide-example-would-be
#---------------------------------------------------------------#

def fdnDefaultReset():
	from Spotfire.Dxp.Application.Scripting import ScriptDefinition
	from System.Collections.Generic import Dictionary
	import Spotfire.Dxp.Application.Filters as filters
	import clr

	# 1. Reset all Filters
	for scheme in Document.FilteringSchemes:
		scheme.ResetAllFilters()

	# 2. Reset all Markings
	# Loop through each data table
	for dataTable in Document.Data.Tables:
		# Navigate through each marking in a given data table
		for marking in Document.Data.Markings:
			# Unmark the selection
			rows = RowSelection(IndexSet(dataTable.RowCount, False))
			marking.SetSelection(rows, dataTable)

	# 3. Execute Custom Function of Developers:
	scriptDefinition = clr.Reference[ScriptDefinition]()
	Document.ScriptManager.TryGetScript("βFoundationCustom", scriptDefinition)
	parameters = Dictionary[str, object]()
	Document.ScriptManager.ExecuteScript(scriptDefinition.ScriptCode, parameters)


#===============================================================#
#	Run
#===============================================================#

# Execute function according to its transmitted/triggered Script Parameter:
foundationFunction()


# Mark recorded time to indicate final execution time duration
print "<<< Function Execution Time | Completion: "+str(DateTime.Now)+" | Duration: "+str(DateTime.Now-now)
