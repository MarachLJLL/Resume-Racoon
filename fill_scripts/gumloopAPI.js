var runCoverLetterID = "";
var runSmartSetupID = "";
var runGoogleSheetID = "";
const GUMLOOP_API_KEY = '3ae93dfe4aff421787d1f0f8e0464a91';

function uploadResume(){
    const options = {
        method: 'POST',
        headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
        body: '{"file_name":"<string>","file_content":"aSDinaTvuI8gbWludGxpZnk=","user_id":"JKN6WFfBqzVwBCNqMCQEkKDy6EA3","project_id":"<string>"}'
      };
      
      fetch('https://api.gumloop.com/api/v1/upload_file', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}


function smartSetup() {
    const options = {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer 3ae93dfe4aff421787d1f0f8e0464a91',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "user_id": "JKN6WFfBqzVwBCNqMCQEkKDy6EA3",
          "saved_item_id": "fmfG6aP8giERQurqp2gtkg",
          "pipeline_inputs": []
        })
      };
      
      fetch('https://api.gumloop.com/api/v1/start_pipeline', options)
        .then(response => response.json())
        .then(data => {
            console.log('smart setup Response:', data);
            runSmartSetupID = data.run_id;
            console.log(runSmartSetupID)
            getResponse(runSmartSetupID);
            })
        .catch(err => console.error(err));
}

function addToSheets() {
    const googleSheetLink = document.getElementById("googleSheetLink")?.value.trim();
    const jobInput = document.getElementById("jobProfile")?.value.trim();
    const linkedin = document.getElementById("linkedinProfile")?.value.trim();
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
          "pipeline_inputs": [{"input_name":"linkedinURL","value":linkedin},
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
    const linkedin = document.getElementById("linkedinProfile")?.value.trim();
    
    const options = {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer 3ae93dfe4aff421787d1f0f8e0464a91',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "user_id": "JKN6WFfBqzVwBCNqMCQEkKDy6EA3",
          "saved_item_id": "8WBD2zQ5YtHCN9JtkxmFMZ",
          "pipeline_inputs": [{"input_name":"LinkedInURL","value":linkedin},{"input_name":"jobdescriptionurl","value":jobInput}]
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
