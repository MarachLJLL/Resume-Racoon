class TextInput {
    constructor(inputElement, profile) {
        this.inputElement = inputElement;
        this.type = inputElement.type;
        this.classification = this._setClassification();
        this.profile = profile
    }

    _setClassification() {
        // Get text that could be used to classify
        const ct = ((this.inputElement.name || "") + (this.inputElement.id || "") + (this.inputElement.autocomplete || "")).toLowerCase();
    
        // For more specific matches, check them first.
        // Otherwise, the first matching pattern will return.
        if (/.*email.*/.test(ct)) {
            return 'email';
        } else if (/.*first.*name.*/.test(ct)) {
            return 'firstName';
        } else if (/.*last.*name.*/.test(ct)) {
            return 'lastName';
        } else if (/.*name.*/.test(ct)) {
            return 'fullName';
        } else if (/.*(phone|tel).*/.test(ct)) {
            return 'phoneNumber';
        } else if (/.*street.*(?:number|#|no).*/.test(ct)) {
            return 'streetAndNumber';
        } else if (/.*address.*/.test(ct)) {
            return 'address';
        } else if (/.*location.*/.test(ct)) {
            return 'address';
        } else if (/.*city.*/.test(ct)) {
            return 'city';
        } else if (/.*(province|state).*/.test(ct)) {
            return 'province';
        } else if (/.*(postal|zip).*/.test(ct)) {
            return 'postalCode';
        } else if (/.*linkedin.*/.test(ct)) {
            return 'linkedinProfile';
        } else if (/.*github.*/.test(ct)) {
            return 'githubProfile';
        } else if (/.*website.*/.test(ct)) {
            return 'website';
        } else if (/.*portfolio.*/.test(ct)) {
            return 'portfolio';
        } else if (/.*university.*name.*/.test(ct)) {
            return 'universityName';
        } else if (/.*(?:expected.*gra|grad|graduation).*/.test(ct)) {
            return 'expectedGraduation';
        } else if (/.*(education|school|degree|uni|college|university).*/.test(ct)) {
            return 'education';
        } else if (/.*diversity.*/.test(ct)) {
            return 'diversity';
        } else if (/.*gender.*/.test(ct)) {
            return 'gender';
        } else if (/.*(race|ethnicity).*/.test(ct)) {
            return 'race';
        } else if (/.*(accessibility|disability).*/.test(ct)) {
            return 'accessibility';
        } else if (/.*(veteran|military).*/.test(ct)) {
            return 'veteran';
        } else if (/.*legal.*/.test(ct)) {
            return 'legal';
        } else if (/.*(authorized.*work|work.*authorization|workauth).*/.test(ct)) {
            return 'authorizedToWork';
        } else if (/.*(non.*compete|non.*disclosure|nda).*/.test(ct)) {
            return 'nonCompeteDisclosure';
        } else if (/.*(experience|exp).*/.test(ct)) {
            return 'experience';
        } else if (/.*project.*/.test(ct)) {
            return 'projects';
        }
        return 'other';
    }
    

    toString() {
        return `
        ------------------------------
            name: ${this.inputElement},
            classification: ${this.classification}
        ------------------------------`;
    }

    log() {
        console.log(this.toString())
        console.log(this.inputElement)
    }

    fill() {
            switch (this.classification) {
                case "email":
                    this.inputElement.value = this.profile.email;
                    break;
                case "firstName":
                    this.inputElement.value = this.profile.firstName;
                    break;
                case "lastName":
                    this.inputElement.value = this.profile.lastName;
                    break;
                case "fullName":
                    this.inputElement.value = this.profile.fullName;
                    break;
                case "phoneNumber":
                    this.inputElement.value = this.profile.phoneNumber;
                    break;
                case "streetAndNumber":
                    this.inputElement.value = this.profile.streetAndNumber;
                    break;
                case "address":
                    this.inputElement.value = this.profile.address;
                    break;
                case "city":
                    this.inputElement.value = this.profile.city;
                    break;
                case "province":
                    this.inputElement.value = this.profile.province;
                    break;
                case "postalCode":
                    this.inputElement.value = this.profile.postalCode;
                    break;
                case "linkedinProfile":
                    this.inputElement.value = this.profile.linkedinProfile;
                    break;
                case "githubProfile":
                    this.inputElement.value = this.profile.githubProfile;
                    break;
                case "website":
                    this.inputElement.value = this.profile.website;
                    break;
                case "portfolio":
                    this.inputElement.value = this.profile.portfolio;
                    break;
                case "universityName":
                    this.inputElement.value = this.profile.universityName;
                    break;
                case "expectedGraduation":
                    this.inputElement.value = this.profile.expectedGraduation;
                    break;
                case "education":
                    this.inputElement.value = this.profile.education;
                    break;
                case "diversity":
                    this.inputElement.value = this.profile.diversity;
                    break;
                case "gender":
                    this.inputElement.value = this.profile.gender;
                    break;
                case "race":
                    this.inputElement.value = this.profile.race;
                    break;
                case "accessibility":
                    this.inputElement.value = this.profile.accessibility;
                    break;
                case "veteran":
                    this.inputElement.value = this.profile.veteran;
                    break;
                case "legal":
                    this.inputElement.value = this.profile.legal;
                    break;
                case "authorizedToWork":
                    this.inputElement.value = this.profile.authorizedToWork;
                    break;
                case "nonCompeteDisclosure":
                    this.inputElement.value = this.profile.nonCompeteDisclosure;
                    break;
                case "experience":
                    this.inputElement.value = this.profile.experience;
                    break;
                case "projects":
                    this.inputElement.value = this.profile.projects;
                    break;
                case "work":
                    this.inputElement.value = this.profile.work;
                    break;
                default:
                    // classification = 'other' or something unmapped
                    this.inputElement.value = "";
                    break;
        }
    }
}

// Example usage
function getAllInputsIncludingIframes() {
    // Collect all input elements from the main document
    const allInputs = [...document.querySelectorAll('input')];

    // Collect all iframes
    const iframes = document.querySelectorAll('iframe');

    // For each iframe, try to get its document and query its inputs
    iframes.forEach((iframe) => {
        try {
            // Same-origin iframes can be accessed via contentDocument or contentWindow.document
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            if (iframeDoc) {
                const iframeInputs = iframeDoc.querySelectorAll('input');
                allInputs.push(...iframeInputs);
            }
        } catch (error) {
            // Will fail for cross-origin iframes
            console.warn('Cannot access iframe due to cross-origin restrictions:', error);
        }
    });

    return allInputs;
}

// Example usage:
const inputElements = getAllInputsIncludingIframes();
const textInputs = []
inputElements.forEach(inputField => {
    if (inputField.type == 'text' || inputField.type == 'email') {
        let i = new TextInput(inputField, p)
        i.log()
        print
        if (i.classification != 'other') {
            textInputs.push(i)
            i.fill()
        }
    }
});





