const dropZone = document.getElementById('fileUpload');
const uploadResult = document.getElementById('fileName');

// Handle file drop
dropZone.addEventListener('drop', async (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');

    const files = e.dataTransfer.files;
    if (!files || files.length === 0) {
    alert('No file dropped.');
    return;
    }

    // We only handle one PDF in this example
    const file = files[0];
    if (file.type !== 'application/pdf') {
    alert('Please drop a valid PDF file.');
    return;
    }

    // Display uploading message
    uploadResult.innerHTML = 'Uploading...';

    try {
    // Upload to file.io (example of ephemeral hosting)
    // They accept multipart/form-data via POST: 
    // https://www.file.io/#curl-curl-form-upload
    const formData = new FormData();
    formData.append('file', file);

    // Make request
    const response = await fetch('https://api.file.io/upload', {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('file.io result:', result);

    if (result.link) {
        // Show the ephemeral link
        uploadResult.innerHTML = `
        <p>File uploaded successfully!</p>
        <p>Download/Access Link (Expires on first download or after some time):</p>
        <a href="${result.link}" target="_blank">${result.link}</a>
        `;
        
        // This is the link you’d send to Gumloop
        // e.g. gumloopApiCall(result.link);
    } else {
        uploadResult.innerHTML = `
        <p>Something went wrong. file.io did not return a link.</p>
        `;
    }
    } catch (error) {
    console.error(error);
    uploadResult.innerHTML = `<p>Error: ${error.message}</p>`;
    }
});


















const fs = require('fs');
const https = require('https');


/**
 * Upload a file to transfer.sh and get a temporary public download link.
 *
 * @param {string} filePath - The local path to your PDF file
 * @param {string} fileName - The name you want the file to have on transfer.sh
 * @returns {Promise<string>} - A promise that resolves to the download URL
 */
function uploadToTransferSh(filePath, fileName) {
  return new Promise((resolve, reject) => {
    const fileData = fs.readFileSync(filePath);
    const options = {
      hostname: 'transfer.sh',
      path: `/${fileName}`,
      method: 'PUT',
      headers: {
        'Content-Length': fileData.length
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(body.trim());
        } else {
          reject(new Error(`Upload failed: ${res.statusCode} - ${body}`));
        }
      });
    });

    req.on('error', reject);
    req.write(fileData);
    req.end();
  });
}

// Example usage:
uploadToTransferSh('./example.pdf', 'example.pdf')
  .then(link => {
    console.log('PDF is uploaded. Public link:', link);

    // Now you can pass this `link` to the Gumloop API, for example:
    // await gumloopApiCall({ pdfUrl: link });
  })
  .catch(err => {
    console.error('Failed to upload PDF:', err);
  });
