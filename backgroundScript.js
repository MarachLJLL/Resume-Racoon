document.getElementById("jobProfile").addEventListener("input", () => {
    const jobInput = document.getElementById("jobProfile").value.trim();
    const generateCoversheetBtn = document.getElementById("generateCoversheetBtn");

    if (jobInput) {
        generateCoversheetBtn.disabled = false;
        generateCoversheetBtn.style.opacity = "1"; // Normal opacity
        generateCoversheetBtn.style.cursor = "pointer"; // Allow clicking
    } else {
        generateCoversheetBtn.disabled = true;
        generateCoversheetBtn.style.opacity = "0.5"; // Faded appearance
        generateCoversheetBtn.style.cursor = "not-allowed"; // Prevent clicking
    }
});

function updateButtonStates() {
    const jobInput = document.getElementById("jobProfile").value.trim();
    const googleSheetInput = document.getElementById("googleSheetLink").value.trim();
    const generateCoversheetBtn = document.getElementById("generateCoversheetBtn");
    const addJobBtn = document.getElementById("addJobBtn");

    // Enable or disable Generate Cover Sheet button
    if (jobInput) {
        generateCoversheetBtn.disabled = false;
        generateCoversheetBtn.style.opacity = "1";
        generateCoversheetBtn.style.cursor = "pointer";
    } else {
        generateCoversheetBtn.disabled = true;
        generateCoversheetBtn.style.opacity = "0.5";
        generateCoversheetBtn.style.cursor = "not-allowed";
    }

    // Enable or disable Add Job button
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

document.getElementById("jobProfile").addEventListener("input", updateButtonStates);
document.getElementById("googleSheetLink").addEventListener("input", updateButtonStates);


function enableGenerateButton() {
    const googleSheetInput = document.getElementById("googleSheetLink").value.trim();
    const generateButton = document.getElementById("addJobBtn");

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

function generateCoversheet() {
    const googleSheetLink = document.getElementById("googleSheetLink").value.trim();
    if (googleSheetLink) {
        alert(`Generating coversheet using the Google Sheet link: ${googleSheetLink}`);
        // Add your logic here for generating the coversheet.
    } else {
        alert("Please enter a valid Google Sheet link.");
    }
}


function updateJobFeaturesState() {
    const jobInput = document.getElementById("jobProfile").value.trim();
    const generateFeatureSpan = document.getElementById("generateFeature");
    const accordionHeader = document.getElementById("accordion7Header");
    const arrowImage = document.getElementById("arrowClosed7");

    if (jobInput) {
        // Enable the accordion toggle
        generateFeatureSpan.style.color = "#4E4138";
        generateFeatureSpan.style.cursor = "pointer";
        generateFeatureSpan.style.opacity = "1";

        arrowImage.src =
            "https://cdn.discordapp.com/attachments/1330221441677004876/1332823080367816819/caret-right-svgrepo-com.png?ex=6796a7b9&is=67955639&hm=c7346d18c9b7a38b107b2ee288757c4aadef67454a6ebf5ea8d262587424a51a&";

        accordionHeader.classList.remove("disabled-state");
        accordionHeader.classList.add("enabled-state");
    } else {
        // Disable the accordion toggle
        generateFeatureSpan.style.color = "#ccc";
        generateFeatureSpan.style.cursor = "not-allowed";
        generateFeatureSpan.style.opacity = "0.5";

        arrowImage.src =
            "https://cdn.discordapp.com/attachments/1330221441677004876/1332823080367816819/caret-right-svgrepo-com.png?ex=6796a7b9&is=67955639&hm=c7346d18c9b7a38b107b2ee288757c4aadef67454a6ebf5ea8d262587424a51a&";

        accordionHeader.classList.add("disabled-state");
        accordionHeader.classList.remove("enabled-state");
    }
}

function toggleAccordion(accordionId, imageId1, imageId2) {
    const accordion = document.getElementById(accordionId);
    const content = accordion.querySelector(".accordion-content");
    const image = document.getElementById(imageId1);
    const accordionHeader = document.querySelector(`#${accordionId} .accordion-header`);

    // Ensure toggling is allowed
    if (accordionHeader.getAttribute("data-clickable") === "true") {
        if (content.style.display === "block") {
            content.style.display = "none";
            image.src =
                "https://media.discordapp.net/attachments/1330221441677004876/1332823080367816819/caret-right-svgrepo-com.png";
        } else {
            content.style.display = "block";
            image.src =
                "https://cdn.discordapp.com/attachments/1332823197543829606/1332979298050510921/caret-right-svgrepo-com_1.png?ex=67973936&is=6795e7b6&hm=1c22392071f8d347f7c4beb89e27f79cfab773b9235ba74383cf6f106b828b25&";
        }
    }
}


let educationCount = 0;

function addEducation() {
    educationCount++;

    const educationContainer = document.getElementById("educationContainer");

    const educationForm = document.createElement("div");
    educationForm.classList.add("education-form");
    educationForm.setAttribute("id", `education-form-${educationCount}`);

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

    const experienceForm = document.createElement("div");
    experienceForm.classList.add("experience-form");
    experienceForm.setAttribute("id", `experience-form-${experienceCount}`);

    experienceForm.innerHTML = `
        <div class="form-group">
            <label for="jobTitle-${experienceCount}">Job Title:</label>
            <input type="text" id="jobTitle-${experienceCount}" name="jobTitle" placeholder="Enter your job title" required>
        </div>
        <div class="form-group">
            <label for="company-${experienceCount}">Company:</label>
            <input type="text" id="company-${experienceCount}" name="company" placeholder="Enter company name" required>
        </div>
        <div class="form-group">
            <label for="location-${experienceCount}">Location:</label>
            <input type="text" id="location-${experienceCount}" name="location" placeholder="Enter job location" required>
        </div>
        <div class="form-group">
            <label for="startDate-${experienceCount}">Start Date:</label>
            <input type="date" id="startDate-${experienceCount}" name="startDate" required>
        </div>
        <div class="form-group">
            <label for="endDate-${experienceCount}">End Date:</label>
            <input type="date" id="endDate-${experienceCount}" name="endDate">
        </div>
        <div class="form-group">
            <label for="roleDescription-${experienceCount}">Role Description:</label>
            <textarea id="roleDescription-${experienceCount}" name="roleDescription" placeholder="Describe your responsibilities" rows="4" required></textarea>
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

function handleFileUpload() {
    const fileInput = document.getElementById('fileUpload');
    const fileName = document.getElementById('fileName');
    const removeResumeBtn = document.getElementById('removeResumeBtn');

    if (fileInput.files.length > 0) {
        fileName.textContent = fileInput.files[0].name;
        removeResumeBtn.style.display = 'block';
    } else {
        fileName.textContent = 'Upload resume';
        removeResumeBtn.style.display = 'none';
    }
}

function removeResume() {
    const fileInput = document.getElementById('fileUpload');
    const fileName = document.getElementById('fileName');
    const removeResumeBtn = document.getElementById('removeResumeBtn');

    // Clear file input and update UI
    fileInput.value = '';
    fileName.textContent = 'Upload resume';
    removeResumeBtn.style.display = 'none';

    // Recheck the conditions for enabling the button
    updateGatherInfoButton();
}


function handleLinkedInEnter(event) {
    if (event.key === "Enter") {
        const inputField = document.getElementById("linkedinProfile");
        const displaySpan = document.getElementById("linkedinDisplay");

        const inputValue = inputField.value.trim();
        if (inputValue) {
            displaySpan.textContent = inputValue;
            inputField.style.display = "none";
            displaySpan.style.display = "inline-block";

            // Add a class to change the background color
            displaySpan.classList.add("editable-highlight");
        }
    }
}

function editLinkedInText() {
    const inputField = document.getElementById("linkedinProfile");
    const displaySpan = document.getElementById("linkedinDisplay");

    inputField.style.display = "inline-block";
    displaySpan.style.display = "none";
    inputField.value = displaySpan.textContent; // Load current text into input
    inputField.focus();

    // Remove the highlight class when editing
    displaySpan.classList.remove("editable-highlight");
}


function toggleAccordion(accordionId, imageId1, imageId2) {
    const accordion = document.getElementById(accordionId);
    const content = accordion.querySelector('.accordion-content');
    const image = document.getElementById(imageId1);

    if (content.style.display === 'block') {
        content.style.display = 'none';
        image.src = `https://media.discordapp.net/attachments/1330221441677004876/1332823080367816819/caret-right-svgrepo-com.png?ex=6796a7b9&is=67955639&hm=c7346d18c9b7a38b107b2ee288757c4aadef67454a6ebf5ea8d262587424a51a&=&format=webp&quality=lossless&width=1132&height=1132`;
    } else {
        content.style.display = 'block';
        image.src = `https://cdn.discordapp.com/attachments/1330221441677004876/1332823068585885726/caret-down-svgrepo-com.png?ex=6796a7b6&is=67955636&hm=2bda584bab2aab37b0d885c9127ba90873876d82a83628058101556cc4bf0c44&`; // Replace with second image URL
    }
}

function updateGatherInfoButton() {
    const linkedinInput = document.getElementById("linkedinProfile").value.trim();
    const fileUploaded = document.getElementById("fileUpload").files.length > 0;
    const gatherInfoBtn = document.getElementById("gatherInfoBtn");

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

document.getElementById("linkedinProfile").addEventListener("input", updateGatherInfoButton);
document.getElementById("fileUpload").addEventListener("change", updateGatherInfoButton);

function gatherInformation() {
    alert("Gathering information from LinkedIn and Resume!");
}