// Replace this URL with the actual Web App URL from your Google Apps Script
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw-wiFUvXylz_khI-YiLZuzE28LeOXrYG_I-Pp41ABvI0ww0bYuoppYZYY2dRmtXaRg/exec';

// A function that reads the job description and company name from the page
function getJobData() {
  // You'll need to customize these selectors or logic to match the actual DOM
  const jobDescriptionElement = document.querySelector('.section page-centered posting-header');
  const companyNameElement = document.querySelector('.section page-centered posting-header');
  
  const jobDescription = jobDescriptionElement ? jobDescriptionElement.innerText.trim() : '';
  const companyName = companyNameElement ? companyNameElement.innerText.trim() : '';
  
  return { jobDescription, companyName };
}

// Send data to our Google Apps Script
function sendToGoogleSheet(jobDescription, companyName) {
  fetch(GOOGLE_APPS_SCRIPT_URL, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jobDescription,
      companyName
    }),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Response from Google Apps Script:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

// Listen for clicks on any button with name="submit"
document.addEventListener('click', function (event) {
  console.log("clicked");
  const target = event.target;
  
  // If it's a button with name="submit"
  if (target.tagName === 'BUTTON' && target.name.toLowerCase().includes('submit')) {
    // Extract the job description and company name from the page
    console.log("submit button clicked");
    const { jobDescription, companyName } = getJobData();
    
    // Post that data to the Google Sheet
    sendToGoogleSheet(jobDescription, companyName);
  }
}, true);
