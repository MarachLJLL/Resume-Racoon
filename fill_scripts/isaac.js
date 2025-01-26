var firstMatch = null;
let clickCount = 0; 
let index = 0;
let monthIndex = 0;

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
  if (clickCount < 5 && firstMatch !== null) {
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
  const startDate = new Date(testStartDate);
  const endDate = new Date(testEndDate);

  if (jobTitleDivs.length > 0) {
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
    index++;

    firstJob.value = "Auto-filled job title";
    firstCompany.focus();
    firstCompany.value = "company";
    firstCompany.dispatchEvent(new Event('input',  { bubbles: true }));
    firstCompany.dispatchEvent(new Event('keyup',  { bubbles: true }));
    firstCompany.dispatchEvent(new Event('change', { bubbles: true }));
        
    firstLocation.value = "location";
    firstDescription.value = "description";
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
