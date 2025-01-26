// do polling
console.log('loaded workday')

p.education.forEach(education => {
    
});

// Country selector

function clickCountry() {
    
}
async function fillCountry() {
    document.querySelectorAll('[aria-label*="Country"]')[0].click();
    await new Promise((resolve) => setTimeout(resolve, 2000));

    let dropDown = document.querySelectorAll('[tabindex="-1"]');
    dropDown = dropDown[dropDown.length - 1];
    console.log('dd', dropDown);
    let countryList = dropDown.getElementsByTagName('div');
    console.log('cl', countryList);

    return countryList;
}

cl = await fillCountry()


// For the popup selector, it's always the last element after clicking the button
document.querySelectorAll('[tabindex="-1"]');






