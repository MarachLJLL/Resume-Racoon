// Replace 'YOUR_SPREADSHEET_ID' with the actual ID of your Google Sheet.
// To find your Sheet's ID, open the Sheet in your browser and look for
// the long alphanumeric string in the URL after /d/ and before /edit.
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents); 
    // Open the spreadsheet
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Sheet1');
    
    // Example: data might be { name: 'John Doe', email: 'john@example.com', ...}
    // Write to the next empty row
    sheet.appendRow([
      new Date(),  // Timestamp
      data.name,
      data.email,
      data.position,
      data.resumeLink,
      JSON.stringify(data)  // or any other fields you capture
    ]);
    
    // Return a success response
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success', message: 'Data logged' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    // Return an error response
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
