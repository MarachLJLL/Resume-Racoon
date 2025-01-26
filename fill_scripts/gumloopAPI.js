var runCoverLetterID = "";
var runSmartSetupID = "";
var runGoogleSheetID = "";
const GUMLOOP_API_KEY = '3ae93dfe4aff421787d1f0f8e0464a91';

class Profile {
  constructor() {
      // Name
      this.firstName = "";
      this.middleName = "";
      this.lastName = "";

      // Contact
      this.email = "";
      this.phoneNumber = "";
      this.address = "";
      this.address2 = "";
      this.city = "";
      this.province = "";
      this.postalCode = "";

      // URLs
      this.linkedIn = "";
      this.githubProfile = "";
      this.website = "";
      this.portfolio = "";

      // Work Experience
      this.workExperience = []; // Array of WorkExperience instances

      // Education
      this.education = []; // Array of Education instances

      // Diversity
      this.gender = "";
      this.race = "";
      this.accessibility = "No";
      this.veteran = "No";
      this.legal = "No";
      this.authorizedToWork = "Yes";
      this.nonCompeteDisclosure = "No";
  }
}

/**
* Converts a date string like "Sep. 2019" to "09/01/2019".
* Sets the day to "01" if not present.
* @param {string} dateStr - The date string to format.
* @returns {string} - The formatted date string in MM/DD/YYYY format.
*/
function formatDate(dateStr) {
  if (!dateStr) return "";

  // Mapping of month abbreviations to their numeric representations
  const monthMap = {
      'jan': '01',
      'feb': '02',
      'mar': '03',
      'apr': '04',
      'may': '05',
      'jun': '06',
      'jul': '07',
      'aug': '08',
      'sep': '09',
      'oct': '10',
      'nov': '11',
      'dec': '12'
  };

  // Regular expression to extract month, optional day, and year
  const regex = /([A-Za-z]{3})\.?(?:\s+(\d{1,2}))?\s+(\d{4})/;
  const match = dateStr.match(regex);

  if (match) {
      let monthAbbr = match[1].toLowerCase();
      let day = match[2] ? match[2].padStart(2, '0') : '01'; // Default to '01' if day not present
      let year = match[3];
      let month = monthMap[monthAbbr];

      if (month) {
          return `${month}/${day}/${year}`;
      }
  }

  // If the date doesn't match the expected format, return it unchanged or handle accordingly
  console.warn(`Date format not recognized for "${dateStr}". Returning original string.`);
  return dateStr;
}

/**
* Formats a phone number string by removing all non-digit characters.
* @param {string} phoneStr - The phone number string to format.
* @returns {string} - The formatted phone number containing only digits.
*/
function formatPhoneNumber(phoneStr) {
  if (!phoneStr) return "";

  // Remove all non-digit characters
  const digitsOnly = phoneStr.replace(/\D/g, '');
  
  // Optional: You can add further validation here (e.g., check length)
  return digitsOnly;
}

