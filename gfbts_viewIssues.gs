function doGet() {
  var issues = getIssues();
  var htmlBody = getFormattedItems(issues);
  
  var htmlHead = "<head><style type='text/css'>h1 {font-size: 40px;font-family: Geneva, Arial, Helvetica, sans-serif;text-align: center;text-shadow: 1px 1px 2px black, 0 0 1em #FF6666;color: #FF6666;}img {border-radius: 35px;height: 350px;width: 350px;}#msg {background-color: #FFFFC2;height: 110px;width: 500px;border-radius: 35px;box-shadow: 0 0 20px rgba(0,0,0,0.5);font-size: 17px;font-family: Geneva, Arial, Helvetica, sans-serif;text-align: center;top: 50px;}</style></head>";  var htmlPic = "";
  var htmlHeader = "<body><h1><i>Рулеточка</i></h1>";  
  return HtmlService.createHtmlOutput(htmlHead + htmlHeader);
}

function getIssues() {
  var issues = [];
  
  var ss = SpreadsheetApp.openById('1EzE3bRHw3HIjLZxvs6FlqNSvdHKrShS9Axnh_BmEckU');
  var sheets = ss.getSheets();
  for (var i = 0; i < sheets.length; i++) {
    var project = sheets[i].getName();    
    var lines = sheets[i].getSheetValues(1, 1, sheets[i].getLastRow(), sheets[i].getLastColumn());
    var issueList = [ project, lines ];
    issues.push(issueList);
  }
  
  return issues;
}

function getFormattedItems() {
  
}
