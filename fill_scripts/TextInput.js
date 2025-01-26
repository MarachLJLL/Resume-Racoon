/********************************************
 * content.js (All-in-One Example)
 ********************************************/

/**
 * Async function to retrieve the user's profile from chrome.storage.local
 */
async function getProfile() {
    try {
      const result = await new Promise((resolve, reject) => {
        chrome.storage.local.get(["profile"], (res) => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve(res);
          }
        });
      });
  
      if (result.profile) {
        console.log("Profile loaded from storage:", result.profile);
        return result.profile;
      } else {
        console.log("No profile data found in storage.");
        return null;
      }
    } catch (error) {
      console.error("Error getting profile:", error);
      return null;
    }
  }
  

  
  /**
   * Class for handling classification and filling of text inputs
   */
  class TextInput {
    constructor(inputElement, profile) {
      this.inputElement = inputElement;
      this.profile = profile;
      this.classification = null; // We'll set this asynchronously
    }
  
    /**
     * Called if classification fails to match known fields.
     * Attempts to generate a short answer from external API.
     */
    async fillShortAns() {
      if (!this.inputElement) return;
  
      // Extract some 'question' text from the DOM
      const q =
        this.inputElement.parentElement?.parentElement?.firstChild?.firstChild
          ?.textContent || "";
      console.log("Detected question text:", q);
  
      // Load profile again if needed (or rely on this.profile if it’s fresh enough)
      const storedProfile = await getProfile();
      if (!storedProfile) {
        console.log("No profile found; cannot fill short answer.");
        return;
      }
  
      // Construct your prompt
      const prompt = `
        This is my profile: ${JSON.stringify(storedProfile)}
        This is the text: ${q}
        Respond to that question.
      `;
      console.log("Asking short-answer API with prompt:\n", prompt);
  
      // Call the external (mock) function
      const results = await askSingleQuestion(prompt);
      if (results && results.output) {
        this.inputElement.value = results.output;
        // Dispatch events to trigger any attached listeners
        this.inputElement.dispatchEvent(new Event("input", { bubbles: true }));
        this.inputElement.dispatchEvent(new Event("keyup", { bubbles: true }));
        this.inputElement.dispatchEvent(new Event("change", { bubbles: true }));
      }
    }
  
    /**
     * Analyzes the inputElement to determine how to fill.
     * Reattempt classification by going up DOM layers (layer_up)
     * if needed. This is async so we can await fillShortAns().
     */
    async setClassification(layer_up = 0) {
      let ct =
        (
          (this.inputElement.name || "") +
          (this.inputElement.id || "") +
          (this.inputElement.autocomplete || "") +
          (this.inputElement.getAttribute("data-automation-id") || "")
        ).toLowerCase();
  
      // For more specific matches, check them first
      if (/.*email.*/.test(ct)) {
        this.classification = "email";
      } else if (/.*first.*name.*/.test(ct)) {
        this.classification = "firstName";
      } else if (/.*last.*name.*/.test(ct)) {
        this.classification = "lastName";
      } else if (/.*middle.*name.*/.test(ct)) {
        this.classification = "middleName";
      } else if (/.*name.*/.test(ct)) {
        this.classification = "fullName";
      } else if (/.*(phone).*/.test(ct) && !/.*extension.*/.test(ct)) {
        this.classification = "phoneNumber";
      } else if (/.*city.*/.test(ct)) {
        this.classification = "city";
      } else if (/.*(province|state).*/.test(ct)) {
        this.classification = "province";
      } else if (/.*(postal|zip).*/.test(ct)) {
        this.classification = "postalCode";
      } else if (/.*address.*/.test(ct) && !/.*e2.*/.test(ct)) {
        this.classification = "address";
      } else if (/.*address.*/.test(ct)) {
        this.classification = "address2";
      } else if (/.*location.*/.test(ct)) {
        this.classification = "address";
      } else if (/.*linkedin.*/.test(ct)) {
        this.classification = "linkedinProfile";
      } else if (/.*github.*/.test(ct)) {
        this.classification = "githubProfile";
      } else if (/.*website.*/.test(ct)) {
        this.classification = "website";
      } else if (/.*portfolio.*/.test(ct)) {
        this.classification = "portfolio";
      } else if (/.*university.*name.*/.test(ct)) {
        this.classification = "universityName";
      } else if (/.*graduat.*/.test(ct)) {
        this.classification = "expectedGraduation";
      } else if (/.*(education|school|degree|uni|college|university).*/.test(ct)) {
        this.classification = "education";
      } else if (/.*diversity.*/.test(ct)) {
        this.classification = "diversity";
      } else if (/.*gender.*/.test(ct)) {
        this.classification = "gender";
      } else if (/.*(race|ethnicity).*/.test(ct)) {
        this.classification = "race";
      } else if (/.*(accessibility|disability).*/.test(ct)) {
        this.classification = "accessibility";
      } else if (/.*(veteran|military).*/.test(ct)) {
        this.classification = "veteran";
      } else if (/.*legal.*/.test(ct)) {
        this.classification = "legal";
      } else if (/.*(authorized.*work|work.*authorization|workauth).*/.test(ct)) {
        this.classification = "authorizedToWork";
      } else if (/.*(non.*compete|non.*disclosure|nda).*/.test(ct)) {
        this.classification = "nonCompeteDisclosure";
      } else if (/.*(experience|exp).*/.test(ct)) {
        this.classification = "experience";
      } else if (/.*project.*/.test(ct)) {
        this.classification = "projects";
      } else if (/.*work.*/.test(ct)) {
        this.classification = "work";
      } else {
        // If no match, check parent's text if we haven't already
        if (layer_up < 2) {
          ct = this.inputElement.parentElement?.textContent?.toLowerCase() || "";
          return this.setClassification(layer_up + 1);
        } else {
          // If still no classification => call fillShortAns
          this.classification = "other";
          await this.fillShortAns();
        }
      }
    }
  
    /**
     * Fills the input according to the classification or falls back on fillShortAns() if "other".
     * This is async so we can await setClassification() properly.
     */
    async fill() {
      // Classification might trigger short-answer calls
      await this.setClassification();
  
      // If classification is not "other", then fill from the profile object
      if (this.classification !== "other") {
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
            this.inputElement.value =
              this.profile.firstName + " " + this.profile.lastName;
            break;
          case "phoneNumber":
            this.inputElement.value = this.profile.phoneNumber;
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
            // If truly unmapped, do nothing here
            break;
        }
  
        // Dispatch events for frameworks that rely on them
        this.inputElement.dispatchEvent(new Event("input", { bubbles: true }));
        this.inputElement.dispatchEvent(new Event("keyup", { bubbles: true }));
        this.inputElement.dispatchEvent(new Event("change", { bubbles: true }));
  
        // Optionally blur if that triggers validation
        this.inputElement.blur();
      }
    }
  
    /**
     * Optional: Log the inputElement and classification for debugging.
     */
    log() {
      console.log(`
  ------------------------------
  Element: ${this.inputElement}
  Classification: ${this.classification}
  ------------------------------`);
    }
  }
  
  /**
   * Collects all inputs and textareas from the main document and
   * any same-origin iframes.
   */
  function getAllInputsIncludingIframes() {
    const allElements = [...document.querySelectorAll("input, textarea")];
    const iframes = document.querySelectorAll("iframe");
  
    iframes.forEach((iframe) => {
      try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        if (iframeDoc) {
          const iframeElements = iframeDoc.querySelectorAll("input, textarea");
          allElements.push(...iframeElements);
        }
      } catch (error) {
        // Will fail for cross-origin iframes
        console.warn(
          "Cannot access iframe due to cross-origin restrictions:",
          error
        );
      }
    });
  
    return allElements;
  }
  
  /**
   * fillText(): Main entry point. 
   *  - Grabs the profile once.
   *  - Gathers all text-like inputs.
   *  - Iterates in series, awaiting each fill() call.
   */
  async function fillText() {
    console.log("filling text input in series...");
  
    // 1. Load profile first
    const profile = await getProfile();
    if (!profile) {
      console.log("No profile found; exiting fillText().");
      return;
    }
  
    // 2. Grab all relevant inputs
    const inputElements = getAllInputsIncludingIframes();
    const validInputs = [...inputElements].filter(
      (el) =>
        el.type === "text" ||
        el.type === "email" ||
        el.tagName === "TEXTAREA"
    );
  
    // 3. Fill them in series: using for...of + await
    for (const inputField of validInputs) {
      const t = new TextInput(inputField, profile);
      // Example: Set optional aria attributes
      t.inputElement.setAttribute("aria-required", "false");
      t.inputElement.setAttribute("aria-invalid", "false");
  
      // Wait for fill to complete (including short-answer API if "other")
      await t.fill();
      t.log();
    }
  }
  
  /*************************************************************
   * Run fillText() after a certain delay or directly on load.
   *************************************************************/
  let delay = 5000;
  if (document.querySelectorAll('[aria-label*="Country"]')) {
    delay = 10000;
  }
  
  if (/.*wd3.*/.test(window.location.href)) {
    // Example: Possibly a special site requires longer
    setTimeout(fillText, delay);
  } else {
    fillText();
  }
  
  // Listen for "Next" button and re-run fillText() after navigation
  try {
    setTimeout(() => {
      let nextButton = document.querySelector(
        '[data-automation-id="bottom-navigation-next-button"]'
      );
      if (nextButton) {
        nextButton.addEventListener("click", () => {
          setTimeout(() => {
            fillText();
          }, 5000);
        });
      }
    }, delay);
  } catch (error) {
    console.log("Error hooking next button:", error);
  }
  