/**
* Constructs a Profile instance from the provided API data.
* @param {Object} apiData - The API response object containing resume data.
* @returns {Profile} - The constructed Profile instance.
*/
function constructProfile(apiData) {
  const profile = new Profile();

  // Helper function to safely get the first element of an array or return the value itself
  const getValue = (value) => {
      if (Array.isArray(value)) {
          return value.length > 0 ? value[0] : "";
      }
      return value || "";
  };

  // Assign simple fields
  profile.firstName = getValue(apiData.firstname);
  profile.lastName = getValue(apiData.lastname);
  profile.email = getValue(apiData.email);
  profile.phoneNumber = formatPhoneNumber(getValue(apiData.phonenumber));

  profile.address = (getValue(apiData.addressline1) !== "<UNKNOWN>") ? getValue(apiData.addressline1) : "";
  profile.address2 = (getValue(apiData.addressline2) !== "<UNKNOWN>") ? getValue(apiData.addressline2) : "";
  profile.city = getValue(apiData.city);
  profile.province = getValue(apiData.province);
  profile.postalCode = (getValue(apiData.postalcode) !== "<UNKNOWN>") ? getValue(apiData.postalcode) : "";

  // URLs
  profile.linkedIn = (getValue(apiData.linkedin) && getValue(apiData.linkedin) !== "<UNKNOWN>") ? `https://${getValue(apiData.linkedin)}` : "";
  profile.githubProfile = (getValue(apiData.github) && getValue(apiData.github) !== "<UNKNOWN>") ? `https://${getValue(apiData.github)}` : "";
  profile.website = (getValue(apiData.website) && getValue(apiData.website) !== "<UNKNOWN>") ? `https://${getValue(apiData.website)}` : "";
  profile.portfolio = (getValue(apiData.portfolio) && getValue(apiData.portfolio) !== "<UNKNOWN>") ? `https://${getValue(apiData.portfolio)}` : "";

  // Handle Work Experience
  const companies = Array.isArray(apiData.jobcompany) ? apiData.jobcompany : [];
  const jobTitles = Array.isArray(apiData.jobtitle) ? apiData.jobtitle : [];
  const locations = Array.isArray(apiData.joblocation) ? apiData.joblocation : [];
  const startDates = Array.isArray(apiData.jobstartdate) ? apiData.jobstartdate : [];
  const endDates = Array.isArray(apiData.jobenddate) ? apiData.jobenddate : [];
  const roleDescriptions = Array.isArray(apiData.jobroledescription) ? apiData.jobroledescription : [];

  companies.forEach((company, index) => {
      const work = new WorkExperience();
      work.company = company || "";
      work.jobTitle = jobTitles[index] || "";
      work.location = locations[index] || "";
      work.startDate = formatDate(startDates[index] || "");
      work.endDate = formatDate(endDates[index] || "");
      work.roleDescription = roleDescriptions[index] || "";
      profile.workExperience.push(work);
  });

  // Handle Education
  const universities = Array.isArray(apiData.university) ? apiData.university : [];
  const fieldOfStudies = Array.isArray(apiData.fieldofstudy) ? apiData.fieldofstudy : [];
  const eduStartDates = Array.isArray(apiData.degreestartdate) ? apiData.degreestartdate : [];
  const eduEndDates = Array.isArray(apiData.degreeenddate) ? apiData.degreeenddate : [];
  const gpas = Array.isArray(apiData.gpa) ? apiData.gpa : [];

  universities.forEach((university, index) => {
      const edu = new Education();
      edu.university = university || "";

      // Assuming 'fieldofstudy' contains both degree and field separated by comma
      if (fieldOfStudies[index]) {
          const [degree, field] = fieldOfStudies[index].split(",").map(s => s.trim());
          edu.degree = degree || "";
          edu.fieldOfStudy = field || "";
      }

      edu.startDate = formatDate(eduStartDates[index] || "");
      edu.endDate = formatDate(eduEndDates[index] || "");
      edu.gpa = (gpas[index] && gpas[index] !== "<UNKNOWN>") ? gpas[index] : "";
      profile.education.push(edu);
  });

  // Assign Diversity fields if available
  profile.gender = getValue(apiData.gender);
  profile.race = getValue(apiData.race);
  profile.accessibility = getValue(apiData.accessibility) || "No";
  profile.veteran = getValue(apiData.veteran) || "No";
  profile.legal = getValue(apiData.legal) || "No";
  profile.authorizedToWork = getValue(apiData.authorizedToWork) || "Yes";
  profile.nonCompeteDisclosure = getValue(apiData.nonCompeteDisclosure) || "No";

  return profile;
}

function smartSetup() {
  console.log("running smartsetup");
    const fileName = document.getElementById('fileName').textContent;
    console.log(fileName);
    const options = {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer 3ae93dfe4aff421787d1f0f8e0464a91',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "user_id": "JKN6WFfBqzVwBCNqMCQEkKDy6EA3",
        "saved_item_id": "fmfG6aP8giERQurqp2gtkg",
        "pipeline_inputs": [{"input_name":"resumeName","value":fileName}]
      })
    };
      
      fetch('https://api.gumloop.com/api/v1/start_pipeline', options)
        .then(response => response.json())
        .then(data => {
            console.log('smart setup Response:', data);
            runSmartSetupID = data.run_id;
            const options = {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${GUMLOOP_API_KEY}`
              }
            };
          
            // Poll every 5 seconds
            const intervalId = setInterval(() => {
              fetch(`https://api.gumloop.com/api/v1/get_pl_run?run_id=${runSmartSetupID}&user_id=JKN6WFfBqzVwBCNqMCQEkKDy6EA3`, options)
                .then((response) => response.json())
                .then((data) => {
                  console.log('Polling response:', data);
                  
                  if (data.state === 'DONE') {
                    console.log("done");
                    // Stop polling
                    let smartSetupJSON = data.outputs;
                    console.log(smartSetupJSON);
                    console.log(smartSetupJSON.firstName);
                    
                    smartSetupJSON = constructProfile(smartSetupJSON);
                    chrome.storage.local.set({ smartSetupJSON }, () => {
                      //alert("Profile saved successfully!");
                      console.log("Saved Profile:", smartSetupJSON); // For debugging
              
                      // Reload the profile to ensure form is updated with saved data
                    });
                    
                    clearInterval(intervalId);
                  }
                })
                .catch((err) => {
                  console.error('Error in getResponse:', err);
                });
            }, 5000); // 5000 ms = 5 secon
            })
        .catch(err => console.error(err));
}

