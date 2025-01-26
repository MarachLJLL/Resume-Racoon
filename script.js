
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

document.addEventListener('DOMContentLoaded', () => {
    const autoFillBtn = document.getElementById('autoFillBtn');

    if (autoFillBtn) {
        autoFillBtn.addEventListener('click', () => {
            loadProfilePromise();
        });
    } else {
        console.warn('Auto-Fill button with ID "autoFillBtn" not found.');
    }
});
  