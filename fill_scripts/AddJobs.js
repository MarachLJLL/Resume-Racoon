var firstMatch = null;
let clickCount = 0; 
let index = 0;
let monthIndex = 0;
let workExperience = p.workExperience

const today = new Date();
const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
const day = String(today.getDate()).padStart(2, '0');
const year = today.getFullYear();
const formattedDate = `${month}/${day}/${year}`;

const currentDate = new Date(formattedDate);


// 1. Finds the button whose aria-label contains "add" and "work"
function getButtons() {
  const buttons = document.querySelectorAll('[aria-label]');
  // Find the first button where `aria-label` includes both "add" and "work"
  firstMatch = Array.from(buttons).find((button) => {
    const ariaLabel = button.getAttribute('aria-label').toLowerCase();
    return ariaLabel.includes('add') && ariaLabel.includes('work');
  });

  if (firstMatch) {
    console.log("Found matching button:", firstMatch.getAttribute('aria-label'));
  } else {
    console.log("No matching button found.");
  }
}

// 2. Click the found button up to 5 times, filling the first "jobTitle" div after each click
function clickButtonWithDelay() {
  if (clickCount < p.workExperience.length && firstMatch !== null) {
    // Click the button
    firstMatch.click();
    clickCount++;
    console.log(`Clicked button #${clickCount}`);

    // Wait a bit for the new content to load
    setTimeout(() => {
      fillFirstJobTitle();  // Fill the first jobTitle div
      // Schedule the next click after 1 second total
      setTimeout(clickButtonWithDelay, 1000);
    }, 1000);
  }
}


// 3. Finds all jobTitle divs, picks the first one, fills it with data
function fillFirstJobTitle() {
  const jobTitleDivs = document.querySelectorAll('input[data-automation-id="jobTitle"]');
  const companyDivs = document.querySelectorAll('input[data-automation-id="company"]');
  const locationDivs = document.querySelectorAll('input[data-automation-id="location"]');
  const currentlyDiv = document.querySelectorAll('input[data-automation-id="currentlyWorkHere"]');
  const dateSectionMonthDiv = document.querySelectorAll('div[data-automation-id="dateSectionMonth-display"]');
  const dateSectionMonthInput = document.querySelectorAll('input[data-automation-id="dateSectionMonth-input"]');
  const dateSectionYearDiv = document.querySelectorAll('div[data-automation-id="dateSectionYear-display"]');
  const dateSectionYearInput = document.querySelectorAll('input[data-automation-id="dateSectionYear-input"]');
  const descriptionDiv = document.querySelectorAll('textarea[data-automation-id="description"]');

  let testStartDate = "01/22/2024";
  let testEndDate = "01/26/2025";
  let startDate = new Date(testStartDate);
  let endDate = new Date(testEndDate);

  if (jobTitleDivs.length > 0) {
    console.log('index' + index)
    startDate = new Date(workExperience[index].startDate)
    endDate = new Date(workExperience[index].endDate)
    const firstJob = jobTitleDivs[index];
    const firstCompany = companyDivs[index];
    const firstLocation = locationDivs[index];
    const firstCur = currentlyDiv[index];
    const startDateMonth = dateSectionMonthDiv[monthIndex];
    const startMonthIn = dateSectionMonthInput[monthIndex];
    startMonthIn.setAttribute('aria-invalid', 'false');

    const startYearMonth = dateSectionYearDiv[monthIndex];
    const startYearIn = dateSectionYearInput[monthIndex];
    

    const endDateMonth = dateSectionMonthDiv[monthIndex+1];
    const endMonthIn = dateSectionMonthInput[monthIndex+1];
    endMonthIn.setAttribute('aria-invalid', 'false');

    const endDateYear = dateSectionYearDiv[monthIndex+1];
    const endYearIn = dateSectionYearInput[monthIndex+1];
    endYearIn.setAttribute('aria-invalid', 'false');


    const firstDescription = descriptionDiv[index];
    
    if (currentDate >= startDate && currentDate <= endDate) {
      console.log('indexInIf' + index)
        firstCur.click();
        monthIndex += 1;
      } else {
        if ((endDate.getMonth()) < 10){
            endMonthIn.value = "0" + (endDate.getMonth() + 1).toString();
            
            endDateMonth.focus();
            endDateMonth.textContent = "0" + (endDate.getMonth() + 1).toString(); // Add 1 to get 1-based month
            endDateMonth.dispatchEvent(new Event('input',  { bubbles: true }));
            endDateMonth.dispatchEvent(new Event('keyup',  { bubbles: true }));
            endDateMonth.dispatchEvent(new Event('change', { bubbles: true }));
        }
        else{
            startMonthIn.value = (endDate.getMonth() + 1).toString();
            startDateMonth.focus();
            startDateMonth.textContent = (startDate.getMonth()+1).toString();
            startDateMonth.dispatchEvent(new Event('input',  { bubbles: true }));
            startDateMonth.dispatchEvent(new Event('keyup',  { bubbles: true }));
            startDateMonth.dispatchEvent(new Event('change', { bubbles: true }));
        }
        endYearIn.value =(endDate.getFullYear()).toString();

        endDateYear.focus();
        endDateYear.textContent = endDate.getFullYear().toString(); // Get the full year
        endDateYear.dispatchEvent(new Event('input',  { bubbles: true }));
        endDateYear.dispatchEvent(new Event('keyup',  { bubbles: true }));
        endDateYear.dispatchEvent(new Event('change', { bubbles: true }));
        
        console.log(`${formattedDate} is not within the range.`);

        monthIndex += 2;
    }
    if ((startDate.getMonth()) < 10){

        startMonthIn.value = "0" + (startDate.getMonth()+1).toString();
        startDateMonth.focus();
        startDateMonth.textContent = "0" + (startDate.getMonth()+1).toString();
        startDateMonth.dispatchEvent(new Event('input',  { bubbles: true }));
        startDateMonth.dispatchEvent(new Event('keyup',  { bubbles: true }));
        startDateMonth.dispatchEvent(new Event('change', { bubbles: true }));
    }
    else{
        startMonthIn.value = (startDate.getMonth()+1).toString();

        startDateMonth.focus();
        startDateMonth.textContent = (startDate.getMonth()+1).toString();
        startDateMonth.dispatchEvent(new Event('input',  { bubbles: true }));
        startDateMonth.dispatchEvent(new Event('keyup',  { bubbles: true }));
        startDateMonth.dispatchEvent(new Event('change', { bubbles: true }));
    }
    startYearMonth.focus();
    startYearIn.value = (startDate.getFullYear()).toString();

    startYearMonth.textContent = (startDate.getFullYear()).toString();
    startYearMonth.dispatchEvent(new Event('input',  { bubbles: true }));
    startYearMonth.dispatchEvent(new Event('keyup',  { bubbles: true }));
    startYearMonth.dispatchEvent(new Event('change', { bubbles: true }));


    firstJob.value = workExperience[index].jobTitle;
    firstCompany.focus();
    firstCompany.value = workExperience[index].company;
    firstCompany.dispatchEvent(new Event('input',  { bubbles: true }));
    firstCompany.dispatchEvent(new Event('keyup',  { bubbles: true }));
    firstCompany.dispatchEvent(new Event('change', { bubbles: true }));
        
    firstLocation.value = workExperience[index].location;
    firstDescription.value = workExperience[index].roleDescription;
    index++;
  } else {
    console.log("No jobTitle div found to fill.");
  }
}