function addToSheets() {
    const googleSheetLink = document.getElementById("googleSheetLink")?.value.trim();
    const jobInput = document.getElementById("jobProfile")?.value.trim();
    const linkedin = document.getElementById("linkedin")?.value.trim();
    // alert(`Generating coversheet using the Google Sheet link: ${googleSheetLink} and ${jobInput} and ${linkedin}`);

    const options = {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer 3ae93dfe4aff421787d1f0f8e0464a91',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "user_id": "JKN6WFfBqzVwBCNqMCQEkKDy6EA3",
          "saved_item_id": "aFwE7UFbwv1fSbHreoDszM",
          "pipeline_inputs": [{"input_name":"linkedinURL","value":"https://www.linkedin.com/in/jason-shao-751686189/"},
            {"input_name":"googlesheetlink","value":googleSheetLink},
            {"input_name":"jobdescriptionurl","value":jobInput}]
        })
      };

  fetch('https://api.gumloop.com/api/v1/start_pipeline', options)
    .then(response => response.json())  // parse response as JSON
    .then(data => {
      console.log('API Response:', data);
      runGoogleSheetID = data.run_id;
      getResponse(runGoogleSheetID);
    })
    .catch(err => {
      console.error('API Error:', err);
      alert('API call failed. Check console for details.');
    });
}

function getResponse(runid) {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${GUMLOOP_API_KEY}`
      }
    };
  
    // Poll every 5 seconds
    const intervalId = setInterval(() => {
      fetch(`https://api.gumloop.com/api/v1/get_pl_run?run_id=${runid}&user_id=JKN6WFfBqzVwBCNqMCQEkKDy6EA3`, options)
        .then((response) => response.json())
        .then((data) => {
          console.log('Polling response:', data);
          
          if (data.state === 'DONE') {
            console.log("done");
            // Stop polling
            clearInterval(intervalId);
            // Place the response in the textbox
            const resultDiv = document.getElementById('myResultDiv');
              if (resultDiv) {
                // Adjust property name as needed depending on your API's response structure
                console.log(data.outputs)
                resultDiv.textContent = data.outputs['coverletter'] || 'Cover letter is ready!';
              }
            //luis 
          }
        })
        .catch((err) => {
          console.error('Error in getResponse:', err);
        });
    }, 5000); // 5000 ms = 5 seconds
  }

function generateCoverLetter() {
    const jobInput = document.getElementById("jobProfile")?.value.trim();
    const linkedin = document.getElementById("linkedin")?.value.trim();
    
    const options = {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer 3ae93dfe4aff421787d1f0f8e0464a91',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "user_id": "JKN6WFfBqzVwBCNqMCQEkKDy6EA3",
          "saved_item_id": "8WBD2zQ5YtHCN9JtkxmFMZ",
          "pipeline_inputs": [{"input_name":"LinkedInURL","value":"https://www.linkedin.com/in/jason-shao-751686189/"},{"input_name":"jobdescriptionurl","value":jobInput}]
        })
     };

    fetch('https://api.gumloop.com/api/v1/start_pipeline', options)
        .then(response => response.json())  // parse response as JSON
        .then(data => {
            console.log('generateCoverLetter Response:', data);
            runCoverLetterID = data.run_id;

            const options = {
                method: 'GET',
                headers: {
                  Authorization: `Bearer ${GUMLOOP_API_KEY}`
                }
              };
              const intervalId = setInterval(() => {
                fetch(`https://api.gumloop.com/api/v1/get_pl_run?run_id=${runCoverLetterID}&user_id=JKN6WFfBqzVwBCNqMCQEkKDy6EA3`, options)
                  .then((response) => response.json())
                  .then((data) => {
                    console.log('Polling response:', data);
                    const comment = document.getElementById("generateCoversheetComment");
                    comment.textContent = "processing..."
                    if (data.state === 'DONE') {
                        console.log("done");
                      // Place the response in the textbox
                        const docxUrl = data.outputs.coverletter;
                        const link = document.createElement('a');
                        comment.textContent = "DONE"
                        link.href = docxUrl;
                        link.download = 'coverletter.docx'; // The name to give the downloaded file
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        // comment.textContent = "download";

                        clearInterval(intervalId);

                        // comment.click();
                    }
                  })
                  .catch((err) => {
                    console.error('Error in getResponse:', err);
                  });
              }, 5000); // 5000 ms = 5 seconds
        })
        .catch(err => {
        console.error('generateCoverLetter Error:', err);
        });
}

// Listen for a button click
// document.addEventListener('DOMContentLoaded', () => {
//   const triggerButton = document.getElementById('triggerButton');
//   const responseButton = document.getElementById('getResponseButton');
//   document.getElementById('generateButton').addEventListener('click', generateCoverLetter);
//   document.getElementById('smartSetup').addEventListener('click', smartSetup);
// });
