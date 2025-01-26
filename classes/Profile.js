// Define the classes
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

    // Helper function to safely get the first element of an array
    const getFirst = (arr) => (Array.isArray(arr) && arr.length > 0 ? arr[0] : "");

    // Assign simple fields
    profile.firstName = getFirst(apiData.firstname) || "";
    profile.lastName = getFirst(apiData.lastname) || "";
    profile.email = getFirst(apiData.email) || "";
    profile.phoneNumber = formatPhoneNumber(getFirst(apiData.phonenumber)) || "";

    profile.address = (getFirst(apiData.addressline1) !== "<UNKNOWN>") ? getFirst(apiData.addressline1) : "";
    profile.address2 = (getFirst(apiData.addressline2) !== "<UNKNOWN>") ? getFirst(apiData.addressline2) : "";
    profile.city = getFirst(apiData.city) || "";
    profile.province = getFirst(apiData.province) || "";
    profile.postalCode = (getFirst(apiData.postalcode) !== "<UNKNOWN>") ? getFirst(apiData.postalcode) : "";

    // URLs
    profile.linkedIn = (apiData.linkedin && apiData.linkedin[0] !== "<UNKNOWN>") ? `https://${apiData.linkedin[0]}` : "";
    profile.githubProfile = (apiData.github && apiData.github[0] !== "<UNKNOWN>") ? `https://${apiData.github[0]}` : "";
    profile.website = (apiData.website && apiData.website[0] !== "<UNKNOWN>") ? `https://${apiData.website[0]}` : "";
    profile.portfolio = (apiData.portfolio && apiData.portfolio[0] !== "<UNKNOWN>") ? `https://${apiData.portfolio[0]}` : "";

    // Handle Work Experience
    if (apiData.jobcompany && Array.isArray(apiData.jobcompany[0])) {
        const companies = apiData.jobcompany[0];
        const jobTitles = (apiData.jobtitle && Array.isArray(apiData.jobtitle[0])) ? apiData.jobtitle[0] : [];
        const locations = (apiData.joblocation && Array.isArray(apiData.joblocation[0])) ? apiData.joblocation[0] : [];
        const startDates = (apiData.jobstartdate && Array.isArray(apiData.jobstartdate[0])) ? apiData.jobstartdate[0] : [];
        const endDates = (apiData.jobenddate && Array.isArray(apiData.jobenddate[0])) ? apiData.jobenddate[0] : [];
        const roleDescriptions = (apiData.jobroledescription && Array.isArray(apiData.jobroledescription[0])) ? apiData.jobroledescription[0] : [];

        companies.forEach((company, index) => {
            const work = new WorkExperience();
            work.company = company || "";
            work.jobTitle = jobTitles[index] || "";
            work.location = locations[index] || "";
            work.startDate = formatDate(startDates[index] || "");
            work.endDate = formatDate(endDates[index] || "");
            work.roleDescription = roleDescriptions[index] ||z "";
            profile.workExperience.push(work);
        });
    }

    // Handle Education
    if (apiData.university && Array.isArray(apiData.university[0])) {
        const universities = apiData.university[0];
        const fieldOfStudies = (apiData.fieldofstudy && Array.isArray(apiData.fieldofstudy[0])) ? apiData.fieldofstudy[0] : [];
        const startDates = (apiData.degreestartdate && Array.isArray(apiData.degreestartdate[0])) ? apiData.degreestartdate[0] : [];
        const endDates = (apiData.degreeenddate && Array.isArray(apiData.degreeenddate[0])) ? apiData.degreeenddate[0] : [];
        const gpas = (apiData.gpa && Array.isArray(apiData.gpa[0])) ? apiData.gpa[0] : [];

        universities.forEach((university, index) => {
            const edu = new Education();
            edu.university = university || "";

            // Assuming 'fieldofstudy' contains both degree and field separated by comma
            if (fieldOfStudies[index]) {
                const [degree, field] = fieldOfStudies[index].split(",").map(s => s.trim());
                edu.degree = degree || "";
                edu.fieldOfStudy = field || "";
            }

            edu.startDate = formatDate(startDates[index] || "");
            edu.endDate = formatDate(endDates[index] || "");
            edu.gpa = (gpas[index] && gpas[index] !== "<UNKNOWN>") ? gpas[index] : "";
            profile.education.push(edu);
        });
    }

    // Assign Diversity fields if available
    profile.gender = getFirst(apiData.gender) || "";
    profile.race = getFirst(apiData.race) || "";
    profile.accessibility = getFirst(apiData.accessibility) || "No";
    profile.veteran = getFirst(apiData.veteran) || "No";
    profile.legal = getFirst(apiData.legal) || "No";
    profile.authorizedToWork = getFirst(apiData.authorizedToWork) || "Yes";
    profile.nonCompeteDisclosure = getFirst(apiData.nonCompeteDisclosure) || "No";

    return profile;
}

// Example usage:
const apiData = {
    "addressline1": ["<UNKNOWN>"],
    "addressline2": ["<UNKNOWN>"],
    "city": ["Montreal"],
    "degreeenddate": [["May 2022", "May 2022"]],
    "degreestartdate": [["Sep. 2019", "Sep. 2019"]],
    "email": ["tianzhen.shao@mail.mcgill.ca"],
    "fieldofstudy": [["Bachelor of Software Engineering, Minor in Applied Artificial Intelligence", "High School Diploma"]],
    "firstname": ["Jason"],
    "github": ["<UNKNOWN>"],
    "gpa": [["<UNKNOWN>", "<UNKNOWN>"]],
    "jobcompany": [["Airbus Canada", "Langying Education", "Jaguar Land Rover"]],
    "jobenddate": [["May 2027", "Aug 2021", "Aug 2023"]],
    "joblocation": [["Montreal, QC", "Shanghai, China", "Shanghai, China"]],
    "jobroledescription": [["Proposed and Integrated 20+ solutions for data tracker tool using Google Apps Script to eliminate stale data and automate the certification processes, overall enhancing workflow efficiency to save up to 30+ hours per week. Developed 5+ dashboards by querying data from SQL databases and Excel, integrating it into QlikSense to visualize real-time certification process data and provide data-driven recommendations for product improvement.",
        "Developed the teacher-student interaction software using JavaScript, HTML/CSS, and VUE.js framework to beautify and improve the user experience.",
        "Assisted in the development and execution of procurement strategies, negotiated with suppliers to optimize cost savings and efficiency, and actively engaged in workshops, such as AWS cloud services."
    ]],
    "jobstartdate": [["Sep. 2022", "Jun. 2021", "May 2023"]],
    "jobtitle": [["Software Development Intern", "Front-end Developer Intern", "Purchasing Intern"]],
    "lastname": ["Shao"],
    "linkedin": ["linkedin.com/in/jason-shao"],
    "phonenumber": ["438-370-9345"],
    "portfolio": ["jasonshaoportfolio.com"],
    "postalcode": ["<UNKNOWN>"],
    "province": ["QC"],
    "university": [["McGill University", "Stanstead College"]],
    "website": ["jasonshaoportfolio.com"]
};

// Construct the Profile instance
const userProfile = constructProfile(apiData);
let p = userProfile;

// Log the Profile to verify
console.log(userProfile);
let profile = p
chrome.storage.local.set({ profile }, () => {
    //alert("Profile saved successfully!");
    console.log("Saved Profile:", profile); // For debugging

    // Reload the profile to ensure form is updated with saved data
    loadProfilePromise();
});