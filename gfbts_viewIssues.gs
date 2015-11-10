function doGet() {
	var issues = getIssues();
	var htmlBody = getFormattedItems(issues[1]);
	
	var htmlHead = "<head><style type='text/css'>body {font-family: sans-serif;}h4 {color: #777;}.container {background-color: #dbdbdb;border: 1px solid #6f6f6f;border-radius: 15px;padding: 0px 25px 10px 25px;margin: 10px 5px 10px 5px;}.attr div {display: inline;margin-right: 50px;font-weight: bold;font-size: 14px;}.attr span {font-weight: normal;font-size: 12px;padding: 2px 4px 2px 4px;border-radius: 20px;border-width: 1px;border-style: solid;}.attr-val-severity-5 {border-color: #597700;background-color: #9FD400;color: white;}.attr-val-severity-4 {border-color: #C36200;background-color: #FFCC99;color: black;}.attr-val-severity-3 {border-color: #D46A00;background-color: #FF9933;color: white;}.attr-val-severity-2 {border-color: #600000;background-color: #990000;color: white;}.attr-val-severity-1 {border-color: #000000;background-color: #252525;color: white;}.desc {background-color: #ffffff;border-color: 1px solid #afafaf;margin: 8px 0px 8px 0px;padding: 9px 15px 9px 15px;}.attr div {color: #555;}.attr-val-status-1 {background-color: #6699FF;border-color: #0046D2;color: white;}.attr-val-status-2 {background-color: #99FF99;border-color: #009900;color: #006E00;}.attr-val-status-3 {background-color: #C2FF0B;border-color: #6C9000;color: #222D00;}</style></head>";
	var htmlHeader = "<body><h1>Issues (" + issues[0] + ")</h1>";

	return HtmlService.createHtmlOutput(htmlHead + "<body><div class='wrapper'>" + htmlHeader + "</div></body>");
}

function getIssues() {
	var issues = [];
	var totalCount = 0;
	
	var ss = SpreadsheetApp.openById('1EzE3bRHw3HIjLZxvs6FlqNSvdHKrShS9Axnh_BmEckU');
	var sheets = ss.getSheets();
	for (var i = 0; i < sheets.length; i++) {
		var project = sheets[i].getName();		
		var lines = sheets[i].getSheetValues(1, 1, sheets[i].getLastRow(), sheets[i].getLastColumn());
		totalCount = totalCount + lines.length;
		
		var issueList = [ project, lines ];
		issues.push([project, lines]);
	}
	return [totalCount, issues];
}

function getFormattedItems() {
	//issues = [ [ Project, @ListOfIssues ], [Project2, @ListOfIssues] ... ]	
	var output = "";
	
	for (var i = 0; i < issues.length; i++) {
		var projectName = issues[i][0];
		var projectIssues = issues[i][1];		
		for (var j = 0; j < projectIssues.length; j++) {
			var issue = projectIssues[j];
			/*
			Issue
			0: ID:1
			1: Timestamp: 11/10/2015 0:30:03
			2: Severity: 2-Critical
			3: Healine: Test Headline
			4: Desc: Test Description
			5: Attach 1: http://3denglish.com.ua/wp-content/uploads/2015/02/pony.jpg	
			6: Attach 2:
			7: Status
			*/
			
			var severityId = 0;
			var severityLabel = "";
			switch (issue[2]) {
					case "1-Blocker": severityId = 1; severityLabel = "BLOCKER"; break;
					case "2-Critical": severityId = 2; severityLabel = "CRITICAL"; break;
					case "3-Major": severityId = 3; severityLabel = "MAJOR"; break;
					case "4-Minor": severityId = 4; severityLabel = "MINOR"; break;
					case "5-Enhancement": severityId = 5; severityLabel = "ENHANCEMENT"; break;
			}
			
			var statusId = 0;
			var statusLabel = "";
			switch (issue[7]) {
					case "Open": statusId = 1; statusLabel = "Open"; break;
					case "Resolved": statusId = 2; statusLabel = "Resolved"; break;
					case "Closed": statusId = 3; statusLabel = "Closed"; break;
			}
			
			var desc = issue[4].replace(/\n/g, "<br />");
			var attaches = [];
			for (var k = 5; k < 7; k++) {
				if (issue[k].indexOf("http://") > -1 || issue[k].indexOf("https://") > -1) {
					attaches.push("<a href='" + issue[k] + "' target='_blank'>" + issue[k] + "</a>"); 
				} else {
					attaches.push(issue[k]);
				}
			}
			
			output = output
				+ '<div class="container"><h4>#' + issue[0] + ' / ' + projectName + '<h4>'
				+ '<h3>' + issue[3] + '</h3>'
				+ '<div class="attr"><div>Severity: <span class="attr-val-severity-' + severityId + '">' + severityLabel + '</span></div>'
				+ '<div>Created: <span>' + issue[1] + '</span></div>'
				+ '<div>Status: <span class="attr-val-status-' + statusId + '">' + statusLabel + '</span></div></div>'				
				+ '<div class="desc">' + desc + '</div>'
				+ '<div class="attach"><div class="attach-item">' + attaches[0] + '</div><div class="attach-item">' + attaches[1] + '</div>'
				+ '</div></div>';			
		}
	}
	
	output
}
