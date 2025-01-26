/************************************
 * popup.js
 * All logic is now here (NO inline JS)
 ************************************/

document.addEventListener('DOMContentLoaded', () => {
    /************************************************
     * 1. Set up all ACCORDION headers (0..7, etc.) *
     ************************************************/
    setupAccordion('accordion0Header');
    setupAccordion('accordion1Header');
    setupAccordion('accordion2Header');
    setupAccordion('accordion3Header');
    setupAccordion('accordion4Header');
    setupAccordion('accordion5Header');
    setupAccordion('accordion6Header');
    setupAccordion('accordion7Header');
  
    /************************************************
     * 2. LinkedIn, File Upload, Remove Resume
     ************************************************/
    const linkedinProfile = document.getElementById('linkedinProfile');
    if (linkedinProfile) {
      // Replaces onkeypress="handleLinkedInEnter(event)"
      linkedinProfile.addEventListener('keypress', handleLinkedInEnter);
    }
  
    const fileUpload = document.getElementById('fileUpload');
    if (fileUpload) {
      fileUpload.addEventListener('change', handleFileUpload);
    }
  
    const removeResumeBtn = document.getElementById('removeResumeBtn');
    if (removeResumeBtn) {
      removeResumeBtn.addEventListener('click', removeResume);
    }
  
    /************************************************
     * 3. "Gather Info" button
     ************************************************/
    const gatherInfoBtn = document.getElementById('gatherInfoBtn');
    if (gatherInfoBtn) {
      gatherInfoBtn.addEventListener('click', gatherInformation);
    }
  
    /************************************************
     * 4. "Add Education", "Add Experience"
     ************************************************/
    const addEducationBtn = document.getElementById('addEducationBtn');
    if (addEducationBtn) {
      addEducationBtn.addEventListener('click', addEducation);
    }
  
    const addExperienceBtn = document.getElementById('addExperienceBtn');
    if (addExperienceBtn) {
      addExperienceBtn.addEventListener('click', addExperience);
    }
  
    /************************************************
     * 5. "Generate Coversheet", "Add Job" Buttons
     ************************************************/
    const generateCoversheetBtn = document.getElementById('generateCoversheetBtn');
    if (generateCoversheetBtn) {
      generateCoversheetBtn.addEventListener('click', generateCoversheet);
    }
  
    const addJobBtn = document.getElementById('addJobBtn');
    if (addJobBtn) {
      addJobBtn.addEventListener('click', generateCoversheet);
    }
  
    const googleSheetLink = document.getElementById('googleSheetLink');
    if (googleSheetLink) {
      // oninput -> event listener
      googleSheetLink.addEventListener('input', () => {
        enableGenerateButton();
        updateButtonStates();
      });
    }
  
    /************************************************
     * 6. "Job Profile" input -> update features
     ************************************************/
    const jobProfile = document.getElementById('jobProfile');
    if (jobProfile) {
      jobProfile.addEventListener('input', () => {
        updateJobFeaturesState();
        updateButtonStates();
      });
    }
  
    /************************************************
     * 7. Auto-Fill button
     ************************************************/
    const autoFillBtn = document.getElementById('autoFillBtn');
    if (autoFillBtn) {
      autoFillBtn.addEventListener('click', autoFill);
    }
  
    /************************************************
     * Run initial checks for button states
     ************************************************/
    updateGatherInfoButton();
    updateButtonStates();
  });
  
  /************************************************
   * Helper: Set up an accordion by ID
   ************************************************/
  function setupAccordion(headerId) {
    const headerElement = document.getElementById(headerId);
    if (!headerElement) return;
  
    // The "data-accordion-target" is the content's id
    const contentId    = headerElement.dataset.accordionTarget;
    const arrowClosed  = headerElement.dataset.arrowClosed;
    const arrowDown    = headerElement.dataset.arrowDown;
  
    headerElement.addEventListener('click', () => {
      toggleAccordion(contentId, arrowClosed, arrowDown);
    });
  }
  
  /************************************************
   * toggleAccordion function
   ************************************************/
  function toggleAccordion(contentId, imageId1, imageId2) {
    const content = document.getElementById(contentId);
    const image   = document.getElementById(imageId1);
    if (!content || !image) return;
  
    if (content.style.display === 'block') {
      content.style.display = 'none';
      image.src = "https://media.discordapp.net/attachments/1330221441677004876/1332823080367816819/caret-right-svgrepo-com.png?ex=6796a7b9&is=67955639&hm=c7346d18c9b7a38b107b2ee288757c4aadef67454a6ebf5ea8d262587424a51a&=&format=webp&quality=lossless&width=1132&height=1132";
    } else {
      content.style.display = 'block';
      image.src = "https://cdn.discordapp.com/attachments/1330221441677004876/1332823068585885726/caret-down-svgrepo-com.png?ex=6796a7b6&is=67955636&hm=2bda584bab2aab37b0d885c9127ba90873876d82a83628058101556cc4bf0c44&";
    }
  }
  
  /************************************************
   * handleLinkedInEnter (keyPress)
   ************************************************/
  function handleLinkedInEnter(event) {
    if (event.key === "Enter") {
      const inputField  = document.getElementById("linkedinProfile");
      const displaySpan = document.getElementById("linkedinDisplay");
      if (!inputField || !displaySpan) return;
  
      const inputValue = inputField.value.trim();
      if (inputValue) {
        displaySpan.textContent = inputValue;
        inputField.style.display = "none";
        displaySpan.style.display = "inline-block";
  
        // Add a highlight class
        displaySpan.classList.add("editable-highlight");
      }
    }
  }
  
  /************************************************
   * File Upload / Resume
   ************************************************/
  function handleFileUpload() {
    const fileInput      = document.getElementById('fileUpload');
    const fileName       = document.getElementById('fileName');
    const removeResumeBtn= document.getElementById('removeResumeBtn');
    if (!fileInput || !fileName || !removeResumeBtn) return;
  
    if (fileInput.files.length > 0) {
      fileName.textContent = fileInput.files[0].name;
      removeResumeBtn.style.display = 'block';
    } else {
      fileName.textContent = 'Upload resume';
      removeResumeBtn.style.display = 'none';
    }
    updateGatherInfoButton();
  }
  
  function removeResume() {
    const fileInput      = document.getElementById('fileUpload');
    const fileName       = document.getElementById('fileName');
    const removeResumeBtn= document.getElementById('removeResumeBtn');
    if (!fileInput || !fileName || !removeResumeBtn) return;
  
    fileInput.value = '';
    fileName.textContent = 'Upload resume';
    removeResumeBtn.style.display = 'none';
    updateGatherInfoButton();
  }
  
  /************************************************
   * "Gather Info" Button
   ************************************************/
  function gatherInformation() {
    alert("Gathering information from LinkedIn and Resume!");
  }
  
  function updateGatherInfoButton() {
    const linkedinInput = document.getElementById("linkedinProfile")?.value.trim();
    const fileUploaded  = document.getElementById("fileUpload")?.files.length > 0;
    const gatherInfoBtn = document.getElementById("gatherInfoBtn");
    if (!gatherInfoBtn) return;
  
    if (linkedinInput && fileUploaded) {
      gatherInfoBtn.disabled = false;
      gatherInfoBtn.style.opacity = "1";
      gatherInfoBtn.style.cursor = "pointer";
    } else {
      gatherInfoBtn.disabled = true;
      gatherInfoBtn.style.opacity = "0.5";
      gatherInfoBtn.style.cursor = "not-allowed";
    }
  }
  
  /************************************************
   * "Add Education" / "Add Experience"
   ************************************************/
  let educationCount = 0;
  function addEducation() {
    educationCount++;
    const educationContainer = document.getElementById("educationContainer");
    if (!educationContainer) return;
  
    const educationForm = document.createElement("div");
    educationForm.classList.add("education-form");
    educationForm.id = `education-form-${educationCount}`;
  
    educationForm.innerHTML = `
      <div class="form-group">
          <label for="university-${educationCount}">University/Institution:</label>
          <input type="text" id="university-${educationCount}" name="university">
      </div>
      <div class="form-group">
          <label for="degree-${educationCount}">Degree:</label>
          <select id="degree-${educationCount}" name="degree">
              <option value="" disabled selected>Select your degree</option>
              <option value="High School Diploma">High School Diploma</option>
              <option value="GED">GED (General Educational Development)</option>
              <option value="Associate's Degree">Associate's Degree</option>
              <option value="Bachelor's Degree">Bachelor's Degree</option>
              <option value="Master's Degree">Master's Degree</option>
              <option value="Doctorate">Doctorate</option>
              <option value="College Degree">College Degree</option>
              <option value="CEGEP">CEGEP</option>
              <option value="Professional Degree">Professional Degree (e.g., MD, JD)</option>
              <option value="Certificate">Certificate</option>
              <option value="Diploma">Diploma</option>
              <option value="Postgraduate Diploma">Postgraduate Diploma</option>
              <option value="Vocational Training">Vocational Training</option>
              <option value="Technical Diploma">Technical Diploma</option>
              <option value="Executive Education">Executive Education</option>
              <option value="Continuing Education">Continuing Education</option>
              <option value="No Formal Education">No Formal Education</option>
          </select>
      </div>
      <div class="form-group">
          <label for="field-${educationCount}">Field of Study:</label>
          <input type="text" id="field-${educationCount}" name="fieldOfStudy">
      </div>
      <div class="form-group">
          <label for="gpa-${educationCount}">GPA:</label>
          <input type="number" id="gpa-${educationCount}" name="gpa" step="0.01" min="0" max="4">
      </div>
      <div class="form-group">
          <label for="startDate-${educationCount}">Start date:</label>
          <input type="date" id="startDate-${educationCount}" name="startDate">
      </div>
      <div class="form-group">
          <label for="endDate-${educationCount}">End date/Expected graduation:</label>
          <input type="date" id="endDate-${educationCount}" name="endDate">
      </div>
      <button class="remove-btn" onclick="removeEducation(${educationCount})">Remove entry</button>
    `;
  
    educationContainer.appendChild(educationForm);
  }
  
  function removeEducation(id) {
    const educationForm = document.getElementById(`education-form-${id}`);
    if (educationForm) {
      educationForm.remove();
    }
  }
  
  let experienceCount = 0;
  function addExperience() {
    experienceCount++;
    const experienceContainer = document.getElementById("experienceContainer");
    if (!experienceContainer) return;
  
    const experienceForm = document.createElement("div");
    experienceForm.classList.add("experience-form");
    experienceForm.id = `experience-form-${experienceCount}`;
  
    experienceForm.innerHTML = `
      <div class="form-group">
          <label for="jobTitle-${experienceCount}">Job Title:</label>
          <input
            type="text"
            id="jobTitle-${experienceCount}"
            name="jobTitle"
            placeholder="Enter your job title"
            required
          >
      </div>
      <div class="form-group">
          <label for="company-${experienceCount}">Company:</label>
          <input
            type="text"
            id="company-${experienceCount}"
            name="company"
            placeholder="Enter company name"
            required
          >
      </div>
      <div class="form-group">
          <label for="location-${experienceCount}">Location:</label>
          <input
            type="text"
            id="location-${experienceCount}"
            name="location"
            placeholder="Enter job location"
            required
          >
      </div>
      <div class="form-group">
          <label for="startDate-${experienceCount}">Start Date:</label>
          <input
            type="date"
            id="startDate-${experienceCount}"
            name="startDate"
            required
          >
      </div>
      <div class="form-group">
          <label for="endDate-${experienceCount}">End Date:</label>
          <input
            type="date"
            id="endDate-${experienceCount}"
            name="endDate"
          >
      </div>
      <div class="form-group">
          <label for="roleDescription-${experienceCount}">Role Description:</label>
          <textarea
            id="roleDescription-${experienceCount}"
            name="roleDescription"
            placeholder="Describe your responsibilities"
            rows="4"
            required
          ></textarea>
      </div>
      <button class="remove-btn" onclick="removeExperience(${experienceCount})">Remove Entry</button>
    `;
  
    experienceContainer.appendChild(experienceForm);
  }
  
  function removeExperience(id) {
    const experienceForm = document.getElementById(`experience-form-${id}`);
    if (experienceForm) {
      experienceForm.remove();
    }
  }
  
  /************************************************
   * Auto Fill
   ************************************************/
  function autoFill() {
    console.log("Auto-Fill 🔥 triggered!");
    // Your logic to autofill the form
  }
  
  /************************************************
   * Generate Coversheet
   ************************************************/
  function generateCoversheet() {
    const googleSheetLink = document.getElementById("googleSheetLink")?.value.trim();
    if (googleSheetLink) {
      alert(`Generating coversheet using the Google Sheet link: ${googleSheetLink}`);
      // Additional logic
    } else {
      alert("Please enter a valid Google Sheet link.");
    }
  }
  
  /************************************************
   * Additional Button States
   ************************************************/
  function enableGenerateButton() {
    const googleSheetInput = document.getElementById("googleSheetLink")?.value.trim();
    const generateButton   = document.getElementById("addJobBtn");
    if (!generateButton) return;
  
    if (googleSheetInput) {
      generateButton.disabled = false;
      generateButton.style.opacity = "1";
      generateButton.style.cursor = "pointer";
    } else {
      generateButton.disabled = true;
      generateButton.style.opacity = "0.5";
      generateButton.style.cursor = "not-allowed";
    }
  }
  
  function updateButtonStates() {
    const jobInput           = document.getElementById("jobProfile")?.value.trim();
    const googleSheetInput   = document.getElementById("googleSheetLink")?.value.trim();
    const generateCoversheetBtn = document.getElementById("generateCoversheetBtn");
    const addJobBtn          = document.getElementById("addJobBtn");
  
    if (generateCoversheetBtn) {
      if (jobInput) {
        generateCoversheetBtn.disabled = false;
        generateCoversheetBtn.style.opacity = "1";
        generateCoversheetBtn.style.cursor = "pointer";
      } else {
        generateCoversheetBtn.disabled = true;
        generateCoversheetBtn.style.opacity = "0.5";
        generateCoversheetBtn.style.cursor = "not-allowed";
      }
    }
  
    if (addJobBtn) {
      if (jobInput && googleSheetInput) {
        addJobBtn.disabled = false;
        addJobBtn.style.opacity = "1";
        addJobBtn.style.cursor = "pointer";
      } else {
        addJobBtn.disabled = true;
        addJobBtn.style.opacity = "0.5";
        addJobBtn.style.cursor = "not-allowed";
      }
    }
  }
  
  /************************************************
   * updateJobFeaturesState
   ************************************************/
  function updateJobFeaturesState() {
    const jobInput = document.getElementById("jobProfile")?.value.trim();
    const generateFeatureSpan = document.getElementById("generateFeature");
    const arrowImage = document.getElementById("arrowClosed7");
  
    if (!generateFeatureSpan || !arrowImage) return;
  
    if (jobInput) {
      generateFeatureSpan.style.color = "#4E4138";
      generateFeatureSpan.style.cursor = "pointer";
      generateFeatureSpan.style.opacity = "1";
      arrowImage.src = "https://media.discordapp.net/attachments/1330221441677004876/1332823080367816819/caret-right-svgrepo-com.png?ex=6796a7b9&is=67955639&hm=c7346d18c9b7a38b107b2ee288757c4aadef67454a6ebf5ea8d262587424a51a&=&format=webp&quality=lossless&width=1132&height=1132";
    } else {
      generateFeatureSpan.style.color = "#ccc";
      generateFeatureSpan.style.cursor = "not-allowed";
      generateFeatureSpan.style.opacity = "0.5";
      arrowImage.src = "https://media.discordapp.net/attachments/1330221441677004876/1332823080367816819/caret-right-svgrepo-com.png?ex=6796a7b9&is=67955639&hm=c7346d18c9b7a38b107b2ee288757c4aadef67454a6ebf5ea8d262587424a51a&=&format=webp&quality=lossless&width=1132&height=1132";
    }
  }
  