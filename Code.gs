const SHEET_ID = '127aydtW2t04A0iT2C6309e4Cb2CdhOw7GlYF6_KTmdc';
const SHEET_NAME = '表單回應 1';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    writeToSheet(data);
    return ContentService.createTextOutput('Success');
  } catch (err) {
    return ContentService.createTextOutput('Error: ' + err);
  }
}

function writeToSheet(data) {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
  const timestamp = new Date();
  const row = [
    timestamp,
    data.email,
    data.pickup,
    data.dumpling
  ];
  sheet.appendRow(row);
}