// 4. Set up a listener on the "next" button, then run getButtons/click logic
setTimeout(() => {
  let nextButton = document.querySelector('[data-automation-id="bottom-navigation-next-button"]');
  if (!nextButton) {
    console.log("Next button not found.");
    return;
  }

  nextButton.addEventListener('click', () => {
    console.log("Next button clicked. Will run getButtons/click after 5s...");
    setTimeout(() => {
      getButtons();
      clickButtonWithDelay();
    }, 5000);
  });
  console.log("Next button listener added.");
}, 5000);

console.log('loaded add jobs')

/***********************************************
 * EDUCATION LOGIC
 ***********************************************/
function simulateEnterKeyPress(element) {
  const enterEvent = new KeyboardEvent('keydown', {
    key: 'Enter',
    code: 'Enter',
    keyCode: 13, // keyCode for Enter
    which: 13,    // 'which' is also 13 for Enter
    bubbles: true, // Ensures the event bubbles up
    cancelable: true
  });

  element.dispatchEvent(enterEvent);
}

let eduFirstMatch = null;
let eduClickCount = 0;

function startEducationFlow() {
console.log("Starting Education flow...");
getEducationButtons();
clickEducationWithDelay();
}

// 1) Find the "Add Education" button
function getEducationButtons() {
const buttons = document.querySelectorAll('[aria-label]');
eduFirstMatch = Array.from(buttons).find((button) => {
  const ariaLabel = (button.getAttribute('aria-label') || "").toLowerCase();
  return ariaLabel.includes('add') && ariaLabel.includes('education');
});

if (eduFirstMatch) {
  console.log("Found matching Education button:", eduFirstMatch.getAttribute('aria-label'));
} else {
  console.log("No matching Education button found.");
}
}

