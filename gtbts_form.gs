function onSubmit() {
	var response = { 
		"project": ""
		, "id": ""
		, "timestamp": ""
		, "summary": ""
		, "desc": ""
		, "severity": ""
		, "attach1": ""
		, "attach2": ""		
	};
	
	var form = FormApp.getActiveForm();	
	var formResponses = form.getResponses();
	var formResponse = formResponses[formResponses.length-1];	
	var itemResponses = formResponse.getItemResponses();	
	for (var i = 0; i < itemResponses.length; i++) {
		switch (itemResponses[i].getItem().getTitle()) {
			case "Project":
				response.project = itemResponses[i].getResponse();
				break;
			case "Summary (Headline)":
				response.summary = itemResponses[i].getResponse();
				break;
			case "Severity/Importance":
				response.severity = itemResponses[i].getResponse();
				break;
			case "Description":
				response.desc = itemResponses[i].getResponse();
				break;
			case "Attach #1":
				response.attach1 = itemResponses[i].getResponse();
				break;
			case "Attach #2":
				response.attach2 = itemResponses[i].getResponse();
				break;
		}
	}
	
	response.timestamp = formResponse.getTimestamp();
	
	var ss = SpreadsheetApp.openById('1EzE3bRHw3HIjLZxvs6FlqNSvdHKrShS9Axnh_BmEckU');
	var sheet = ss.getSheetByName(response.project);
	var lastRow = 1;
	if (sheet.getLastRow() == 0) {
		lastRow = 1;
	} else {
		lastRow = sheet.getLastRow()
	}
	response.id = (sheet.getRange(lastRow, 1).getValue()) + 1;
	ss.getSheetByName(response.project).appendRow(
		[
			response.id
			, response.timestamp
			, response.severity
			, response.summary
			, response.desc
			, response.attach1
			, response.attach2
			, "Open"
		]
	)
};
