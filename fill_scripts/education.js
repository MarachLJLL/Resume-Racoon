
var index = 0;
// 1. Finds the button whose aria-label contains "add" and "work"
function getButtons() {
    const buttons = document.querySelectorAll('[aria-label]');
    // Find the first button where `aria-label` includes both "add" and "work"
    firstMatch = Array.from(buttons).find((button) => {
      const ariaLabel = button.getAttribute('aria-label').toLowerCase();
      return ariaLabel.includes('add') && ariaLabel.includes('Education');
    });
  
    if (firstMatch) {
      console.log("Found matching button:", firstMatch.getAttribute('aria-label'));
    } else {
      console.log("No matching button found.");
    }
  }
  
  function clickButtonWithDelay() {
    if (clickCount < 5 && firstMatch !== null) {
      // Click the button
      firstMatch.click();
      clickCount++;
      console.log(`Clicked button #${clickCount}`);
  
      // Wait a bit for the new content to load
      setTimeout(() => {
        fillFirstEducation();  // Fill the first jobTitle div
        // Schedule the next click after 1 second total
        setTimeout(clickButtonWithDelay, 1000);
      }, 1000);
    }
  }

  function fillFirstEducation() {
    const schoolDivs = document.querySelectorAll('input[data-automation-id="searchBox"]');
    if (schoolDivs.length > 0){
        firstSchool = schoolDivs[index];
        firstSchool.value = "McGill";
        
    }





  }
  