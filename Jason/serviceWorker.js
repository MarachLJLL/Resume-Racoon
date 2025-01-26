// serviceWorker.js
// Replace with your deployed Google Apps Script URL
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw-wiFUvXylz_khI-YiLZuzE28LeOXrYG_I-Pp41ABvI0ww0bYuoppYZYY2dRmtXaRg/exec';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'JOB_APPLICATION_SUBMITTED') {
    const formData = request.payload;
    
    // Post the form data to Google Apps Script
    fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Response from Google Apps Script:', data);
      // You could show a notification or do something with 'data'
      sendResponse({ success: true, data });
    })
    .catch(error => {
      console.error('Error sending data:', error);
      sendResponse({ success: false, error: error.message });
    });

    // Return true to indicate we will send a response asynchronously
    return true;
  }
});
