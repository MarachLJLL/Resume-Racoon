var firstMatch = null;
let clickCount = 0; 
function getButtons(){
    const buttons = document.querySelectorAll('[aria-label]');

    // Find the first button where `aria-label` includes both "add" and "work"
    firstMatch = Array.from(buttons).find((button) => {
    const ariaLabel = button.getAttribute('aria-label').toLowerCase(); // Case-insensitive
    return ariaLabel.includes('add') && ariaLabel.includes('work');
    
  });
}

function clickButtonWithDelay() {

  if (clickCount < 5 && firstMatch != null) {
    firstMatch.click();
    clickCount++;
    setTimeout(clickButtonWithDelay, 1000); // Wait 1 second before next click
  }
}

setTimeout(() => {
    let nextButton = document.querySelector('[data-automation-id="bottom-navigation-next-button"]')
    nextButton.addEventListener('click', () => {
    setTimeout(() => {
        getButtons();
        clickButtonWithDelay();
    }, 5000);
});
}, 5000)






