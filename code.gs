// Designed by: Stefan Clem
// sendEmails Function is to send daily emails received from active spreadsheet. 
var Email_Sent = "Email_Sent";

function sendEmails() {
  
  var template = HtmlService.createTemplateFromFile("template");

  
  var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Form Responses 2").activate();
  var lr = ss.getLastRow();

  var quotaLeft = MailApp.getRemainingDailyQuota();
  
 // Testing issues - Logger.log(quotaLeft);
  if((lr-1) > quotaLeft ){
   Browser.msgBox("You have " + quotaLeft + " left and you're trying to send"+ (lr-1) + " emails. Emails were not sent.");
  }else{

    for (var i = 2;i<=lr;i++){
      
      var currentEmail = ss.getRange(i, 2).getValue();
      var currentPlankDay= ss.getRange(i, 4).getValue();
      var currentName = ss.getRange(i, 3).getValue();
      template.name = currentName;
      template.goal = currentPlankDay;
      var emailSent = ss.getRange(i, 5).getValue();
   
    var body ="";
    var options={
    noReply: true,
    htmlBody:template.evaluate().getContent()
https://github.com/iepoch/Email-Blast.git
      }
      if (emailSent != Email_Sent) {  // Prevents sending duplicates 
      var subjectLine = "Reminder: 30 Day Plank Challenge";
      
      MailApp.sendEmail(currentEmail, subjectLine,body, options);
      ss.getRange(i, 5).setValue(Email_Sent);
      SpreadsheetApp.flush();
       
      } //second else statment
    } // close for loop
  } //else closed
}

function doGet(request) {
  return HtmlService.createTemplateFromFile('template')
      .evaluate();
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}
function clear() {
  var sheet = SpreadsheetApp.getActive().getSheetByName('Form Responses 2');
  sheet.getRange('E1:E200').clearContent();
}