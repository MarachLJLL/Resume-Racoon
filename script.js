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
class WorkExperience {
    constructor() {
        this.jobTitle;
        this.company;
        this.location;
        this.startDate; // MM/DD/YYYY
        this.endDate;
        this.roleDescription;
    }
}
class Education {
    constructor() {
        this.university;
        this.degree; // This should be a dropdown
        this.fieldOfStudy;
        this.gpa;
        this.startDate;
        this.endDate;
    }
}


document.addEventListener("DOMContentLoaded", () => {
    const buttonSubmit = document.getElementById("save");
    console.log(buttonSubmit);
    // Attach an event listener to the form submission
    buttonSubmit.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent page refresh
  
      // Create a new Profile instance
      const profile = new Profile();
  
      // Loop through each property in the Profile class and populate it from the form
      Object.keys(profile).forEach((key) => {
        const input = document.getElementById(key);
        if (input) {
          profile[key] = input.value.trim(); // Get the input value and trim whitespace
        }
      });
  
      // Save the profile to Chrome local storage
      chrome.storage.local.set({ profile }, () => {
        //alert("Profile saved successfully!");
        console.log("Saved Profile:", profile); // For debugging
      });
    });

    // const loadButton = document.getElementById("loadButton");
    // const displayContainer = document.getElementById("profileDisplay"); // Where the profile data will be displayed

    // // Add event listener for the button click
    // loadButton.addEventListener("click", () => {
    //     // Retrieve the profile data from Chrome local storage
    //     chrome.storage.local.get(["profile"], (result) => {
    //     if (result.profile) {
    //         const profile = result.profile;

    //         // Clear any previous display
    //         displayContainer.innerHTML = "";

    //         // Dynamically display the profile fields and values
    //         for (const [key, value] of Object.entries(profile)) {
    //             const fieldDiv = document.createElement("div");
    //             fieldDiv.textContent = `${key}: ${value}`;
    //             displayContainer.appendChild(fieldDiv);
    //         }
    //     } else {
    //         displayContainer.innerHTML = "<p>No profile data found.</p>";
    //     }
    //     });
    // });
  });
  