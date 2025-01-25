class Input {
    constructor(inputElement, profile) {
        this.inputElement = inputElement;
        this.type = inputElement.type;
        this.classification = this._setClassification();
        this.profile = profile
    }

    _setClassification() {
        // Get text that could be used to classify
        const ct = ((this.inputElement.name || "") + (this.inputElement.id || "")).toLowerCase();
    
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
        } else if (/.*(work|employment|job).*/.test(ct)) {
            // "work" is very broad, so place it last among more specific checks
            return 'work';
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
        if (this.classification == 'name') {
            
        }
    }
}

// Example usage
const inputElements = document.querySelectorAll('input');
const textInputs = []
inputElements.forEach(inputField => {
    if (inputField.type == 'text') {
        let i = new Input(inputField)
        i.log()
        if (i.classification != 'other') {
            textInputs.push()
        }
    }
});



