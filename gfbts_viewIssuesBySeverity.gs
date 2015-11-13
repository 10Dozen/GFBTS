//#11 / Google Form BTS
function getIssuesSortedBySeverity() {
	var issues = [];
	var totalCount = 0;
	
	var ss = SpreadsheetApp.openById('1EzE3bRHw3HIjLZxvs6FlqNSvdHKrShS9Axnh_BmEckU');
	var sheets = ss.getSheets();
  
	var issuesBySeverity = [];
 
	for (var i = 0; i < sheets.length; i++) {
		var project = sheets[i].getName();		
		var lines = sheets[i].getSheetValues(1, 1, sheets[i].getLastRow(), sheets[i].getLastColumn());

		totalCount = totalCount + lines.length;
		lines = lines.sort(function sortBySeverity(a,b) {
			return (a[2][0] - b[2][0]);
		});
		var issueList = [ project, lines ];
		issues.push([project, lines]);
	}
  
	return [totalCount, issues];
}
