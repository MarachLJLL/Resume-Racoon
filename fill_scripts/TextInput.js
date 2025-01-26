class TextInput {
    constructor(inputElement, profile) {
        this.inputElement = inputElement;
        this.type = inputElement.type;
        this.classification = this._setClassification();
        this.profile = profile
    }

    _setClassification(ct = ((this.inputElement.name || "") + (this.inputElement.id || "") + (this.inputElement.autocomplete || "") + (this.inputElement.getAttribute("data-automation-id") || "")).toLowerCase(), layer_up = 0) {
        // Get classification text    
        // For more specific matches, check them first.
        // Otherwise, the first matching pattern will return.
        if (/.*email.*/.test(ct)) {
            return 'email';
        } else if (/.*first.*name.*/.test(ct)) {
            return 'firstName';
        } else if (/.*last.*name.*/.test(ct)) {
            return 'lastName';
        } else if (/.*middle.*name.*/.test(ct)) {
            return 'middleName';
        } else if (/.*name.*/.test(ct)) {
            return 'fullName';
        } else if (/.*(phone).*/.test(ct) && !/.*extension.*/.test(ct)) {
            return 'phoneNumber';
        } else if (/.*city.*/.test(ct)) {
            return 'city';
        } else if (/.*(province|state).*/.test(ct)) {
            return 'province';
        } else if (/.*(postal|zip).*/.test(ct)) {
            return 'postalCode';
        } else if (/.*address.*/.test(ct) && !/.*e2.*/.test(ct)) {
            return 'address';
        } else if (/.*address.*/.test(ct)) {
            return 'address2';
        } else if (/.*location.*/.test(ct)) {
            return 'address';
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
        } else if (/.*graduat.*/.test(ct)) {
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
        if (layer_up < 2) {
            ct = this.inputElement.parentElement.textContent.toLowerCase()
            return this._setClassification(ct, layer_up + 1)
        } else {
            // insert Isaac short answer API call here
        }
        
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
        this.inputElement.focus();
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
                this.inputElement.value = this.profile.firstName + " " + this.profile.lastName;
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
            case "address2":
                this.inputElement.value = this.profile.address2;
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
                this.inputElement.value = this.profile.linkedIn;
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
                // this.inputElement.value = "";
                break;
        }
        this.inputElement.dispatchEvent(new Event('input',  { bubbles: true }));
        this.inputElement.dispatchEvent(new Event('keyup',  { bubbles: true }));
        this.inputElement.dispatchEvent(new Event('change', { bubbles: true }));
        
        // Optionally blur if that triggers validation
        this.inputElement.blur();
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

console.log('loaded text input')

fillText = async () => {
    console.log('filling text input')
    const inputElements = getAllInputsIncludingIframes();
    const textInputs = []
    inputElements.forEach(inputField => {
        if (inputField.type == 'text' || inputField.type == 'email') {
            let i = new TextInput(inputField, p)
            i.log()
            if (i.classification != 'other') {
                textInputs.push(i)
                i.inputElement.setAttribute("aria-required", "false");
                i.inputElement.setAttribute("aria-invalid", "false");
                i.fill()
            }
        }
    });
}

let delay = 5000
if (document.querySelectorAll('[aria-label*="Country"]')) {
    delay = 10000
}

if (/.*wd3.*/.test(window.location.href)) {
    setTimeout(fillText, delay)
} else {
    fillText()
}

setTimeout(() => {
    let nextButton = document.querySelector('[data-automation-id="bottom-navigation-next-button"]')
    nextButton.addEventListener('click', () => {
        setTimeout(() => {
            fillText();
        }, 5000);
    });
}, delay)

