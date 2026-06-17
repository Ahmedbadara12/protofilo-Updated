const SPREADSHEET_ID = '1rdFRXk4gQCoKYc9hGRi47uCb_L6QyhcTm5s9jjrMo1g';
const SHEET_NAME = 'Sheet1';

function doPost(e) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  const payload = JSON.parse(e.postData.contents || '{}');

  sheet.appendRow([
    new Date(),
    payload.name || '',
    payload.email || '',
    payload.subject || '',
    payload.message || '',
    payload.pageUrl || '',
    payload.userAgent || '',
  ]);

  SpreadsheetApp.flush();

  return ContentService
    .createTextOutput(JSON.stringify({
      ok: true,
      spreadsheetId: SPREADSHEET_ID,
      sheetName: SHEET_NAME,
      lastRow: sheet.getLastRow(),
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);

  return ContentService
    .createTextOutput(JSON.stringify({
      ok: true,
      spreadsheetId: SPREADSHEET_ID,
      sheetName: SHEET_NAME,
      lastRow: sheet.getLastRow(),
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
