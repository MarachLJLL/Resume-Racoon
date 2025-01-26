var runCoverLetterID = "";
var runSmartSetupID = "";
const GUMLOOP_API_KEY = '3ae93dfe4aff421787d1f0f8e0464a91';


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
  const options = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GUMLOOP_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "user_id": "JKN6WFfBqzVwBCNqMCQEkKDy6EA3",
      "saved_item_id": "cx7A71FhpAvVy4iufG7aUm",
      "pipeline_inputs": [
        {"input_name":"LinkedInURL","value":"https://www.linkedin.com/in/jason-shao-751686189/"},
        {"input_name":"JobpostingURL","value":"https://jobs.lever.co/wealthsimple/7feb253c-ca15-40d9-b6cd-fc430138e240"}
      ]
    })
  };

  fetch('https://api.gumloop.com/api/v1/start_pipeline', options)
    .then(response => response.json())  // parse response as JSON
    .then(data => {
      console.log('API Response:', data);
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
  
          // Check if the status is Done
          if (data.state === 'DONE') {
            console.log("done");
            // Stop polling
            clearInterval(intervalId);
  
            // Place the response in the textbox
            // (Replace 'response' with the appropriate key from your data object if it's different)
            const resultDiv = document.getElementById('myResultDiv');
              if (resultDiv) {
                // Adjust property name as needed depending on your API's response structure
                console.log(data.outputs)
                resultDiv.textContent = data.outputs['coverletter'] || 'Cover letter is ready!';
              }
          }
        })
        .catch((err) => {
          console.error('Error in getResponse:', err);
        });
    }, 5000); // 5000 ms = 5 seconds
  }

function generateCoverLetter() {
    const options = {
        method: 'POST',
        headers: {
        'Authorization': `Bearer ${GUMLOOP_API_KEY}`,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        "user_id": "JKN6WFfBqzVwBCNqMCQEkKDy6EA3",
        "saved_item_id": "8WBD2zQ5YtHCN9JtkxmFMZ",
        "pipeline_inputs": [{"input_name":"LinkedInURL","value":"https://www.linkedin.com/in/jason-shao-751686189/"},{"input_name":"JobPostingURL","value":"https://jobs.lever.co/wealthsimple/7feb253c-ca15-40d9-b6cd-fc430138e240"}]
        })
    };

    fetch('https://api.gumloop.com/api/v1/start_pipeline', options)
        .then(response => response.json())  // parse response as JSON
        .then(data => {
        console.log('generateCoverLetter Response:', data);
        runCoverLetterID = data.run_id;
        getResponse(runCoverLetterID);
        })
        .catch(err => {
        console.error('generateCoverLetter Error:', err);
        });
}

// Listen for button click
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('generateButton')
    .addEventListener('click', generateCoverLetter);
});
// Listen for a button click
document.addEventListener('DOMContentLoaded', () => {
  const triggerButton = document.getElementById('triggerButton');
  const responseButton = document.getElementById('getResponseButton');
  document.getElementById('generateButton').addEventListener('click', generateCoverLetter);
  document.getElementById('smartSetup').addEventListener('click', smartSetup)
  if (triggerButton) {
    triggerButton.addEventListener('click', addToSheets);
  }
  if (responseButton) {
    responseButton.addEventListener('click', getResponse);
  }
});
