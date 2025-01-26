class Profile {
    constructor() {
        // name
        this.firstName = "John";
        this.middleName = "";
        this.lastName = "Doe";

        // Contact
        this.email = "test@example.com";
        this.phoneNumber = "5143983000";
        this.address = "123 Main St";
        this.address2 = "Apt 4B";
        this.city = "Sample City";
        this.province = "Sample Province";
        this.postalCode = "H3A 0G3";  

        // urls
        this.linkedinProfile = "https://www.linkedin.com/in/johndoe";
        this.githubProfile = "https://github.com/johndoe";
        this.website = "https://johndoe.com";
        this.portfolio = "https://johndoe.com/portfolio";

        // Work experience
        this.workExperience = [new WorkExperience()]
        
        // Education
        this.education = [new Education()]

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

p = new Profile()
console.log('loaded profile in \'p\'')