// 2) Click up to 5 times, fill each new entry
function clickEducationWithDelay() {
if (eduClickCount < 1 && eduFirstMatch !== null) {
  eduFirstMatch.click();
  eduClickCount++;
  console.log(`(Edu) Clicked button #${eduClickCount}`);

  setTimeout(() => {
    fillFirstEducation();
    setTimeout(clickEducationWithDelay, 1000);
  }, 1000);

} else {
  console.log("Finished Education or no Education button found.");
}
}
function simulateTypingAndEnter(element, text) {
  if (!element) {
    console.error("Element not found.");
    return;
  }

  // Simulate typing each character
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const keydownEvent = new KeyboardEvent('keydown', { key: char, code: `Key${char.toUpperCase()}`, bubbles: true });
    const keypressEvent = new KeyboardEvent('keypress', { key: char, code: `Key${char.toUpperCase()}`, bubbles: true });
    const inputEvent = new InputEvent('input', { inputType: 'insertText', data: char, bubbles: true });

    // Dispatch keydown, keypress, and input events for each character
    element.dispatchEvent(keydownEvent);
    element.value += char; // Update the value
    element.dispatchEvent(keypressEvent);
    element.dispatchEvent(inputEvent);
  }

  // Dispatch 'change' event to signal input completion
  const changeEvent = new Event('change', { bubbles: true });
  element.dispatchEvent(changeEvent);

  // Simulate pressing the Enter key
  const enterKeydownEvent = new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, bubbles: true });
  const enterKeyupEvent = new KeyboardEvent('keyup', { key: 'Enter', code: 'Enter', keyCode: 13, bubbles: true });

  element.dispatchEvent(enterKeydownEvent);
  element.dispatchEvent(enterKeyupEvent);
  element.dispatchEvent(enterKeydownEvent);
  element.dispatchEvent(enterKeyupEvent);
}
async function fillDegree() {
  let countryButton = document.querySelectorAll('[data-automation-id="degree"]')[0];
  if (countryButton) {
      countryButton.click()
      await new Promise((resolve) => setTimeout(resolve, 2000));
      let dropDown = document.querySelectorAll('[tabindex="-1"]');
      dropDown = dropDown[dropDown.length - 1];
      console.log('dd', dropDown);
      let countryDivs = dropDown.getElementsByTagName('div')
      return countryDivs;
  } else {
      console.log('Country not found on this workday page')
  }
}

// Example Usage:
// Select the input element



// 3) Fill newly created Education row
function fillFirstEducation() {
const schoolDivs = document.querySelectorAll('input[data-automation-id="searchBox"]');
const studyDiv = document.querySelector('div[data-automation-id="formField-field-of-study"]');
const studyIn = studyDiv.getElementsByTagName('input')[0];
const gpaDiv = document.querySelector('div[data-automation-id="formField-gpa"]');
const gpaIn = gpaDiv.getElementsByTagName('input')[0];
if (schoolDivs.length > 0 && 0 < schoolDivs.length) {
  const firstSchool = schoolDivs[0];
  firstSchool.click();
  simulateTypingAndEnter(firstSchool, "Mcgill");
  setTimeout(() => {
      (async () => {
          cl = await fillDegree();
          if (cl) {
              // Convert to an array so .forEach() works reliably:
              Array.from(cl).forEach(countryDiv => {
                  if (countryDiv.textContent === 'Bachelor Degree') {
                      countryDiv.parentElement.click();
                  }
              });
          }
      })()
  }, 3000);
  setTimeout(()=>{
      studyIn.click();
      simulateTypingAndEnter(studyIn, "computer science");
      setTimeout(()=>{
          simulateTypingAndEnter(studyIn, "");
          console.log("enter");
      },5000)
  }, 5000);
  simulateTypingAndEnter(studyIn, "");
  gpaIn.value = "4.0";

  console.log(`Filled education row #${0}`);
} else {
  console.log("No school input or index out of range for Education.");
}
}

/***********************************************
* HELPER: Dispatch multiple events for an element
***********************************************/
function dispatchInputEvents(element) {
element.dispatchEvent(new Event('input',  { bubbles: true }));
element.dispatchEvent(new Event('keyup',  { bubbles: true }));
element.dispatchEvent(new Event('change', { bubbles: true }));
}

/***********************************************
* HELPER: Format date => "MM/DD/YYYY"
***********************************************/
function formatDate(dateObj) {
const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
const dd = String(dateObj.getDate()).padStart(2, '0');
const yyyy = dateObj.getFullYear();
return `${mm}/${dd}/${yyyy}`;
}

/***********************************************
*  WAIT FOR NEXT BUTTON => START WORK FLOW
***********************************************/
setTimeout(() => {
let nextButton = document.querySelector('[data-automation-id="bottom-navigation-next-button"]');
if (!nextButton) {
  console.log("Next button not found for Work. Aborting.");
  return;
}

nextButton.addEventListener('click', () => {
  console.log("Next button (Work) clicked. Will run getButtons/click after 5s...");
  setTimeout(() => {
    // Start the entire Work flow
    startWorkFlow();
  }, 5000);
});
console.log("Next button listener added for Work.");
}, 5000);

console.log("Loaded combined script: Work => Education.");